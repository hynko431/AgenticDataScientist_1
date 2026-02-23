export default function ChangelogPage() {
    const releases = [
        { version: 'v2.4.0', date: 'Nov 20, 2024', type: 'major', changes: ['Orchestrated mode with 8-agent pipeline', 'Human-in-the-loop review interface', 'Real-time streaming progress updates', 'Token cost analytics dashboard'] },
        { version: 'v2.3.2', date: 'Nov 10, 2024', type: 'patch', changes: ['Fixed memory leak in long-running sessions', 'Improved CSV parsing for large files (>100MB)', 'Security: Updated dependency versions'] },
        { version: 'v2.3.0', date: 'Oct 28, 2024', type: 'minor', changes: ['Model comparison feature', 'Workspace integrations (Snowflake, BigQuery)', 'Scheduled analysis jobs', 'Export reports as PDF/Excel'] },
        { version: 'v2.2.0', date: 'Oct 5, 2024', type: 'minor', changes: ['Team collaboration features', 'Role-based access control', 'Session sharing and permissions'] },
    ];

    return (
        <div className="clog-root">
            <header className="page-header">
                <div>
                    <h2 className="clog-page-title">Changelog</h2>
                    <p className="clog-page-subtitle">Platform updates and release notes</p>
                </div>
                <button className="btn btn-ghost">
                    <span className="material-symbols-outlined clog-btn-icon">rss_feed</span>Subscribe
                </button>
            </header>
            <div className="clog-scroll">
                <div className="clog-timeline">
                    <div className="clog-timeline-line" />
                    {releases.map(release => (
                        <div key={release.version} className="clog-release" data-type={release.type}>
                            <div className="clog-dot" />
                            <div className="clog-release-header">
                                <h3 className="clog-version">{release.version}</h3>
                                <span className="clog-type-badge" data-type={release.type}>{release.type}</span>
                                <span className="clog-date">{release.date}</span>
                            </div>
                            <div className="glass-panel clog-changes-panel">
                                <ul className="clog-changes-list">
                                    {release.changes.map(c => (
                                        <li key={c} className="clog-change-item">
                                            <span className="material-symbols-outlined clog-check-icon">check_circle</span>
                                            <span className="clog-change-text">{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
