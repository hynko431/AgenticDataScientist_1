# CLAUDE.md — Agentic Data Scientist

> Read this file at the start of every session. It is your project memory.

---

## What This Project Does

**Agentic Data Scientist** is a Python framework that lets users run AI-powered data science workflows by uploading CSV/Excel datasets and issuing natural-language queries. The system automatically performs EDA, statistical analysis, and visualization using a multi-agent pipeline.

Two execution modes:

- **orchestrated** — Full Google ADK multi-agent pipeline (plan → implement → review → summarize)
- **simple** — Direct Claude Code execution (faster, cheaper, no planning overhead)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Python API | `DataScientist` class in `src/agentic_data_scientist/core/api.py` |
| ADK Agents | `google-adk==1.18.0`, `google-genai>=1.26.0` |
| Claude Code | `claude-agent-sdk>=0.1.5` |
| CLI | `click` — entry point: `agentic-data-scientist` |
| Backend (new) | FastAPI + uvicorn, SSE streaming, port 8000 |
| Frontend (new) | Next.js 15, TypeScript, Tailwind v4, port 3000 |
| Python version | `>=3.12, <3.15` |
| Testing | `pytest`, `pytest-asyncio` (asyncio_mode=auto) |
| Linting | `ruff` |

---

## Key File Locations

```
src/agentic_data_scientist/
├── core/api.py          → DataScientist class (main entry point)
├── core/events.py       → Streaming event dataclasses
├── agents/adk/agent.py  → Google ADK multi-agent pipeline factory
├── agents/claude_code/agent.py  → Claude Code SDK agent
├── tools/file_ops.py    → Sandboxed file tools (read, list, search, tree)
├── tools/web_ops.py     → fetch_url tool
├── prompts/base/        → 11 markdown prompt files (plan_maker, coding, etc.)
├── cli/main.py          → Click CLI (--mode orchestrated|simple)
backend/
├── main.py              → FastAPI server
frontend/
├── app/                 → Next.js App Router
.gsd/
├── SPEC.md              → Project requirements (FINALIZED)
├── ROADMAP.md           → 5-phase execution plan
├── STATE.md             → Session memory (read this for current progress)
```

---

## Agent Pipeline (ADK / orchestrated mode)

```
SequentialAgent
├── high_level_planning_loop   (plan_maker → plan_reviewer → approve)
├── high_level_plan_parser     (extracts Stage[] + SuccessCriterion[])
├── StageOrchestratorAgent     (drives each stage)
│   ├── implementation_loop    (coding → review → approve, max 5 iter)
│   ├── criteria_checker       (all success criteria met?)
│   └── stage_reflector        (adapts remaining stages if needed)
└── summary_agent              (final report)
```

Session state shared between agents via `session.state` dict:

- `high_level_stages` — list of planned stages
- `current_stage_index` — which stage we're on
- `high_level_success_criteria` — success criteria with status

---

## Development Rules

1. **Never break** `DataScientist` class API — it is the public contract
2. **Path sandboxing** — all file tools validate paths stay inside `working_dir`
3. **No side effects** in `_validate_path()` — it only validates, never creates dirs
4. **Windows async** — set `asyncio.WindowsSelectorEventLoopPolicy()` before any subprocess usage
5. **Content truncation** — file read tools default to 10K chars max to prevent LLM overflow
6. **Claude SDK 1MB limit** — tool responses over 1MB cause JSON buffer overflow (handled in agent)
7. **Event compaction** — compaction callback fires at 40 events, 20-event overlap window

---

## Running the Project

```bash
# Install Python package
pip install -e ".[dev]"

# Run CLI (orchestrated)
agentic-data-scientist "Analyze data.csv" --mode orchestrated --files data.csv

# Run CLI (simple)
agentic-data-scientist "Explain the dataset" --mode simple --files data.csv

# Run backend API server
uvicorn backend.main:app --port 8000 --reload

# Run frontend
cd frontend && npm run dev

# Run tests
pytest tests/ -v
```

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GOOGLE_API_KEY` | For ADK/orchestrated mode | Gemini API |
| `ANTHROPIC_API_KEY` | For claude_code/simple mode | Claude API |
| `CODING_MODEL` | Optional | Override Claude model (default: claude-sonnet-4-5-20250929) |
| `NETWORK_DISABLED` | Optional | Set `1` to disable all web tools |

---

## Agent Skills (Project Development Only)

The `.agent/skills/` directory contains specialist skills for building and maintaining **this project**. They provide AI guidance when working on different project layers. **Do not use them for unrelated projects.**

| Skill | Project Layer | When to Apply |
|-------|--------------|---------------|
| `python-patterns` | `src/agentic_data_scientist/` | Extending the Python library |
| `api-patterns` | `backend/main.py` | Adding/changing FastAPI routes |
| `react-best-practices` | `frontend/` | Modifying Next.js components |
| `tailwind-patterns` | `frontend/app/globals.css` | Changing the design system |
| `webapp-testing` | `frontend/` | Writing E2E Playwright tests |
| `testing-patterns` | `tests/` | Writing unit/integration tests |
| `systematic-debugging` | Any | Diagnosing bugs in agent pipeline |
| `architecture` | System design | Making architectural decisions |
| `database-design` | If/when persistence added | Schema and migration decisions |
| `deployment-procedures` | CI/CD | Production deployment |
| `security-auditor` (agent) | `tools/file_ops.py` | Path sandbox and tool security |
| `clean-code` | All code | Code quality reviews |

Skills in `get-shit-done-for-antigravity/.agent/skills/` (GSD skills) govern planning and execution methodology — always active regardless of layer.

> **Rule**: Every feature or change should identify which skill applies before implementation begins (GEMINI.md Agent Routing Checklist).

---

## GSD Task Management

This project uses the **Get Shit Done** methodology:

- Spec: `.gsd/SPEC.md` (FINALIZED — ready for execution)
- Roadmap: `.gsd/ROADMAP.md` (5 phases)
- State: `.gsd/STATE.md` (read for current progress + next steps)
- Workflows: `get-shit-done-for-antigravity/.agent/workflows/`

**Always read `.gsd/STATE.md` at session start** to know exactly where we left off.

---

## Known Issues / Watch Out For

- **Windows asyncio**: `ProactorEventLoop` conflicts with some subprocess-based tools. Fix: set `WindowsSelectorEventLoopPolicy` at startup.
- **Large file reads**: Claude SDK has a ~1MB internal buffer for tool responses. Agent handles this gracefully but avoid reading giant files.
- **`InMemorySessionService`**: sessions are lost on process restart — this is intentional for MVP.
- **`NETWORK_DISABLED=1`**: completely disables `fetch_url`, `WebFetch`, `WebSearch` tools.
