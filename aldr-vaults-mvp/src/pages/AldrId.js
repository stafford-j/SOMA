import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AldrVault.css';
import '../styles/Dashboard.css';

const AldrId = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Updated profile structure with comprehensive health and identity information
  const [profile, setProfile] = useState({
    // Personal Information
    name: 'James Stafford',
    dateOfBirth: '1984-08-15',
    age: 41,
    sex: 'Male',
    taxId: '',
    nationality: 'Irish',
    
    // Physical Information
    height: '184cm (6\'0")',
    weight: '85kg',
    bloodType: 'O+',
    emergencyContact: 'Catherine Conaghan +353 87 123 4567',
    
    // Health Conditions (as part of core ID for health/legal systems)
    medicalConditions: [
      'Psoriasis (chronic skin condition)',
      'L5-S1 posterior disc protrusion (March 2024)',
      'Psoas syndrome (March 2025)'
    ],
    allergies: ['No known allergies'],
    currentMedications: ['Calcipotriol cream (psoriasis treatment)'],
    
    // Documents structure with demo data
    documents: {
      passport: { 
        file: null, 
        uploaded: true, 
        address: 'demo_passport_1742961914546', 
        name: 'Irish Passport',
        details: 'P1234567 • Expires: 15 Aug 2029'
      },
      driversLicense: { 
        file: null, 
        uploaded: true, 
        address: 'demo_license_1742961914547', 
        name: 'Driver\'s License',
        details: 'Ontario, Canada • Expires: 15 Aug 2027'
      },
      governmentId: { file: null, uploaded: false, address: '', name: 'Government ID', details: '' },
      birthCertificate: { file: null, uploaded: false, address: '', name: 'Birth Certificate', details: '' },
      other: { file: null, uploaded: false, address: '', name: '', customName: '', details: '' }
    }
  });

  // UI state for document management
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [customDocumentName, setCustomDocumentName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [profileSaved, setProfileSaved] = useState(false);

  // Update form data when profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Document management functions
  const handleFileSelect = (event) => {
    if (!selectedDocumentType) {
      setStatusMessage('Please select a document type first');
      return;
    }
    
    if (selectedDocumentType === 'other' && !customDocumentName.trim()) {
      setStatusMessage('Please specify the document name for "Other" type');
      return;
    }
    
    const file = event.target.files[0];
    if (file) {
      const newProfile = { ...profile };
      newProfile.documents[selectedDocumentType].file = file;
      
      if (selectedDocumentType === 'other') {
        newProfile.documents[selectedDocumentType].customName = customDocumentName.trim();
        newProfile.documents[selectedDocumentType].name = customDocumentName.trim();
      }
      
      setProfile(newProfile);
      setStatusMessage(`Selected: ${file.name}`);
    }
  };

  const uploadDocument = () => {
    if (!selectedDocumentType) {
      setStatusMessage('Please select a document type');
      return;
    }
    
    const docData = profile.documents[selectedDocumentType];
    if (!docData.file) {
      setStatusMessage('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    const docDisplayName = selectedDocumentType === 'other' ? docData.customName : docData.name;
    setStatusMessage(`Uploading ${docDisplayName} to secure storage...`);

    // Simulate upload process
    setTimeout(() => {
      const newProfile = { ...profile };
      newProfile.documents[selectedDocumentType].uploaded = true;
      newProfile.documents[selectedDocumentType].address = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      setProfile(newProfile);
      localStorage.setItem('aldrIdProfile', JSON.stringify(newProfile));
      
      // Clear the selection
      setSelectedDocumentType('');
      setCustomDocumentName('');
      
      setStatusMessage(`✅ Successfully uploaded ${docDisplayName}!`);
      setUploading(false);
    }, 2000);
  };

  const downloadDocument = (docType) => {
    const docData = profile.documents[docType];
    if (!docData.address) {
      setStatusMessage('No address available for this document');
      return;
    }
    
    const docDisplayName = docType === 'other' ? docData.customName : docData.name;
    setStatusMessage(`📥 Download initiated for ${docDisplayName} (Demo mode - no actual download)`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Save profile function
  const saveProfile = () => {
    if (!formData.name || !formData.dateOfBirth) {
      setStatusMessage('Please fill in at least name and date of birth');
      return;
    }
    
    setUploading(true);
    setStatusMessage('Saving your digital ID card...');
    
    // Simulate save process
    setTimeout(() => {
      setProfile(formData);
      setProfileSaved(true);
      setIsEditing(false);
      localStorage.setItem('aldrIdProfile', JSON.stringify(formData));
      setStatusMessage('✅ Digital ID card saved successfully!');
      setUploading(false);
    }, 1500);
  };

  const handleArrayChange = (e, field, index) => {
    // Ensure the field exists before modifying it
    if (!formData[field]) {
      formData[field] = [];
    }
    
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field) => {
    // Ensure the field exists before adding an item
    if (!formData[field]) {
      formData[field] = [];
    }
    
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (field, index) => {
    // Ensure the field exists before removing an item
    if (!formData[field]) {
      return; // If the field doesn't exist, do nothing
    }
    
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    setProfile(formData);
    setIsEditing(false);
    
    // Store data in localStorage for this proof of concept
    localStorage.setItem('aldrUserProfile', JSON.stringify(formData));
    alert('Profile updated successfully!');
  };

  // Load from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('aldrUserProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Calculate BMI
  const calculateBMI = () => {
    // Try to determine if height is in ft/in format or cm
    const heightStr = profile.height;
    if (!heightStr) return "N/A";
    
    let heightInMeters;
    
    if (heightStr.includes("'")) {
      // Convert height from ft/in to meters
      const heightParts = heightStr.split("'");
      if (heightParts.length !== 2) return "N/A";
      
      const feet = parseInt(heightParts[0]);
      // Remove the double quote from inches if present
      const inchesStr = heightParts[1].replace('"', '').replace(')', '').trim();
      const inches = parseInt(inchesStr);
      if (isNaN(feet) || isNaN(inches)) return "N/A";
      
      const totalInches = feet * 12 + inches;
      heightInMeters = totalInches * 0.0254; // Convert inches to meters
    } else {
      // Assume height is in cm
      const heightCm = parseInt(heightStr);
      if (isNaN(heightCm)) return "N/A";
      heightInMeters = heightCm / 100; // Convert cm to meters
    }
    
    const weightKg = parseInt(profile.weight);
    if (isNaN(weightKg)) return "N/A";
    
    // BMI formula: (weight in kg) / (height in meters)²
    const bmi = weightKg / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  return (
    <div className="dashboard-container">
      {/* Header matching Aldr Health style */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="flex flex-col">
            <div className="flex items-center">
              <i className="fas fa-id-card text-white text-3xl mr-4"></i>
              <div>
                <h1 className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Aldr Identity</h1>
                <div className="text-sm text-white italic mt-1">
                  Aldr /ˈɑːl-dər/ — life, age, lifetime
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="header-actions">
          <button className="dashboard-button white" onClick={() => alert('Sharing functionality coming soon!')}>
            <i className="fas fa-share"></i>
            <span className="hidden sm:inline">Share Documents</span>
          </button>
          <a 
            href="mailto:james@ruleyproduction.com" 
            className="dashboard-button white"
          >
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">Contact</span>
          </a>
          <Link to="/" className="dashboard-button white">
            <i className="fas fa-arrow-left"></i>
            <span className="hidden sm:inline">Back to Vaults</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card overflow-hidden">
            <div className="bg-aldr-gradient px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 text-white">
                    <i className="fas fa-id-card text-xl"></i>
                  </div>
                  <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Digital ID Card
                  </h1>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="dashboard-button white"
                  >
                    <i className="fas fa-edit mr-2"></i>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
            {isEditing ? (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-aldr-dark mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Sex</label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Tax ID / SSN</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="Enter your Tax ID"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="Enter your nationality"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-aldr-dark mb-4">Physical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Height</label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="e.g., 184cm (6'0)"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="e.g., 85kg"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Blood Type</label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
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
                    <label className="block text-aldr-dark font-medium mb-2">Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="Name and phone number"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-aldr-dark mb-4">Health Information (Core ID)</h3>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Medical Conditions</label>
                    <div className="space-y-2">
                      {formData.medicalConditions?.map((condition, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={condition}
                            onChange={(e) => {
                              const newConditions = [...formData.medicalConditions];
                              newConditions[index] = e.target.value;
                              setFormData({...formData, medicalConditions: newConditions});
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newConditions = formData.medicalConditions.filter((_, i) => i !== index);
                              setFormData({...formData, medicalConditions: newConditions});
                            }}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData, 
                            medicalConditions: [...(formData.medicalConditions || []), '']
                          });
                        }}
                        className="px-4 py-2 bg-aldr-teal text-white rounded-md hover:bg-aldr-purple transition-colors"
                      >
                        Add Condition
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-aldr-dark font-medium mb-2">Allergies</label>
                      <div className="space-y-2">
                        {formData.allergies?.map((allergy, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={allergy}
                              onChange={(e) => {
                                const newAllergies = [...formData.allergies];
                                newAllergies[index] = e.target.value;
                                setFormData({...formData, allergies: newAllergies});
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newAllergies = formData.allergies.filter((_, i) => i !== index);
                                setFormData({...formData, allergies: newAllergies});
                              }}
                              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData, 
                              allergies: [...(formData.allergies || []), '']
                            });
                          }}
                          className="px-4 py-2 bg-aldr-teal text-white rounded-md hover:bg-aldr-purple transition-colors"
                        >
                          Add Allergy
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-aldr-dark font-medium mb-2">Current Medications</label>
                      <div className="space-y-2">
                        {formData.currentMedications?.map((medication, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={medication}
                              onChange={(e) => {
                                const newMedications = [...formData.currentMedications];
                                newMedications[index] = e.target.value;
                                setFormData({...formData, currentMedications: newMedications});
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newMedications = formData.currentMedications.filter((_, i) => i !== index);
                                setFormData({...formData, currentMedications: newMedications});
                              }}
                              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData, 
                              currentMedications: [...(formData.currentMedications || []), '']
                            });
                          }}
                          className="px-4 py-2 bg-aldr-teal text-white rounded-md hover:bg-aldr-purple transition-colors"
                        >
                          Add Medication
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProfile}
                    className="btn-primary"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Saving...</>
                    ) : (
                      <><i className="fas fa-save"></i> Save Profile</>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="card bg-aldr-light">
                    <h3 className="text-lg font-semibold text-aldr-dark mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div><span className="font-medium text-aldr-gray">Name:</span> {profile.name}</div>
                      <div><span className="font-medium text-aldr-gray">Date of Birth:</span> {profile.dateOfBirth}</div>
                      <div><span className="font-medium text-aldr-gray">Age:</span> {profile.age}</div>
                      <div><span className="font-medium text-aldr-gray">Sex:</span> {profile.sex}</div>
                      <div><span className="font-medium text-aldr-gray">Nationality:</span> {profile.nationality}</div>
                      <div><span className="font-medium text-aldr-gray">Tax ID:</span> {profile.taxId || 'Not provided'}</div>
                    </div>
                  </div>

                  <div className="card bg-aldr-light">
                    <h3 className="text-lg font-semibold text-aldr-dark mb-4">Physical Information</h3>
                    <div className="space-y-3">
                      <div><span className="font-medium text-aldr-gray">Height:</span> {profile.height}</div>
                      <div><span className="font-medium text-aldr-gray">Weight:</span> {profile.weight}</div>
                      <div><span className="font-medium text-aldr-gray">BMI:</span> {calculateBMI()}</div>
                      <div><span className="font-medium text-aldr-gray">Blood Type:</span> {profile.bloodType}</div>
                      <div><span className="font-medium text-aldr-gray">Emergency Contact:</span> {profile.emergencyContact}</div>
                    </div>
                  </div>

                  <div className="card bg-aldr-light">
                    <h3 className="text-lg font-semibold text-aldr-dark mb-4">Document Status</h3>
                    <div className="space-y-3">
                      {profileSaved && (
                        <div className="text-green-600">
                          <i className="fas fa-check-circle mr-2"></i>
                          Digital ID Card saved to secure storage
                        </div>
                      )}
                      <div><span className="font-medium text-aldr-gray">Documents Uploaded:</span> {Object.values(profile.documents).filter(doc => doc.uploaded).length}</div>
                      <div><span className="font-medium text-aldr-gray">Storage:</span> Secure Vault</div>
                      <div><span className="font-medium text-aldr-gray">Aldr ID:</span> 1742961914546</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Health Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card bg-aldr-light">
                    <h3 className="text-lg font-semibold text-aldr-dark mb-4">
                      <i className="fas fa-stethoscope text-red-500 mr-2"></i>
                      Medical Conditions
                    </h3>
                    <div className="space-y-3">
                      {profile.medicalConditions?.length > 0 ? (
                        profile.medicalConditions.map((condition, index) => (
                          <div key={index} className="flex items-start">
                            <i className="fas fa-circle text-red-500 text-xs mr-3 mt-1"></i>
                            <span className="text-sm text-aldr-dark">{condition}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-aldr-gray">No medical conditions recorded</span>
                      )}
                    </div>
                  </div>

                  <div className="card bg-aldr-light">
                    <h3 className="text-lg font-semibold text-aldr-dark mb-4">
                      <i className="fas fa-exclamation-triangle text-orange-500 mr-2"></i>
                      Allergies & Medications
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-aldr-dark text-sm mb-2">Allergies:</h4>
                        {profile.allergies?.length > 0 ? (
                          <div className="space-y-1">
                            {profile.allergies.map((allergy, index) => (
                              <div key={index} className="flex items-center">
                                <i className="fas fa-circle text-orange-500 text-xs mr-2"></i>
                                <span className="text-sm text-aldr-dark">{allergy}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-aldr-gray">No allergies recorded</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-aldr-dark text-sm mb-2">Current Medications:</h4>
                        {profile.currentMedications?.length > 0 ? (
                          <div className="space-y-1">
                            {profile.currentMedications.map((medication, index) => (
                              <div key={index} className="flex items-center">
                                <i className="fas fa-circle text-blue-500 text-xs mr-2"></i>
                                <span className="text-sm text-aldr-dark">{medication}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-aldr-gray">No medications recorded</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                {Object.values(profile.documents).some(doc => doc.uploaded) && (
                  <div className="mt-6">
                    <div className="card bg-aldr-light">
                      <h3 className="text-lg font-semibold text-aldr-dark mb-4">Your Documents</h3>
                      <div className="space-y-3">
                        {Object.entries(profile.documents).map(([docType, docData]) => {
                          if (!docData.uploaded) return null;
                          
                          const docDisplayName = docType === 'other' ? docData.customName : docData.name;
                          return (
                            <div key={docType} className="flex items-center justify-between p-3 bg-white rounded border">
                              <div className="flex items-center">
                                <i className={`fas ${
                                  docType === 'passport' ? 'fa-passport' :
                                  docType === 'driversLicense' ? 'fa-id-card' :
                                  docType === 'governmentId' ? 'fa-id-badge' :
                                  docType === 'birthCertificate' ? 'fa-certificate' :
                                  'fa-file-alt'
                                } text-aldr-teal mr-3`}></i>
                                <div>
                                  <h4 className="font-medium">{docDisplayName}</h4>
                                  <p className="text-sm text-green-600">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    Stored securely
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  className="dashboard-button outline text-xs"
                                  onClick={() => downloadDocument(docType)}
                                >
                                  <i className="fas fa-download"></i>
                                  Download
                                </button>
                                <button className="dashboard-button outline text-xs">
                                  <i className="fas fa-share"></i>
                                  Share
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload New Document */}
                <div className="mt-6">
                  <div className="card bg-aldr-light">
                    <h3 className="text-lg font-semibold text-aldr-dark mb-4">Add New Document</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-aldr-dark font-medium mb-2">Document Type</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal" 
                          value={selectedDocumentType}
                          onChange={(e) => setSelectedDocumentType(e.target.value)}
                        >
                          <option value="">Select Document Type</option>
                          <option value="passport">Passport</option>
                          <option value="driversLicense">Driver's License</option>
                          <option value="governmentId">Government ID</option>
                          <option value="birthCertificate">Birth Certificate</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      {selectedDocumentType === 'other' && (
                        <div>
                          <label className="block text-aldr-dark font-medium mb-2">Document Name</label>
                          <input 
                            type="text" 
                            value={customDocumentName}
                            onChange={(e) => setCustomDocumentName(e.target.value)}
                            placeholder="Enter document name (e.g., Medical Certificate, Insurance Policy)" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                          />
                        </div>
                      )}

                      {selectedDocumentType && (
                        <div>
                          <label className="block text-aldr-dark font-medium mb-2">
                            Upload {selectedDocumentType === 'other' 
                              ? (customDocumentName || 'Document') 
                              : profile.documents[selectedDocumentType]?.name
                            }
                          </label>
                          <input 
                            type="file"
                            onChange={handleFileSelect}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-aldr-teal transition-colors"
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Accepted formats: PDF, JPG, PNG
                            {selectedDocumentType && profile.documents[selectedDocumentType]?.file && (
                              <span className="text-green-600 ml-2">✓ File selected</span>
                            )}
                          </p>
                        </div>
                      )}

                      <button 
                        className="btn-primary w-full"
                        onClick={uploadDocument}
                        disabled={uploading || !selectedDocumentType || (selectedDocumentType && !profile.documents[selectedDocumentType]?.file) || (selectedDocumentType === 'other' && !customDocumentName.trim())}
                      >
                        {uploading ? (
                          <><i className="fas fa-spinner fa-spin mr-2"></i> Uploading...</>
                        ) : (
                          <><i className="fas fa-cloud-upload-alt mr-2"></i> Upload Document</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Status Messages */}
                {statusMessage && (
                  <div className="mt-6">
                    <div className={`p-4 rounded-md ${
                      statusMessage.includes('✅') ? 'bg-green-100 text-green-800' :
                      statusMessage.includes('❌') ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {statusMessage}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AldrId;