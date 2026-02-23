export default function NotificationsPage() {
    const channels = [
        { label: 'Email Notifications', desc: 'Receive alerts and reports via email.' },
        { label: 'Slack Integration', desc: 'Push notifications to a Slack channel.' },
        { label: 'Browser Push', desc: 'In-browser notifications while online.' },
    ];
    const events = [
        { label: 'Session Completed', email: true, slack: false, browser: true },
        { label: 'Session Failed', email: true, slack: true, browser: true },
        { label: 'Human Review Required', email: true, slack: true, browser: true },
        { label: 'Weekly Summary Report', email: true, slack: false, browser: false },
        { label: 'Critical Alert', email: true, slack: true, browser: true },
        { label: 'Team Member Invited', email: false, slack: false, browser: true },
        { label: 'Billing Event', email: true, slack: false, browser: false },
    ];

    const Checkbox = ({ checked }: { checked: boolean }) => (
        <div className={`notif-checkbox ${checked ? 'notif-checkbox--checked' : ''}`}>
            {checked && <span className="material-symbols-outlined notif-check-icon">check</span>}
        </div>
    );

    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">Notifications</h2>
                    <p className="review-header-subtitle">Configure when and how you are notified</p>
                </div>
                <button className="btn btn-primary glow-button"><span className="material-symbols-outlined agents-btn-icon">save</span>Save</button>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-800">
                    <div className="glass-panel">
                        <div className="notif-table-header notif-grid">
                            <span className="notif-header-ev">Event</span>
                            {channels.map(c => <span key={c.label} className="notif-header-channel">{c.label.split(' ')[0]}</span>)}
                        </div>
                        {events.map(ev => (
                            <div key={ev.label} className="notif-row notif-grid">
                                <span className="notif-label">{ev.label}</span>
                                <Checkbox checked={ev.email} />
                                <Checkbox checked={ev.slack} />
                                <Checkbox checked={ev.browser} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
