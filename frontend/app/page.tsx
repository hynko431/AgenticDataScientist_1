'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="lp-root">
      {/* Background Decorations */}
      <div className="lp-bg-wrap">
        <div className="lp-bg-blob-1" />
        <div className="lp-bg-blob-2" />
      </div>

      {/* Nav */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-nav-brand">
            <div className="lp-nav-logo">
              <span className="material-symbols-outlined lp-nav-logo-icon">smart_toy</span>
            </div>
            <span className="lp-nav-brand-text">Agentic DS</span>
          </div>
          <div className="lp-nav-links">
            {['Features', 'How it works', 'Pricing', 'Docs'].map(l => (
              <span key={l} className="lp-nav-link">{l}</span>
            ))}
          </div>
          <div className="lp-nav-actions">
            <Link href="/dashboard" className="lp-nav-link-a">
              <button className="btn btn-ghost lp-nav-btn">Sign In</button>
            </Link>
            <Link href="/onboarding" className="lp-nav-link-a">
              <button className="btn btn-primary lp-nav-btn">Get Access</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="lp-main">
        <div className="lp-hero-wrap">
          {/* Status badge */}
          <div className="lp-badge">
            <span className="lp-badge-dot" />
            <span className="lp-badge-text">System Online v2.0</span>
          </div>

          {/* Headline */}
          <h1 className="lp-headline">
            The Future of <br />
            <span className="text-gradient">Autonomous Data Science</span>
          </h1>
          <p className="lp-hero-desc">
            Deploy multi-agent systems to clean, analyze, and model your data without human intervention. From raw CSV to production model in minutes.
          </p>

          {/* CTAs */}
          <div className="lp-cta-row">
            <Link href="/sessions/new/step-1" className="lp-cta-link">
              <button className="btn btn-primary glow-button lp-cta-btn">
                <span className="material-symbols-outlined">rocket_launch</span>
                Launch Your First Analysis
              </button>
            </Link>
            <Link href="/dashboard" className="lp-cta-link">
              <button className="btn btn-ghost lp-cta-btn">
                <span className="material-symbols-outlined">play_circle</span>
                View Dashboard
              </button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="lp-social">
            <p className="lp-social-label">Trusted by innovators at</p>
            <div className="lp-social-logos">
              {['ACME Corp', 'GlobalData', 'NeuroNet', 'StarkInd', 'CyberDyne'].map(n => (
                <span key={n} className="lp-social-name">{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="lp-features-wrap">
          <div className="lp-features-grid">
            {[
              { icon: 'psychology', title: 'Autonomous Planning', desc: 'Agents automatically decompose complex data tasks into executable DAGs. No manual workflow design required.' },
              { icon: 'hub', title: 'Multi-Agent Execution', desc: 'Parallel execution across distributed environments with self-correction capabilities when errors occur.' },
              { icon: 'admin_panel_settings', title: 'Enterprise Security', desc: 'Bank-grade encryption, role-based access control (RBAC), and full audit trails for sensitive datasets.' },
              { icon: 'stream', title: 'Real-Time Streaming', desc: 'Watch AI thinking, tool calls, and results update in real-time via SSE streams with zero latency.' },
              { icon: 'analytics', title: 'Auto EDA', desc: 'Upload any CSV or Excel file and agents automatically perform full exploratory data analysis.' },
              { icon: 'folder_zip', title: 'Downloadable Results', desc: 'All generated plots, reports, and data files are saved and available for immediate download.' },
            ].map((f) => (
              <div key={f.title} className="glass-panel lp-feature-card">
                <div className="lp-feature-icon-box">
                  <span className="material-symbols-outlined lp-feature-icon">{f.icon}</span>
                </div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="lp-bottom-cta">
          <h2 className="lp-bottom-cta-title">Ready to Automate?</h2>
          <p className="lp-bottom-cta-desc">Join 5,000+ data scientists who have already deployed their first agentic workflow.</p>
          <Link href="/sessions/new/step-1" className="lp-cta-link">
            <button className="btn btn-primary glow-button lp-bottom-cta-btn">
              Start Free Trial
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-grid">
            <div>
              <div className="lp-footer-brand">
                <span className="material-symbols-outlined">smart_toy</span>
                <span className="lp-footer-brand-text">Agentic DS</span>
              </div>
              <p className="lp-footer-tagline">Building the future of autonomous intelligence for enterprise data teams.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Integrations', 'Security', 'Roadmap'] },
              { title: 'Resources', links: ['Documentation', 'API Reference', 'Blog', 'Community'] },
              { title: 'Company', links: ['About', 'Careers', 'Legal', 'Contact'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="lp-footer-col-title">{col.title}</h4>
                <ul className="lp-footer-col-list">
                  {col.links.map(l => (
                    <li key={l}><span className="lp-footer-col-link">{l}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lp-footer-bottom">
            <p className="lp-footer-copy">© 2026 Agentic Data Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
