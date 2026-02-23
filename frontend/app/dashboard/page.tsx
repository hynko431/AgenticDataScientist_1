'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listSessions } from '@/lib/api';
import type { SessionSummary } from '@/types/events';

export default function DashboardPage() {
    const [sessions, setSessions] = useState<SessionSummary[]>([]);

    useEffect(() => {
        listSessions().then(setSessions).catch(() => { });
    }, []);

    const total = sessions.length;
    const completed = sessions.filter(s => s.status === 'completed').length;
    const running = sessions.filter(s => s.status === 'running').length;
    const failed = sessions.filter(s => s.status === 'error').length;
    const successRate = total > 0 ? Math.round((completed / total) * 100) : 88;

    const stats = [
        { label: 'Total Analyses', value: total || '1,248', icon: 'analytics', colorKey: 'cyan' as const, trend: '+12%', trendLabel: 'vs last week', statKey: 'Total Analyses' },
        { label: 'Success Rate', value: `${successRate}%`, icon: 'trending_up', colorKey: 'green' as const, trend: '+2%', trendLabel: 'improvement', statKey: 'Success Rate' },
        { label: 'Avg Duration', value: '4m 12s', icon: 'timer', colorKey: 'blue' as const, trend: null, trendLabel: 'Optimal: 3m–5m', statKey: 'Avg Duration' },
        { label: 'Active Sessions', value: running || 3, icon: 'hub', colorKey: (running > 0 ? 'green' : 'yellow') as 'green' | 'yellow', trend: null, trendLabel: `${failed} failed`, statKey: running > 0 ? 'Active Sessions' : 'Active Sessions-warn' },
    ];

    return (
        <div className="dash-root">
            <div className="dash-bg-glow" />

            <header className="page-header">
                <div>
                    <h2 className="dash-page-title">Mission Control</h2>
                    <div className="dash-status-row">
                        <span className="dash-status-dot" />
                        <span className="dash-status-label">SYSTEM OPERATIONAL</span>
                    </div>
                </div>
                <div className="dash-header-actions">
                    <div className="dash-search-wrap">
                        <span className="material-symbols-outlined dash-search-icon">search</span>
                        <input className="input dash-search-input" placeholder="Search analyses..." />
                    </div>
                    <Link href="/sessions/new/step-1" className="dash-new-link">
                        <button className="btn btn-primary glow-button">
                            <span className="material-symbols-outlined dash-btn-icon">add</span>
                            New Analysis
                        </button>
                    </Link>
                </div>
            </header>

            <div className="dash-scroll">
                <div className="dash-inner">

                    {/* Stats Row */}
                    <div className="dash-stats-grid">
                        {stats.map((stat) => (
                            <div key={stat.label} className={`stat-card dash-stat-card-custom ${stat.statKey === 'Active Sessions' && running > 0 ? 'animate-pulse-glow' : ''}`} data-stat={stat.statKey}>
                                <div className="dash-stat-bg-icon">
                                    <span className="material-symbols-outlined dash-stat-bg-glyph" data-color={stat.colorKey}>{stat.icon}</span>
                                </div>
                                <p className="dash-stat-label">{stat.label}</p>
                                <h3 className="dash-stat-value">{stat.value}</h3>
                                <div className="dash-stat-trend" data-has-trend={String(!!stat.trend)}>
                                    {stat.trend && <span className="material-symbols-outlined dash-trend-icon">trending_up</span>}
                                    {stat.trend && <span>{stat.trend}</span>}
                                    <span className="dash-trend-sub">{stat.trendLabel}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="dash-section-title">Quick Actions</h3>
                        <div className="dash-actions-grid">
                            <Link href="/sessions/new/step-1" className="dash-action-link">
                                <div className="glass-card dash-action-card">
                                    <div className="dash-action-badge dash-action-badge-cyan">
                                        <span className="material-symbols-outlined">bolt</span>
                                    </div>
                                    <h4 className="dash-action-title">Simple Mode</h4>
                                    <p className="dash-action-desc">Single agent execution for quick EDA. Ideal for dataset cleaning, basic plotting, and initial insights.</p>
                                    <div className="dash-action-cta dash-action-cta-cyan">
                                        <span>Launch Cleaner Agent</span>
                                        <span className="material-symbols-outlined dash-action-arrow">arrow_forward</span>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/sessions/new/step-1" className="dash-action-link">
                                <div className="glass-card-indigo dash-action-card">
                                    <div className="dash-action-badge dash-action-badge-indigo">
                                        <span className="material-symbols-outlined">hub</span>
                                    </div>
                                    <h4 className="dash-action-title">Orchestrated Mode</h4>
                                    <p className="dash-action-desc">Multi-agent swarm for complex modeling. Automatically orchestrates feature engineering, model selection, and validation.</p>
                                    <div className="dash-action-cta dash-action-cta-indigo">
                                        <span>Deploy Swarm</span>
                                        <span className="material-symbols-outlined dash-action-arrow">arrow_forward</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Sessions Table */}
                    <div>
                        <div className="dash-sessions-header">
                            <h3 className="dash-sessions-title">Recent Sessions</h3>
                            <Link href="/history" className="dash-view-all">
                                View All <span className="material-symbols-outlined dash-view-all-icon">chevron_right</span>
                            </Link>
                        </div>
                        <div className="glass-panel dash-table-panel">
                            <div className="dash-table-scroll">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Session ID</th>
                                            <th>Agent Type</th>
                                            <th>Status</th>
                                            <th>Query</th>
                                            <th>Timestamp</th>
                                            <th className="dash-td-actions">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sessions.length > 0 ? sessions.slice(0, 6).map((s) => (
                                            <tr key={s.session_id}>
                                                <td className="dash-td-session">{s.session_id.slice(0, 8)}</td>
                                                <td>
                                                    <div className="dash-td-agent">
                                                        <span className={`material-symbols-outlined dash-agent-icon ${s.mode === 'orchestrated' ? 'dash-agent-icon-orchestrated' : 'dash-agent-icon-simple'}`}>smart_toy</span>
                                                        {s.mode === 'orchestrated' ? 'Orchestrator' : 'Simple'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge badge-${s.status === 'running' ? 'running' : s.status === 'completed' ? 'completed' : 'error'}`}>
                                                        {s.status}
                                                    </span>
                                                </td>
                                                <td className="dash-td-query">
                                                    {s.query.slice(0, 40)}{s.query.length > 40 ? '…' : ''}
                                                </td>
                                                <td className="dash-td-time">
                                                    {new Date(s.created_at).toLocaleString()}
                                                </td>
                                                <td className="dash-td-actions">
                                                    <Link href={`/sessions/${s.session_id}`}>
                                                        <button className="dash-view-btn">
                                                            <span className="material-symbols-outlined dash-view-btn-icon">visibility</span>
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )) : (
                                            [
                                                { id: '0x8F2A91', agent: 'AutoML-V2', status: 'running', dataset: 'sales_q3_forecast.csv', time: '2m ago', iconClass: 'dash-agent-icon-orchestrated' },
                                                { id: '0x7B1C44', agent: 'Cleaner-01', status: 'completed', dataset: 'users_raw_dump.json', time: '15m ago', iconClass: 'dash-agent-icon-simple' },
                                                { id: '0x3D9E22', agent: 'EDA-Bot', status: 'error', dataset: 'server_logs_2023.txt', time: '1h ago', iconClass: 'dash-agent-icon-eda' },
                                                { id: '0x1A4B77', agent: 'Model-Gen', status: 'completed', dataset: 'churn_prediction_v4.csv', time: '3h ago', iconClass: 'dash-agent-icon-orchestrated' },
                                            ].map((row) => (
                                                <tr key={row.id}>
                                                    <td className="dash-td-session">{row.id}</td>
                                                    <td><div className="dash-td-agent"><span className={`material-symbols-outlined dash-agent-icon ${row.iconClass}`}>smart_toy</span>{row.agent}</div></td>
                                                    <td><span className={`badge badge-${row.status === 'running' ? 'running' : row.status === 'completed' ? 'completed' : 'error'}`}>{row.status}</span></td>
                                                    <td>{row.dataset}</td>
                                                    <td className="dash-td-time">{row.time}</td>
                                                    <td className="dash-td-actions"><button className="dash-view-btn"><span className="material-symbols-outlined dash-view-btn-icon">visibility</span></button></td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
