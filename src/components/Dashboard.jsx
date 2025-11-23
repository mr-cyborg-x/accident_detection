import React, { useEffect, useState } from 'react';
import SensorMonitor from './SensorMonitor';
import AlertSystem from './AlertSystem';
import MapLocation from './MapLocation';
import ContactsManager from './ContactsManager';
import { helmetService } from '../services/mockHelmetService';
import { sendSOS } from '../services/smsService';

const Dashboard = () => {
    const [data, setData] = useState(helmetService.data);
    const [status, setStatus] = useState(helmetService.status);
    const [contacts, setContacts] = useState([
        { id: 1, name: 'Mom', phone: '9876543210' },
        { id: 2, name: 'Emergency', phone: '108' }
    ]);
    const [smsLogs, setSmsLogs] = useState([]);
    const [autoOpenWhatsApp, setAutoOpenWhatsApp] = useState(true);

    useEffect(() => {
        helmetService.startSimulation();
        // Force enable real location tracking on mount
        helmetService.toggleRealLocation(true);

        const unsubscribe = helmetService.subscribe((newData) => {
            setData({ ...newData });
            setStatus(newData.status);
        });

        return () => {
            helmetService.stopSimulation();
            unsubscribe();
        };
    }, []);

    // Effect to trigger SOS when status becomes CRITICAL
    useEffect(() => {
        let intervalId;
        if (status === 'CRITICAL') {
            // Auto-open WhatsApp logic
            if (autoOpenWhatsApp) {
                contacts.forEach((contact, index) => {
                    const googleMapsLink = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;
                    const messageBody = `SOS! Accident detected! Help needed at: ${googleMapsLink}`;
                    const waLink = `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(messageBody)}`;

                    // Stagger opens to try and avoid some popup blockers, though likely still blocked
                    setTimeout(() => {
                        window.open(waLink, '_blank');
                    }, index * 1000 + 500);
                });
            }

            // Initial delay before starting the "bombing"
            const startDelay = setTimeout(() => {
                // Function to send batch of SMS and WhatsApp
                const sendBatch = () => {
                    if (contacts.length === 0) return;

                    contacts.forEach(contact => {
                        // Simulate SMS
                        sendSOS(contact, { latitude: data.latitude, longitude: data.longitude })
                            .then(result => {
                                setSmsLogs(prev => [{ type: 'SMS', name: contact.name, timestamp: result.timestamp }, ...prev]);
                            });

                        // Simulate WhatsApp (immediate success for simulation)
                        setTimeout(() => {
                            setSmsLogs(prev => [{ type: 'WhatsApp', name: contact.name, timestamp: new Date() }, ...prev]);
                        }, 500); // Slight delay after SMS
                    });
                };

                // Send first batch immediately after delay
                sendBatch();

                // Repeat every 5 seconds (Continuous Alert / "Bombing")
                intervalId = setInterval(sendBatch, 5000);
            }, 3000); // Wait 3 seconds before starting

            return () => {
                clearTimeout(startDelay);
                if (intervalId) clearInterval(intervalId);
            };
        }
    }, [status, contacts, data.latitude, data.longitude, autoOpenWhatsApp]);

    const handleSimulateCrash = () => {
        helmetService.triggerCrash();
    };

    const handleReset = () => {
        helmetService.resetStatus();
        setSmsLogs([]);
    };

    const handleAddContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    const handleRemoveContact = (id) => {
        setContacts(contacts.filter(c => c.id !== id));
    };

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
                    <button className="btn" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }} onClick={() => console.log('Settings clicked')}>
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
                    <ContactsManager contacts={contacts} onAddContact={handleAddContact} onRemoveContact={handleRemoveContact} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
