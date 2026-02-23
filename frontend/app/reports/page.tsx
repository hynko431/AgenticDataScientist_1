export default function ReportsPage() {
    const reports = [
        { name: 'Q3 2024 Sales Analysis', created: 'Nov 15, 2024', session: '0x8F2A91', pages: 24, status: 'ready', size: '4.2 MB' },
        { name: 'Churn Prediction Model Report', created: 'Nov 10, 2024', session: '0x7B1C44', pages: 18, status: 'ready', size: '2.8 MB' },
        { name: 'Server Log Anomaly Detection', created: 'Nov 5, 2024', session: '0x3D9E22', pages: 12, status: 'generating', size: '—' },
        { name: 'Marketing Attribution Analysis', created: 'Oct 28, 2024', session: '0x1A4B77', pages: 31, status: 'ready', size: '6.1 MB' },
        { name: 'Monthly Platform Summary', created: 'Oct 1, 2024', session: '0xSystem', pages: 8, status: 'ready', size: '1.4 MB' },
    ];

    return (
        <div className="reports-root">
            <header className="page-header">
                <div>
                    <h2 className="reports-header-title">Reports</h2>
                    <p className="reports-header-subtitle">Generated analysis reports and exports</p>
                </div>
                <div className="reports-header-actions">
                    <input className="input reports-search" placeholder="Search reports…" />
                    <button className="btn btn-primary glow-button"><span className="material-symbols-outlined reports-add-icon">add</span>Generate Report</button>
                </div>
            </header>
            <div className="reports-body">
                <div className="reports-container">
                    <div className="reports-list">
                        {reports.map(r => (
                            <div key={r.name} className="glass-panel report-card">
                                <div className={`report-icon-box ${r.status === 'ready' ? 'report-icon-box--ready' : 'report-icon-box--generating'}`}>
                                    <span className="material-symbols-outlined report-icon">{r.status === 'ready' ? 'description' : 'autorenew'}</span>
                                </div>
                                <div className="report-main-info">
                                    <h3 className="report-title">{r.name}</h3>
                                    <div className="report-meta">
                                        <span>Session: <span className="report-meta-session">{r.session}</span></span>
                                        <span>Created: {r.created}</span>
                                        <span>{r.pages} pages</span>
                                        <span>{r.size}</span>
                                    </div>
                                </div>
                                <div className="report-badges">
                                    <span className={`badge badge-${r.status === 'ready' ? 'completed' : 'running'}`}>{r.status}</span>
                                    {r.status === 'ready' && (
                                        <>
                                            <button className="btn btn-ghost report-action-btn">
                                                <span className="material-symbols-outlined report-action-icon">visibility</span>View
                                            </button>
                                            <button className="btn btn-ghost report-action-btn">
                                                <span className="material-symbols-outlined report-action-icon">download</span>PDF
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
