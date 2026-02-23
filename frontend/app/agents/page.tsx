'use client';
import Link from 'next/link';

export default function AgentsPage() {
    const agents = [
        { id: 'orchestrator', name: 'Orchestrator Agent', icon: 'hub', status: 'active', description: 'Plans and coordinates all other agents in the pipeline.', tasks: 1248, successRate: 94 },
        { id: 'cleaner', name: 'Data Cleaner', icon: 'cleaning_services', status: 'active', description: 'Handles missing values, duplicates, and data normalization.', tasks: 3456, successRate: 98 },
        { id: 'eda', name: 'EDA Bot', icon: 'query_stats', status: 'active', description: 'Performs exploratory data analysis and visualization.', tasks: 2891, successRate: 96 },
        { id: 'engineer', name: 'Feature Engineer', icon: 'construction', status: 'active', description: 'Creates and selects the most predictive features.', tasks: 1567, successRate: 91 },
        { id: 'model-gen', name: 'Model Generator', icon: 'model_training', status: 'active', description: 'Trains and compares multiple ML models automatically.', tasks: 892, successRate: 87 },
        { id: 'reviewer', name: 'Peer Reviewer', icon: 'rate_review', status: 'active', description: 'Reviews outputs from other agents for quality assurance.', tasks: 445, successRate: 99 },
        { id: 'reporter', name: 'Report Writer', icon: 'description', status: 'active', description: 'Generates executive summaries and final analysis reports.', tasks: 334, successRate: 100 },
        { id: 'security', name: 'Security Scanner', icon: 'security', status: 'idle', description: 'Scans for PII, compliance issues, and data vulnerabilities.', tasks: 123, successRate: 100 },
    ];

    return (
        <div className="agents-root">
            <header className="page-header">
                <div>
                    <h2 className="agents-page-title">Agent Configuration</h2>
                    <p className="agents-page-subtitle">Manage and configure your AI agent pool</p>
                </div>
                <div className="agents-header-actions">
                    <Link href="/agents/architecture" className="agents-header-link">
                        <button className="btn btn-ghost"><span className="material-symbols-outlined agents-btn-icon">account_tree</span>Architecture</button>
                    </Link>
                    <button className="btn btn-primary glow-button">
                        <span className="material-symbols-outlined agents-btn-icon">add</span>New Agent
                    </button>
                </div>
            </header>
            <div className="agents-scroll">
                <div className="agents-inner">
                    <div className="agents-grid">
                        {agents.map(agent => (
                            <div key={agent.id} className="glass-panel agents-card" data-agent-id={agent.id}>
                                <div className="agents-card-top">
                                    <div className="agents-card-icon-box">
                                        <span className="material-symbols-outlined agents-card-icon">{agent.icon}</span>
                                    </div>
                                    <span className={agent.status === 'active' ? 'agents-status-active' : 'agents-status-idle'}>{agent.status}</span>
                                </div>
                                <h3 className="agents-card-name">{agent.name}</h3>
                                <p className="agents-card-desc">{agent.description}</p>
                                <div className="agents-card-footer">
                                    <div className="agents-stat">
                                        <div className="agents-stat-value">{agent.tasks.toLocaleString()}</div>
                                        <div className="agents-stat-label">Tasks</div>
                                    </div>
                                    <div className="agents-stat">
                                        <div className="agents-stat-value-success">{agent.successRate}%</div>
                                        <div className="agents-stat-label">Success</div>
                                    </div>
                                    <button className="agents-configure-btn">Configure</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
