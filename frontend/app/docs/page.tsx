'use client';


export default function DocsPage() {
    const sections = [
        { title: 'Getting Started', icon: 'rocket_launch', articles: ['Installation Guide', 'Your First Analysis', 'Understanding Agent Modes', 'API Authentication'] },
        { title: 'Core Concepts', icon: 'school', articles: ['How Agents Work', 'Orchestrated vs Simple Mode', 'Data Lifecycle', 'Tool Call System'] },
        { title: 'API Reference', icon: 'code', articles: ['Authentication', 'Sessions API', 'Files API', 'Webhooks'] },
        { title: 'Integrations', icon: 'integration_instructions', articles: ['Snowflake', 'AWS S3', 'Google BigQuery', 'Slack Notifications'] },
        { title: 'Security', icon: 'security', articles: ['Data Encryption', 'RBAC Setup', 'PII Handling', 'Compliance'] },
        { title: 'Troubleshooting', icon: 'help', articles: ['Common Errors', 'Rate Limits', 'Memory Issues', 'Debug Mode'] },
    ];

    return (
        <div className="docs-root">
            <header className="page-header">
                <div>
                    <h2 className="docs-page-title">Documentation</h2>
                    <p className="docs-page-subtitle">Guides, API reference, and tutorials</p>
                </div>
                <div className="docs-search-wrap">
                    <span className="material-symbols-outlined docs-search-icon">search</span>
                    <input className="input docs-search-input" placeholder="Search docs…" />
                </div>
            </header>
            <div className="docs-scroll">
                <div className="docs-inner">
                    {/* Quick links */}
                    <div className="docs-quick-links">
                        {['Quickstart', 'API Reference', 'Examples', 'Changelog'].map(l => (
                            <button key={l} className="btn btn-ghost docs-quick-btn">
                                <span className="material-symbols-outlined docs-quick-btn-icon">article</span>{l}
                            </button>
                        ))}
                    </div>

                    {/* Sections grid */}
                    <div className="docs-sections-grid">
                        {sections.map(section => (
                            <div key={section.title} className="glass-panel docs-section-card" data-section={section.title}>
                                <div className="docs-section-header">
                                    <div className="docs-section-icon-box">
                                        <span className="material-symbols-outlined docs-section-icon-glyph">{section.icon}</span>
                                    </div>
                                    <h3 className="docs-section-title">{section.title}</h3>
                                </div>
                                <ul className="docs-article-list">
                                    {section.articles.map(a => (
                                        <li key={a}>
                                            <a href="#" className="docs-article-link">
                                                <span className="material-symbols-outlined docs-article-chevron">chevron_right</span>{a}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
