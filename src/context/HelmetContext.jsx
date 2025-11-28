import React, { createContext, useState, useContext, useEffect } from 'react';
import { helmetService } from '../services/mockHelmetService';
import { sendSOS } from '../services/smsService';

const HelmetContext = createContext();

export const useHelmet = () => useContext(HelmetContext);

export const HelmetProvider = ({ children }) => {
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

                    // Stagger opens to try and avoid some popup blockers
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
        // Optional: clear logs on reset? maybe not for history purposes
        // setSmsLogs([]); 
    };

    const addContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    const removeContact = (id) => {
        setContacts(contacts.filter(c => c.id !== id));
    };

    const value = {
        data,
        status,
        contacts,
        smsLogs,
        autoOpenWhatsApp,
        setAutoOpenWhatsApp,
        handleSimulateCrash,
        handleReset,
        addContact,
        removeContact
    };

    return (
        <HelmetContext.Provider value={value}>
            {children}
        </HelmetContext.Provider>
    );
};
