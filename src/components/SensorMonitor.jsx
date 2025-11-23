import React from 'react';

const SensorMonitor = ({ data }) => {
    return (
        <div className="card">
            <h3>Sensor Data</h3>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <h4 className="text-sm">Accelerometer (g)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-sm">X:</span>
                            <span style={{ fontFamily: 'monospace' }}>{data.accX.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-sm">Y:</span>
                            <span style={{ fontFamily: 'monospace' }}>{data.accY.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-sm">Z:</span>
                            <span style={{ fontFamily: 'monospace' }}>{data.accZ.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm">Gyroscope (deg/s)</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-sm">X:</span>
                            <span style={{ fontFamily: 'monospace' }}>{data.gyroX.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-sm">Y:</span>
                            <span style={{ fontFamily: 'monospace' }}>{data.gyroY.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="text-sm">Z:</span>
                            <span style={{ fontFamily: 'monospace' }}>{data.gyroZ.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-sm">Temperature</span>
                    <span>{data.temperature}°C</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-sm">Battery</span>
                    <span style={{ color: data.battery < 20 ? 'var(--danger-color)' : 'var(--success-color)' }}>{data.battery}%</span>
                </div>
            </div>
        </div>
    );
};

export default SensorMonitor;
