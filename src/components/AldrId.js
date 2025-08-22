/**
 * Aldr ID - Sarah Chen Health Companion
 * 
 * Integrated Aldr ID profile with health records and Opinion Mode functionality
 * Based on Chen Family demo structure with Opinion Mode integration
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sarahChenProfile, sarahHealthRecords } from '../data/sarahChenData';
import '../styles/Dashboard.css';
import Modal from './Modal';

const AldrId = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileSaved, setProfileSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    return !localStorage.getItem('sarah-chen-disclaimer-shown');
  });

  // Initialize form data with Sarah's profile
  useEffect(() => {
    const profileData = {
      name: sarahChenProfile.name,
      dateOfBirth: '1990-08-22',
      age: sarahChenProfile.age,
      sex: 'Female',
      nationality: 'American',
      height: sarahChenProfile.healthProfile.height,
      weight: sarahChenProfile.healthProfile.weight,
      bloodType: sarahChenProfile.healthProfile.bloodType,
      emergencyContact: `${sarahChenProfile.healthProfile.emergencyContact.name} ${sarahChenProfile.healthProfile.emergencyContact.phone}`,
      medicalConditions: sarahChenProfile.healthProfile.medicalConditions,
      allergies: sarahChenProfile.healthProfile.allergies,
      currentMedications: ['Folic acid (400mcg daily)', 'Prenatal vitamins', 'Magnesium oxide (400mg daily)'],
      role: sarahChenProfile.role,
      currentLocation: sarahChenProfile.currentLocation,
      bio: sarahChenProfile.bio
    };
    setFormData(profileData);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (arrayName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), '']
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSaveProfile = async () => {
    setProfileSaved(false);
    setStatusMessage('Saving profile...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEditing(false);
      setProfileSaved(true);
      setStatusMessage('Profile saved successfully!');
      
      setTimeout(() => {
        setStatusMessage('');
        setProfileSaved(false);
      }, 3000);
    } catch (error) {
      setStatusMessage('Save failed');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setStatusMessage('');
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

        {/* Center - Aldr ID Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-id-card" style={{ 
              fontSize: '2rem', 
              color: '#0B7EC8', 
              marginRight: '1rem' 
            }}></i>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              color: '#333', 
              margin: '0' 
            }}>
              Aldr ID
            </h1>
          </div>
          <div style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            fontStyle: 'italic',
            marginTop: '0.25rem'
          }}>
            {formData.name} - Digital Health Identity
          </div>
        </div>

        {/* Right - Share Button */}
        <button 
          onClick={() => alert('Demo mode: Document sharing functionality')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6366F1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minHeight: '44px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4F46E5';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#6366F1';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <i className="fas fa-share"></i>
          Share Profile
        </button>
      </header>

      <div style={{ width: '100%', animation: 'fadeIn 0.3s ease-in' }}>
        <div style={{ width: '100%', padding: '2rem' }}>
          {/* Digital ID Card Section */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0B7EC8, #6366F1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginRight: '1.5rem'
                  }}>
                    {formData.name && formData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: '600', 
                      color: '#333', 
                      margin: '0' 
                    }}>
                      Digital Health ID
                    </h2>
                    <p style={{ 
                      fontSize: '1rem', 
                      color: '#666', 
                      margin: '0.5rem 0 0 0' 
                    }}>
                      {formData.role} • {formData.currentLocation}
                    </p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#0B7EC8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      minHeight: '44px'
                    }}
                  >
                    <i className="fas fa-edit"></i>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {isEditing ? (
              // Edit Mode - Profile Form
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1.5rem 0' }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                  <div>
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                  <div>
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                  <div>
                    <label>Role/Profession</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                  <div>
                    <label>Current Location</label>
                    <input
                      type="text"
                      name="currentLocation"
                      value={formData.currentLocation || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                  <div>
                    <label>Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1.5rem 0' }}>Physical Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label>Height</label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                  <div>
                    <label>Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                  <div>
                    <label>Blood Type</label>
                    <select
                      name="bloodType"
                      value={formData.bloodType || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    >
                      <option value="">Unknown</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label>Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact || ''}
                      onChange={handleInputChange}
style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        backgroundColor: '#ffffff',
                        color: '#333'
                      }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#333', margin: '0 0 1.5rem 0' }}>Health Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label>Medical Conditions</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(formData.medicalConditions || []).map((condition, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="text"
                            value={condition}
                            onChange={(e) => handleArrayInputChange('medicalConditions', index, e.target.value)}
style={{
                            flex: '1',
                            padding: '0.5rem',
                            border: '1px solid #e5e5e5',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                          }}
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('medicalConditions', index)}
    style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          color: '#dc2626',
                          border: '1px solid #dc2626',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('medicalConditions')}
style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#0B7EC8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                      >
                        Add Condition
                      </button>
                    </div>
                  </div>

                  <div>
                    <label>Allergies</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(formData.allergies || []).map((allergy, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="text"
                            value={allergy}
                            onChange={(e) => handleArrayInputChange('allergies', index, e.target.value)}
style={{
                            flex: '1',
                            padding: '0.5rem',
                            border: '1px solid #e5e5e5',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                          }}
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('allergies', index)}
    style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          color: '#dc2626',
                          border: '1px solid #dc2626',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('allergies')}
style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#0B7EC8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                      >
                        Add Allergy
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'transparent',
                      color: '#666',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#0B7EC8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Profile
                  </button>
                </div>
              </div>
            ) : (
              // View Mode - Profile Display
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>Personal Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Name:</span> {formData.name}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Date of Birth:</span> {formData.dateOfBirth}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Age:</span> {formData.age}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Role:</span> {formData.role}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Location:</span> {formData.currentLocation}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Nationality:</span> {formData.nationality}</div>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>Physical Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Height:</span> {formData.height}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Weight:</span> {formData.weight}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Blood Type:</span> {formData.bloodType}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Emergency Contact:</span> {formData.emergencyContact}</div>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>Health Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Health Records:</span> {sarahHealthRecords.length}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Medical Conditions:</span> {(formData.medicalConditions || []).length}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Allergies:</span> {(formData.allergies || []).length}</div>
                      <div><span style={{ fontWeight: '500', color: '#666' }}>Insurance:</span> {sarahChenProfile.healthProfile.healthInsurance.provider}</div>
                    </div>
                  </div>
                </div>

                {/* Health Conditions & Allergies */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                      <i className="fas fa-stethoscope" style={{ color: '#dc2626', marginRight: '0.5rem' }}></i>
                      Medical Conditions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(formData.medicalConditions || []).map((condition, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <i className="fas fa-circle" style={{ color: '#dc2626', fontSize: '0.6rem', marginRight: '0.75rem', marginTop: '0.25rem' }}></i>
                          <span style={{ color: '#555' }}>{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', margin: '0 0 1rem 0' }}>
                      <i className="fas fa-exclamation-triangle" style={{ color: '#f59e0b', marginRight: '0.5rem' }}></i>
                      Allergies & Medications
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#333', margin: '0 0 0.5rem 0' }}>Allergies:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {(formData.allergies || []).map((allergy, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                              <i className="fas fa-circle" style={{ color: '#f59e0b', fontSize: '0.6rem', marginRight: '0.5rem' }}></i>
                              <span style={{ color: '#555' }}>{allergy}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#333', margin: '0 0 0.5rem 0' }}>Current Medications:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {(formData.currentMedications || []).map((medication, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                              <i className="fas fa-circle" style={{ color: '#3b82f6', fontSize: '0.6rem', marginRight: '0.5rem' }}></i>
                              <span style={{ color: '#555' }}>{medication}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Status Messages */}
          {statusMessage && (
            <div className="mt-6">
              <div className={`p-4 rounded-md ${
                statusMessage.includes('successfully') ? 'bg-green-100 text-green-800' :
                statusMessage.includes('failed') ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {statusMessage}
              </div>
            </div>
          )}
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

export default AldrId;