// Mock service to simulate sending SMS

export const sendSOS = async (contact, location) => {
    return new Promise((resolve) => {
        console.log(`[SMS Service] Sending SOS to ${contact.name} (${contact.phone})...`);
        setTimeout(() => {
            console.log(`[SMS Service] SOS sent to ${contact.name}: "Accident detected at Lat: ${location.latitude}, Lng: ${location.longitude}. Help needed!"`);
            resolve({ success: true, contactId: contact.id, timestamp: new Date() });
        }, 2000 + Math.random() * 1000); // Simulate 2-3s delay
    });
};
