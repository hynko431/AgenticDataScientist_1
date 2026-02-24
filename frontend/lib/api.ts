// API client for the FastAPI backend

import type { SessionSummary, FileNode } from '@/types/events';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

// ── Sessions ────────────────────────────────────────────────────────────────

export async function createSession(
    query: string,
    mode: 'orchestrated' | 'simple',
    files: File[],
): Promise<SessionSummary> {
    const body = new FormData();
    if (query.trim()) body.append('query', query.trim());
    body.append('mode', mode);
    for (const f of files) body.append('files', f);

    const res = await fetch(`${BASE}/api/sessions`, {
        method: 'POST',
        body,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create session: ${text}`);
    }
    return res.json();
}

export async function listSessions(): Promise<SessionSummary[]> {
    const res = await fetch(`${BASE}/api/sessions`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to list sessions');
    return res.json();
}

const sessionCache: Record<string, { data: SessionSummary; timestamp: number }> = {};
const CACHE_TTL = 3000; // 3 seconds

export async function getSession(id: string): Promise<SessionSummary> {
    const now = Date.now();
    if (sessionCache[id] && now - sessionCache[id].timestamp < CACHE_TTL) {
        return sessionCache[id].data;
    }

    const res = await fetch(`${BASE}/api/sessions/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Session not found');

    const data = await res.json();
    sessionCache[id] = { data, timestamp: now };
    return data;
}

export async function deleteSession(id: string): Promise<void> {
    await fetch(`${BASE}/api/sessions/${id}`, { method: 'DELETE' });
}

// ── Files ────────────────────────────────────────────────────────────────────

export async function listFiles(sessionId: string): Promise<FileNode[]> {
    const res = await fetch(`${BASE}/api/sessions/${sessionId}/files`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

export function fileUrl(sessionId: string, filePath: string): string {
    return `${BASE}/api/sessions/${sessionId}/files/${filePath}`;
}

// ── SSE stream URL (used by useSSE hook) ─────────────────────────────────────

export function streamUrl(sessionId: string): string {
    return `${BASE}/api/sessions/${sessionId}/stream`;
}

// ── Health ───────────────────────────────────────────────────────────────────

export async function checkHealth(): Promise<boolean> {
    try {
        const res = await fetch(`${BASE}/health`, { cache: 'no-store' });
        return res.ok;
    } catch {
        return false;
    }
}
