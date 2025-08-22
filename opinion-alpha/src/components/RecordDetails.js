import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { sarahHealthRecords } from '../data/sarahChenData';
import '../styles/Dashboard.css';

const RecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Data Mode vs Opinion Mode state management
  const [isOpinionMode, setIsOpinionMode] = useState(false);
  
  // Set initial mode based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'opinion') {
      setIsOpinionMode(true);
    } else {
      setIsOpinionMode(false);
    }
  }, [location]);
  
  // Perspective selection state management (all start unchecked)
  const [selectedPerspectives, setSelectedPerspectives] = useState({
    medical: false,
    holistic: false,
    mental_health: false,
    nutritional: false,
    physical_therapy: false
  });
  
  // Sources modal state
  const [showSources, setShowSources] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Toggle functions
  const setDataMode = () => {
    if (isOpinionMode) {
      console.log('Switching to Data Mode');
      setIsOpinionMode(false);
    }
  };

  const setOpinionMode = () => {
    if (!isOpinionMode) {
      console.log('Switching to Opinion Mode');
      setIsOpinionMode(true);
    }
  };

  // Handle perspective checkbox changes
  const togglePerspective = (perspectiveType) => {
    setSelectedPerspectives(prev => ({
      ...prev,
      [perspectiveType]: !prev[perspectiveType]
    }));
  };

  // Handle sources modal toggle
  const toggleSources = (perspectiveType) => {
    setShowSources(prev => ({
      ...prev,
      [perspectiveType]: !prev[perspectiveType]
    }));
  };
  
  // Find the record by ID
  const record = sarahHealthRecords.find(r => r.id === id) || {
    id: id,
    title: `Health Record (ID: ${id})`,
    specialty: 'medical',
    recordType: 'consultation',
    date: '2025-06-10',
    description: 'This record could not be found in the database.',
    provider: 'Unknown Provider',
    location: 'Unknown Location'
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSpecialtyName = (specialty) => {
    return specialty
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatRecordType = (type) => {
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getSpecialtyColor = (specialty) => {
    const colorMap = {
      medical: 'bg-blue-100 text-blue-800',
      mental_health: 'bg-purple-100 text-purple-800',
      laboratory: 'bg-green-100 text-green-800'
    };
    
    return colorMap[specialty] || 'bg-gray-100 text-gray-800';
  };

  const getSpecialtyIcon = (specialty) => {
    const iconMap = {
      medical: 'fa-stethoscope',
      mental_health: 'fa-brain',
      laboratory: 'fa-vial'
    };

    return iconMap[specialty] || 'fa-file-medical';
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: '#ffffff' }}>
      {/* Clean Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
        marginBottom: '2rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e5e5'
      }}>
        {/* Left - Back Button */}
        <button 
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#0B7EC8',
            border: '1px solid #0B7EC8',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minHeight: '44px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0B7EC8';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#0B7EC8';
          }}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Health Records
        </button>

        {/* Center - Record Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: '#0B7EC8',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem',
              fontSize: '1.2rem'
            }}>
              <i className={`fas ${getSpecialtyIcon(record.specialty)}`}></i>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '600', 
                color: '#333', 
                margin: '0' 
              }}>
                {record.title}
              </h1>
              <div style={{ 
                fontSize: '1rem', 
                color: '#666', 
                marginTop: '0.25rem' 
              }}>
                {formatRecordType(record.recordType)} • {formatDate(record.date)}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Mode Info */}
        <div style={{ 
          fontSize: '0.9rem', 
          color: '#666',
          textAlign: 'right'
        }}>
          Data/Opinion Mode Available
        </div>
      </header>

      <div className="w-full animate-fade-in">
        <div className="w-full px-8 py-8">

          {/* Provider and Location Info */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666', margin: '0 0 0.5rem 0' }}>
                  Healthcare Provider
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#333', margin: '0' }}>
                  {record.provider}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666', margin: '0 0 0.5rem 0' }}>
                  Location
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#333', margin: '0' }}>
                  {record.location}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666', margin: '0 0 0.5rem 0' }}>
                  Date
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#333', margin: '0' }}>
                  {formatDate(record.date)}
                </p>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
              View Mode
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              color: isOpinionMode ? '#6366F1' : '#0B7EC8', 
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5'
            }}>
              {isOpinionMode 
                ? 'Currently in Opinion Mode – exploring AI-generated opinions and personalized recommendations from multiple healthcare perspectives.'
                : 'Currently in Data Mode – displaying verified medical records and clinical findings.'
              }
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={setDataMode}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: !isOpinionMode ? '#0B7EC8' : 'transparent',
                  color: !isOpinionMode ? 'white' : '#0B7EC8',
                  border: '1px solid #0B7EC8',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '44px'
                }}
              >
                <i className="fas fa-database"></i>
                Data Mode
              </button>
              <button 
                onClick={setOpinionMode}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isOpinionMode ? '#6366F1' : 'transparent',
                  color: isOpinionMode ? 'white' : '#6366F1',
                  border: '1px solid #6366F1',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '44px'
                }}
              >
                <i className="fas fa-brain"></i>
                Opinion Mode
              </button>
            </div>
          </div>

          {/* Opinion Mode Knowledge Sources */}
          {isOpinionMode && (
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                Opinion Mode Knowledge Sources
              </h2>
              <p style={{ fontSize: '1rem', color: '#666', margin: '0 0 1.5rem 0', lineHeight: '1.5' }}>
                Choose which medical perspectives you'd like to see AI opinions from. You control your knowledge sources.
              </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
            {[
              { key: 'medical', label: 'Medical', icon: 'fa-stethoscope', color: '#dc2626' },
              { key: 'holistic', label: 'Holistic', icon: 'fa-leaf', color: '#16a34a' },
              { key: 'mental_health', label: 'Mental Health', icon: 'fa-brain', color: '#7c3aed' },
              { key: 'nutritional', label: 'Nutritional', icon: 'fa-apple-alt', color: '#ea580c' },
              { key: 'physical_therapy', label: 'Physical Therapy', icon: 'fa-dumbbell', color: '#0891b2' }
            ].map(perspective => (
              <div key={perspective.key} style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1rem',
                border: selectedPerspectives[perspective.key] ? `2px solid ${perspective.color}` : '2px solid #e5e5e5',
                borderRadius: '12px',
                backgroundColor: selectedPerspectives[perspective.key] ? `${perspective.color}08` : '#ffffff',
                minHeight: '110px',
                transition: 'all 0.3s ease',
                boxShadow: selectedPerspectives[perspective.key] ? `0 4px 12px ${perspective.color}20` : '0 2px 4px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                // Only toggle if clicking on the card itself, not on input or button
                if (e.target === e.currentTarget) {
                  togglePerspective(perspective.key);
                }
              }}
              onMouseEnter={(e) => {
                if (!selectedPerspectives[perspective.key]) {
                  e.currentTarget.style.borderColor = perspective.color;
                  e.currentTarget.style.boxShadow = `0 4px 12px ${perspective.color}15`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedPerspectives[perspective.key]) {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
              >
                {/* Top section with checkbox, icon, and label */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}
                     onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedPerspectives[perspective.key]}
                    onChange={() => togglePerspective(perspective.key)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginRight: '0.5rem',
                      cursor: 'pointer',
                      accentColor: perspective.color,
                      flexShrink: 0
                    }}
                  />
                  <i className={`fas ${perspective.icon}`} style={{ 
                    color: perspective.color,
                    marginRight: '0.5rem', 
                    fontSize: '1.1rem',
                    flexShrink: 0
                  }}></i>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '600', 
                    color: selectedPerspectives[perspective.key] ? perspective.color : '#333', 
                    lineHeight: '1.2',
                    transition: 'color 0.3s ease'
                  }}>
                    {perspective.label}
                  </span>
                </div>
                
                {/* Sources button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSources(perspective.key);
                  }}
                  style={{
                    fontSize: '0.7rem',
                    color: perspective.color,
                    padding: '0.4rem 0.6rem',
                    border: `1px solid ${perspective.color}`,
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = perspective.color;
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = perspective.color;
                  }}
                >
                  Sources
                </button>
              </div>
            ))}
          </div>
          
          {/* Sources Modal/Dropdown */}
          {Object.entries(showSources).map(([perspectiveType, isVisible]) => 
            isVisible && (
              <div key={perspectiveType} style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                border: '1px solid #e5e5e5',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#333', textTransform: 'capitalize' }}>
                    {perspectiveType.replace('_', ' ')} Sources
                  </h4>
                  <button 
                    onClick={() => toggleSources(perspectiveType)}
                    style={{
                      color: '#666',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '0.25rem'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#333'}
                    onMouseLeave={(e) => e.target.style.color = '#666'}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#555' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>Research Sources:</p>
                  <ul style={{ margin: '0', padding: '0', listStyle: 'none', fontSize: '0.8rem' }}>
                    {perspectiveType === 'medical' && (
                      <>
                        <li style={{ marginBottom: '0.25rem' }}>• Mayo Clinic Proceedings, 2023 – Clinical Guidelines</li>
                        <li style={{ marginBottom: '0.25rem' }}>• New England Journal of Medicine, 2024</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Canadian Medical Association Guidelines</li>
                      </>
                    )}
                    {perspectiveType === 'holistic' && (
                      <>
                        <li style={{ marginBottom: '0.25rem' }}>• Integrative Medicine Research, 2023</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Journal of Alternative Medicine, 2024</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Harvard Mind-Body Medicine Updates</li>
                      </>
                    )}
                    {perspectiveType === 'mental_health' && (
                      <>
                        <li style={{ marginBottom: '0.25rem' }}>• Journal of Pain Psychology, 2023</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Canadian Psychological Association Guidelines</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Mental Health Commission of Canada</li>
                      </>
                    )}
                    {perspectiveType === 'nutritional' && (
                      <>
                        <li style={{ marginBottom: '0.25rem' }}>• Dietitians of Canada Guidelines, 2024</li>
                        <li style={{ marginBottom: '0.25rem' }}>• American Journal of Clinical Nutrition</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Diabetes Canada Nutrition Standards</li>
                      </>
                    )}
                    {perspectiveType === 'physical_therapy' && (
                      <>
                        <li style={{ marginBottom: '0.25rem' }}>• Canadian Physiotherapy Association, 2024</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Journal of Physical Therapy Science</li>
                        <li style={{ marginBottom: '0.25rem' }}>• Sports Medicine Research Guidelines</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )
            )}
          </div>
          )}

          {/* Main Content */}
        {!isOpinionMode ? (
          // DATA MODE - Show factual record information
          <>
            {/* Basic Information */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                Basic Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666', margin: '0 0 0.5rem 0' }}>Date</h3>
                  <p style={{ fontSize: '1.1rem', color: '#333', margin: '0' }}>{formatDate(record.date)}</p>
                </div>
                {record.provider && (
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666', margin: '0 0 0.5rem 0' }}>Healthcare Provider</h3>
                    <p style={{ fontSize: '1.1rem', color: '#333', margin: '0' }}>{record.provider}</p>
                  </div>
                )}
                {record.location && (
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666', margin: '0 0 0.5rem 0' }}>Location</h3>
                    <p style={{ fontSize: '1.1rem', color: '#333', margin: '0' }}>{record.location}</p>
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666', margin: '0 0 0.5rem 0' }}>Record Type</h3>
                  <p style={{ fontSize: '1.1rem', color: '#333', margin: '0' }}>{formatRecordType(record.recordType)}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {record.description && (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                  Clinical Summary
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#555', margin: '0', lineHeight: '1.6' }}>
                  {record.description}
                </p>
              </div>
            )}

            {/* Findings */}
            {record.findings && record.findings.length > 0 && (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                  Findings
                </h2>
                <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
                  {record.findings.map((finding, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      marginBottom: index < record.findings.length - 1 ? '0.5rem' : '0'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#0B7EC8',
                        marginTop: '0.5rem',
                        marginRight: '0.75rem',
                        flexShrink: '0'
                      }}></div>
                      <span style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Treatments */}
            {record.treatments && record.treatments.length > 0 && (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                  Treatments & Recommendations
                </h2>
                <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
                  {record.treatments.map((treatment, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      marginBottom: index < record.treatments.length - 1 ? '0.5rem' : '0'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#6366F1',
                        marginTop: '0.5rem',
                        marginRight: '0.75rem',
                        flexShrink: '0'
                      }}></div>
                      <span style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results */}
            {record.results && (
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                  Results
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {Object.entries(record.results).map(([key, value]) => (
                    <div key={key} style={{
                      backgroundColor: '#f9f9f9',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5'
                    }}>
                      <h3 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        color: '#666', 
                        margin: '0 0 0.25rem 0' 
                      }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </h3>
                      <p style={{ 
                        fontSize: '1.1rem', 
                        color: '#333', 
                        fontWeight: '500', 
                        margin: '0' 
                      }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          // OPINION MODE - Show AI Insights and Multi-Perspective Analysis
          record.insights && Object.keys(record.insights).length > 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                <i className="fas fa-brain" style={{ marginRight: '0.5rem', color: '#6366F1' }}></i>
                Multi-Perspective Analysis
              </h2>
              <p style={{ fontSize: '1rem', color: '#666', margin: '0 0 1.5rem 0', lineHeight: '1.6' }}>
                Based on your health record from {formatDate(record.date)}, here are insights from multiple healthcare perspectives:
              </p>
              
              {Object.keys(selectedPerspectives).filter(key => selectedPerspectives[key]).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <i className="fas fa-brain" style={{ fontSize: '2.5rem', color: '#ccc', marginBottom: '1rem', display: 'block' }}></i>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 0.5rem 0' }}>No Perspectives Selected</h3>
                  <p style={{ fontSize: '1rem', color: '#666', margin: '0' }}>
                    Choose medical perspectives above to see AI-generated insights and recommendations for this record.
                  </p>
                </div>
              ) : (
                Object.keys(selectedPerspectives)
                  .filter(perspectiveType => selectedPerspectives[perspectiveType])
                  .map((perspectiveType) => {
                    const insight = record.insights ? record.insights[perspectiveType] : null;
                    const perspectiveConfig = {
                      medical: {
                        icon: 'fa-stethoscope',
                        title: 'Medical Perspective'
                      },
                      holistic: {
                        icon: 'fa-leaf',
                        title: 'Holistic Perspective'
                      },
                      mental_health: {
                        icon: 'fa-brain',
                        title: 'Mental Health Perspective'
                      },
                      nutritional: {
                        icon: 'fa-apple-alt',
                        title: 'Nutritional Perspective'
                      },
                      physical_therapy: {
                        icon: 'fa-dumbbell',
                        title: 'Physical Therapy Perspective'
                      }
                    };
                    
                    const config = perspectiveConfig[perspectiveType] || perspectiveConfig.medical;
                    
                    return (
                      <div key={perspectiveType} style={{
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        marginBottom: '1.5rem',
                        backgroundColor: '#ffffff'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#f0f0ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '0.75rem'
                          }}>
                            <i className={`fas ${config.icon}`} style={{ fontSize: '1.1rem', color: '#6366F1' }}></i>
                          </div>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333' }}>{config.title}</h3>
                        </div>
                        
                        {insight ? (
                          <>
                            <div style={{
                              backgroundColor: '#f9f9f9',
                              padding: '1rem',
                              borderRadius: '8px',
                              marginBottom: '1rem'
                            }}>
                              <p style={{ fontSize: '1rem', color: '#555', margin: '0', lineHeight: '1.6' }}>{insight.summary}</p>
                            </div>
                            
                            {insight.recommendations && insight.recommendations.length > 0 && (
                              <div style={{ marginBottom: '1rem' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333', margin: '0 0 0.75rem 0' }}>Recommendations:</h4>
                                <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
                                  {insight.recommendations.map((rec, index) => (
                                    <li key={index} style={{ 
                                      display: 'flex', 
                                      alignItems: 'flex-start',
                                      marginBottom: index < insight.recommendations.length - 1 ? '0.5rem' : '0'
                                    }}>
                                      <div style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        backgroundColor: '#6366F1',
                                        marginTop: '0.5rem',
                                        marginRight: '0.75rem',
                                        flexShrink: '0'
                                      }}></div>
                                      <span style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {insight.sources && insight.sources.length > 0 && (
                              <div style={{
                                backgroundColor: '#f0f8ff',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #b3d9ff'
                              }}>
                                <p style={{ fontSize: '0.8rem', color: '#0066cc', margin: '0' }}>
                                  <i className="fas fa-info-circle" style={{ marginRight: '0.25rem' }}></i>
                                  <span style={{ fontWeight: '600' }}>Sources:</span> {insight.sources.join(', ')}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div style={{
                            backgroundColor: '#f9f9f9',
                            padding: '1rem',
                            borderRadius: '8px',
                            textAlign: 'center'
                          }}>
                            <p style={{ fontSize: '1rem', color: '#666', margin: '0', fontStyle: 'italic' }}>
                              Not relevant to this health record type. This perspective doesn't apply to this specific medical consultation.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          ) : (
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <i className="fas fa-brain" style={{ fontSize: '2.5rem', color: '#ccc', marginBottom: '1rem', display: 'block' }}></i>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 0.5rem 0' }}>No AI Insights Available</h3>
                <p style={{ fontSize: '1rem', color: '#666', margin: '0', lineHeight: '1.6' }}>
                  This record doesn't have AI-generated insights yet. Opinion Mode showcases our research into 
                  user-controlled AI health insights - a longer-term development goal.
                </p>
              </div>
            </div>
          )
        )}

          {/* Footer */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f0f8ff',
              border: '1px solid #b3d9ff',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '1rem', color: '#0066cc', margin: '0', lineHeight: '1.6' }}>
                <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                <strong>Technology Innovation:</strong> This Opinion Mode Alpha demo represents 
                the future of health data interpretation with transparent AI-powered insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;