export default function AgentArchitecturePage() {
    return (
        <div className="arch-root">
            <header className="page-header">
                <div>
                    <h2 className="arch-page-title">Agent Architecture</h2>
                    <p className="arch-page-subtitle">System topology &amp; agent relationships</p>
                </div>
            </header>
            <div className="arch-scroll">
                <div className="arch-inner">
                    {/* Architecture Diagram */}
                    <div className="glass-panel arch-diagram">
                        {/* Orchestrator */}
                        <div className="arch-orchestrator">
                            <div className="arch-orch-icon-box">
                                <span className="material-symbols-outlined arch-orch-icon">hub</span>
                            </div>
                            <span className="arch-orch-label">Orchestrator</span>
                            <p className="arch-orch-desc">Plans &amp; Coordinates</p>
                        </div>

                        {/* Connecting line from orchestrator */}
                        <div className="arch-connector" />

                        {/* Worker Agents Row */}
                        <div className="arch-workers-row">
                            {[
                                { name: 'Cleaner', icon: 'cleaning_services' },
                                { name: 'EDA Bot', icon: 'query_stats' },
                                { name: 'Engineer', icon: 'construction' },
                                { name: 'Model Gen', icon: 'model_training' },
                                { name: 'Reviewer', icon: 'rate_review' },
                                { name: 'Reporter', icon: 'description' },
                            ].map(agent => (
                                <div key={agent.name} className="arch-worker" data-agent={agent.name}>
                                    <div className="arch-worker-icon-box">
                                        <span className="material-symbols-outlined arch-worker-icon">{agent.icon}</span>
                                    </div>
                                    <span className="arch-worker-label">{agent.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Capabilities Table */}
                    <div className="glass-panel arch-table-panel">
                        <div className="arch-table-header">
                            <h3 className="arch-table-title">Agent Capabilities Matrix</h3>
                        </div>
                        <div className="arch-table-scroll">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Agent</th>
                                        <th>Clean</th>
                                        <th>Analyze</th>
                                        <th>Engineer</th>
                                        <th>Model</th>
                                        <th>Review</th>
                                        <th>Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Orchestrator', '✓', '✓', '✓', '✓', '✓', '✓'],
                                        ['Cleaner', '✓', '—', '—', '—', '—', '—'],
                                        ['EDA Bot', '—', '✓', '—', '—', '—', '—'],
                                        ['Feature Engineer', '—', '—', '✓', '—', '—', '—'],
                                        ['Model Generator', '—', '—', '—', '✓', '—', '—'],
                                        ['Peer Reviewer', '—', '—', '—', '—', '✓', '—'],
                                        ['Reporter', '—', '—', '—', '—', '—', '✓'],
                                    ].map(([name, ...caps]) => (
                                        <tr key={name as string}>
                                            <td className="arch-agent-name">{name}</td>
                                            {caps.map((c, i) => (
                                                <td key={i} className={c === '✓' ? 'arch-cap-yes' : 'arch-cap-no'}>{c}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
