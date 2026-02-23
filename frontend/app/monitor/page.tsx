import React from 'react';

export default function MonitorPage() {
    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">System Monitor</h2>
                    <p className="review-header-subtitle">Real-time infrastructure and pipeline health</p>
                </div>
                <div className="review-header-badge-container">
                    <div className="pipe-header-right">
                        <span className="mon-live-dot" />
                        <span className="pipe-live-label">LIVE SYSTEM FEED</span>
                    </div>
                </div>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-1100">
                    {/* Live Metrics Grid */}
                    <div className="agents-grid mb-32">
                        {[
                            { label: 'CPU Usage', val: 42, color: 'cyan', icon: 'memory' },
                            { label: 'Memory', val: 68, color: 'violet', icon: 'database' },
                            { label: 'Network throughput', val: 24, color: 'emerald', icon: 'speed' },
                            { label: 'Storage', val: 12, color: 'amber', icon: 'storage' },
                        ].map(metric => (
                            <div key={metric.label} className="glass-panel alert-card p-24">
                                <div className="justify-between align-center d-flex mb-16">
                                    <div className={`alert-icon-box bg-${metric.color}-dim clr-${metric.color}`}>
                                        <span className="material-symbols-outlined">{metric.icon}</span>
                                    </div>
                                    <span className="audit-user">{metric.val}%</span>
                                </div>
                                <h4 className="wizard-section-label">{metric.label}</h4>
                                <div className="mon-metric-bar-bg mt-8">
                                    <div className={`mon-metric-bar-fill bg-${metric.color}`} data-pct={metric.val} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* System Activity Log */}
                    <div className="glass-panel audit-table-wrap">
                        <header className="notif-table-header justify-between align-center d-flex">
                            <h3 className="notif-label">System Activity Log</h3>
                            <div className="gap-4 d-flex">
                                {['ALL', 'ERROR', 'WARN', 'INFO'].map(f => (
                                    <button key={f} className="mon-log-filter-btn" data-active={f === 'ALL'}>{f}</button>
                                ))}
                            </div>
                        </header>
                        <div className="pipe-scroll">
                            {[
                                { t: '14:22:01', l: 'INFO', m: 'Agent "Engineer" started sub-task: code_optimization', color: 'emerald' },
                                { t: '14:21:44', l: 'WARN', m: 'High latency detected on Anthropic API endpoint (1.8s)', color: 'amber' },
                                { t: '14:20:12', l: 'INFO', m: 'Successfully merged pull request #442 into production', color: 'emerald' },
                                { t: '14:18:55', l: 'ERROR', m: 'Failed to initialize GPU workspace: Out of memory', color: 'red' },
                                { t: '14:15:30', l: 'INFO', m: 'Scheduled health check passed for all 12 worker nodes', color: 'emerald' },
                            ].map((log, i) => (
                                <div key={i} className="mon-log-row">
                                    <span className="audit-time min-w-60">{log.t}</span>
                                    <span className={`model-badge bg-${log.color}-dim clr-${log.color} min-w-50 txt-center`}>{log.l}</span>
                                    <span className="audit-action">{log.m}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
