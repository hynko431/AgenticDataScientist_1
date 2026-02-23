import React from 'react';

export default function AlertsPage() {
    const alerts = [
        { id: 1, title: 'Memory spike detected on GPU cluster', severity: 'critical', time: '2m ago', status: 'active', description: 'GPU memory usage reached 94% during model training on session 0x8F2A91.' },
        { id: 2, title: 'Claude API rate limit approaching', severity: 'warning', time: '15m ago', status: 'active', description: '89% of hourly rate limit consumed. Consider throttling or switching to Haiku.' },
        { id: 3, title: 'Session 0x3D9E22 failed after 3 attempts', severity: 'critical', time: '1h ago', status: 'resolved', description: 'Repeated JSON parse errors in model output. Auto-retries exhausted.' },
        { id: 4, title: 'Scheduled backup completed successfully', severity: 'info', time: '3h ago', status: 'resolved', description: 'All session data backed up to cold storage.' },
    ];
    const sevIcon = (s: string) => s === 'critical' ? 'error' : s === 'warning' ? 'warning' : 'info';

    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">Alerts & Notifications</h2>
                    <p className="review-header-subtitle">System alerts and incident tracking</p>
                </div>
                <div className="review-header-badge-container">
                    <div className="alert-badge alert-val-header">2 Active</div>
                </div>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-800 flex-col gap-16">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`glass-panel alert-card ${alert.status === 'resolved' ? 'opacity-60' : ''}`} data-severity={alert.severity}>
                            <div className="align-start gap-16 d-flex">
                                <div className="alert-icon-box" data-severity={alert.severity}>
                                    <span className="material-symbols-outlined agents-btn-icon">{sevIcon(alert.severity)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="justify-between align-start d-flex">
                                        <h3 className="notif-label">{alert.title}</h3>
                                        <div className="align-center gap-8 ml-16 flex-shrink-0 d-flex">
                                            <span className="audit-time">{alert.time}</span>
                                            <span className="alert-badge" data-status={alert.status}>{alert.status}</span>
                                        </div>
                                    </div>
                                    <p className="audit-action lh-16 mb-12">{alert.description}</p>
                                    {alert.status === 'active' && (
                                        <div className="wizard-prompt-row">
                                            <button className="btn btn-primary fs-12 p-6-14">Acknowledge</button>
                                            <button className="btn btn-ghost fs-12 p-6-14">Investigate</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
