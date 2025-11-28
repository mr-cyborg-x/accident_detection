import React from 'react';
import { useHelmet } from '../context/HelmetContext';

const History = () => {
    const { smsLogs } = useHelmet();

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1>Alert History</h1>
                <p className="text-sm">Log of all emergency alerts sent.</p>
            </div>

            <div className="card">
                {smsLogs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No alerts recorded yet.
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '0.75rem' }}>Time</th>
                                    <th style={{ padding: '0.75rem' }}>Type</th>
                                    <th style={{ padding: '0.75rem' }}>Contact</th>
                                    <th style={{ padding: '0.75rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {smsLogs.map((log, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '0.75rem' }}>{new Date(log.timestamp).toLocaleTimeString()}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                backgroundColor: log.type === 'WhatsApp' ? 'rgba(37, 211, 102, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                color: log.type === 'WhatsApp' ? '#25D366' : '#3b82f6'
                                            }}>
                                                {log.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>{log.name}</td>
                                        <td style={{ padding: '0.75rem', color: 'var(--success-color)' }}>Sent</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
