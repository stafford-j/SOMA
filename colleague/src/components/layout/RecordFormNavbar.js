/**
 * RecordFormNavbar Component
 * 
 * A specialized navigation bar for the record creation form in SOMA Colleague.
 * Maintains consistent branding with the main Navbar.
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { providerInfo } from '../dashboard/provider-sample-data';

const RecordFormNavbar = ({ patientId, patientName }) => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    if (patientId) {
      navigate(`/patient/${patientId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="colleague-header">
      <div className="header-left">
        <img
          src="https://static.wixstatic.com/media/afc39f_da0a94021ba6434399c2fbd4fd0ee013~mv2.png"
          alt="SOMA Logo"
          className="colleague-logo"
        />
        <div>
          <h1 className="colleague-title">SOMA Colleague</h1>
          <p className="provider-subtitle">{providerInfo.name}, {providerInfo.credentials} | {providerInfo.specialty}</p>
        </div>
      </div>
      
      <div className="header-actions">
        <button onClick={handleCancel} className="view-button">
          <i className="fas fa-times"></i> Cancel
        </button>
        <Link to="/" className="view-button" style={{ marginLeft: '8px' }}>
          <i className="fas fa-home"></i> Dashboard
        </Link>
      </div>
    </div>
  );
};

export default RecordFormNavbar;