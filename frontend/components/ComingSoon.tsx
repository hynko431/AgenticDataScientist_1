import React from 'react';
import Link from 'next/link';

interface ComingSoonProps {
    title: string;
    subtitle?: string;
    icon?: string;
}

export function ComingSoon({ title, subtitle, icon = 'rocket_launch' }: ComingSoonProps) {
    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">{title}</h2>
                    <p className="review-header-subtitle">{subtitle || 'This feature is currently under dimension construction.'}</p>
                </div>
                <div className="review-header-badge-container">
                    <div className="pipe-header-right">
                        <span className="badge badge-running sidebar-status-badge">● In Development</span>
                    </div>
                </div>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-1100 flex-center coming-soon-inner-wrap">
                    <div className="glass-panel p-48 txt-center max-w-500 animate-fade-in">
                        <div className="coming-soon-icon-wrap bg-cyan-dim clr-cyan mb-24 mx-auto">
                            <span className="material-symbols-outlined coming-soon-icon">{icon}</span>
                        </div>
                        <h3 className="wizard-section-label fs-24 mb-16">Coming Soon</h3>
                        <p className="audit-action fs-16 mb-32">
                            Our agents are working hard to bring this feature online.
                            The <strong>{title}</strong> module is scheduled for v2.7.0.
                        </p>
                        <div className="d-flex gap-16 justify-center">
                            <Link href="/dashboard" className="btn btn-primary glow-button d-flex align-center">
                                <span className="material-symbols-outlined mr-8">dashboard</span>
                                Back to Dashboard
                            </Link>
                            <Link href="/onboarding" className="btn btn-secondary d-flex align-center">
                                <span className="material-symbols-outlined mr-8">help</span>
                                View Roadmap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
