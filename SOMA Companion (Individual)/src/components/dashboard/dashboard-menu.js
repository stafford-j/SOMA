/**
 * Dashboard Menu Component
 * 
 * This component adds a menu to the dashboard with links to the new Care Plan features.
 * It's meant to be included in the Dashboard component to provide navigation options.
 */
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <h3 className="menu-title">New Features</h3>
      <div className="menu-links">
        <Link to="/care-plan" className="menu-link">
          <i className="fas fa-clipboard-list"></i>
          <span>Care Plan (Patient View)</span>
        </Link>
        <Link to="/sync-demo" className="menu-link">
          <i className="fas fa-sync-alt"></i>
          <span>Care Plan Sync Demo</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardMenu;