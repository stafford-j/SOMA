/**
 * BETA Identity Vault - Based on Peter Murphy AldrId.js pattern
 * 
 * Complete identity management with profile and document storage
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { VaultHeader } from '../components/core';
import { supabase } from '../config/supabase';
import '../styles/Dashboard.css';

const BetaIdentity = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [vault, setVault] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Profile structure based on Peter Murphy demo
  const [profile, setProfile] = useState({
    // Personal Information
    name: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    taxId: '',
    nationality: '',
    
    // Physical Information
    height: '',
    weight: '',
    bloodType: '',
    emergencyContact: '',
    
    // Health Conditions (as part of core ID for health/legal systems)
    medicalConditions: [],
    allergies: [],
    currentMedications: [],
    
    // Documents structure
    documents: {
      passport: { 
        file: null, 
        uploaded: false, 
        address: '', 
        name: 'Passport',
        details: ''
      },
      driversLicense: { 
        file: null, 
        uploaded: false, 
        address: '', 
        name: 'Driver\'s License',
        details: ''
      },
      governmentId: { 
        file: null, 
        uploaded: false, 
        address: '', 
        name: 'Government ID',
        details: ''
      },
      birthCertificate: { 
        file: null, 
        uploaded: false, 
        address: '', 
        name: 'Birth Certificate',
        details: ''
      },
      other: { 
        file: null, 
        uploaded: false, 
        address: '', 
        name: '',
        customName: '',
        details: ''
      }
    }
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadVault();
  }, [user, navigate]);

  useEffect(() => {
    if (vault) {
      loadProfile();
    }
  }, [vault]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadVault = async () => {
    console.log('BetaIdentity: Loading vault for user:', user.id);
    try {
      const { data, error } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'identity')
        .single();

      if (error) {
        console.error('BetaIdentity: Error loading vault:', error);
        // If no vault found, still stop loading
        setLoading(false);
      } else if (data) {
        console.log('BetaIdentity: Found vault:', data);
        setVault(data);
      } else {
        console.log('BetaIdentity: No vault data returned');
        setLoading(false);
      }
    } catch (err) {
      console.error('BetaIdentity: Error loading vault:', err);
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    if (!vault) {
      console.log('BetaIdentity: No vault, skipping profile load');
      return;
    }
    
    console.log('BetaIdentity: Loading profile for vault:', vault.id);
    try {
      // Load user profile from users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error loading user data:', userError);
      }

      // Load documents for identity vault
      const { data: documents, error: docsError } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .eq('vault_id', vault.id);

      if (docsError) {
        console.error('Error loading documents:', docsError);
      }

      // Initialize profile with user data
      if (userData) {
        setProfile(prev => ({
          ...prev,
          name: `${userData.first_name} ${userData.last_name}`.trim() || '',
          // Load other profile data from metadata if exists
          ...userData.metadata || {}
        }));
      }

      // Map documents to profile structure
      if (documents) {
        const docMap = {};
        documents.forEach(doc => {
          const docType = doc.metadata?.document_type || 'other';
          if (profile.documents[docType]) {
            docMap[docType] = {
              file: null,
              uploaded: true,
              address: doc.file_url,
              name: doc.title,
              details: doc.description || ''
            };
          }
        });
        
        setProfile(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            ...docMap
          }
        }));
      }
    } catch (err) {
      console.error('BetaIdentity: Error loading profile:', err);
    }
    
    console.log('BetaIdentity: Profile loading complete, setting loading to false');
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setProfile(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = async (docType, file) => {
    if (!file || !vault) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${vault.id}/identity_${docType}_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload file');
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      // Save document record
      const { data, error } = await supabase
        .from('documents')
        .insert({
          vault_id: vault.id,
          user_id: user.id,
          title: profile.documents[docType].name || file.name,
          description: profile.documents[docType].details || `Identity document: ${docType}`,
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          metadata: {
            document_type: docType,
            original_name: file.name,
            upload_date: new Date().toISOString()
          }
        });

      if (error) {
        console.error('Error saving document:', error);
        alert('Failed to save document record');
      } else {
        // Update profile documents
        setProfile(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [docType]: {
              ...prev.documents[docType],
              uploaded: true,
              address: publicUrl,
              file: null
            }
          }
        }));
        
        setSaveMessage('Document uploaded successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload file');
    }
  };

  const saveProfile = async () => {
    try {
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          first_name: profile.name.split(' ')[0] || '',
          last_name: profile.name.split(' ').slice(1).join(' ') || '',
          metadata: {
            dateOfBirth: profile.dateOfBirth,
            age: profile.age,
            sex: profile.sex,
            taxId: profile.taxId,
            nationality: profile.nationality,
            height: profile.height,
            weight: profile.weight,
            bloodType: profile.bloodType,
            emergencyContact: profile.emergencyContact,
            medicalConditions: profile.medicalConditions,
            allergies: profile.allergies,
            currentMedications: profile.currentMedications
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile');
      } else {
        setEditMode(false);
        setSaveMessage('Profile saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to save profile');
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  // Auto-calculate age when birth date changes
  useEffect(() => {
    if (profile.dateOfBirth) {
      const calculatedAge = calculateAge(profile.dateOfBirth);
      if (calculatedAge !== profile.age) {
        setProfile(prev => ({
          ...prev,
          age: calculatedAge.toString()
        }));
      }
    }
  }, [profile.dateOfBirth]);

  if (loading || !vault) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading Identity vault...</div>
      </div>
    );
  }

  return (
    <main className="landing-container">
      <VaultHeader 
        title="Aldr Identity"
        subtitle="Your secure identity and personal document vault"
        actions={
          <>
            <button 
              onClick={() => navigate('/beta')}
              className="dashboard-button white"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              <span className="hidden sm:inline">Back to Vaults</span>
            </button>
            
            <div className="dashboard-button white">
              <i className="fas fa-user mr-2"></i>
              <span className="hidden sm:inline">{user?.user_metadata?.first_name || user?.email}</span>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="dashboard-button white"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </>
        }
      />

      <section className="dashboard-section">
        <div className="dashboard-container">
          {saveMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {saveMessage}
            </div>
          )}

          {/* Header with Edit/View Toggle */}
          <div className="dashboard-header-section">
            <div className="dashboard-title-row">
              <h2 className="dashboard-title">Identity Profile</h2>
              <div className="dashboard-mode-toggle">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`mode-button ${editMode ? 'edit-mode' : 'view-mode'}`}
                >
                  <i className={`fas ${editMode ? 'fa-eye' : 'fa-edit'} mr-2`}></i>
                  {editMode ? 'View Mode' : 'Edit Mode'}
                </button>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Personal Information Card */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-user mr-2"></i>
                  Personal Information
                </h3>
              </div>
              <div className="card-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="form-input"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="form-display">{profile.name || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Date of Birth</label>
                    {editMode ? (
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="form-input"
                      />
                    ) : (
                      <div className="form-display">{profile.dateOfBirth || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Age</label>
                    <div className="form-display">{profile.age || 'Not calculated'}</div>
                  </div>

                  <div className="form-group">
                    <label>Sex</label>
                    {editMode ? (
                      <select
                        value={profile.sex}
                        onChange={(e) => handleInputChange('sex', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <div className="form-display">{profile.sex || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Nationality</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                        className="form-input"
                        placeholder="e.g., Irish, American, Canadian"
                      />
                    ) : (
                      <div className="form-display">{profile.nationality || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Tax ID</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.taxId}
                        onChange={(e) => handleInputChange('taxId', e.target.value)}
                        className="form-input"
                        placeholder="SSN, PPS, etc."
                      />
                    ) : (
                      <div className="form-display">{profile.taxId || 'Not provided'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Information Card */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-ruler mr-2"></i>
                  Physical Information
                </h3>
              </div>
              <div className="card-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Height</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="form-input"
                        placeholder="e.g., 175cm (5'9&quot;)"
                      />
                    ) : (
                      <div className="form-display">{profile.height || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Weight</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="form-input"
                        placeholder="e.g., 70kg"
                      />
                    ) : (
                      <div className="form-display">{profile.weight || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Blood Type</label>
                    {editMode ? (
                      <select
                        value={profile.bloodType}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <div className="form-display">{profile.bloodType || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label>Emergency Contact</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profile.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className="form-input"
                        placeholder="Name and phone number"
                      />
                    ) : (
                      <div className="form-display">{profile.emergencyContact || 'Not provided'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information Card */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-heartbeat mr-2"></i>
                  Medical Information
                </h3>
                <p className="card-subtitle">Essential medical information for emergency situations</p>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label>Medical Conditions</label>
                  {editMode ? (
                    <div className="array-input">
                      {profile.medicalConditions.map((condition, index) => (
                        <div key={index} className="array-item">
                          <input
                            type="text"
                            value={condition}
                            onChange={(e) => handleArrayChange('medicalConditions', index, e.target.value)}
                            className="form-input"
                            placeholder="Enter medical condition"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('medicalConditions', index)}
                            className="array-remove"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('medicalConditions')}
                        className="array-add"
                      >
                        <i className="fas fa-plus mr-2"></i>Add Condition
                      </button>
                    </div>
                  ) : (
                    <div className="form-display">
                      {profile.medicalConditions.length > 0 ? (
                        <ul className="list-display">
                          {profile.medicalConditions.map((condition, index) => (
                            <li key={index}>{condition}</li>
                          ))}
                        </ul>
                      ) : (
                        'No conditions listed'
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Allergies</label>
                  {editMode ? (
                    <div className="array-input">
                      {profile.allergies.map((allergy, index) => (
                        <div key={index} className="array-item">
                          <input
                            type="text"
                            value={allergy}
                            onChange={(e) => handleArrayChange('allergies', index, e.target.value)}
                            className="form-input"
                            placeholder="Enter allergy"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('allergies', index)}
                            className="array-remove"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('allergies')}
                        className="array-add"
                      >
                        <i className="fas fa-plus mr-2"></i>Add Allergy
                      </button>
                    </div>
                  ) : (
                    <div className="form-display">
                      {profile.allergies.length > 0 ? (
                        <ul className="list-display">
                          {profile.allergies.map((allergy, index) => (
                            <li key={index}>{allergy}</li>
                          ))}
                        </ul>
                      ) : (
                        'No allergies listed'
                      )}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Current Medications</label>
                  {editMode ? (
                    <div className="array-input">
                      {profile.currentMedications.map((medication, index) => (
                        <div key={index} className="array-item">
                          <input
                            type="text"
                            value={medication}
                            onChange={(e) => handleArrayChange('currentMedications', index, e.target.value)}
                            className="form-input"
                            placeholder="Enter medication"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('currentMedications', index)}
                            className="array-remove"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('currentMedications')}
                        className="array-add"
                      >
                        <i className="fas fa-plus mr-2"></i>Add Medication
                      </button>
                    </div>
                  ) : (
                    <div className="form-display">
                      {profile.currentMedications.length > 0 ? (
                        <ul className="list-display">
                          {profile.currentMedications.map((medication, index) => (
                            <li key={index}>{medication}</li>
                          ))}
                        </ul>
                      ) : (
                        'No medications listed'
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Documents Card */}
            <div className="dashboard-card full-width">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-file-alt mr-2"></i>
                  Identity Documents
                </h3>
                <p className="card-subtitle">Upload and manage your identity documents</p>
              </div>
              <div className="card-content">
                <div className="documents-grid">
                  {Object.entries(profile.documents).map(([docType, doc]) => (
                    <div key={docType} className="document-item">
                      <div className="document-header">
                        <h4 className="document-title">
                          {docType === 'other' && doc.customName ? doc.customName : doc.name}
                        </h4>
                        <div className="document-status">
                          {doc.uploaded ? (
                            <span className="status-uploaded">
                              <i className="fas fa-check-circle mr-1"></i>
                              Uploaded
                            </span>
                          ) : (
                            <span className="status-pending">
                              <i className="fas fa-clock mr-1"></i>
                              Pending
                            </span>
                          )}
                        </div>
                      </div>

                      {docType === 'other' && editMode && (
                        <div className="document-custom-name">
                          <input
                            type="text"
                            value={doc.customName}
                            onChange={(e) => setProfile(prev => ({
                              ...prev,
                              documents: {
                                ...prev.documents,
                                other: {
                                  ...prev.documents.other,
                                  customName: e.target.value,
                                  name: e.target.value
                                }
                              }
                            }))}
                            className="form-input"
                            placeholder="Document name"
                          />
                        </div>
                      )}

                      <div className="document-upload">
                        <input
                          type="file"
                          id={`file-${docType}`}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              handleFileUpload(docType, file);
                            }
                          }}
                          className="file-input"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <label htmlFor={`file-${docType}`} className="file-label">
                          <i className="fas fa-upload mr-2"></i>
                          {doc.uploaded ? 'Replace Document' : 'Upload Document'}
                        </label>
                      </div>

                      {doc.uploaded && (
                        <div className="document-actions">
                          <a
                            href={doc.address}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="document-action view"
                          >
                            <i className="fas fa-eye mr-1"></i>
                            View
                          </a>
                          <a
                            href={doc.address}
                            download
                            className="document-action download"
                          >
                            <i className="fas fa-download mr-1"></i>
                            Download
                          </a>
                        </div>
                      )}

                      {doc.details && (
                        <div className="document-details">
                          {doc.details}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {editMode && (
            <div className="dashboard-actions">
              <button
                onClick={saveProfile}
                className="save-button"
              >
                <i className="fas fa-save mr-2"></i>
                Save Profile
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="cancel-button"
              >
                <i className="fas fa-times mr-2"></i>
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BetaIdentity;