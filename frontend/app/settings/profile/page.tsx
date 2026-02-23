export default function ProfilePage() {
    return (
        <div className="profile-root">
            <header className="page-header">
                <div>
                    <h2 className="profile-page-title">My Profile</h2>
                    <p className="profile-page-subtitle">Personal account settings</p>
                </div>
                <button className="btn btn-primary glow-button"><span className="material-symbols-outlined profile-save-icon">save</span>Save</button>
            </header>
            <div className="profile-scroll">
                <div className="profile-inner">
                    {/* Avatar */}
                    <div className="glass-panel profile-avatar-panel">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar-circle">A</div>
                            <button className="profile-avatar-edit-btn" aria-label="Change avatar">
                                <span className="material-symbols-outlined profile-avatar-edit-icon">photo_camera</span>
                            </button>
                        </div>
                        <div>
                            <h3 className="profile-user-name">Alex Johnson</h3>
                            <p className="profile-user-meta">alex@acme.com · Admin</p>
                            <div className="profile-avatar-actions">
                                <button className="btn btn-ghost profile-change-avatar-btn">Change Avatar</button>
                                <button className="profile-remove-btn">Remove</button>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="glass-panel profile-section-panel">
                        <h3 className="profile-section-title">Account Details</h3>
                        <div className="profile-form-grid">
                            {[
                                { label: 'First Name', value: 'Alex', id: 'profile-first-name' },
                                { label: 'Last Name', value: 'Johnson', id: 'profile-last-name' },
                                { label: 'Email', value: 'alex@acme.com', id: 'profile-email' },
                                { label: 'Title', value: 'Senior Data Scientist', id: 'profile-title' },
                                { label: 'Organization', value: 'ACME Corp', id: 'profile-org' },
                                { label: 'Phone', value: '+1 (555) 000-0000', id: 'profile-phone' },
                            ].map(f => (
                                <div key={f.id}>
                                    <label htmlFor={f.id} className="profile-form-label">{f.label}</label>
                                    <input id={f.id} className="input profile-input-full" defaultValue={f.value} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="glass-panel profile-section-panel">
                        <h3 className="profile-section-title">Change Password</h3>
                        <div className="profile-password-stack">
                            {[
                                { label: 'Current Password', id: 'profile-current-pw' },
                                { label: 'New Password', id: 'profile-new-pw' },
                                { label: 'Confirm Password', id: 'profile-confirm-pw' },
                            ].map(f => (
                                <div key={f.id}>
                                    <label htmlFor={f.id} className="profile-form-label">{f.label}</label>
                                    <input id={f.id} className="input profile-input-full" type="password" placeholder="••••••••" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
