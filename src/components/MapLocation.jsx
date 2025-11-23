import React from 'react';

const MapLocation = ({ latitude, longitude }) => {
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    const openMapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Live Location</h3>
                <a
                    href={openMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        color: 'var(--text-primary)'
                    }}
                >
                    Open in Google Maps ↗
                </a>
            </div>

            <div className="map-placeholder" style={{ position: 'relative', overflow: 'hidden', flex: 1, minHeight: '300px', borderRadius: 'var(--radius)' }}>
                <iframe
                    title="Google Maps Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={mapUrl}
                    style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                ></iframe>
            </div>

            <div className="text-sm" style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
            </div>
        </div>
    );
};

export default MapLocation;
