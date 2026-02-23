'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { listSessions, deleteSession } from '@/lib/api';
import type { SessionSummary } from '@/types/events';

type NavGroup = {
    label: string;
    items: { icon: string; label: string; href: string }[];
};

const NAV_GROUPS: NavGroup[] = [
    {
        label: 'Main',
        items: [
            { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
            { icon: 'add_circle', label: 'New Analysis', href: '/sessions/new/step-1' },
            { icon: 'history', label: 'History', href: '/history' },
            { icon: 'search', label: 'Command Search', href: '/search' },
            { icon: 'rate_review', label: 'Review Queue', href: '/review' },
        ],
    },
    {
        label: 'Intelligence',
        items: [
            { icon: 'smart_toy', label: 'Agents', href: '/agents' },
            { icon: 'hub', label: 'Pipeline', href: '/agents/pipeline' },
            { icon: 'account_tree', label: 'Architecture', href: '/agents/architecture' },
            { icon: 'history_toggle_off', label: 'Version Control', href: '/agents/version-control' },
        ],
    },
    {
        label: 'Models',
        items: [
            { icon: 'model_training', label: 'Model Zoo', href: '/models' },
            { icon: 'compare', label: 'Evaluation', href: '/models/evaluation' },
            { icon: 'trending_up', label: 'Performance', href: '/models/performance' },
            { icon: 'scatter_plot', label: 'Vector Analysis', href: '/models/vectors' },
            { icon: 'library_books', label: 'RAG Knowledge', href: '/models/rag' },
            { icon: 'data_array', label: 'Vector Index', href: '/models/vector-index' },
        ],
    },
    {
        label: 'Workspace',
        items: [
            { icon: 'code', label: 'Artifacts', href: '/artifacts' },
            { icon: 'terminal', label: 'Prompt Sandbox', href: '/workspace' },
            { icon: 'api', label: 'API Playground', href: '/workspace/api' },
            { icon: 'extension', label: 'Plugins', href: '/workspace/plugins' },
        ],
    },
    {
        label: 'Monitor',
        items: [
            { icon: 'health_and_safety', label: 'System Health', href: '/monitor' },
            { icon: 'dns', label: 'Infrastructure', href: '/monitor/infrastructure' },
            { icon: 'schedule', label: 'Scheduled', href: '/monitor/scheduled' },
            { icon: 'attach_money', label: 'Cost & Tokens', href: '/monitor/budget' },
            { icon: 'bar_chart', label: 'Custom Metrics', href: '/monitor/metrics' },
        ],
    },
    {
        label: 'Team',
        items: [
            { icon: 'group', label: 'Workspace', href: '/team' },
            { icon: 'emoji_events', label: 'Leaderboard', href: '/team/leaderboard' },
            { icon: 'chat', label: 'Collaboration', href: '/team/chat' },
            { icon: 'store', label: 'Community', href: '/community' },
        ],
    },
    {
        label: 'Docs & Reports',
        items: [
            { icon: 'menu_book', label: 'Documentation', href: '/docs' },
            { icon: 'data_object', label: 'API Reference', href: '/docs/api' },
            { icon: 'assessment', label: 'Reports', href: '/reports' },
            { icon: 'share', label: 'Share Portal', href: '/reports/sharing' },
        ],
    },
    {
        label: 'Settings',
        items: [
            { icon: 'settings', label: 'Configuration', href: '/settings' },
            { icon: 'lock', label: 'Security', href: '/settings/security' },
            { icon: 'badge', label: 'Roles & Access', href: '/settings/roles' },
            { icon: 'notifications', label: 'Notifications', href: '/settings/notifications' },
            { icon: 'credit_card', label: 'Billing', href: '/settings/billing' },
        ],
    },
];

function StatusDot({ status }: { status: string }) {
    if (status === 'running')
        return <span className="badge badge-running sidebar-status-badge">● running</span>;
    if (status === 'completed')
        return <span className="badge badge-completed sidebar-status-badge">✓ done</span>;
    return <span className="badge badge-error sidebar-status-badge">✗ error</span>;
}

export function Sidebar() {
    const [sessions, setSessions] = useState<SessionSummary[]>([]);
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const pathname = usePathname();

    const refresh = async () => {
        try {
            const data = await listSessions();
            setSessions(data.slice(0, 8));
        } catch { /* server not ready */ }
    };

    useEffect(() => {
        // Initial fetch on mount - use promise chain to satisfy React Hook linting
        listSessions().then(data => setSessions(data.slice(0, 8))).catch(() => { });

        const id = setInterval(refresh, 3000);
        return () => clearInterval(id);
    }, []);

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteSession(id);
        refresh();
    };

    const toggleGroup = (label: string) => {
        setCollapsed(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const isActive = (href: string) => {
        if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <aside className="sidebar sidebar-root">
            {/* Logo */}
            <div className="sidebar-logo">
                <Link href="/dashboard">
                    <div className="sidebar-logo-inner">
                        <div className="sidebar-logo-icon">
                            <span className="material-symbols-outlined">rocket_launch</span>
                        </div>
                        <div>
                            <div className="sidebar-logo-title">Agentic DS</div>
                            <div className="sidebar-logo-version">v2.6.0-stable</div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {NAV_GROUPS.map((group) => (
                    <div key={group.label} className="sidebar-group">
                        <button
                            onClick={() => toggleGroup(group.label)}
                            className="sidebar-group-btn"
                        >
                            <span>{group.label}</span>
                            <span className={`material-symbols-outlined sidebar-group-chevron${collapsed[group.label] ? ' collapsed' : ''}`}>
                                expand_more
                            </span>
                        </button>

                        {!collapsed[group.label] && (
                            <div className="sidebar-group-items">
                                {group.items.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`nav-item ${isActive(item.href) ? 'active' : ''}`}

                                    >
                                        <span className="material-symbols-outlined sidebar-nav-icon">{item.icon}</span>
                                        <span className="sidebar-nav-label">{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Recent Sessions */}
                <div className="sidebar-recent">
                    <div className="sidebar-recent-header">
                        <span>Recent Sessions</span>
                        <Link href="/history" className="sidebar-recent-all">All</Link>
                    </div>

                    {sessions.length === 0 && (
                        <div className="sidebar-session-empty">No sessions yet</div>
                    )}

                    {sessions.map((s) => {
                        const active = pathname === `/sessions/${s.session_id}`;
                        return (
                            <Link key={s.session_id} href={`/sessions/${s.session_id}`}>
                                <div className={`sidebar-session-item${active ? ' active' : ''}`}>
                                    <div className="sidebar-session-row">
                                        <div className="sidebar-session-query">
                                            {s.query.slice(0, 30)}{s.query.length > 30 ? '…' : ''}
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(e, s.session_id)}
                                            className="sidebar-session-delete"
                                            title="Delete"
                                        >×</button>
                                    </div>
                                    <div className="sidebar-session-meta">
                                        <StatusDot status={s.status} />
                                        <span className="sidebar-session-mode">
                                            {s.mode === 'orchestrated' ? '🧠 ADK' : '⚡ Simple'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* User Profile */}
            <div className="sidebar-profile">
                <Link href="/onboarding">
                    <div className="sidebar-profile-inner">
                        <div className="sidebar-avatar">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <div className="sidebar-profile-info">
                            <div className="sidebar-profile-name">Data Scientist</div>
                            <div className="sidebar-profile-role">Lead Analyst</div>
                        </div>
                        <span className="material-symbols-outlined sidebar-profile-more">more_vert</span>
                    </div>
                </Link>
            </div>
        </aside>
    );
}
