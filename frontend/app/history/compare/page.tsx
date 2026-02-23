export default function SessionComparisonPage() {
    const sessions = [
        { id: '0x8F2A91', query: 'Analyze Q3 sales trends', status: 'completed', model: 'claude-3-5-sonnet', duration: '4m 22s', tokens: '124,821', cost: '$0.87', accuracy: '94%' },
        { id: '0x7B1C44', query: 'Predict customer churn risk', status: 'completed', model: 'gpt-4o', duration: '6m 11s', tokens: '189,432', cost: '$1.24', accuracy: '91%' },
        { id: '0x3D9E22', query: 'Analyze server log anomalies', status: 'completed', model: 'claude-3-5-sonnet', duration: '3m 08s', tokens: '98,556', cost: '$0.61', accuracy: '97%' },
    ];

    const cols = ['Metric', ...sessions.map(s => s.id)];
    const rows = [
        ['Query', ...sessions.map(s => s.query)],
        ['Status', ...sessions.map(s => s.status)],
        ['Model', ...sessions.map(s => s.model)],
        ['Duration', ...sessions.map(s => s.duration)],
        ['Tokens Used', ...sessions.map(s => s.tokens)],
        ['Cost', ...sessions.map(s => s.cost)],
        ['Accuracy', ...sessions.map(s => s.accuracy)],
    ];

    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">Session Comparison</h2>
                    <p className="review-header-subtitle">Compare metrics across multiple sessions</p>
                </div>
                <button className="btn btn-ghost">
                    <span className="material-symbols-outlined agents-btn-icon">add</span>Add Session
                </button>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-1100">
                    <div className="glass-panel compare-table-wrap">
                        <table className="data-table compare-table">
                            <thead>
                                <tr>
                                    {cols.map((c, i) => (
                                        <th key={c} className={i === 0 ? 'compare-th-metric' : 'compare-th-val'}>{c}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(([metric, ...vals]) => (
                                    <tr key={metric as string}>
                                        <td className="compare-td-label">{metric}</td>
                                        {(vals as string[]).map((val, i) => (
                                            <td key={i} className={`compare-td-val ${metric === 'Accuracy' ? 'compare-td-val--accuracy' : metric === 'Cost' ? 'compare-td-val--cost' : ''} ${metric === 'Tokens Used' || metric === 'Duration' || metric === 'Model' ? 'compare-td-val--code' : ''}`}>
                                                {metric === 'Status' ? <span className="badge badge-completed">{val}</span> : val}
                                            </td>
                                        ))}
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
