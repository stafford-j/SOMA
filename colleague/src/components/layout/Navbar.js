/**
 * Provider Navbar Component
 * 
 * The main navigation bar for the SOMA Colleague provider dashboard.
 * Displays the provider information and provides navigation options.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { providerInfo } from '../dashboard/provider-sample-data';

const Navbar = () => {
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
        <Link to="/" className="view-button">
          <i className="fas fa-home"></i> Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Navbar;