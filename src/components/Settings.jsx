import React from 'react';
import { useHelmet } from '../context/HelmetContext';
import ContactsManager from './ContactsManager';

const Settings = () => {
    const {
        contacts,
        addContact,
        removeContact,
        autoOpenWhatsApp,
        setAutoOpenWhatsApp
    } = useHelmet();

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1>Settings</h1>
                <p className="text-sm">Configure your emergency preferences.</p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                        <h3>General Preferences</h3>
                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={autoOpenWhatsApp}
                                    onChange={(e) => setAutoOpenWhatsApp(e.target.checked)}
                                    style={{ width: '1.2rem', height: '1.2rem' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '500' }}>Auto-open WhatsApp</div>
                                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        Automatically open WhatsApp Web tabs when a crash is detected.
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <ContactsManager
                        contacts={contacts}
                        onAddContact={addContact}
                        onRemoveContact={removeContact}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
