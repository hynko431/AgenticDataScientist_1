'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SearchPage() {
    const [query, setQuery] = useState('');

    return (
        <div className="dash-root">
            <div className="dash-bg-glow" />

            <header className="page-header">
                <div>
                    <h2 className="dash-page-title">Command Search</h2>
                    <div className="dash-status-row">
                        <span className="dash-status-label">GLOBAL SEARCH ACTIVE</span>
                    </div>
                </div>
            </header>

            <div className="dash-scroll">
                <div className="dash-inner">
                    <div className="glass-panel search-container">
                        <div className="dash-search-wrap">
                            <span className="material-symbols-outlined dash-search-icon">search</span>
                            <input
                                className="input dash-search-input search-input-large"
                                placeholder="Search analyses, sessions, or agents..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="search-results-grid">
                        {query ? (
                            <div className="glass-panel search-empty-box">
                                <span className="material-symbols-outlined search-empty-icon">search_off</span>
                                <h3 className="dash-action-title">No results found for "{query}"</h3>
                                <p className="dash-action-desc">Try searching for session IDs, agent modes, or data topics.</p>
                            </div>
                        ) : (
                            ['Recent Documents', 'Help Center', 'API Guide', 'Model Zoo'].map((topic) => (
                                <div key={topic} className="glass-card dash-action-card" style={{ cursor: 'default' }}>
                                    <div className="dash-action-badge dash-action-badge-cyan">
                                        <span className="material-symbols-outlined">explore</span>
                                    </div>
                                    <h4 className="dash-action-title">{topic}</h4>
                                    <p className="dash-action-desc">Quickly find documentation and resources related to {topic.toLowerCase()}.</p>
                                    <div className="dash-action-cta dash-action-cta-cyan">
                                        <span>Browse {topic}</span>
                                        <span className="material-symbols-outlined dash-action-arrow">arrow_forward</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
