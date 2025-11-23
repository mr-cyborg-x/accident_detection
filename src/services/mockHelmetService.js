// Mock service to simulate helmet sensor data

class MockHelmetService {
    constructor() {
        this.listeners = [];
        this.intervalId = null;
        this.status = 'NORMAL'; // NORMAL, WARNING, CRITICAL
        this.data = {
            accX: 0,
            accY: 0,
            accZ: 1, // 1g gravity
            gyroX: 0,
            gyroY: 0,
            gyroZ: 0,
            latitude: 12.9716,
            longitude: 77.5946,
            temperature: 28,
            temperature: 28,
            battery: 85,
        };
        this.useRealLocation = true;
        this.watchId = null;
    }

    startSimulation() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => {
            this.updateData();
            this.notifyListeners();
        }, 1000);
    }

    stopSimulation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    updateData() {
        if (this.status === 'CRITICAL') {
            // Simulate crash aftermath (stillness or chaotic movement)
            this.data.accX = (Math.random() - 0.5) * 0.1;
            this.data.accY = (Math.random() - 0.5) * 0.1;
            this.data.accZ = (Math.random() - 0.5) * 0.1;
        } else {
            // Normal riding vibration
            this.data.accX = (Math.random() - 0.5) * 0.2;
            this.data.accY = (Math.random() - 0.5) * 0.2;
            this.data.accZ = 1 + (Math.random() - 0.5) * 0.2;

            this.data.gyroZ = (Math.random() - 0.5) * 5;

            // Simulate slight movement ONLY if not using real location
            if (!this.useRealLocation) {
                this.data.latitude += (Math.random() - 0.5) * 0.0001;
                this.data.longitude += (Math.random() - 0.5) * 0.0001;
            }
        }
    }

    toggleRealLocation(enable) {
        this.useRealLocation = enable;
        if (enable) {
            if (navigator.geolocation) {
                this.watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        this.data.latitude = position.coords.latitude;
                        this.data.longitude = position.coords.longitude;
                        this.notifyListeners();
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        alert("Error getting location: " + error.message);
                        this.useRealLocation = false; // Revert if failed
                        this.notifyListeners();
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
                this.useRealLocation = false;
            }
        } else {
            if (this.watchId) {
                navigator.geolocation.clearWatch(this.watchId);
                this.watchId = null;
            }
        }
        this.notifyListeners();
    }

    triggerCrash() {
        this.status = 'CRITICAL';
        // Spike in acceleration
        this.data.accX = 5 + Math.random() * 10;
        this.data.accY = 5 + Math.random() * 10;
        this.data.accZ = 5 + Math.random() * 10;
        this.notifyListeners();

        // Reset to post-crash stillness after 1 second
        setTimeout(() => {
            this.updateData(); // Will use CRITICAL logic (stillness)
            this.notifyListeners();
        }, 1000);
    }

    resetStatus() {
        this.status = 'NORMAL';
        this.notifyListeners();
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback({ ...this.data, status: this.status }));
    }
}

export const helmetService = new MockHelmetService();
