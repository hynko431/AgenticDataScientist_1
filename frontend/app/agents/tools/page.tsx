export default function ToolsPage() {
    const tools = [
        { name: 'Code Executor', icon: 'terminal', desc: 'Executes Python/R code in sandboxed environment.', enabled: true, calls_today: 842, category: 'Core' },
        { name: 'Data Profiler', icon: 'analytics', desc: 'Generates statistical profiles of datasets automatically.', enabled: true, calls_today: 634, category: 'Core' },
        { name: 'Web Search', icon: 'travel_explore', desc: 'Real-time web search for market data and research.', enabled: true, calls_today: 211, category: 'External' },
        { name: 'Chart Generator', icon: 'bar_chart', desc: 'Creates matplotlib, plotly, and seaborn visualizations.', enabled: true, calls_today: 524, category: 'Core' },
        { name: 'SQL Executor', icon: 'storage', desc: 'Runs SQL queries against connected data warehouses.', enabled: false, calls_today: 0, category: 'Database' },
        { name: 'File Converter', icon: 'transform', desc: 'Converts between CSV, Excel, Parquet, JSON formats.', enabled: true, calls_today: 158, category: 'Utility' },
        { name: 'Model Trainer', icon: 'model_training', desc: 'Trains scikit-learn and XGBoost models on provided data.', enabled: true, calls_today: 97, category: 'ML' },
        { name: 'PDF Report Generator', icon: 'picture_as_pdf', desc: 'Exports analysis results as formatted PDF reports.', enabled: true, calls_today: 43, category: 'Utility' },
    ];

    return (
        <div className="tools-root">
            <header className="page-header">
                <div>
                    <h2 className="tools-page-title">Agent Tools</h2>
                    <p className="tools-page-subtitle">Configure which tools agents can use</p>
                </div>
                <button className="btn btn-primary glow-button">
                    <span className="material-symbols-outlined tools-btn-icon">extension</span>Install Plugin
                </button>
            </header>
            <div className="tools-scroll">
                <div className="tools-inner">
                    <div className="tools-grid">
                        {tools.map(tool => (
                            <div key={tool.name} className="glass-panel tools-card" data-enabled={String(tool.enabled)}>
                                <div className="tools-card-top">
                                    <div className="tools-card-left">
                                        <div className="tools-icon-box" data-enabled={String(tool.enabled)}>
                                            <span className="material-symbols-outlined tools-icon-glyph">{tool.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="tools-name" data-enabled={String(tool.enabled)}>{tool.name}</h3>
                                            <span className="tools-category">{tool.category}</span>
                                        </div>
                                    </div>
                                    <div className="tools-toggle" data-enabled={String(tool.enabled)}>
                                        <div className="tools-toggle-knob" />
                                    </div>
                                </div>
                                <p className="tools-desc">{tool.desc}</p>
                                <div className="tools-calls">
                                    <span className="material-symbols-outlined tools-calls-icon">call_made</span>
                                    {tool.calls_today.toLocaleString()} calls today
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
