export default function SecurityPage() {
    return (
        <div className="sec-root">
            <header className="page-header">
                <div>
                    <h2 className="sec-page-title">Security</h2>
                    <p className="sec-page-subtitle">Authentication, sessions, and access control</p>
                </div>
            </header>
            <div className="sec-scroll">
                <div className="sec-inner">
                    {/* Two-Factor Auth */}
                    <div className="glass-panel sec-card">
                        <div className="sec-2fa-top">
                            <div className="sec-2fa-left">
                                <div className="sec-2fa-icon-box">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <div>
                                    <h3 className="sec-2fa-title">Two-Factor Authentication</h3>
                                    <p className="sec-2fa-desc">Add an extra layer of security to your account.</p>
                                </div>
                            </div>
                            <div className="sec-2fa-right">
                                <span className="badge badge-completed">Enabled</span>
                                <button className="btn btn-ghost sec-configure-btn">Configure</button>
                            </div>
                        </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="glass-panel sec-card">
                        <h3 className="sec-section-title">Active Sessions</h3>
                        {[
                            { device: 'MacBook Pro — Chrome', location: 'New York, US', time: 'Current session', current: true },
                            { device: 'iPhone 15 Pro — Safari', location: 'New York, US', time: '2h ago', current: false },
                            { device: 'Windows Desktop — Edge', location: 'New Jersey, US', time: '1d ago', current: false },
                        ].map(session => (
                            <div key={session.device} className="sec-session-row">
                                <div className="sec-session-left">
                                    <span className="material-symbols-outlined sec-session-device-icon" data-current={String(session.current)}>{session.device.includes('iPhone') ? 'smartphone' : 'computer'}</span>
                                    <div>
                                        <p className="sec-session-device">{session.device}</p>
                                        <p className="sec-session-meta">{session.location} · {session.time}</p>
                                    </div>
                                </div>
                                {!session.current && <button className="sec-revoke-btn">Revoke</button>}
                                {session.current && <span className="sec-active-label">● Active</span>}
                            </div>
                        ))}
                        <button className="sec-revoke-all-btn">Revoke All Other Sessions</button>
                    </div>

                    {/* RBAC */}
                    <div className="glass-panel sec-card">
                        <h3 className="sec-section-title">Role Permissions</h3>
                        {[
                            { role: 'Admin', perms: ['Full access', 'Manage users', 'Billing', 'API keys', 'Delete'] },
                            { role: 'Data Scientist', perms: ['Create sessions', 'Upload data', 'View all sessions', 'Export'] },
                            { role: 'Analyst', perms: ['Create sessions', 'View shared sessions', 'Export reports'] },
                            { role: 'Viewer', perms: ['View shared sessions', 'Download reports'] },
                        ].map(r => (
                            <div key={r.role} className="sec-role-row">
                                <span className="sec-role-name">{r.role}</span>
                                <div className="sec-perm-wrap">
                                    {r.perms.map(p => <span key={p} className="sec-perm-tag">{p}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
