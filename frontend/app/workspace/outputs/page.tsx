export default function OutputsPage() {
    const outputs = [
        { name: 'Q3 Sales Analysis.ipynb', session: '0x8F2A91', type: 'Notebook', size: '2.4 MB', created: '2h ago', icon: 'code' },
        { name: 'churn_model_v2.pkl', session: '0x7B1C44', type: 'Model', size: '14.1 MB', created: '1d ago', icon: 'model_training' },
        { name: 'sales_predictions.csv', session: '0x8F2A91', type: 'Dataset', size: '3.8 MB', created: '2h ago', icon: 'table_chart' },
        { name: 'analysis_report.pdf', session: '0x3D9E22', type: 'Report', size: '1.2 MB', created: '3d ago', icon: 'picture_as_pdf' },
        { name: 'feature_importance.png', session: '0x7B1C44', type: 'Chart', size: '248 KB', created: '1d ago', icon: 'bar_chart' },
        { name: 'correlation_heatmap.png', session: '0x1A4B77', type: 'Chart', size: '186 KB', created: '5d ago', icon: 'grid_on' },
    ];

    return (
        <div className="outputs-root">
            <header className="page-header">
                <div>
                    <h2 className="outputs-page-title">Generated Outputs</h2>
                    <p className="outputs-page-subtitle">Artifacts produced by your AI analyses</p>
                </div>
                <div className="outputs-header-actions">
                    <label htmlFor="outputs-type-filter" className="sr-only">Filter by type</label>
                    <select id="outputs-type-filter" className="input outputs-type-select" aria-label="Filter by output type">
                        <option>All Types</option>
                        <option>Notebooks</option>
                        <option>Models</option>
                        <option>Datasets</option>
                        <option>Reports</option>
                        <option>Charts</option>
                    </select>
                </div>
            </header>
            <div className="outputs-scroll">
                <div className="outputs-inner">
                    <div className="outputs-grid">
                        {outputs.map(out => (
                            <div key={out.name} className="glass-panel outputs-card" data-type={out.type}>
                                <div className="outputs-card-header">
                                    <div className="outputs-icon-box">
                                        <span className="material-symbols-outlined outputs-icon">{out.icon}</span>
                                    </div>
                                    <div className="outputs-name-wrap">
                                        <p className="outputs-file-name">{out.name}</p>
                                        <span className="outputs-type-badge">{out.type}</span>
                                    </div>
                                </div>
                                <div className="outputs-meta-row">
                                    <span className="outputs-meta-text">Session: <span className="outputs-session-id">{out.session}</span></span>
                                    <span className="outputs-meta-text">{out.size}</span>
                                    <span className="outputs-meta-text">{out.created}</span>
                                </div>
                                <div className="outputs-action-row">
                                    <button className="btn btn-ghost outputs-download-btn">
                                        <span className="material-symbols-outlined outputs-download-icon">download</span>Download
                                    </button>
                                    <button className="outputs-delete-btn" aria-label={`Delete ${out.name}`}>
                                        <span className="material-symbols-outlined outputs-delete-icon">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
