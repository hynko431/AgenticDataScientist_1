'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listSessions } from '@/lib/api';
import type { SessionSummary } from '@/types/events';

export default function HistoryPage() {
    const [sessions, setSessions] = useState<SessionSummary[]>([]);
    const [filter, setFilter] = useState<'all' | 'running' | 'completed' | 'error'>('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        listSessions().then(setSessions).catch(() => { });
    }, []);

    const filtered = sessions.filter(s => {
        if (filter !== 'all' && s.status !== filter) return false;
        if (search && !s.query.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="hist-root">
            <header className="page-header">
                <div>
                    <h2 className="hist-page-title">Session History</h2>
                    <p className="hist-page-subtitle">Past analyses &amp; comparisons</p>
                </div>
                <div className="hist-header-actions">
                    <input className="input hist-search-input" placeholder="Search sessions…" value={search} onChange={e => setSearch(e.target.value)} />
                    <Link href="/sessions/new/step-1" className="hist-new-link">
                        <button className="btn btn-primary"><span className="material-symbols-outlined hist-btn-icon">add</span>New</button>
                    </Link>
                </div>
            </header>

            <div className="hist-scroll">
                <div className="hist-inner">
                    {/* Filters */}
                    <div className="hist-filters">
                        {(['all', 'running', 'completed', 'error'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="hist-filter-btn"
                                data-active={String(filter === f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="glass-panel hist-empty">
                            <span className="material-symbols-outlined hist-empty-icon">history</span>
                            <h3 className="hist-empty-title">No sessions found</h3>
                            <p className="hist-empty-desc">
                                {sessions.length === 0 ? 'Start your first analysis now.' : 'Try a different filter or search term.'}
                            </p>
                            <Link href="/sessions/new/step-1" className="hist-empty-link">
                                <button className="btn btn-primary glow-button">Launch Analysis</button>
                            </Link>
                        </div>
                    ) : (
                        <div className="hist-list">
                            {filtered.map((s) => (
                                <Link key={s.session_id} href={`/sessions/${s.session_id}`} className="hist-session-link">
                                    <div className="glass-panel hist-session-card">
                                        <div className="hist-session-row">
                                            <div className="hist-session-icon-box" data-mode={s.mode === 'orchestrated' ? 'orchestrated' : 'simple'}>
                                                <span className="material-symbols-outlined hist-session-mode-icon">{s.mode === 'orchestrated' ? 'hub' : 'bolt'}</span>
                                            </div>
                                            <div className="hist-session-body">
                                                <div className="hist-session-query">{s.query || '(no query)'}</div>
                                                <div className="hist-session-meta">
                                                    <span className="hist-session-id">{s.session_id.slice(0, 12)}</span>
                                                    <span className="hist-session-time">{new Date(s.created_at).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="hist-session-right">
                                                <span className={`badge badge-${s.status === 'running' ? 'running' : s.status === 'completed' ? 'completed' : 'error'}`}>{s.status}</span>
                                                <span className="material-symbols-outlined hist-session-chevron">chevron_right</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
