/**
 * PatientRecordDetail Component
 * 
 * Displays detailed clinical information about a patient's health record.
 * Includes medical data, provider notes, and clinical assessment in a
 * provider-focused data view.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PatientRecordDetail = ({ patient, record }) => {
  const [clinicalNotes, setClinicalNotes] = useState(record?.providerNotes || '');
  
  if (!record || !patient) {
    return (
      <div className="record-view-section">
        <div className="section-header">
          <h2 className="section-title">Record Not Found</h2>
        </div>
        <p>The requested record could not be found or you don't have access to view it.</p>
      </div>
    );
  }
  
  // Format date in a readable way
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get record type icon
  const getRecordTypeIcon = () => {
    const iconMap = {
      eye_exam: 'fa-eye',
      contact_lens_exam: 'fa-eye-dropper',
      glasses_dispensing: 'fa-glasses',
      follow_up: 'fa-calendar-check',
      medical_eye_care: 'fa-stethoscope',
      pediatric_exam: 'fa-child'
    };
    
    return iconMap[record.recordType] || 'fa-file-medical';
  };
  
  // Format record type name
  const formatRecordType = (type) => {
    return type
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <div className="record-view-section">
      <div className="section-header">
        <h2 className="section-title">
          Patient Record: {patient.name}
        </h2>
      </div>
      
      <div className="record-header">
        <div className="record-icon">
          <i className={`fas ${getRecordTypeIcon()}`}></i>
        </div>
        <div>
          <h3 className="record-title">{record.title}</h3>
          <p className="record-meta">{formatDate(record.date)} • Data Mode: Clinical Records</p>
        </div>
      </div>
      
      <div className="record-content">
        {/* Medical Information Section */}
        <div className="data-section">
          <h4 className="data-section-title">Clinical Information</h4>
          
          {record.clinicalData && Object.entries(record.clinicalData).map(([key, value]) => {
            // Skip displaying complex nested objects directly
            if (typeof value === 'object' && value !== null) {
              return null;
            }
            
            // Format the label with proper capitalization and spacing
            const formattedLabel = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .replace(/([A-Z][a-z])/g, ' $1')
              .trim();
            
            return (
              <div key={key} className="data-row">
                <span className="data-label">{formattedLabel}</span>
                <span className="data-value">{value}</span>
              </div>
            );
          })}
          
          {/* Handle specific nested objects based on record type */}
          {record.recordType === 'eye_exam' && record.clinicalData.iop && (
            <div className="data-row">
              <span className="data-label">Intraocular Pressure</span>
              <span className="data-value">OD: {record.clinicalData.iop.right}, OS: {record.clinicalData.iop.left}</span>
            </div>
          )}
          
          {record.recordType === 'eye_exam' && record.clinicalData.refraction && (
            <div className="data-row">
              <span className="data-label">Refraction</span>
              <span className="data-value">
                OD: {record.clinicalData.refraction.right.sphere} / {record.clinicalData.refraction.right.cylinder} x {record.clinicalData.refraction.right.axis}
                <br />
                OS: {record.clinicalData.refraction.left.sphere} / {record.clinicalData.refraction.left.cylinder} x {record.clinicalData.refraction.left.axis}
              </span>
            </div>
          )}
        </div>
        
        {/* Prescription Information */}
        {record.prescription && (
          <div className="data-section">
            <h4 className="data-section-title">Prescription Details</h4>
            <div className="data-row">
              <span className="data-label">Type</span>
              <span className="data-value">{record.prescription.type}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Expiration Date</span>
              <span className="data-value">{formatDate(record.prescription.expirationDate)}</span>
            </div>
            <div className="data-row">
              <span className="data-label">Details</span>
              <span className="data-value" style={{ whiteSpace: 'pre-line' }}>
                {typeof record.prescription.details === 'string' 
                  ? record.prescription.details 
                  : JSON.stringify(record.prescription.details, null, 2)}
              </span>
            </div>
            {record.prescription.recommendations && (
              <div className="data-row">
                <span className="data-label">Recommendations</span>
                <span className="data-value">{record.prescription.recommendations}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Provider Information */}
        <div className="data-section">
          <h4 className="data-section-title">Provider Information</h4>
          <div className="data-row">
            <span className="data-label">Provider</span>
            <span className="data-value">{record.provider}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Location</span>
            <span className="data-value">{record.location}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Record Type</span>
            <span className="data-value">{formatRecordType(record.recordType)}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Next Visit</span>
            <span className="data-value">{record.nextVisitDate ? formatDate(record.nextVisitDate) : 'Not scheduled'}</span>
          </div>
        </div>
        
        {/* Clinical Notes Section - Editable by provider */}
        <div className="data-section">
          <h4 className="data-section-title">Clinical Notes</h4>
          <div className="provider-notes">
            <div className="provider-notes-title">
              <i className="fas fa-pen-to-square icon"></i>
              Provider Documentation
            </div>
            <textarea
              className="clinical-notes-textarea"
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Add clinical notes, assessment, and follow-up plan here..."
            />
          </div>
        </div>
        
        <div className="access-note">
          <i className="fas fa-info-circle"></i>
          <span>Note: Healthcare providers have access to data mode only. Patient has permitted provider access until {formatDate(record.shareExpiration)}.</span>
        </div>
        
        <div className="record-actions">
          <Link to={`/patient/${patient.id}`} className="view-button">
            <i className="fas fa-arrow-left"></i> Back to Patient Records
          </Link>
          <button className="primary-button">
            <i className="fas fa-save"></i> Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRecordDetail;