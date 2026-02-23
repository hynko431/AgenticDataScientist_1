'use client';
import Link from 'next/link';

export default function OnboardingPage() {
    const steps = [
        { id: 1, title: 'Configure your first API key', desc: 'Add your Anthropic or OpenAI API key to start running analyses.', link: '/settings/api-keys', done: false, icon: 'key' },
        { id: 2, title: 'Upload a dataset', desc: 'Upload any CSV, Excel, or JSON file to your workspace.', link: '/workspace', done: false, icon: 'upload_file' },
        { id: 3, title: 'Launch your first analysis', desc: 'Use the wizard to run your first 5-step agentic analysis.', link: '/sessions/new/step-1', done: false, icon: 'rocket_launch' },
        { id: 4, title: 'Invite your team', desc: 'Collaborate by inviting colleagues to your workspace.', link: '/team', done: false, icon: 'group_add' },
        { id: 5, title: 'Set up your first automation', desc: 'Schedule recurring analyses to run automatically.', link: '/workspace/scheduler', done: false, icon: 'schedule' },
    ];

    return (
        <div className="onboarding-root">
            <header className="page-header">
                <div>
                    <h2 className="onboarding-title">Getting Started</h2>
                    <p className="onboarding-subtitle">Complete these steps to set up your workspace</p>
                </div>
                <div className="onboarding-progress">0 of 5 completed</div>
            </header>
            <div className="onboarding-body">
                <div className="onboarding-inner">
                    <div className="onboarding-hero">
                        <div className="onboarding-hero-icon">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <h1 className="onboarding-hero-title">Welcome to Agentic DS!</h1>
                        <p className="onboarding-hero-desc">Let&apos;s get your AI data science platform ready in 5 simple steps.</p>
                    </div>

                    <div className="onboarding-steps">
                        {steps.map((step) => (
                            <Link key={step.id} href={step.link} className="onboarding-step-link">
                                <div className={`glass-panel onboarding-step-card`}>
                                    <div className={`onboarding-step-icon ${step.done ? 'onboarding-step-icon--done' : 'onboarding-step-icon--pending'}`}>
                                        {step.done ? <span className="material-symbols-outlined">check_circle</span> : <span className="material-symbols-outlined">{step.icon}</span>}
                                    </div>
                                    <div className="onboarding-step-body">
                                        <div className="onboarding-step-meta">
                                            <span className="onboarding-step-label">Step {step.id}</span>
                                        </div>
                                        <h3 className={`onboarding-step-title ${step.done ? 'onboarding-step-title--done' : 'onboarding-step-title--pending'}`}>{step.title}</h3>
                                        <p className="onboarding-step-desc">{step.desc}</p>
                                    </div>
                                    <span className="material-symbols-outlined onboarding-step-chevron">chevron_right</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="glass-panel onboarding-docs">
                        <span className="material-symbols-outlined onboarding-docs-icon">menu_book</span>
                        <div className="onboarding-docs-body">
                            <h3 className="onboarding-docs-title">Need help? Check our documentation.</h3>
                            <p className="onboarding-docs-desc">Full guides, API reference, and video walkthroughs available.</p>
                        </div>
                        <Link href="/docs" className="onboarding-docs-link">
                            <button className="btn btn-ghost onboarding-docs-btn">Open Docs</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
