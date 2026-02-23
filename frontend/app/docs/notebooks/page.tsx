'use client';

export default function NotebooksPage() {
    const notebooks = [
        { name: 'EDA Starter Template', tags: ['EDA', 'CSV'], icon: 'science', runs: 1247, updated: '2d ago', desc: 'Standard exploratory data analysis starting point.' },
        { name: 'Churn Prediction Pipeline', tags: ['Classification', 'XGBoost'], icon: 'model_training', runs: 892, updated: '1w ago', desc: 'End-to-end churn prediction with feature engineering.' },
        { name: 'Time Series Forecasting', tags: ['Time Series', 'ARIMA'], icon: 'timeline', runs: 654, updated: '3d ago', desc: 'Forecasting template using ARIMA and Prophet.' },
        { name: 'SQL to Analysis', tags: ['SQL', 'EDA'], icon: 'storage', runs: 432, updated: '5d ago', desc: 'Connect SQL databases and run full EDA pipeline.' },
        { name: 'Image Data EDA', tags: ['Vision', 'PIL'], icon: 'image_search', runs: 123, updated: '2w ago', desc: 'Visual dataset exploration and quality checks.' },
        { name: 'NLP Text Analysis', tags: ['NLP', 'BERT'], icon: 'text_fields', runs: 89, updated: '1w ago', desc: 'Sentiment analysis, clustering, and topic modeling.' },
    ];

    return (
        <div className="nb-root">
            <header className="page-header">
                <div>
                    <h2 className="nb-page-title">Notebook Templates</h2>
                    <p className="nb-page-subtitle">Reusable AI analysis templates</p>
                </div>
                <button className="btn btn-primary glow-button">
                    <span className="material-symbols-outlined nb-btn-icon">add</span>Create Template
                </button>
            </header>
            <div className="nb-scroll">
                <div className="nb-inner">
                    <div className="nb-grid">
                        {notebooks.map(nb => (
                            <div key={nb.name} className="glass-panel nb-card" data-nb={nb.name}>
                                <div className="nb-card-top">
                                    <div className="nb-icon-box">
                                        <span className="material-symbols-outlined nb-icon-glyph">{nb.icon}</span>
                                    </div>
                                    <div className="nb-tags-wrap">
                                        {nb.tags.map(t => <span key={t} className="nb-tag">{t}</span>)}
                                    </div>
                                </div>
                                <h3 className="nb-name">{nb.name}</h3>
                                <p className="nb-desc">{nb.desc}</p>
                                <div className="nb-footer">
                                    <div className="nb-meta">
                                        <span className="nb-meta-item">
                                            <span className="material-symbols-outlined nb-meta-icon">play_circle</span>{nb.runs.toLocaleString()} runs
                                        </span>
                                        <span className="nb-meta-updated">Updated {nb.updated}</span>
                                    </div>
                                    <button className="nb-use-btn">Use</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
