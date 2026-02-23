export default function AgentPipelinePage() {
    const stages = [
        { id: 1, name: 'Data Ingestion', agent: 'Ingestor', status: 'completed', icon: 'database', duration: '12s' },
        { id: 2, name: 'Auto-Cleaning', agent: 'Cleaner-01', status: 'running', icon: 'cleaning_services', duration: '45s', progress: 65 },
        { id: 3, name: 'EDA', agent: 'EDA-Bot', status: 'pending', icon: 'query_stats', duration: null },
        { id: 4, name: 'Feature Engineering', agent: 'Engineer', status: 'pending', icon: 'construction', duration: null },
        { id: 5, name: 'Model Training', agent: 'Model-Gen', status: 'pending', icon: 'model_training', duration: null },
        { id: 6, name: 'Peer Review', agent: 'Reviewer', status: 'pending', icon: 'rate_review', duration: null },
        { id: 7, name: 'Report Generation', agent: 'Reporter', status: 'pending', icon: 'description', duration: null },
    ];

    const runningIdx = stages.findIndex(s => s.status === 'running');

    return (
        <div className="pipe-root">
            <header className="page-header">
                <div>
                    <h2 className="pipe-page-title">Agent Pipeline</h2>
                    <p className="pipe-page-subtitle">Real-time pipeline execution &amp; inspection</p>
                </div>
                <div className="pipe-header-right">
                    <span className="pipe-live-dot" />
                    <span className="pipe-live-label">PIPELINE ACTIVE</span>
                </div>
            </header>
            <div className="pipe-scroll">
                <div className="pipe-inner">
                    <div className="pipe-stages">
                        {stages.map((stage, idx) => (
                            <div key={stage.id} className="pipe-stage-row" data-stage={stage.name}>
                                {/* Connector column */}
                                <div className="pipe-connector-col">
                                    <div className="pipe-step-icon" data-status={stage.status}>
                                        {stage.status === 'completed'
                                            ? <span className="material-symbols-outlined pipe-step-icon-glyph">check_circle</span>
                                            : stage.status === 'running'
                                                ? <span className="material-symbols-outlined pipe-step-icon-glyph-spin">sync</span>
                                                : <span className="material-symbols-outlined pipe-step-icon-glyph">{stage.icon}</span>
                                        }
                                    </div>
                                    {idx < stages.length - 1 && (
                                        <div className="pipe-connector-line" data-filled={String(idx < runningIdx)} />
                                    )}
                                </div>
                                {/* Stage card */}
                                <div className="glass-panel pipe-card" data-status={stage.status}>
                                    <div className="pipe-card-top">
                                        <div>
                                            <h3 className="pipe-card-name" data-status={stage.status}>{stage.name}</h3>
                                            <p className="pipe-card-agent">Agent: <span className="pipe-card-agent-name" data-status={stage.status}>{stage.agent}</span></p>
                                        </div>
                                        <div className="pipe-card-meta">
                                            {stage.duration && <span className="pipe-card-duration">{stage.duration}</span>}
                                            <span className={`pipe-status-${stage.status}`}>{stage.status}</span>
                                        </div>
                                    </div>
                                    {stage.progress !== undefined && (
                                        <div className="pipe-progress">
                                            <div className="pipe-progress-header">
                                                <span className="pipe-progress-label">Progress</span>
                                                <span className="pipe-progress-value">{stage.progress}%</span>
                                            </div>
                                            <div className="pipe-progress-track">
                                                <div className="pipe-progress-fill" data-pct={stage.progress} />
                                            </div>
                                        </div>
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
