export default function BillingPage() {
    return (
        <div className="bill-root">
            <header className="page-header">
                <div>
                    <h2 className="bill-page-title">Billing</h2>
                    <p className="bill-page-subtitle">Subscription, usage, and payment methods</p>
                </div>
            </header>
            <div className="bill-scroll">
                <div className="bill-inner">
                    {/* Current Plan */}
                    <div className="glass-card-indigo bill-plan-card">
                        <div className="bill-plan-top">
                            <div>
                                <div className="bill-plan-header">
                                    <span className="material-symbols-outlined bill-plan-icon">workspace_premium</span>
                                    <h3 className="bill-plan-name">Pro Plan</h3>
                                    <span className="bill-plan-badge">Current</span>
                                </div>
                                <p className="bill-plan-price">$99 / month · Billed annually</p>
                            </div>
                            <button className="btn btn-ghost bill-upgrade-btn">Upgrade to Enterprise</button>
                        </div>
                        <div className="bill-usage-grid">
                            {[
                                { label: 'Sessions / mo', used: '248', limit: '500' },
                                { label: 'Team Members', used: '5', limit: '10' },
                                { label: 'Storage', used: '42 GB', limit: '100 GB' },
                                { label: 'API Calls / hr', used: '48', limit: '200' },
                            ].map(u => (
                                <div key={u.label}>
                                    <p className="bill-usage-label">{u.label}</p>
                                    <p className="bill-usage-value">{u.used} <span className="bill-usage-limit">/ {u.limit}</span></p>
                                    <div className="bill-usage-track">
                                        <div className="bill-usage-fill" data-pct={Math.round((parseInt(u.used) / parseInt(u.limit)) * 100) || 42} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Invoice History */}
                    <div className="glass-panel bill-invoices-wrap">
                        <div className="bill-invoices-header">
                            <h3 className="bill-invoices-title">Invoice History</h3>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Invoice</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th className="bill-th-right">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['INV-2024-011', 'Nov 1, 2024', '$99.00', 'paid'],
                                    ['INV-2024-010', 'Oct 1, 2024', '$99.00', 'paid'],
                                    ['INV-2024-009', 'Sep 1, 2024', '$99.00', 'paid'],
                                    ['INV-2024-008', 'Aug 1, 2024', '$79.00', 'paid'],
                                ].map(([id, date, amount, status]) => (
                                    <tr key={id as string}>
                                        <td className="bill-inv-id">{id}</td>
                                        <td className="bill-inv-date">{date}</td>
                                        <td className="bill-inv-amount">{amount}</td>
                                        <td><span className="badge badge-completed">{status}</span></td>
                                        <td className="bill-inv-actions">
                                            <button className="bill-download-btn"><span className="material-symbols-outlined bill-download-icon">download</span></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
