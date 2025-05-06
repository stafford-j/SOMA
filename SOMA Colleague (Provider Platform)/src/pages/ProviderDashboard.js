/**
 * ProviderDashboard Page
 * 
 * The main dashboard for healthcare providers, displaying a list of
 * patients who have shared their records and providing access to 
 * clinical interfaces.
 * 
 * @author SOMA Colleague Team
 * @version 1.0.0
 */
import React from 'react';
import Navbar from '../components/layout/Navbar';
import PatientList from '../components/dashboard/PatientList';
import '../components/dashboard/Dashboard.css';

const ProviderDashboard = () => {
  return (
    <div className="colleague-container">
      <Navbar />
      <main>
        <PatientList />
      </main>
    </div>
  );
};

export default ProviderDashboard;