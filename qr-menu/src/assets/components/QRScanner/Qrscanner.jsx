// File: components/QRScanner.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

function QRScanner({ onScan }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      onScan(data);
      navigate('/');
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error scanning QR code');
  };

  return (
    <div className="qr-scanner">
      <h2>Scan Restaurant QR Code</h2>
      <QrReader
        delay={300}
        onResult={(result) => {
          if (result) {
            handleScan(result.text);
          }
        }}
        onError={handleError}
        style={{ width: '100%' }}
      />
      {error && <p className="error">{error}</p>}
      <button className="back-btn" onClick={() => navigate('/')}>
        Back to Menu
      </button>
    </div>
  );
}