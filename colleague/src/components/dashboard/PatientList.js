/**
 * PatientList Component
 * 
 * Displays a list of patients who have shared their records with the provider.
 * Each patient card includes basic information and a link to view their records.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { sharedPatients } from './provider-sample-data';

const PatientList = () => {
  return (
    <div className="patient-list-section">
      <div className="section-header">
        <h2 className="section-title">Patients with Shared Records</h2>
        <div className="patient-count">
          {sharedPatients.length} Active Patients
        </div>
      </div>
      
      <div className="patient-cards">
        {sharedPatients.map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="patient-avatar">
              {patient.avatarInitials}
            </div>
            <div className="patient-info">
              <h3 className="patient-name">{patient.name}</h3>
              <p className="patient-meta">
                Shared: {patient.lastRecordType} • Last Update: {new Date(patient.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="patient-meta">
                SOMA ID: {patient.somaId}
              </p>
            </div>
            <Link to={`/patient/${patient.id}`} className="view-button">
              View Records
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;