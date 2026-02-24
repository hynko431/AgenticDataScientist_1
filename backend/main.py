"""
Agentic Data Scientist — FastAPI backend.

Routes:
  POST /api/sessions                     → create & start an agent session
  GET  /api/sessions                     → list all sessions
  GET  /api/sessions/{id}/stream         → SSE event stream
  GET  /api/sessions/{id}                → session metadata
  DELETE /api/sessions/{id}             → delete session + files
  GET  /api/sessions/{id}/files          → list output files (tree)
  GET  /api/sessions/{id}/files/{path}   → download / serve a file
"""

import asyncio
import json
import logging
import os
import sys
import shutil
import time
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel

# ── Windows asyncio fix ───────────────────────────────────────────────────────
# Use the default ProactorEventLoop on Windows — it supports subprocesses.
# WindowsSelectorEventLoopPolicy is intentionally NOT used here.

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

# ── Project root on sys.path ──────────────────────────────────────────────────
_here = Path(__file__).parent
_project_root = _here.parent
sys.path.insert(0, str(_project_root / "src"))

from agentic_data_scientist import DataScientist  # noqa: E402
from backend.session_store import store  # noqa: E402

# ── FastAPI app ───────────────────────────────────────────────────────────────
app = FastAPI(
    title="Agentic Data Scientist API",
    description="REST + SSE API for the Agentic Data Scientist multi-agent system",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    logger.info(f"LATENCY: {request.method} {request.url.path} - {process_time:.4f}s")
    response.headers["X-Process-Time"] = str(process_time)
    return response

# ── Working-dir root ──────────────────────────────────────────────────────────
OUTPUT_ROOT = _project_root / "agentic_output"
OUTPUT_ROOT.mkdir(exist_ok=True)

# ── Auto-EDA prompt injected when no query given ──────────────────────────────
AUTO_EDA_PROMPT = (
    "You are an expert data scientist. Perform a comprehensive exploratory data "
    "analysis (EDA) on the uploaded dataset(s). Include: (1) dataset shape, "
    "data types, and missing-value audit; (2) statistical summary for numeric "
    "and categorical columns; (3) distribution plots and correlation heatmaps "
    "saved as PNG files; (4) key insights and anomaly findings; (5) a concise "
    "markdown report saved as `eda_report.md`."
)


# ── Request / Response models ─────────────────────────────────────────────────
class CreateSessionRequest(BaseModel):
    query: Optional[str] = None
    mode: str = "orchestrated"  # "orchestrated" | "simple"


class SessionSummary(BaseModel):
    session_id: str
    query: str
    mode: str
    status: str
    created_at: str
    duration: Optional[float]
    files_created: List[str]
    error: Optional[str]


# ── Background task: run agent and push events into queue ─────────────────────
async def _run_agent(session_id: str, query: str, mode: str, file_list: list):
    """Run DataScientist async and push every event dict to the session queue."""
    record = store.get(session_id)
    if not record:
        return

    working_dir = record.working_dir
    agent_type = "adk" if mode == "orchestrated" else "claude_code"

    try:
        ds = DataScientist(
            agent_type=agent_type,
            working_dir=working_dir,
            auto_cleanup=False,
        )

        async for event in await ds.run_async(query, files=file_list, stream=True):
            await record.event_queue.put(event)

        # Collect final state from the last event (completed / error)
        store.update(
            session_id,
            status="completed",
        )

    except Exception as exc:
        logger.exception("Agent error for session %s", session_id)
        error_event = {"type": "error", "message": str(exc)}
        await record.event_queue.put(error_event)
        store.update(session_id, status="error", error=str(exc))
    finally:
        # Sentinel — signals SSE generator to close
        await record.event_queue.put(None)


# ── Helpers ───────────────────────────────────────────────────────────────────
def _session_to_summary(record) -> SessionSummary:
    return SessionSummary(
        session_id=record.session_id,
        query=record.query,
        mode=record.mode,
        status=record.status,
        created_at=record.created_at,
        duration=record.duration,
        files_created=record.files_created,
        error=record.error,
    )


def _file_tree(directory: Path, base: Path) -> list:
    """Efficient recursive file tree as list of dicts using os.scandir."""
    entries = []
    try:
        # os.scandir is faster as it gets file attributes in one syscall 
        with os.scandir(directory) as it:
            for entry in it:
                rel = str(Path(entry.path).relative_to(base))
                if entry.is_dir():
                    entries.append({
                        "name": entry.name,
                        "path": rel,
                        "type": "directory",
                        "children": _file_tree(Path(entry.path), base),
                    })
                else:
                    entries.append({
                        "name": entry.name,
                        "path": rel,
                        "type": "file",
                        "size": entry.stat().st_size,
                    })
        # Sort results for consistent UI presentation
        entries.sort(key=lambda x: (x["type"] != "directory", x["name"].lower()))
    except (PermissionError, FileNotFoundError):
        pass
    return entries


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/sessions", response_model=SessionSummary, status_code=201)
async def create_session(
    query: Optional[str] = Form(None),
    mode: str = Form("orchestrated"),
    files: Optional[List[UploadFile]] = File(None),
):
    """
    Create a new agent session. Accepts multipart form data so files can be
    uploaded together with the query. If no query is provided but files are
    attached, the auto-EDA prompt is used.
    """
    effective_query = (query or "").strip() or (AUTO_EDA_PROMPT if files else "")
    if not effective_query:
        raise HTTPException(status_code=400, detail="Provide a query or upload files.")
    if mode not in ("orchestrated", "simple"):
        raise HTTPException(status_code=400, detail="mode must be 'orchestrated' or 'simple'.")

    # Create per-session working dir
    import uuid as _uuid
    session_id = str(_uuid.uuid4())
    working_dir = OUTPUT_ROOT / session_id
    working_dir.mkdir(parents=True, exist_ok=True)

    record = store.create(session_id, effective_query, mode, str(working_dir))

    # Save uploaded files into working_dir/user_data/
    file_list = []
    if files:
        user_data_dir = working_dir / "user_data"
        user_data_dir.mkdir(exist_ok=True)
        for upload in files:
            dest = user_data_dir / upload.filename
            content = await upload.read()
            dest.write_bytes(content)
            file_list.append((upload.filename, dest))

    # Start agent in background
    asyncio.create_task(_run_agent(session_id, effective_query, mode, file_list))

    return _session_to_summary(record)


@app.get("/api/sessions", response_model=List[SessionSummary])
async def list_sessions():
    return [_session_to_summary(r) for r in store.list_all()]


@app.get("/api/sessions/{session_id}", response_model=SessionSummary)
async def get_session(session_id: str):
    record = store.get(session_id)
    if not record:
        raise HTTPException(status_code=404, detail="Session not found.")
    return _session_to_summary(record)


@app.delete("/api/sessions/{session_id}", status_code=204)
async def delete_session(session_id: str):
    record = store.get(session_id)
    if not record:
        raise HTTPException(status_code=404, detail="Session not found.")
    # Remove files
    wd = Path(record.working_dir)
    if wd.exists():
        shutil.rmtree(wd, ignore_errors=True)
    store.delete(session_id)


@app.get("/api/sessions/{session_id}/stream")
async def stream_events(session_id: str):
    """
    SSE endpoint. Each event is JSON-encoded and prefixed with 'data: '.
    Ends with a [DONE] sentinel.
    """
    record = store.get(session_id)
    if not record:
        raise HTTPException(status_code=404, detail="Session not found.")

    async def event_generator():
        queue = record.event_queue
        while True:
            event = await queue.get()
            if event is None:
                yield "data: [DONE]\n\n"
                break
            # Update session metadata from completed event
            if isinstance(event, dict):
                if event.get("type") == "completed":
                    store.update(
                        session_id,
                        status="completed",
                        duration=event.get("duration"),
                        files_created=event.get("files_created", []),
                    )
                elif event.get("type") == "error":
                    store.update(session_id, status="error", error=event.get("message"))
                yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )


# ── Caching for file trees ───────────────────────────────────────────────────
_file_tree_cache = {}
_CACHE_TTL = 2.0  # seconds

@app.get("/api/sessions/{session_id}/files")
async def list_files(session_id: str):
    """Return a recursive file tree for the session's working directory (optimized)."""
    record = store.get(session_id)
    if not record:
        raise HTTPException(status_code=404, detail="Session not found.")
    
    wd = Path(record.working_dir)
    if not wd.exists():
        return []

    # Simple cache check based on mtime of the base directory
    mtime = wd.stat().st_mtime
    cache_key = f"{session_id}_{mtime}"
    
    if cache_key in _file_tree_cache:
        return _file_tree_cache[cache_key]

    # Run blocking file I/O in a thread to keep the event loop free
    tree = await asyncio.to_thread(_file_tree, wd, wd)
    
    # Cache the result
    _file_tree_cache[cache_key] = tree
    # Basic cache cleanup: keep only latest 50 results
    if len(_file_tree_cache) > 50:
        _file_tree_cache.pop(next(iter(_file_tree_cache)))
        
    return tree


@app.get("/api/sessions/{session_id}/files/{file_path:path}")
async def serve_file(session_id: str, file_path: str):
    """Download or serve a file from the session working directory."""
    record = store.get(session_id)
    if not record:
        raise HTTPException(status_code=404, detail="Session not found.")
    wd = Path(record.working_dir)
    target = (wd / file_path).resolve()
    # Path traversal guard
    if not str(target).startswith(str(wd.resolve())):
        raise HTTPException(status_code=403, detail="Access denied.")
    if not target.exists() or not target.is_file():
        raise HTTPException(status_code=404, detail="File not found.")
    return FileResponse(str(target))
