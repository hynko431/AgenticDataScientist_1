export default function SchedulerPage() {
    const scheduled = [
        { id: 1, name: 'Daily Sales EDA', agent: 'EDA Bot', schedule: 'Every day at 8:00 AM', status: 'active', nextRun: 'Tomorrow, 08:00' },
        { id: 2, name: 'Weekly Churn Report', agent: 'Orchestrator', schedule: 'Every Monday at 9:00 AM', status: 'active', nextRun: 'Mon, 09:00' },
        { id: 3, name: 'Monthly Data Audit', agent: 'Security Scanner', schedule: '1st of month, 12:00 AM', status: 'paused', nextRun: 'Jan 1, 00:00' },
        { id: 4, name: 'Real-time Anomaly Scan', agent: 'Cleaner-01', schedule: 'Every 30 minutes', status: 'active', nextRun: 'In 12 minutes' },
    ];

    return (
        <div className="scheduler-root">
            <header className="page-header">
                <div>
                    <h2 className="scheduler-title">Scheduler</h2>
                    <p className="scheduler-subtitle">Automated &amp; recurring analysis jobs</p>
                </div>
                <button className="btn btn-primary glow-button">
                    <span className="material-symbols-outlined scheduler-btn-icon">schedule</span>New Schedule
                </button>
            </header>
            <div className="scheduler-body">
                <div className="scheduler-list">
                    {scheduled.map(job => (
                        <div key={job.id} className="glass-panel scheduler-card">
                            <div className="scheduler-card-inner">
                                <div className={`scheduler-job-icon ${job.status === 'active' ? 'scheduler-job-icon--active' : 'scheduler-job-icon--paused'}`}>
                                    <span className="material-symbols-outlined">{job.status === 'active' ? 'update' : 'timer_off'}</span>
                                </div>
                                <div className="scheduler-job-body">
                                    <h3 className="scheduler-job-name">{job.name}</h3>
                                    <div className="scheduler-job-meta">
                                        <span className="scheduler-job-meta-item">Agent: <span className="scheduler-job-meta-value--agent">{job.agent}</span></span>
                                        <span className="scheduler-job-meta-item">Schedule: <span className="scheduler-job-meta-value--schedule">{job.schedule}</span></span>
                                        <span className="scheduler-job-meta-item">Next run: <span className="scheduler-job-meta-value--next">{job.nextRun}</span></span>
                                    </div>
                                </div>
                                <div className="scheduler-job-actions">
                                    <span className={`scheduler-job-badge ${job.status === 'active' ? 'scheduler-job-badge--active' : 'scheduler-job-badge--paused'}`}>{job.status}</span>
                                    <button className="btn btn-ghost scheduler-job-toggle">{job.status === 'active' ? 'Pause' : 'Resume'}</button>
                                    <button className="scheduler-job-delete">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
