/**
 * PatientRecordView Page
 * 
 * Displays all records shared by a specific patient, with the ability
 * to view detailed clinical information and add provider documentation.
 * 
 * @author SOMA Colleague Team
 * @version 1.0.0
 */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import PatientRecordDetail from '../components/dashboard/PatientRecordDetail';
import { sharedPatients, patientRecords } from '../components/dashboard/provider-sample-data';
import '../components/dashboard/Dashboard.css';

const PatientRecordView = () => {
  const { patientId, recordId } = useParams();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  useEffect(() => {
    // Find patient from sample data
    const foundPatient = sharedPatients.find(p => p.id === patientId);
    setPatient(foundPatient);
    
    // Get patient's records
    if (foundPatient) {
      const patientRecordList = patientRecords[patientId] || [];
      setRecords(patientRecordList);
      
      // If recordId is provided, find that specific record
      if (recordId) {
        const foundRecord = patientRecordList.find(r => r.id === recordId);
        setSelectedRecord(foundRecord);
      } else if (patientRecordList.length > 0) {
        // Otherwise, default to the most recent record
        setSelectedRecord(patientRecordList[0]);
      }
    }
  }, [patientId, recordId]);
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  if (!patient) {
    return (
      <div className="colleague-container">
        <Navbar />
        <div className="record-view-section">
          <div className="section-header">
            <h2 className="section-title">Patient Not Found</h2>
          </div>
          <p>The requested patient could not be found or you don't have access.</p>
          <Link to="/" className="view-button">Return to Dashboard</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="colleague-container">
      <Navbar />
      
      <div className="patient-list-section">
        <div className="section-header">
          <h2 className="section-title">Patient: {patient.name}</h2>
          <div className="patient-count">
            SOMA ID: {patient.somaId}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div className="patient-avatar" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
            {patient.avatarInitials}
          </div>
          <div>
            <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500' }}>Date of Birth: {formatDate(patient.dateOfBirth)}</p>
            <p style={{ margin: '0 0 0.25rem 0' }}>Last Visit: {formatDate(patient.lastVisit)}</p>
            {patient.nextAppointment && (
              <p style={{ margin: '0', color: 'var(--provider-purple)' }}>
                <i className="fas fa-calendar-check" style={{ marginRight: '0.5rem' }}></i>
                Next Appointment: {formatDate(patient.nextAppointment)}
              </p>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', marginTop: '1.5rem' }}>
          <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '600' }}>Shared Health Records</h3>
          <Link to={`/patient/${patientId}/new-record`} className="primary-button">
            <i className="fas fa-plus"></i> Add New Record
          </Link>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {records.map(record => (
            <div 
              key={record.id}
              className="data-section"
              style={{ 
                padding: '0.75rem', 
                cursor: 'pointer',
                backgroundColor: selectedRecord?.id === record.id ? 'var(--provider-purple-light)' : 'white',
                borderColor: selectedRecord?.id === record.id ? 'var(--provider-purple)' : '#ddd'
              }}
              onClick={() => setSelectedRecord(record)}
            >
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: '600' }}>{record.title}</h4>
              <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--gray-text)' }}>{formatDate(record.date)}</p>
            </div>
          ))}
        </div>
      </div>
      
      {selectedRecord && (
        <PatientRecordDetail 
          patient={patient}
          record={selectedRecord}
        />
      )}
      
      <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-text)', marginTop: '2rem' }}>
        <p>SOMA Colleague Clinical Version 1.0 - Provider Access Only</p>
      </div>
    </div>
  );
};

export default PatientRecordView;