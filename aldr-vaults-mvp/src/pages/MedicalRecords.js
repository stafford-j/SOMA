import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UniformHeader from '../components/layout/UniformHeader';
import sampleRecords from '../data/sample-records';
import '../styles/Dashboard.css';

const MedicalRecords = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter for medical records only
  const medicalRecords = sampleRecords.filter(record => record.specialty === 'medical');

  // Format specialty name
  const formatSpecialtyName = (specialty) => {
    return specialty
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get specialty icon
  const getSpecialtyIcon = (specialty) => {
    const iconMap = {
      medical: 'fa-stethoscope',
      physiotherapy: 'fa-walking',
      chiropractic: 'fa-bone',
      massage: 'fa-hands',
      mental_health: 'fa-brain',
      nutrition: 'fa-apple-alt',
      alternative: 'fa-leaf',
      dentistry: 'fa-tooth',
      optometry: 'fa-eye',
      other: 'fa-notes-medical'
    };

    return iconMap[specialty] || 'fa-file-medical';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort records by date (newest first)
  const sortedRecords = [...medicalRecords].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="dashboard-container">
      <UniformHeader />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">Medical Records</h1>
              <p className="text-aldr-gray">
                All your medical records ({sortedRecords.length} total)
              </p>
            </div>
            <Link
              to="/"
              className="btn-secondary"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Dashboard
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecords.map(record => (
            <div key={record.id} className={`dashboard-card ${record.specialty}`}>
              <div className="card-header">
                <div className="card-icon">
                  <i className={`fas ${getSpecialtyIcon(record.specialty)}`}></i>
                </div>
                <h2 className="card-title">{record.title}</h2>
              </div>
              <div className="card-content">
                <p style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'rgba(32, 178, 170, 0.1)',
                  display: 'inline-block',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  marginBottom: '0.5rem'
                }}>
                  {formatSpecialtyName(record.specialty)}
                </p>
                <p>{formatDate(record.date)}</p>
                <p>{record.description ? 
                  (record.description.length > 100 
                    ? record.description.substring(0, 100) + '...' 
                    : record.description) 
                  : "No description available"}</p>
              </div>

              <Link to={`/record/${record.id}`} className="dashboard-button outline" style={{ marginTop: '1rem' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>

        {sortedRecords.length === 0 && (
          <div className="text-center py-8">
            <p className="text-aldr-gray">No medical records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;