export default function CostAnalyticsPage() {
    return (
        <div className="costs-page">
            <header className="page-header">
                <div>
                    <h2 className="costs-title">Cost Analytics</h2>
                    <p className="costs-subtitle">Token usage &amp; billing breakdown</p>
                </div>
                <div className="costs-header-actions">
                    <select className="input costs-filter" aria-label="Filter by time range">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                    </select>
                </div>
            </header>
            <div className="costs-body">
                <div className="costs-content">
                    {/* Summary Cards */}
                    <div className="costs-summary-grid">
                        {[
                            { label: 'Total Spend', value: '$127.43', icon: 'payments', variant: 'amber', change: '+8%' },
                            { label: 'Total Tokens', value: '42.8M', icon: 'data_usage', variant: 'cyan', change: '+12%' },
                            { label: 'Input Tokens', value: '28.1M', icon: 'input', variant: 'indigo', change: '+10%' },
                            { label: 'Output Tokens', value: '14.7M', icon: 'output', variant: 'purple', change: '+15%' },
                        ].map(s => (
                            <div key={s.label} className={`stat-card costs-stat-${s.variant}`}>
                                <div className="costs-stat-header">
                                    <p className="costs-stat-label">{s.label}</p>
                                    <span className="material-symbols-outlined costs-stat-icon">{s.icon}</span>
                                </div>
                                <h3 className="costs-stat-value">{s.value}</h3>
                                <span className="costs-stat-change">{s.change} vs prev period</span>
                            </div>
                        ))}
                    </div>

                    {/* Model Cost Breakdown */}
                    <div className="glass-panel costs-table-panel">
                        <div className="costs-table-header">
                            <h3 className="costs-table-title">Cost by Model</h3>
                        </div>
                        <div className="costs-table-scroll">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Input Tokens</th>
                                        <th>Output Tokens</th>
                                        <th>Rate</th>
                                        <th>Total Cost</th>
                                        <th>% of Budget</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Claude 3.5 Sonnet', '18.2M', '9.4M', '$3 / 1M', '$76.44', 60],
                                        ['Claude 3 Haiku', '7.1M', '3.2M', '$0.25 / 1M', '$2.58', 2],
                                        ['GPT-4o', '2.3M', '1.8M', '$5 / 1M', '$20.50', 16],
                                        ['Gemini 2.0 Flash', '0.5M', '0.3M', '$0.075 / 1M', '$0.06', 0.1],
                                    ].map(([model, inp, out, rate, cost, pct]) => (
                                        <tr key={model as string}>
                                            <td className="costs-model-name">{model}</td>
                                            <td>{inp}</td>
                                            <td>{out}</td>
                                            <td className="costs-rate-cell">{rate}</td>
                                            <td className="costs-cost-cell">{cost}</td>
                                            <td>
                                                <div className="costs-pct-row">
                                                    <div className="costs-pct-bar-bg">
                                                        <div className="costs-pct-bar-fill" data-pct={pct} />
                                                    </div>
                                                    <span className="costs-pct-label">{pct}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
