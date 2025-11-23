import React, { useState } from 'react';

const ContactsManager = ({ contacts, onAddContact, onRemoveContact }) => {
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Indian Phone Validation: +91 or 10 digits starting with 6-9
        const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

        if (newName && newPhone) {
            if (!phoneRegex.test(newPhone.replace(/\s/g, ''))) {
                alert('Please enter a valid Indian phone number (e.g., 9876543210 or +919876543210)');
                return;
            }
            onAddContact({ id: Date.now(), name: newName, phone: newPhone });
            setNewName('');
            setNewPhone('');
        }
    };

    return (
        <div className="card">
            <h3>Emergency Contacts</h3>
            <p className="text-sm" style={{ marginBottom: '1rem' }}>
                These contacts will receive an SMS with your location if an accident is detected.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    required
                />
                <button type="submit" className="btn btn-primary">Add</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {contacts.length === 0 ? (
                    <div className="text-sm" style={{ fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>No contacts added.</div>
                ) : (
                    contacts.map(contact => (
                        <div key={contact.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius)' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>{contact.name}</div>
                                <div className="text-sm">{contact.phone}</div>
                            </div>
                            <button
                                onClick={() => onRemoveContact(contact.id)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.25rem' }}
                                title="Remove contact"
                            >
                                &times;
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContactsManager;
