/**
 * RecordCreationForm Page
 * 
 * Provides an interface for healthcare providers to create new
 * clinical records for patients with appropriate documentation fields.
 * 
 * @author SOMA Colleague Team
 * @version 1.0.0
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import RecordFormNavbar from '../components/layout/RecordFormNavbar';
import { sharedPatients } from '../components/dashboard/provider-sample-data';
import '../components/dashboard/Dashboard.css';

const RecordCreationForm = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  
  // Form state
  const [recordType, setRecordType] = useState('eye_exam');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [visualAcuityOD, setVisualAcuityOD] = useState('');
  const [visualAcuityOS, setVisualAcuityOS] = useState('');
  const [providerNotes, setProviderNotes] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  
  useEffect(() => {
    // Find patient from sample data
    const foundPatient = sharedPatients.find(p => p.id === patientId);
    setPatient(foundPatient);
    
    // Set default record title based on record type
    if (recordType === 'eye_exam') {
      setTitle('Comprehensive Eye Examination');
    } else if (recordType === 'contact_lens_exam') {
      setTitle('Contact Lens Evaluation');
    } else if (recordType === 'glasses_dispensing') {
      setTitle('Glasses Dispensing');
    }
  }, [patientId, recordType]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would send the data to an API
    // For the demo, we'll just navigate back to the patient view
    alert('Record created successfully (demo only)');
    
    // Navigate back to patient view
    navigate(`/patient/${patientId}`);
  };
  
  if (!patient) {
    return (
      <div className="colleague-container">
        <RecordFormNavbar />
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
      <RecordFormNavbar patientId={patientId} patientName={patient.name} />
      
      <div className="record-creation">
        <div className="section-header">
          <h2 className="section-title">Create New Record for {patient.name}</h2>
          <div className="patient-count">
            SOMA ID: {patient.somaId}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label" htmlFor="recordType">Record Type</label>
              <select
                id="recordType"
                className="form-select"
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                required
              >
                <option value="eye_exam">Eye Examination</option>
                <option value="contact_lens_exam">Contact Lens Evaluation</option>
                <option value="glasses_dispensing">Glasses Dispensing</option>
                <option value="follow_up">Follow-up Visit</option>
                <option value="medical_eye_care">Medical Eye Care</option>
              </select>
            </div>
            
            <div className="form-row">
              <label className="form-label" htmlFor="date">Visit Date</label>
              <input
                id="date"
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <label className="form-label" htmlFor="title">Record Title</label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-row">
            <label className="form-label" htmlFor="chiefComplaint">Chief Complaint / Purpose of Visit</label>
            <input
              id="chiefComplaint"
              type="text"
              className="form-input"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              required
            />
          </div>
          
          {/* Show visual acuity fields for eye exams */}
          {(recordType === 'eye_exam' || recordType === 'follow_up' || recordType === 'medical_eye_care') && (
            <div className="form-grid">
              <div className="form-row">
                <label className="form-label" htmlFor="visualAcuityOD">Visual Acuity OD (Right)</label>
                <input
                  id="visualAcuityOD"
                  type="text"
                  className="form-input"
                  value={visualAcuityOD}
                  onChange={(e) => setVisualAcuityOD(e.target.value)}
                  placeholder="e.g., 20/20"
                />
              </div>
              
              <div className="form-row">
                <label className="form-label" htmlFor="visualAcuityOS">Visual Acuity OS (Left)</label>
                <input
                  id="visualAcuityOS"
                  type="text"
                  className="form-input"
                  value={visualAcuityOS}
                  onChange={(e) => setVisualAcuityOS(e.target.value)}
                  placeholder="e.g., 20/20"
                />
              </div>
            </div>
          )}
          
          <div className="form-row">
            <label className="form-label" htmlFor="assessment">Assessment</label>
            <textarea
              id="assessment"
              className="form-input"
              style={{ minHeight: '80px' }}
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Clinical assessment and diagnosis"
            />
          </div>
          
          <div className="form-row">
            <label className="form-label" htmlFor="plan">Plan</label>
            <textarea
              id="plan"
              className="form-input"
              style={{ minHeight: '80px' }}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="Treatment plan and recommendations"
            />
          </div>
          
          <div className="form-grid">
            <div className="form-row">
              <label className="form-label" htmlFor="followUpDate">Follow-up Date</label>
              <input
                id="followUpDate"
                type="date"
                className="form-input"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <label className="form-label">Share Status</label>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--provider-purple-light)', borderRadius: '0.5rem' }}>
                <i className="fas fa-share-alt" style={{ color: 'var(--provider-purple)', marginRight: '0.5rem' }}></i>
                Record will be shared with patient automatically
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <label className="form-label" htmlFor="providerNotes">Clinical Notes</label>
            <textarea
              id="providerNotes"
              className="form-input"
              style={{ minHeight: '120px' }}
              value={providerNotes}
              onChange={(e) => setProviderNotes(e.target.value)}
              placeholder="Detailed clinical notes (not shared with patient)"
            />
          </div>
          
          <div className="record-actions" style={{ marginTop: '2rem' }}>
            <Link to={`/patient/${patientId}`} className="view-button">
              Cancel
            </Link>
            <button type="submit" className="primary-button">
              <i className="fas fa-save"></i> Create Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordCreationForm;