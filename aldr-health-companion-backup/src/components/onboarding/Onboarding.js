import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // User profile data
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    bloodType: '',
    allergies: '',
    medications: '',
    conditions: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  
  // Knowledge preferences
  const [knowledgePreferences, setKnowledgePreferences] = useState({
    medical: true,
    nutrition: false,
    physiotherapy: false,
    holistic: false,
    mentalHealth: false
  });
  
  // File upload
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleKnowledgeChange = (e) => {
    const { name, checked } = e.target;
    setKnowledgePreferences({
      ...knowledgePreferences,
      [name]: checked
    });
  };
  
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };
  
  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;
    
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });
      
      const response = await axios.post('/api/health-records/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setUploadedFiles(response.data.uploadedFiles);
      setSelectedFiles([]);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async () => {
  setLoading(true);
  setError('');
  
  try {
    // In a real app, this would be an API call
    // For demo, we'll just use localStorage
    localStorage.setItem('onboardingComplete', 'true');
    
    // You could also save the profile data to localStorage for the demo
    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('knowledgePreferences', JSON.stringify(knowledgePreferences));
    
    // Redirect to dashboard
    navigate('/dashboard');
  } catch (err) {
    setError('Failed to save profile data. Please try again.');
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
            step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}>
            1
          </div>
          <div className={`h-1 w-10 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
            step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}>
            2
          </div>
          <div className={`h-1 w-10 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
            step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}>
            3
          </div>
        </div>
      </div>
    );
  };
  
  const renderStep1 = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  const renderStep2 = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">Health Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={profile.height}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={profile.weight}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Type
            </label>
            <select
              name="bloodType"
              value={profile.bloodType}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allergies (separated by commas)
          </label>
          <textarea
            name="allergies"
            value={profile.allergies}
            onChange={handleProfileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="2"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Medications (separated by commas)
          </label>
          <textarea
            name="medications"
            value={profile.medications}
            onChange={handleProfileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="2"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medical Conditions (separated by commas)
          </label>
          <textarea
            name="conditions"
            value={profile.conditions}
            onChange={handleProfileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="2"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={profile.emergencyContact}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyPhone"
              value={profile.emergencyPhone}
              onChange={handleProfileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  const renderStep3 = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">Personalization</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Knowledge Preferences</h3>
          <p className="text-gray-600 mb-4">
            Select which types of knowledge sources should be used when providing Opinion Mode insights:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="medical"
                name="medical"
                checked={knowledgePreferences.medical}
                onChange={handleKnowledgeChange}
                className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 rounded"
              />
              <label htmlFor="medical" className="ml-2">
                <span className="block text-sm font-medium text-gray-700">Medical (Conventional Medicine)</span>
                <span className="block text-xs text-gray-500">Evidence-based medical research and clinical guidelines</span>
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="nutrition"
                name="nutrition"
                checked={knowledgePreferences.nutrition}
                onChange={handleKnowledgeChange}
                className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 rounded"
              />
              <label htmlFor="nutrition" className="ml-2">
                <span className="block text-sm font-medium text-gray-700">Nutrition</span>
                <span className="block text-xs text-gray-500">Dietary recommendations and nutritional science</span>
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="physiotherapy"
                name="physiotherapy"
                checked={knowledgePreferences.physiotherapy}
                onChange={handleKnowledgeChange}
                className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 rounded"
              />
              <label htmlFor="physiotherapy" className="ml-2">
                <span className="block text-sm font-medium text-gray-700">Physiotherapy</span>
                <span className="block text-xs text-gray-500">Physical therapy and rehabilitation approaches</span>
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="holistic"
                name="holistic"
                checked={knowledgePreferences.holistic}
                onChange={handleKnowledgeChange}
                className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 rounded"
              />
              <label htmlFor="holistic" className="ml-2">
                <span className="block text-sm font-medium text-gray-700">Holistic/Alternative</span>
                <span className="block text-xs text-gray-500">Complementary and alternative medicine approaches</span>
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="mentalHealth"
                name="mentalHealth"
                checked={knowledgePreferences.mentalHealth}
                onChange={handleKnowledgeChange}
                className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 rounded"
              />
              <label htmlFor="mentalHealth" className="ml-2">
                <span className="block text-sm font-medium text-gray-700">Mental Health</span>
                <span className="block text-xs text-gray-500">Psychological and psychiatric perspectives</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Upload Initial Health Records</h3>
          <p className="text-gray-600 mb-4">
            You can upload existing health records to start populating your vault:
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            >
              Select Files
            </label>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  {selectedFiles.length} file(s) selected
                </p>
                <button
                  onClick={uploadFiles}
                  disabled={loading}
                  className="mt-2 px-4 py-1 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition"
                >
                  {loading ? 'Uploading...' : 'Upload Now'}
                </button>
              </div>
            )}
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-green-600">
                  {uploadedFiles.length} file(s) uploaded successfully
                </p>
                <ul className="mt-2 text-sm text-gray-600">
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            {loading ? 'Saving...' : 'Complete Setup'}
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-teal-700">Welcome to SOMA Companion</h1>
          <p className="text-gray-600">
            Let's set up your health vault. This information helps us personalize your experience.
          </p>
        </div>
        
        {renderStepIndicator()}
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default Onboarding;