import React from 'react';

export default function ModelComparisonPage() {
    const metrics = ['Accuracy', 'F1 Score', 'Precision', 'Recall', 'AUC-ROC', 'Training Time'];
    const models = [
        { name: 'Random Forest', color: 'cyan', vals: [88.4, 87.2, 89.1, 85.4, 92.3, '1m 12s'] },
        { name: 'XGBoost', color: 'indigo', vals: [91.2, 90.8, 92.1, 89.6, 94.7, '3m 45s'] },
        { name: 'Neural Net (MLP)', color: 'violet', vals: [89.7, 88.5, 90.2, 87.1, 93.1, '8m 22s'] },
        { name: 'Logistic Reg.', color: 'amber', vals: [83.1, 81.9, 84.2, 79.7, 87.4, '12s'] },
        { name: 'LightGBM', color: 'emerald', vals: [92.8, 92.1, 93.4, 90.9, 95.6, '2m 31s'] },
    ];

    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">Model Comparison</h2>
                    <p className="review-header-subtitle">Compare performance across all trained models</p>
                </div>
                <button className="btn btn-primary glow-button d-flex align-center">
                    <span className="material-symbols-outlined agents-btn-icon mr-8">download</span>Export Report
                </button>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-1100">
                    <div className="glass-card-indigo compare-highlight d-flex align-center">
                        <div className="compare-icon-box bg-emerald-dim clr-emerald">
                            <span className="material-symbols-outlined">emoji_events</span>
                        </div>
                        <div className="ml-16">
                            <p className="wizard-section-label">Best Performing Model</p>
                            <h3 className="audit-user">LightGBM — 92.8% Accuracy, 95.6% AUC-ROC</h3>
                        </div>
                    </div>

                    <div className="glass-panel audit-table-wrap">
                        <div className="pipe-scroll">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        {metrics.map(m => <th key={m} className="txt-center">{m}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {models.map(model => (
                                        <tr key={model.name}>
                                            <td>
                                                <div className="notif-row p-0 border-none d-flex align-center">
                                                    <div className={`compare-dot bg-${model.color}`} />
                                                    <span className={`fw-600 ml-10 ${model.name === 'LightGBM' ? `clr-${model.color}` : 'text-white'}`}>{model.name} {model.name === 'LightGBM' && '🏆'}</span>
                                                </div>
                                            </td>
                                            {model.vals.map((v, i) => (
                                                <td key={i} className="txt-center">
                                                    {typeof v === 'number' ? (
                                                        <div className="compare-metric-row">
                                                            <span className={`fs-13 fw-600 ${v >= 92 ? 'clr-emerald' : v >= 88 ? 'clr-amber' : 'clr-muted'}`}>{v}%</span>
                                                            <div className="compare-metric-bar-bg">
                                                                <div className={`compare-metric-bar-fill bg-${model.color}`} data-pct={v} />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="audit-ip">{v}</span>
                                                    )}
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
        </div>
    );
}
