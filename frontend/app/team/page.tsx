export default function TeamPage() {
    const members = [
        { name: 'Alex Johnson', role: 'Admin', email: 'alex@acme.com', avatar: 'A', status: 'online', sessions: 148, joined: 'Jan 2024' },
        { name: 'Maria Santos', role: 'Data Scientist', email: 'maria@acme.com', avatar: 'M', status: 'online', sessions: 94, joined: 'Feb 2024' },
        { name: 'James Wu', role: 'ML Engineer', email: 'james@acme.com', avatar: 'J', status: 'away', sessions: 67, joined: 'Mar 2024' },
        { name: 'Sam Taylor', role: 'Analyst', email: 'sam@acme.com', avatar: 'S', status: 'offline', sessions: 32, joined: 'Apr 2024' },
        { name: 'Lisa Chen', role: 'Viewer', email: 'lisa@acme.com', avatar: 'L', status: 'online', sessions: 12, joined: 'May 2024' },
    ];

    return (
        <div className="team-root">
            <header className="page-header">
                <div>
                    <h2 className="team-page-title">Team Members</h2>
                    <p className="team-page-subtitle">Manage access and roles</p>
                </div>
                <div className="team-header-actions">
                    <input className="input team-search" placeholder="Search members…" />
                    <button className="btn btn-primary glow-button">
                        <span className="material-symbols-outlined team-btn-icon">person_add</span>Invite
                    </button>
                </div>
            </header>
            <div className="team-scroll">
                <div className="team-inner">
                    <div className="glass-panel team-table-wrap">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Role</th>
                                    <th>Sessions</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                    <th className="team-th-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(m => (
                                    <tr key={m.email}>
                                        <td>
                                            <div className="team-member-cell">
                                                <div className="team-avatar">
                                                    {m.avatar}
                                                    <span className="team-status-dot" data-status={m.status} />
                                                </div>
                                                <div>
                                                    <div className="team-member-name">{m.name}</div>
                                                    <div className="team-member-email">{m.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="team-role-badge" data-role={m.role}>{m.role}</span>
                                        </td>
                                        <td className="team-sessions-cell">{m.sessions}</td>
                                        <td className="team-status-cell" data-status={m.status}>{m.status}</td>
                                        <td className="team-joined-cell">{m.joined}</td>
                                        <td className="team-actions-cell">
                                            <div className="team-actions-wrap">
                                                <button className="team-action-btn" title="Edit"><span className="material-symbols-outlined team-action-icon">edit</span></button>
                                                <button className="team-action-btn-danger" title="Remove"><span className="material-symbols-outlined team-action-icon">person_remove</span></button>
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
