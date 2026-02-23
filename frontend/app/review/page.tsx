import Link from 'next/link';

export default function ReviewQueuePage() {
    const items = [
        { id: '1', title: 'Anomaly in revenue column: 147 negative values', severity: 'high', session: '0x8F2A91', agent: 'Cleaner-01', time: '2m ago', type: 'data_quality' },
        { id: '2', title: 'Agent proposes dropping 32% of rows — review required', severity: 'high', session: '0x7B1C44', agent: 'Orchestrator', time: '8m ago', type: 'action' },
        { id: '3', title: 'Model accuracy 62% — below threshold of 70%', severity: 'medium', session: '0x3D9E22', agent: 'Model-Gen', time: '25m ago', type: 'model' },
        { id: '4', title: 'Feature engineering complete — 47 new features created', severity: 'low', session: '0x1A4B77', agent: 'Engineer', time: '1h ago', type: 'info' },
        { id: '5', title: 'PII detected in column "email" — mask before analysis?', severity: 'high', session: '0x9C2D11', agent: 'Security', time: '2h ago', type: 'security' },
    ];

    const typeIcon = (t: string) => t === 'security' ? 'security' : t === 'model' ? 'model_training' : t === 'action' ? 'warning' : t === 'data_quality' ? 'data_check' : 'info';

    return (
        <div className="review-root">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">Human-in-the-Loop Review</h2>
                    <p className="review-header-subtitle">Agent decisions awaiting your approval</p>
                </div>
                <div className="review-header-badge-container">
                    <div className="review-badge-high">
                        3 High Priority
                    </div>
                </div>
            </header>
            <div className="review-body">
                <div className="review-container">
                    {items.map(item => (
                        <div key={item.id} className={`glass-panel review-card review-card--${item.severity}`}>
                            <div className="review-item-content">
                                <div className={`review-icon-box review-icon-box--${item.severity}`}>
                                    <span className="material-symbols-outlined review-icon">{typeIcon(item.type)}</span>
                                </div>
                                <div className="review-info-main">
                                    <div className="review-info-header">
                                        <h3 className="review-item-title">{item.title}</h3>
                                        <span className="review-item-time">{item.time}</span>
                                    </div>
                                    <div className="review-meta-row">
                                        <span className="review-meta-label">Session: <span className="review-meta-value-code">{item.session}</span></span>
                                        <span className="review-meta-label">Agent: <span className="review-meta-value-bold">{item.agent}</span></span>
                                        <span className={`review-severity-tag review-severity-tag--${item.severity}`}>{item.severity}</span>
                                    </div>
                                    <div className="review-actions">
                                        <button className="btn btn-primary review-btn-sm">
                                            <span className="material-symbols-outlined review-btn-icon">check_circle</span>
                                            Approve
                                        </button>
                                        <button className="btn btn-danger review-btn-sm">
                                            <span className="material-symbols-outlined review-btn-icon">cancel</span>
                                            Reject
                                        </button>
                                        <Link href={`/sessions/${item.session}`} className="review-btn-icon txt-none">
                                            <button className="btn btn-ghost review-btn-sm">
                                                <span className="material-symbols-outlined review-btn-icon">visibility</span>
                                                View Session
                                            </button>
                                        </Link>
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
