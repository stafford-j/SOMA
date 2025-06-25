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
              <div className="patient-details">
                <p className="patient-meta">
                  <strong>Care Plan:</strong> {patient.carePlan || 'No active plan'}
                </p>
                <p className="patient-meta">
                  <strong>Records Shared:</strong> {patient.sharedRecordsCount} records
                </p>
                <p className="patient-meta">
                  <strong>Last Visit:</strong> {new Date(patient.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="patient-meta">
                  <strong>Aldr ID:</strong> {patient.aldrId}
                </p>
              </div>
            </div>
            <div className="patient-actions">
              <Link to={`/patient/${patient.id}`} className="view-button">
                View Records
              </Link>
              {patient.aldrId === "1742961914546" && (
                <Link to={`/patient/${patient.id}/care-plan`} className="view-button care-plan">
                  <i className="fas fa-clipboard-list"></i> Care Plan
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;