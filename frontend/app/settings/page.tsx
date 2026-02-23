export default function SettingsPage() {
    return (
        <div className="settings-page">
            <header className="page-header">
                <div>
                    <h2 className="settings-title">General Settings</h2>
                    <p className="settings-subtitle">Workspace preferences and defaults</p>
                </div>
                <button className="btn btn-primary glow-button">
                    <span className="material-symbols-outlined settings-save-icon">save</span>Save Changes
                </button>
            </header>
            <div className="settings-body">
                <div className="settings-content">
                    {/* Workspace */}
                    <div className="glass-panel settings-section">
                        <h3 className="settings-section-title">Workspace</h3>
                        <div className="settings-fields">
                            {[
                                { label: 'Workspace Name', placeholder: 'ACME Corp Data Science', type: 'text' },
                                { label: 'Default Timezone', placeholder: 'UTC-5 (Eastern Time)', type: 'text' },
                                { label: 'Max Concurrent Sessions', placeholder: '5', type: 'number' },
                            ].map(f => (
                                <div key={f.label}>
                                    <label className="settings-label">{f.label}</label>
                                    <input className="input settings-input-full" type={f.type} placeholder={f.placeholder} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Defaults */}
                    <div className="glass-panel settings-section">
                        <h3 className="settings-section-title">Execution Defaults</h3>
                        <div className="settings-fields">
                            {[
                                { label: 'Default Mode', options: ['Orchestrated', 'Simple'] },
                                { label: 'Default Model', options: ['claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307', 'gpt-4o'] },
                                { label: 'Max Iterations', options: ['5', '10', '15', '20', 'Unlimited'] },
                                { label: 'Auto-approve Tool Calls', options: ['Yes', 'No'] },
                            ].map(f => (
                                <div key={f.label}>
                                    <label className="settings-label">{f.label}</label>
                                    <select className="input settings-input-full" aria-label={f.label}>
                                        {f.options.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="glass-panel settings-section settings-danger">
                        <h3 className="settings-danger-title">Danger Zone</h3>
                        <p className="settings-danger-desc">These actions are irreversible. Proceed with caution.</p>
                        <div className="settings-danger-actions">
                            <button className="btn-danger">Clear All Session History</button>
                            <button className="btn-danger">Delete All Datasets</button>
                            <button className="btn-danger-destructive">Delete Workspace</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
