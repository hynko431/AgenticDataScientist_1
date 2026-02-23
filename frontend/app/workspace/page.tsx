export default function WorkspacePage() {
    const datasets = [
        { name: 'sales_q3_2024.csv', size: '18.4 MB', rows: '248,921', cols: 34, type: 'CSV', status: 'analyzed', lastUsed: '2h ago' },
        { name: 'users_churn_data.xlsx', size: '5.2 MB', rows: '45,123', cols: 21, type: 'Excel', status: 'pending', lastUsed: '1d ago' },
        { name: 'server_logs_nov.json', size: '142 MB', rows: '2.1M', cols: 12, type: 'JSON', status: 'analyzing', lastUsed: '10m ago' },
        { name: 'marketing_spend.csv', size: '2.1 MB', rows: '18,442', cols: 9, type: 'CSV', status: 'analyzed', lastUsed: '3d ago' },
    ];

    return (
        <div className="wksp-root">
            <header className="page-header">
                <div>
                    <h2 className="wksp-page-title">Workspace</h2>
                    <p className="wksp-page-subtitle">Your uploaded datasets and generated artifacts</p>
                </div>
                <div className="wksp-header-actions">
                    <button className="btn btn-ghost"><span className="material-symbols-outlined wksp-btn-icon">upload_file</span>Upload</button>
                    <button className="btn btn-primary glow-button"><span className="material-symbols-outlined wksp-btn-icon">add</span>Connect Source</button>
                </div>
            </header>
            <div className="wksp-scroll">
                <div className="wksp-inner">
                    {/* Upload drop zone */}
                    <div className="dropzone wksp-dropzone">
                        <span className="material-symbols-outlined wksp-dropzone-icon">cloud_upload</span>
                        <p className="wksp-dropzone-text">Drop datasets here or <span className="wksp-dropzone-browse">browse files</span></p>
                        <p className="wksp-dropzone-hint">CSV, Excel, JSON, TSV, Parquet — up to 2GB</p>
                    </div>

                    {/* Dataset Table */}
                    <div>
                        <h3 className="wksp-section-title">Datasets ({datasets.length})</h3>
                        <div className="glass-panel wksp-table-wrap">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Size</th>
                                        <th>Rows × Cols</th>
                                        <th>Status</th>
                                        <th>Last Used</th>
                                        <th className="wksp-th-actions">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datasets.map(d => (
                                        <tr key={d.name}>
                                            <td>
                                                <div className="wksp-name-cell">
                                                    <span className="material-symbols-outlined wksp-name-icon">table_chart</span>
                                                    <span className="wksp-name-text">{d.name}</span>
                                                </div>
                                            </td>
                                            <td><span className="wksp-type-badge">{d.type}</span></td>
                                            <td className="wksp-mono-cell">{d.size}</td>
                                            <td className="wksp-mono-cell">{d.rows} × {d.cols}</td>
                                            <td><span className={`badge badge-${d.status === 'analyzed' ? 'completed' : d.status === 'analyzing' ? 'running' : 'idle'}`}>{d.status}</span></td>
                                            <td className="wksp-time-cell">{d.lastUsed}</td>
                                            <td className="wksp-actions-cell">
                                                <div className="wksp-actions-wrap">
                                                    <button className="wksp-action-btn" title="Analyze">
                                                        <span className="material-symbols-outlined wksp-action-icon">analytics</span>
                                                    </button>
                                                    <button className="wksp-action-btn" title="Download">
                                                        <span className="material-symbols-outlined wksp-action-icon">download</span>
                                                    </button>
                                                    <button className="wksp-action-btn-danger" title="Delete">
                                                        <span className="material-symbols-outlined wksp-action-icon">delete</span>
                                                    </button>
                                                </div>
                                            </td>
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
