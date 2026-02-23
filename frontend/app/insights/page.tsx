'use client';
import Link from 'next/link';

const insights = [
    { title: 'Revenue anomaly detected in Q3', severity: 'critical', category: 'Anomaly', icon: 'troubleshoot', sessions: ['0x8F2A91'], discovered: '2h ago', desc: 'Sales data shows 23% dip in revenue for weeks 37-39. Possibly seasonal or linked to campaign change.' },
    { title: 'Churn rate increasing in Enterprise tier', severity: 'warning', category: 'Trend', icon: 'trending_down', sessions: ['0x7B1C44'], discovered: '1d ago', desc: 'Enterprise churn increased from 2.1% to 4.8% over last 3 months. Correlated with pricing change.' },
    { title: 'Feature "session_duration" is strongest predictor', severity: 'info', category: 'Feature', icon: 'insights', sessions: ['0x3D9E22'], discovered: '3d ago', desc: 'Across 3 separate models, session_duration has the highest feature importance (0.34 avg).' },
    { title: 'Geographic cluster identified in user base', severity: 'info', category: 'Cluster', icon: 'travel_explore', sessions: ['0x1A4B77'], discovered: '5d ago', desc: '67% of high-value users are concentrated in 4 metropolitan areas. Targeting opportunity identified.' },
];

export default function InsightsPage() {
    return (
        <div className="insights-page">
            <header className="page-header">
                <div>
                    <h2 className="insights-title">Intelligence Hub</h2>
                    <p className="insights-subtitle">Cross-session insights and pattern detection</p>
                </div>
                <select className="input insights-filter" aria-label="Filter by severity">
                    <option>All Severities</option>
                    <option>Critical</option>
                    <option>Warning</option>
                    <option>Info</option>
                </select>
            </header>
            <div className="insights-body">
                <div className="insights-list">
                    {insights.map(insight => (
                        <div key={insight.title} className={`glass-panel insight-card insight-card-${insight.severity}`}>
                            <div className="insight-card-inner">
                                <div className="insight-icon-box">
                                    <span className="material-symbols-outlined insight-icon">{insight.icon}</span>
                                </div>
                                <div className="insight-content">
                                    <div className="insight-header">
                                        <div className="insight-title-row">
                                            <h3 className="insight-title">{insight.title}</h3>
                                            <span className="insight-category-badge">{insight.category}</span>
                                        </div>
                                        <span className="insight-discovered">{insight.discovered}</span>
                                    </div>
                                    <p className="insight-desc">{insight.desc}</p>
                                    <div className="insight-actions">
                                        {insight.sessions.map(s => (
                                            <Link key={s} href={`/sessions/${s}`} className="insight-session-link">{s}</Link>
                                        ))}
                                        <button className="btn btn-ghost insight-investigate-btn">
                                            <span className="material-symbols-outlined insight-investigate-icon">open_in_new</span>Investigate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
