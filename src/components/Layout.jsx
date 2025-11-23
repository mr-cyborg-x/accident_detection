import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <aside className="sidebar">
                <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-color)' }}>Smart Helmet</h2>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button className="btn" style={{ justifyContent: 'flex-start', textAlign: 'left', backgroundColor: 'var(--bg-card)' }}>
                        Dashboard
                    </button>
                    <button className="btn" style={{ justifyContent: 'flex-start', textAlign: 'left', color: 'var(--text-secondary)' }}>
                        History
                    </button>
                    <button className="btn" style={{ justifyContent: 'flex-start', textAlign: 'left', color: 'var(--text-secondary)' }}>
                        Settings
                    </button>
                </nav>
                <div style={{ marginTop: 'auto' }}>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="text-sm">Connected Device</div>
                        <div style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>Helmet-X1</div>
                    </div>
                </div>
            </aside>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <header className="header">
                    <h3>Dashboard</h3>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span className="text-sm">User: Victor</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }}></div>
                    </div>
                </header>
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
