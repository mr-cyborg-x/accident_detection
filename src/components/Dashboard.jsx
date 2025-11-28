import React from 'react';
import { useNavigate } from 'react-router-dom';
import SensorMonitor from './SensorMonitor';
import AlertSystem from './AlertSystem';
import MapLocation from './MapLocation';
import { useHelmet } from '../context/HelmetContext';

const Dashboard = () => {
    const {
        data,
        status,
        contacts,
        smsLogs,
        autoOpenWhatsApp,
        setAutoOpenWhatsApp,
        handleSimulateCrash,
        handleReset
    } = useHelmet();

    const navigate = useNavigate();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1>Helmet Status Monitor</h1>
                    <p className="text-sm">Real-time telemetry and accident detection system</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: 'var(--bg-card)', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
                            <input
                                type="checkbox"
                                checked={autoOpenWhatsApp}
                                onChange={(e) => setAutoOpenWhatsApp(e.target.checked)}
                            />
                            Auto-open WhatsApp ⚠️
                        </label>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                            *Must allow popups. You need to click 'Send' in WhatsApp.
                        </span>
                    </div>
                    <button className="btn" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }} onClick={() => navigate('/settings')}>
                        Settings
                    </button>
                    <button className="btn btn-danger" onClick={handleSimulateCrash}>
                        ⚠️ Simulate Crash
                    </button>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <AlertSystem
                        status={status}
                        onReset={handleReset}
                        smsLogs={smsLogs}
                        contacts={contacts}
                        latitude={data.latitude}
                        longitude={data.longitude}
                    />
                    <SensorMonitor data={data} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <MapLocation latitude={data.latitude} longitude={data.longitude} />
                    <div className="card">
                        <h3>Quick Contacts</h3>
                        <p className="text-sm" style={{ marginBottom: '1rem' }}>Manage in Settings</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {contacts.slice(0, 3).map(contact => (
                                <div key={contact.id} style={{ padding: '0.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius)' }}>
                                    <div style={{ fontWeight: '500' }}>{contact.name}</div>
                                    <div className="text-sm">{contact.phone}</div>
                                </div>
                            ))}
                            {contacts.length > 3 && <div className="text-sm text-secondary">+{contacts.length - 3} more</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
