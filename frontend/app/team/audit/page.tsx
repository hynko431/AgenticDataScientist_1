export default function AuditLogPage() {
    const logs = [
        { id: '1', user: 'Alex Johnson', action: 'Created session', target: 'Session 0x8F2A91', time: '14:32:01', ip: '192.168.1.1' },
        { id: '2', user: 'Maria Santos', action: 'Uploaded dataset', target: 'sales_q3.csv (18.4MB)', time: '14:28:45', ip: '192.168.1.2' },
        { id: '3', user: 'James Wu', action: 'Deleted session', target: 'Session 0x3D1F22', time: '14:15:22', ip: '10.0.0.5' },
        { id: '4', user: 'Alex Johnson', action: 'Invited team member', target: 'lisa@acme.com', time: '13:55:11', ip: '192.168.1.1' },
        { id: '5', user: 'API Key (Prod)', action: 'API call — /sessions', target: 'POST /api/sessions', time: '13:40:00', ip: '54.231.12.100' },
        { id: '6', user: 'Sam Taylor', action: 'Exported report', target: 'Report_Q3_Analysis.pdf', time: '12:22:33', ip: '192.168.1.4' },
        { id: '7', user: 'Alex Johnson', action: 'Updated billing', target: 'Upgraded to Pro plan', time: '11:05:00', ip: '192.168.1.1' },
    ];

    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">Audit Log</h2>
                    <p className="review-header-subtitle">Complete activity history for compliance</p>
                </div>
                <div className="agents-header-actions">
                    <input className="input reports-search" placeholder="Filter events…" />
                    <button className="btn btn-ghost"><span className="material-symbols-outlined agents-btn-icon">download</span>Export CSV</button>
                </div>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-1100">
                    <div className="glass-panel audit-table-wrap">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>User / Source</th>
                                    <th>Action</th>
                                    <th>Target</th>
                                    <th>IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(log => (
                                    <tr key={log.id}>
                                        <td className="audit-time">{log.time}</td>
                                        <td>
                                            <div className="audit-user">{log.user}</div>
                                        </td>
                                        <td className="audit-action">{log.action}</td>
                                        <td className="audit-target">{log.target}</td>
                                        <td className="audit-ip">{log.ip}</td>
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
