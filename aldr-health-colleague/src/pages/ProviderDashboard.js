/**
 * ProviderDashboard Page
 * 
 * The main dashboard for healthcare providers, displaying a list of
 * patients who have shared their records and providing access to 
 * clinical interfaces and care plan management.
 * 
 * @author Aldr Health Team
 * @version 2.0.0
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