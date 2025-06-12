import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UniformHeader from '../components/layout/UniformHeader';

const AldrId = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [profile, setProfile] = useState({
    name: 'James Stafford',
    dob: '15/08/1984',
    age: 41,
    sex: 'Male',
    weight: '85',
    height: '6\'0', // 184cm converted
    bloodType: 'Unknown',
    emergencyContact: 'Catherine Conaghan 555-0123',
    generalHealth: 'Generally I am ok. I am currently in rehab for psoas syndrome which was found via trigger points. I am looking forward to exercising again soon.',
    medicalConditions: ['L5-S1 - posterior protrusion (since March 2024)', 'Psoas Syndrome (since March 2025)', 'Cryptorchidism (since birth)'],
    allergies: ['None'],
    medications: ['None'],
    surgeries: ['Right index finger @ 16 years old – severed tendon']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Update form data when profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    let heightInMeters;
    
    if (heightStr.includes("'")) {
      // Convert height from ft/in to meters
      const heightParts = heightStr.split("'");
      if (heightParts.length !== 2) return "N/A";
      
      const feet = parseInt(heightParts[0]);
      // Remove the double quote from inches if present
      const inchesStr = heightParts[1].replace('"', '');
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
      <UniformHeader />
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
                    Aldr ID
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
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-aldr-dark font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                  />
                </div>

                <div>
                  <label className="block text-aldr-dark font-medium mb-2">Date of Birth</label>
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    placeholder="DD/MM/YYYY"
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
                  <label className="block text-aldr-dark font-medium mb-2">Weight (kg)</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                  />
                </div>

                <div>
                  <label className="block text-aldr-dark font-medium mb-2">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                    placeholder="e.g., 6'0 or 184cm"
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
                    <option value="Unknown">Unknown</option>
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
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-aldr-dark font-medium mb-2">General Health Notes</label>
                <textarea
                  name="generalHealth"
                  value={formData.generalHealth}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                />
              </div>

              {/* Medical Conditions */}
              <div className="mt-6">
                <label className="block text-aldr-dark font-medium mb-2">Medical Conditions</label>
                {formData.medicalConditions?.map((condition, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={condition}
                      onChange={(e) => handleArrayChange(e, 'medicalConditions', index)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal mr-2"
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

              {/* Allergies */}
              <div className="mt-6">
                <label className="block text-aldr-dark font-medium mb-2">Allergies</label>
                {formData.allergies?.map((allergy, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={allergy}
                      onChange={(e) => handleArrayChange(e, 'allergies', index)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal mr-2"
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

              {/* Medications */}
              <div className="mt-6">
                <label className="block text-aldr-dark font-medium mb-2">Current Medications</label>
                {formData.medications?.map((medication, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={medication}
                      onChange={(e) => handleArrayChange(e, 'medications', index)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('medications', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('medications')}
                  className="px-4 py-2 bg-aldr-teal text-white rounded-md hover:bg-aldr-purple transition-colors"
                >
                  Add Medication
                </button>
              </div>

              {/* Surgery History */}
              <div className="mt-6">
                <label className="block text-aldr-dark font-medium mb-2">Surgery History</label>
                {formData.surgeries?.map((surgery, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={surgery}
                      onChange={(e) => handleArrayChange(e, 'surgeries', index)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aldr-teal mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('surgeries', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('surgeries')}
                  className="px-4 py-2 bg-aldr-teal text-white rounded-md hover:bg-aldr-purple transition-colors"
                >
                  Add Surgery
                </button>
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
                  type="submit"
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6">
              {/* Identity Documents Section - Moved to top */}
              <div className="mb-6">
                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">Identity Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-medium text-aldr-dark mb-3">Passport</h4>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-medium text-aldr-dark">Irish Passport</h5>
                            <p className="text-xs text-aldr-gray">Expires: 15 Aug 2029</p>
                            <p className="text-xs text-aldr-gray">P1234567</p>
                          </div>
                          <i className="fas fa-passport text-aldr-teal text-xl"></i>
                        </div>
                        <div className="relative">
                          <div className="flex space-x-2" style={{ filter: 'grayscale(50%)', opacity: 0.7 }}>
                            <button className="flex-1 dashboard-button outline text-xs cursor-default">
                              <i className="fas fa-eye mr-1"></i>
                              Open
                            </button>
                            <button className="flex-1 dashboard-button outline text-xs cursor-default">
                              <i className="fas fa-share-alt mr-1"></i>
                              Share
                            </button>
                            <button className="flex-1 dashboard-button outline text-xs cursor-default">
                              <i className="fas fa-download mr-1"></i>
                              Download
                            </button>
                          </div>
                          <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                            Coming Soon
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-aldr-dark mb-3">Additional Documents</h4>
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h5 className="font-medium text-aldr-dark">Driver's License</h5>
                              <p className="text-xs text-aldr-gray">Ontario, Canada</p>
                              <p className="text-xs text-aldr-gray">Expires: 15 Aug 2027</p>
                            </div>
                            <i className="fas fa-id-card text-aldr-teal text-xl"></i>
                          </div>
                          <div className="relative">
                            <div className="flex space-x-2" style={{ filter: 'grayscale(50%)', opacity: 0.7 }}>
                              <button className="flex-1 dashboard-button outline text-xs cursor-default">
                                <i className="fas fa-eye mr-1"></i>
                                Open
                              </button>
                              <button className="flex-1 dashboard-button outline text-xs cursor-default">
                                <i className="fas fa-share-alt mr-1"></i>
                                Share
                              </button>
                              <button className="flex-1 dashboard-button outline text-xs cursor-default">
                                <i className="fas fa-download mr-1"></i>
                                Download
                              </button>
                            </div>
                            <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                              Coming Soon
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h5 className="font-medium text-aldr-dark">Health Card</h5>
                              <p className="text-xs text-aldr-gray">Ontario Health</p>
                              <p className="text-xs text-aldr-gray">No expiry</p>
                            </div>
                            <i className="fas fa-heart text-aldr-teal text-xl"></i>
                          </div>
                          <div className="relative">
                            <div className="flex space-x-2" style={{ filter: 'grayscale(50%)', opacity: 0.7 }}>
                              <button className="flex-1 dashboard-button outline text-xs cursor-default">
                                <i className="fas fa-eye mr-1"></i>
                                Open
                              </button>
                              <button className="flex-1 dashboard-button outline text-xs cursor-default">
                                <i className="fas fa-share-alt mr-1"></i>
                                Share
                              </button>
                              <button className="flex-1 dashboard-button outline text-xs cursor-default">
                                <i className="fas fa-download mr-1"></i>
                                Download
                              </button>
                            </div>
                            <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                              Coming Soon
                            </div>
                          </div>
                        </div>
                        <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-aldr-gray hover:border-aldr-teal hover:text-aldr-teal transition-colors">
                          <i className="fas fa-plus mr-2"></i>
                          Add Document
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div><span className="font-medium text-aldr-gray">Name:</span> {profile.name}</div>
                    <div><span className="font-medium text-aldr-gray">Date of Birth:</span> {profile.dob}</div>
                    <div><span className="font-medium text-aldr-gray">Age:</span> {profile.age}</div>
                    <div><span className="font-medium text-aldr-gray">Sex:</span> {profile.sex}</div>
                    <div><span className="font-medium text-aldr-gray">Blood Type:</span> {profile.bloodType}</div>
                    <div><span className="font-medium text-aldr-gray">Emergency Contact:</span> {profile.emergencyContact}</div>
                  </div>
                </div>

                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">Physical Stats</h3>
                  <div className="space-y-3">
                    <div><span className="font-medium text-aldr-gray">Weight:</span> {profile.weight} kg</div>
                    <div><span className="font-medium text-aldr-gray">Height:</span> {profile.height}</div>
                    <div><span className="font-medium text-aldr-gray">BMI:</span> {calculateBMI()}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">General Health</h3>
                  <p className="text-aldr-gray">{profile.generalHealth}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">Medical Conditions</h3>
                  <ul className="list-disc list-inside space-y-1 text-aldr-gray">
                    {profile.medicalConditions?.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </div>

                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">Allergies</h3>
                  <ul className="list-disc list-inside space-y-1 text-aldr-gray">
                    {profile.allergies?.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">Current Medications</h3>
                  <ul className="list-disc list-inside space-y-1 text-aldr-gray">
                    {profile.medications?.map((medication, index) => (
                      <li key={index}>{medication}</li>
                    ))}
                  </ul>
                </div>

                <div className="card bg-aldr-light">
                  <h3 className="text-lg font-semibold text-aldr-dark mb-4">Surgery History</h3>
                  <ul className="list-disc list-inside space-y-1 text-aldr-gray">
                    {profile.surgeries?.map((surgery, index) => (
                      <li key={index}>{surgery}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Link 
                  to="/" 
                  className="btn-secondary"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AldrId;