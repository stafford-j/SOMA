/**
 * Aldr Health Companion - Sarah Chen Demo
 * Main page with clean header and health records
 * Minimal white design with color accents
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sarahChenProfile, sarahHealthRecords } from '../data/sarahChenData';
import '../styles/Dashboard.css';
import Modal from './Modal';

const HomePage = () => {
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    return !localStorage.getItem('sarah-chen-disclaimer-shown');
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        {/* Left - Aldr Health Companion with Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #0B7EC8, #6366F1)',
            borderRadius: '12px',
            marginRight: '1rem',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            position: 'relative'
          }}>
            <i className="fas fa-heartbeat" style={{ fontSize: '1.8rem' }}></i>
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '20px',
              height: '20px',
              background: '#28A745',
              borderRadius: '50%',
              border: '2px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-plus" style={{ fontSize: '8px', color: 'white' }}></i>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1 style={{ 
              fontSize: '2.2rem', 
              fontWeight: '600', 
              color: '#333', 
              margin: '0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
            }}>
              Aldr Health Companion
            </h1>
            <div style={{ 
              fontSize: '1.1rem', 
              color: '#666', 
              fontStyle: 'italic',
              marginTop: '0.25rem',
              fontWeight: '500'
            }}>
              Aldr /ˈɑːl-dər/ — life, age, lifetime
            </div>
          </div>
        </div>

        {/* Center - Empty space for balance */}
        <div style={{ flex: 1 }}></div>

        {/* Right - Combined Sarah Chen & Aldr ID Card */}
        <div>
          <button
            onClick={() => navigate('/aldr-id')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.5rem',
              backgroundColor: '#ffffff',
              color: '#333',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minHeight: '60px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0B7EC8';
              e.target.style.color = 'white';
              e.target.style.borderColor = '#0B7EC8';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(11, 126, 200, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#333';
              e.target.style.borderColor = '#e5e5e5';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
            }}
          >
            {/* Sarah Chen Avatar */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0B7EC8, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              SC
            </div>
            
            {/* Combined Info */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{sarahChenProfile.name}</div>
              <div style={{ fontSize: '0.85rem', opacity: '0.7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-id-card" style={{ fontSize: '0.8rem', color: '#0B7EC8' }}></i>
                Aldr ID Profile
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '0 2rem' }}>
        

        {/* Health Records Section */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e5e5',
          borderRadius: '12px',
          padding: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem' 
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '600', 
              color: '#333', 
              margin: '0' 
            }}>
              Health Records
            </h2>
            <span style={{ 
              fontSize: '1rem', 
              color: '#666' 
            }}>
              {sarahHealthRecords.length} records • Data/Opinion Mode available
            </span>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {sarahHealthRecords.map((record) => (
              <div 
                key={record.id} 
                onClick={() => navigate(`/record/${record.id}`)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#0B7EC8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0B7EC8',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    <i className={`fas ${getSpecialtyIcon(record.specialty)}`}></i>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: '600', 
                      color: '#333', 
                      margin: '0 0 0.5rem 0' 
                    }}>
                      {record.title}
                    </h3>
                    
                    <div style={{ 
                      fontSize: '0.95rem', 
                      color: '#666', 
                      marginBottom: '0.5rem' 
                    }}>
                      {formatDate(record.date)} • {record.provider}
                    </div>
                    
                    <p style={{ 
                      fontSize: '1rem', 
                      color: '#555', 
                      lineHeight: '1.5', 
                      margin: '0 0 1rem 0' 
                    }}>
                      {record.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        color: '#0B7EC8',
                        border: '1px solid #0B7EC8',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        minHeight: '36px'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/record/${record.id}?mode=data`);
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
                      <i className="fas fa-database"></i>
                      Data Mode
                    </button>
                    
                    <button 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#6366F1',
                        color: 'white',
                        border: '1px solid #6366F1',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        minHeight: '36px'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/record/${record.id}?mode=opinion`);
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#4F46E5';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#6366F1';
                      }}
                    >
                      <i className="fas fa-brain"></i>
                      Opinion Mode
                    </button>
                  </div>
                </div>

                {/* Insights Preview */}
                {record.insights && (
                  <div style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '0.5rem' 
                    }}>
                      <i className="fas fa-brain" style={{ 
                        color: '#6366F1', 
                        marginRight: '0.5rem' 
                      }}></i>
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: '#666' 
                      }}>
                        AI Insights Available:
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {Object.keys(record.insights).map((perspective) => (
                        <span 
                          key={perspective}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#f8f9fa',
                            border: '1px solid #e5e5e5',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            color: '#666'
                          }}
                        >
                          {perspective.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer Modal */}
      <Modal 
        isOpen={showDisclaimer} 
        onClose={() => {
          localStorage.setItem('sarah-chen-disclaimer-shown', 'true');
          setShowDisclaimer(false);
        }}
        title="Important Medical Disclaimers"
        showCloseButton={false}
      >
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <i className="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Demo Purpose Only</h4>
                <p className="text-sm text-yellow-700">
                  This is a demonstration of Sarah Chen's health companion interface. All health data is fictional and created for demo purposes only.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <i className="fas fa-brain text-blue-600 mt-1 mr-3"></i>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Opinion Mode Technology</h4>
                <p className="text-sm text-blue-700">
                  Opinion Mode represents future technology for AI-powered health insights. All AI opinions are educational demonstrations and should never be used for actual medical decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <i className="fas fa-user-md text-red-600 mt-1 mr-3"></i>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Always Consult Healthcare Professionals</h4>
                <p className="text-sm text-red-700">
                  Always consult qualified healthcare providers for medical advice, diagnosis, and treatment decisions. This demo does not provide medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              localStorage.setItem('sarah-chen-disclaimer-shown', 'true');
              setShowDisclaimer(false);
            }}
            className="btn-primary"
          >
            <i className="fas fa-check mr-2"></i>
            I Understand - Continue to Demo
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;