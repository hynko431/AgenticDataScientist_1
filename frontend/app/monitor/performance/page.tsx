export default function PerformancePage() {
    const metrics = [
        { name: 'P50 Response Time', value: '1.24s', trend: '-12%', up: false },
        { name: 'P99 Response Time', value: '4.87s', trend: '+3%', up: true },
        { name: 'Throughput', value: '24 req/min', trend: '+18%', up: false },
        { name: 'Error Rate', value: '0.8%', trend: '-0.4%', up: false },
        { name: 'Token Throughput', value: '42k tok/min', trend: '+22%', up: false },
        { name: 'Cache Hit Rate', value: '67%', trend: '+5%', up: false },
    ];

    return (
        <div className="perf-page">
            <header className="page-header">
                <div>
                    <h2 className="perf-title">Performance</h2>
                    <p className="perf-subtitle">Platform latency and throughput metrics</p>
                </div>
                <select className="input perf-filter" aria-label="Filter by time range">
                    <option>Last 24h</option><option>Last 7d</option><option>Last 30d</option>
                </select>
            </header>
            <div className="perf-body">
                <div className="perf-content">
                    {/* Metric Cards */}
                    <div className="perf-metrics-grid">
                        {metrics.map(m => (
                            <div key={m.name} className="stat-card">
                                <div className="perf-metric-header">
                                    <span className="perf-metric-name">{m.name}</span>
                                    <span className={`perf-trend-badge ${m.up ? 'perf-trend-up' : 'perf-trend-down'}`}>{m.trend}</span>
                                </div>
                                <div className="perf-metric-value">{m.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Simulated chart placeholder */}
                    <div className="glass-panel perf-chart-panel">
                        <h3 className="perf-chart-title">Response Time Distribution (Last 24h)</h3>
                        <div className="perf-chart-area">
                            {[40, 55, 70, 65, 80, 72, 90, 85, 78, 88, 95, 100, 92, 82, 74, 68, 77, 84, 72, 66, 58, 50, 48, 45].map((h, i) => (
                                <div key={i} className="perf-chart-bar" data-h={h} />
                            ))}
                            <div className="perf-chart-axis" />
                        </div>
                        <div className="perf-chart-labels">
                            {['00:00', '06:00', '12:00', '18:00', '24:00'].map(t => <span key={t} className="perf-chart-label">{t}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
