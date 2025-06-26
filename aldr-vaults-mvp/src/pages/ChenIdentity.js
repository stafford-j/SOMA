/**
 * Chen Identity Companion
 * 
 * Personal identity profile management for Chen Family
 * Matches the AldrId.js structure from Peter Murphy demo
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';

const ChenIdentity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [familyMode, setFamilyMode] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('sarah');

  // Get mode and person from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    const person = params.get('person');
    
    if (mode === 'family') {
      setFamilyMode(true);
      setSelectedPerson('family');
    } else {
      setFamilyMode(false);
      setSelectedPerson(person || 'sarah');
    }
  }, [location]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPersonDisplayName = () => {
    if (familyMode) return 'Chen Family';
    return selectedPerson === 'sarah' ? 'Sarah Chen' : 'David Chen';
  };

  const navigateToChenfamily = () => {
    // Preserve current mode and person context when going back
    const params = familyMode 
      ? '?mode=family'
      : `?mode=individual&person=${selectedPerson}`;
    navigate(`/chen-family${params}`);
  };

  const getPersonProfile = () => {
    if (familyMode) {
      return {
        name: 'Chen Family Profile',
        dateOfBirth: 'Multiple Members',
        age: 'Sarah: 34, David: 36',
        sex: 'Multiple',
        taxId: '',
        nationality: 'Sarah: American, David: Canadian',
        
        height: 'Sarah: 165cm (5\'5"), David: 180cm (5\'11")',
        weight: 'Sarah: 62kg, David: 78kg',
        bloodType: 'Sarah: A+, David: O-',
        emergencyContact: 'Both listed as emergency contacts',
        
        medicalConditions: [
          'Sarah: PCOS, Endometriosis',
          'David: Lower back pain (L4-L5 disc issues)',
          'Family: Fertility journey management'
        ],
        allergies: ['Sarah: Shellfish allergy', 'David: No known allergies'],
        currentMedications: [
          'Sarah: Metformin (PCOS), Prenatal vitamins',
          'David: Ibuprofen (as needed for back pain)'
        ],
        
        documents: {
          passport: { 
            file: null, 
            uploaded: true, 
            address: 'demo_chen_passports', 
            name: 'Family Passports',
            details: 'Sarah: US Passport • David: Canadian Passport'
          },
          driversLicense: { 
            file: null, 
            uploaded: true, 
            address: 'demo_chen_licenses', 
            name: 'Driver\'s Licenses',
            details: 'Both Portugal licenses • Valid until 2027'
          },
          governmentId: { file: null, uploaded: false, address: '', name: 'Government IDs', details: '' },
          birthCertificate: { file: null, uploaded: false, address: '', name: 'Birth Certificates', details: '' },
          other: { file: null, uploaded: false, address: '', name: '', customName: '', details: '' }
        }
      };
    } else if (selectedPerson === 'sarah') {
      return {
        name: 'Sarah Chen',
        dateOfBirth: '1991-03-15',
        age: 34,
        sex: 'Female',
        taxId: '',
        nationality: 'American',
        
        height: '165cm (5\'5")',
        weight: '62kg',
        bloodType: 'A+',
        emergencyContact: 'David Chen +351 912 345 678',
        
        medicalConditions: [
          'PCOS (Polycystic Ovary Syndrome)',
          'Endometriosis',
          'Currently undergoing fertility treatment'
        ],
        allergies: ['Shellfish allergy'],
        currentMedications: [
          'Metformin 1000mg (PCOS management)',
          'Prenatal vitamins',
          'Folate supplement'
        ],
        
        documents: {
          passport: { 
            file: null, 
            uploaded: true, 
            address: 'demo_sarah_passport', 
            name: 'US Passport',
            details: 'P987654321 • Expires: 15 Mar 2031'
          },
          driversLicense: { 
            file: null, 
            uploaded: true, 
            address: 'demo_sarah_license', 
            name: 'Driver\'s License',
            details: 'Portugal • Expires: 15 Mar 2027'
          },
          governmentId: { file: null, uploaded: false, address: '', name: 'Government ID', details: '' },
          birthCertificate: { file: null, uploaded: false, address: '', name: 'Birth Certificate', details: '' },
          other: { file: null, uploaded: false, address: '', name: '', customName: '', details: '' }
        }
      };
    } else {
      return {
        name: 'David Chen',
        dateOfBirth: '1989-07-22',
        age: 36,
        sex: 'Male',
        taxId: '',
        nationality: 'Canadian',
        
        height: '180cm (5\'11")',
        weight: '78kg',
        bloodType: 'O-',
        emergencyContact: 'Sarah Chen +351 912 345 679',
        
        medicalConditions: [
          'Lower back pain (L4-L5 disc issues)',
          'Occasional tension headaches',
          'Supporting partner through fertility journey'
        ],
        allergies: ['No known allergies'],
        currentMedications: [
          'Ibuprofen (as needed for back pain)',
          'Multivitamin supplement'
        ],
        
        documents: {
          passport: { 
            file: null, 
            uploaded: true, 
            address: 'demo_david_passport', 
            name: 'Canadian Passport',
            details: 'C123456789 • Expires: 22 Jul 2030'
          },
          driversLicense: { 
            file: null, 
            uploaded: true, 
            address: 'demo_david_license', 
            name: 'Driver\'s License',
            details: 'Portugal • Expires: 22 Jul 2027'
          },
          governmentId: { file: null, uploaded: false, address: '', name: 'Government ID', details: '' },
          birthCertificate: { file: null, uploaded: false, address: '', name: 'Birth Certificate', details: '' },
          other: { file: null, uploaded: false, address: '', name: '', customName: '', details: '' }
        }
      };
    }
  };

  const [profile, setProfile] = useState(getPersonProfile());
  
  // Update profile when person/mode changes
  useEffect(() => {
    setProfile(getPersonProfile());
    setFormData(getPersonProfile());
  }, [familyMode, selectedPerson]);

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

  const handleDocumentUpload = async () => {
    if (!profile.documents[selectedDocumentType].file) {
      setStatusMessage('Please select a file first');
      return;
    }

    setUploading(true);
    setStatusMessage('Demo mode: Document upload simulation...');

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProfile = { ...profile };
      const doc = newProfile.documents[selectedDocumentType];
      doc.uploaded = true;
      doc.address = `demo_${selectedPerson}_${selectedDocumentType}_${Date.now()}`;
      
      if (selectedDocumentType === 'other' && customDocumentName.trim()) {
        doc.name = customDocumentName.trim();
        doc.details = `Custom document: ${customDocumentName.trim()}`;
      } else {
        doc.details = `Uploaded ${new Date().toLocaleDateString()}`;
      }
      
      setProfile(newProfile);
      setStatusMessage('Demo mode: Document uploaded successfully!');
      setSelectedDocumentType('');
      setCustomDocumentName('');
      
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setStatusMessage('Demo mode: Upload simulation failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDocumentDownload = (docType) => {
    const doc = profile.documents[docType];
    if (doc.uploaded) {
      setStatusMessage(`Demo mode: Downloading ${doc.name}...`);
      setTimeout(() => setStatusMessage(''), 2000);
    } else {
      setStatusMessage(`${doc.name} not uploaded yet`);
      setTimeout(() => setStatusMessage(''), 2000);
    }
  };

  // Profile editing functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
      [arrayName]: [...prev[arrayName], '']
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
    setStatusMessage('Demo mode: Saving profile...');
    
    try {
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfile(formData);
      setIsEditing(false);
      setProfileSaved(true);
      setStatusMessage('Demo mode: Profile saved successfully!');
      
      setTimeout(() => {
        setStatusMessage('');
        setProfileSaved(false);
      }, 3000);
    } catch (error) {
      setStatusMessage('Demo mode: Save simulation failed');
    }
  };

  const handleCancelEdit = () => {
    setFormData(profile);
    setIsEditing(false);
    setStatusMessage('');
  };

  return (
    <div className="dashboard-container">
      {/* Header matching Aldr Health style */}
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            onClick={navigateToChenfamily}
            className="hover:opacity-80 transition-opacity"
            title="Back to Chen Family"
          >
            <img 
              src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png"
              alt="Back" 
              className="h-16 w-16 object-contain"
              style={{ 
                imageRendering: 'high-quality'
              }}
            />
          </button>
        </div>
        <div className="header-center flex flex-col items-center justify-center">
          <div className="flex items-center">
            <i className="fas fa-id-card text-white text-2xl mr-3"></i>
            <h1 className="text-white text-4xl" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
              {getPersonDisplayName()} - Aldr Identity
            </h1>
          </div>
          <div className="text-base text-white italic mt-1">
            Aldr /ˈɑːl-dər/ — life, age, lifetime
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="dashboard-button white"
            onClick={() => alert('Demo mode: Document sharing functionality coming in production version')}
          >
            <i className="fas fa-share"></i>
            <span className="hidden sm:inline">Share Profile</span>
          </button>
          <a 
            href="mailto:james@ruleyproduction.com" 
            className="dashboard-button white"
          >
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">Contact</span>
          </a>
          <button 
            onClick={navigateToChenfamily}
            className="dashboard-button white"
          >
            <i className="fas fa-arrow-left"></i>
            <span className="hidden sm:inline">Back to Chen Family</span>
          </button>
        </div>
      </header>

      <div className="w-full animate-fade-in">
        <div className="w-full px-8 py-8">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Sex</label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Multiple">Multiple</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Tax ID / SSN</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="Enter your nationality"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-aldr-dark mb-4">Physical Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Height</label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                      placeholder="e.g., 85kg"
                    />
                  </div>

                  <div>
                    <label className="block text-aldr-dark font-medium mb-2">Blood Type</label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                            onChange={(e) => handleArrayInputChange('medicalConditions', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem('medicalConditions', index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('medicalConditions')}
                        className="px-4 py-2 bg-aldr-teal text-white rounded-md hover:bg-aldr-purple transition-colors"
                      >
                        Add Condition
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-aldr-dark font-medium mb-2">Allergies</label>
                      <div className="space-y-2">
                        {formData.allergies?.map((allergy, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={allergy}
                              onChange={(e) => handleArrayInputChange('allergies', index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('allergies', index)}
                              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('allergies')}
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
                              onChange={(e) => handleArrayInputChange('currentMedications', index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayItem('currentMedications', index)}
                              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('currentMedications')}
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
                    onClick={handleCancelEdit}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
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
                      <div><span className="font-medium text-aldr-gray">Chen ID:</span> {familyMode ? 'CF-2024-789012' : (selectedPerson === 'sarah' ? 'SC-1990-445678' : 'DC-1987-567890')}</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Health Information Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                                  {docData.details && (
                                    <p className="text-xs text-aldr-gray">{docData.details}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  className="dashboard-button outline text-xs"
                                  onClick={() => handleDocumentDownload(docType)}
                                >
                                  <i className="fas fa-download"></i>
                                  Download
                                </button>
                                <button 
                                  className="dashboard-button outline text-xs"
                                  onClick={() => alert('Demo Mode: Sharing functionality coming in production version')}
                                >
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
                        onClick={handleDocumentUpload}
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
                      statusMessage.includes('✅') || statusMessage.includes('successfully') ? 'bg-green-100 text-green-800' :
                      statusMessage.includes('❌') || statusMessage.includes('failed') ? 'bg-red-100 text-red-800' :
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

export default ChenIdentity;