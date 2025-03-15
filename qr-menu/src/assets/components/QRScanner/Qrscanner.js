import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'; // Ensure this is installed properly
import { useNavigate } from 'react-router-dom';

function QRScanner({ onScan }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result?.text) {
      onScan(result.text);
      setTimeout(() => navigate('/'), 1000); // Delay navigation to avoid loop issues
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
        onResult={(result, error) => {
          if (result) handleScan(result);
          if (error) handleError(error);
        }}
        constraints={{ facingMode: 'environment' }} // Use back camera by default
        style={{ width: '100%' }}
      />
      {error && <p className="error">{error}</p>}
      <button className="back-btn" onClick={() => navigate('/')}>
        Back to Menu
      </button>
    </div>
  );
}

export default QRScanner;
