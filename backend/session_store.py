"""
Agentic Data Scientist — In-memory session store.
"""

import os
import uuid
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
from asyncio import Queue


@dataclass
class SessionRecord:
    session_id: str
    query: str
    mode: str  # "orchestrated" | "simple"
    status: str  # "running" | "completed" | "error"
    created_at: str
    working_dir: str
    error: Optional[str] = None
    duration: Optional[float] = None
    files_created: List[str] = field(default_factory=list)
    # Queue that the SSE endpoint reads from
    event_queue: Optional[Queue] = field(default=None, repr=False)


class SessionStore:
    def __init__(self):
        self._sessions: Dict[str, SessionRecord] = {}

    def create(self, session_id: str, query: str, mode: str, working_dir: str) -> SessionRecord:
        record = SessionRecord(
            session_id=session_id,
            query=query,
            mode=mode,
            status="running",
            created_at=datetime.utcnow().isoformat() + "Z",
            working_dir=working_dir,
            event_queue=Queue(),
        )
        self._sessions[session_id] = record
        return record

    def get(self, session_id: str) -> Optional[SessionRecord]:
        return self._sessions.get(session_id)

    def list_all(self) -> List[SessionRecord]:
        return sorted(
            self._sessions.values(),
            key=lambda s: s.created_at,
            reverse=True,
        )

    def update(self, session_id: str, **kwargs) -> None:
        record = self._sessions.get(session_id)
        if record:
            for key, value in kwargs.items():
                setattr(record, key, value)

    def delete(self, session_id: str) -> bool:
        if session_id in self._sessions:
            del self._sessions[session_id]
            return True
        return False


# Singleton
store = SessionStore()
