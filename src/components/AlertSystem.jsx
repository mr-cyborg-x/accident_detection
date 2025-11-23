import React from 'react';

const AlertSystem = ({ status, onReset, smsLogs = [], contacts = [], latitude = 12.9716, longitude = 77.5946 }) => {
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const messageBody = `SOS! Accident detected! Help needed at: ${googleMapsLink}`;

  return (
    <div className="card" style={{ borderColor: status === 'CRITICAL' ? 'var(--danger-color)' : 'var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>System Status</h3>
        <span className={`alert-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      {status === 'CRITICAL' && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          padding: '1rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--danger-color)',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem' }}>ACCIDENT DETECTED!</h2>
          <p className="text-sm">Simulating automatic alerts...</p>
          <p className="text-xs" style={{ opacity: 0.8, marginTop: '0.5rem' }}>To send a <strong>REAL</strong> message, click the buttons below:</p>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a
              href={`sms:?body=${encodeURIComponent(messageBody)}`}
              className="btn"
              style={{ backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              📩 Send Real SMS
            </a>

            {contacts.map(contact => (
              <a
                key={contact.id}
                href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(messageBody)}`}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ backgroundColor: '#25D366', color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}
              >
                💬 {contact.name}
              </a>
            ))}
          </div>

          <button className="btn btn-primary" onClick={onReset} style={{ marginTop: '1rem', width: '100%' }}>
            I AM OK (CANCEL ALERT)
          </button>
        </div>
      )}

      <div>
        <h4 className="text-sm" style={{ marginBottom: '0.5rem' }}>Recent Logs (Simulation)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
          {smsLogs.map((log, index) => (
            <div key={index} style={{
              padding: '0.5rem',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              fontSize: '0.8rem',
              borderLeft: `3px solid ${log.type === 'WhatsApp' ? '#25D366' : 'var(--accent-color)'}`
            }}>
              {new Date(log.timestamp).toLocaleTimeString()} - <strong>[SIMULATED]</strong> {log.type || 'SMS'} sent to {log.name}
            </div>
          ))}
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius)', fontSize: '0.8rem', borderLeft: '3px solid var(--success-color)' }}>
            {new Date(Date.now() - 60000).toLocaleTimeString()} - System Connected
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;
