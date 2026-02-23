export default function IntegrationsPage() {
    const integrations = [
        { name: 'Snowflake', icon: '❄️', desc: 'Query datasets directly from your data warehouse.', status: 'connected', category: 'Data' },
        { name: 'BigQuery', icon: '📊', desc: 'Google BigQuery integration for large-scale analytics.', status: 'disconnected', category: 'Data' },
        { name: 'AWS S3', icon: '🪣', desc: 'Read and write datasets to your S3 buckets.', status: 'connected', category: 'Storage' },
        { name: 'GitHub', icon: '🐙', desc: 'Version control for notebooks and generated code.', status: 'connected', category: 'Dev' },
        { name: 'Slack', icon: '💬', desc: 'Get notified when analyses complete in your workspace.', status: 'disconnected', category: 'Notify' },
        { name: 'Databricks', icon: '🔷', desc: 'Execute spark jobs on Databricks clusters.', status: 'disconnected', category: 'Compute' },
        { name: 'Hugging Face', icon: '🤗', desc: 'Use open-source models from HF Hub.', status: 'connected', category: 'AI' },
        { name: 'Weights & Biases', icon: '🔵', desc: 'Track experiments and model performance.', status: 'disconnected', category: 'MLOps' },
    ];

    return (
        <div className="intg-root">
            <header className="page-header">
                <div>
                    <h2 className="intg-title">Integrations</h2>
                    <p className="intg-subtitle">Connect external data sources and tools</p>
                </div>
                <div className="intg-search-wrap">
                    <span className="material-symbols-outlined intg-search-icon">search</span>
                    <input className="input intg-search-input" placeholder="Search integrations…" />
                </div>
            </header>
            <div className="intg-body">
                <div className="intg-inner">
                    <div className="intg-grid">
                        {integrations.map(intg => (
                            <div key={intg.name} className={`glass-panel intg-card ${intg.status === 'connected' ? 'intg-card--connected' : 'intg-card--disconnected'}`}>
                                <div className="intg-card-header">
                                    <div className="intg-card-identity">
                                        <span className="intg-card-emoji">{intg.icon}</span>
                                        <div>
                                            <h3 className="intg-card-name">{intg.name}</h3>
                                            <span className="intg-card-category">{intg.category}</span>
                                        </div>
                                    </div>
                                    <div className="intg-card-status">
                                        {intg.status === 'connected' && <span className="intg-card-status-dot" />}
                                        <span className={`intg-card-status-label ${intg.status === 'connected' ? 'intg-card-status-label--connected' : 'intg-card-status-label--disconnected'}`}>{intg.status}</span>
                                    </div>
                                </div>
                                <p className="intg-card-desc">{intg.desc}</p>
                                <button className={`btn ${intg.status === 'connected' ? 'btn-ghost' : 'btn-primary'} intg-card-btn`}>
                                    {intg.status === 'connected' ? 'Manage' : 'Connect'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
