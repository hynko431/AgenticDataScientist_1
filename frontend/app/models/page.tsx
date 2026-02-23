import React from 'react';

export default function ModelsPage() {
    const models = [
        { id: 'M-1024', name: 'Optimized Random Forest', type: 'Classifier', status: 'active', drift: 'Low', accuracy: '88.4%', icon: 'forest', color: 'cyan' },
        { id: 'M-1025', name: 'XGBoost Baseline', type: 'Classifier', status: 'active', drift: 'Medium', accuracy: '91.2%', icon: 'bolt', color: 'indigo' },
        { id: 'M-1026', name: 'Sales Predictor v2', type: 'Regressor', status: 'idle', drift: 'N/A', accuracy: '86.5%', icon: 'trending_up', color: 'violet' },
        { id: 'M-1027', name: 'Customer Churn MLP', type: 'Deep Learning', status: 'active', drift: 'Low', accuracy: '89.7%', icon: 'psychology', color: 'emerald' },
        { id: 'M-1028', name: 'Fraud Detection', type: 'Anomaly', status: 'active', drift: 'High', accuracy: '94.1%', icon: 'security', color: 'red' },
    ];

    return (
        <div className="flex-col-full">
            <header className="page-header">
                <div>
                    <h2 className="review-header-title">Model Registry</h2>
                    <p className="review-header-subtitle">Manage and track your machine learning models</p>
                </div>
                <button className="btn btn-primary glow-button d-flex align-center">
                    <span className="material-symbols-outlined agents-btn-icon mr-8">add</span>Register Model
                </button>
            </header>
            <div className="scroll-body">
                <div className="inner-wrap-1100">
                    <div className="agents-grid">
                        {models.map(m => (
                            <div key={m.id} className="glass-panel agents-card">
                                <div className="align-start d-flex mb-16">
                                    <div className={`model-card-icon bg-${m.color}-dim clr-${m.color}`}>
                                        <span className="material-symbols-outlined">{m.icon}</span>
                                    </div>
                                    <div className="ml-16 flex-1">
                                        <div className="justify-between align-center d-flex">
                                            <span className="audit-time">{m.id}</span>
                                            <span className="model-badge" data-status={m.status}>{m.status}</span>
                                        </div>
                                        <h4 className="audit-user mt-4">{m.name}</h4>
                                        <p className="audit-action mb-0">{m.type}</p>
                                    </div>
                                </div>
                                <div className="justify-between align-center d-flex mt-16 p-0 border-top pt-12">
                                    <div className="flex-col">
                                        <span className="audit-time fs-11 uppercase">Accuracy</span>
                                        <span className={`fw-600 clr-${m.color}`}>{m.accuracy}</span>
                                    </div>
                                    <div className="flex-col txt-right">
                                        <span className="audit-time fs-11 uppercase">Drift</span>
                                        <span className={`fw-600 ${m.drift === 'High' ? 'clr-red' : m.drift === 'Medium' ? 'clr-amber' : 'clr-emerald'}`}>{m.drift}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
