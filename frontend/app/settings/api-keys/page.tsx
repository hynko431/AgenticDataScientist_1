export default function ApiKeysPage() {
    const keys = [
        { name: 'Production Frontend', key: 'pk_live_83...2j91', created: '2024-01-12', status: 'active', usage: '2.4M' },
        { name: 'Dev Testing', key: 'pk_test_a2...9d3s', created: '2024-02-15', status: 'active', usage: '124k' },
        { name: 'Staging Pipeline', key: 'pk_stg_f2...8k2l', created: '2023-11-20', status: 'expired', usage: '0' },
    ];

    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">API Keys</h2>
                    <p className="review-header-subtitle">Manage authentication for agents and external integrations</p>
                </div>
                <button className="btn btn-primary glow-button">
                    <span className="material-symbols-outlined agents-btn-icon">add</span>Create New Key
                </button>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-1100">
                    <div className="ak-warning-banner mb-32">
                        <span className="material-symbols-outlined ak-warning-icon">warning</span>
                        <div className="flex-1">
                            <h4 className="audit-user fs-14">Security Advisory</h4>
                            <p className="review-header-subtitle m-0">Never share your API keys in public repositories or client-side code. Use environment variables for server-side access.</p>
                        </div>
                    </div>

                    <div className="glass-panel audit-table-wrap">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Key Name</th>
                                    <th>Token</th>
                                    <th>Created</th>
                                    <th>Status</th>
                                    <th>Usage</th>
                                    <th className="txt-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keys.map(k => (
                                    <tr key={k.name}>
                                        <td className="audit-user">{k.name}</td>
                                        <td>
                                            <code className="ak-key-tag">{k.key}</code>
                                        </td>
                                        <td className="audit-time">{k.created}</td>
                                        <td>
                                            <span className="ak-badge" data-status={k.status}>{k.status}</span>
                                        </td>
                                        <td className="audit-ip">{k.usage}</td>
                                        <td className="txt-right">
                                            <div className="ak-btn-container">
                                                <button className="ak-action-btn">
                                                    <span className="material-symbols-outlined fs-18">content_copy</span>
                                                </button>
                                                <button className="ak-action-btn">
                                                    <span className="material-symbols-outlined fs-18">edit</span>
                                                </button>
                                                <button className="ak-action-btn ak-btn-delete">
                                                    <span className="material-symbols-outlined fs-18">delete</span>
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
    );
}
