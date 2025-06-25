import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'James Stafford',
    dob: '15/08/1984',
    age: 41,
    sex: 'Male',
    weight: '85',
    height: '6\'0', // 184cm converted
    bloodType: 'Unknown',
    emergencyContact: 'Catherine Conaghan 00353 87 6232849',
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
    localStorage.setItem('userProfile', JSON.stringify(formData));
    alert('Profile updated successfully!');
  };

  // Load from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
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
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-teal-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">SOMA ID: Health Profile</h1>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Weight (kg)</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="6'0 or 184cm"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
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
                  <label className="block text-gray-700 font-medium mb-2">Emergency Contact</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">General Health Status</label>
                <textarea
                  name="generalHealth"
                  value={formData.generalHealth}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Describe your general health status"
                ></textarea>
              </div>
              
              {/* Medical Conditions */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Medical Conditions</label>
                {formData.medicalConditions.map((condition, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={condition}
                      onChange={(e) => handleArrayChange(e, 'medicalConditions', index)}
                      className="flex-grow border rounded-md px-3 py-2 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('medicalConditions', index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('medicalConditions')}
                  className="mt-2 bg-teal-600 text-white px-3 py-1 rounded-md"
                >
                  Add Condition
                </button>
              </div>
              
              {/* Allergies */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Allergies</label>
                {formData.allergies.map((allergy, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={allergy}
                      onChange={(e) => handleArrayChange(e, 'allergies', index)}
                      className="flex-grow border rounded-md px-3 py-2 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('allergies', index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('allergies')}
                  className="mt-2 bg-teal-600 text-white px-3 py-1 rounded-md"
                >
                  Add Allergy
                </button>
              </div>
              
              {/* Medications */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Medications</label>
                {formData.medications.map((medication, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={medication}
                      onChange={(e) => handleArrayChange(e, 'medications', index)}
                      className="flex-grow border rounded-md px-3 py-2 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('medications', index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('medications')}
                  className="mt-2 bg-teal-600 text-white px-3 py-1 rounded-md"
                >
                  Add Medication
                </button>
              </div>
              
              {/* Surgeries */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Surgeries</label>
                {formData.surgeries.map((surgery, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={surgery}
                      onChange={(e) => handleArrayChange(e, 'surgeries', index)}
                      className="flex-grow border rounded-md px-3 py-2 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('surgeries', index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('surgeries')}
                  className="mt-2 bg-teal-600 text-white px-3 py-1 rounded-md"
                >
                  Add Surgery
                </button>
              </div>
              
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <div className="flex space-x-3">
                  <Link 
                    to="/" 
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Back to Dashboard
                  </Link>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-medium text-gray-800 mb-2">General Health Status</h3>
                <p>{profile.generalHealth}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-2">Basic Information</h3>
                  <ul className="space-y-2">
                    <li><span className="font-medium">Date of Birth:</span> {profile.dob}</li>
                    <li><span className="font-medium">Age:</span> {profile.age}</li>
                    <li><span className="font-medium">Sex:</span> {profile.sex}</li>
                    <li><span className="font-medium">Blood Type:</span> {profile.bloodType}</li>
                    <li><span className="font-medium">Emergency Contact:</span> {profile.emergencyContact}</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-2">Vitals</h3>
                  <ul className="space-y-2">
                    <li><span className="font-medium">Weight:</span> {profile.weight} kg</li>
                    <li><span className="font-medium">Height:</span> {profile.height}</li>
                    <li><span className="font-medium">BMI:</span> {calculateBMI()}</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-2">Medical Conditions</h3>
                  {profile.medicalConditions.length > 0 && profile.medicalConditions[0] !== 'None' ? (
                    <ul className="list-disc list-inside space-y-1">
                      {profile.medicalConditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No medical conditions listed</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-2">Allergies</h3>
                  {profile.allergies.length > 0 && profile.allergies[0] !== 'None' ? (
                    <ul className="list-disc list-inside space-y-1">
                      {profile.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No allergies</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-2">Current Medications</h3>
                  {profile.medications.length > 0 && profile.medications[0] !== 'None' ? (
                    <ul className="list-disc list-inside space-y-1">
                      {profile.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No medications</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-2">Surgeries</h3>
                  {profile.surgeries.length > 0 && profile.surgeries[0] !== 'None' ? (
                    <ul className="list-disc list-inside space-y-1">
                      {profile.surgeries.map((surgery, index) => (
                        <li key={index}>{surgery}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No surgeries</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;