/**
 * Record Details Page
 * 
 * Displays detailed information about a specific health record.
 * Features:
 * - Toggleable Data/Opinion modes
 * - Basic record information display
 * - Provider and location details
 * - Full record description
 * - AI insights when in Opinion mode
 * - Navigation back to dashboard
 * 
 * This component uses sample data directly rather than API calls,
 * making it suitable for demonstrations without backend services.
 * 
 * @author SOMA Companion Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import sampleRecords from '../components/dashboard/sample-records';

const RecordDetails = () => {
  const [record, setRecord] = useState(null);
  const [isOpinionMode, setIsOpinionMode] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false); // Toggle between original and translated content
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { recordId } = useParams();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching record ${recordId} using sample data`);
        
        // Find the record in our sample records
        let foundRecord = sampleRecords.find(record => record.id === recordId);
        
        // Also check for the sample dermatology record that's in the dashboard template
        const dermatologyRecord = {
          id: 'dermatology-1',
          title: 'Annual Dermatology Checkup',
          specialty: 'medical',
          recordType: 'consultation',
          date: '2025-06-05',
          description: 'Full body skin examination with dermatologist Dr. Wilson',
          provider: 'Coastal Dermatology Center',
          insights: {
            medical: {
              summary: "Normal skin exam with no suspicious lesions or moles.",
              recommendations: [
                "Continue annual skin screenings.",
                "Use broad-spectrum sunscreen daily."
              ],
              sources: ["American Academy of Dermatology"]
            },
            holistic: {
              summary: "Skin health reflects overall wellbeing and nutrition.",
              recommendations: [
                "Maintain hydration for skin health.",
                "Consider antioxidant-rich foods."
              ],
              sources: ["Mayo Clinic", "Cleveland Clinic"]
            }
          }
        };
        
        if (recordId === 'dermatology-1') {
          foundRecord = dermatologyRecord;
        }
        
        if (!foundRecord) {
          throw new Error("Record not found in sample data");
        }
        
        // Convert the sample record to the format expected by the details component
        const adaptedRecord = {
          ...foundRecord,
          id: foundRecord.id,
          title: foundRecord.title,
          specialty: foundRecord.specialty,
          recordType: foundRecord.recordType,
          date: foundRecord.date,
          content: {
            details: foundRecord.description,
            location: foundRecord.provider,
            doctor: foundRecord.provider?.split(',')[0] || foundRecord.provider
          },
          insights: foundRecord.insights
        };
        
        console.log("Record prepared:", adaptedRecord);
        setRecord(adaptedRecord);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching record:", err);
        setError("Failed to load health record. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId, isOpinionMode]);

  // Set mode to data
  const setDataMode = () => {
    if (isOpinionMode) {
      console.log('Switching to Data Mode');
      setIsOpinionMode(false);
    }
  };

  // Set mode to opinion
  const setOpinionMode = () => {
    if (!isOpinionMode) {
      console.log('Switching to Opinion Mode');
      setIsOpinionMode(true);
    }
  };

  // Format date in a readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format record type for display
  const formatRecordType = (type) => {
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get specialty color
  const getSpecialtyColor = (specialty) => {
    const colorMap = {
      medical: 'bg-blue-100 text-blue-800',
      physiotherapy: 'bg-green-100 text-green-800',
      chiropractic: 'bg-emerald-100 text-emerald-800',
      massage: 'bg-purple-100 text-purple-800',
      mental_health: 'bg-violet-100 text-violet-800',
      nutrition: 'bg-amber-100 text-amber-800',
      alternative: 'bg-indigo-100 text-indigo-800',
      dentistry: 'bg-cyan-100 text-cyan-800',
      optometry: 'bg-sky-100 text-sky-800',
      other: 'bg-gray-100 text-gray-800'
    };
    
    return colorMap[specialty] || 'bg-gray-100 text-gray-800';
  };
  
  // Get record type color (more muted than specialty colors)
  const getRecordTypeColor = (recordType) => {
    const colorMap = {
      // Medical
      consultation: 'bg-blue-50 text-blue-700',
      laboratory: 'bg-blue-50 text-blue-700',
      imaging: 'bg-blue-50 text-blue-700',
      prescription: 'bg-blue-50 text-blue-700',
      vaccination: 'bg-blue-50 text-blue-700',
      surgery: 'bg-blue-50 text-blue-700',
      emergency: 'bg-blue-50 text-blue-700',
      annual_physical: 'bg-blue-50 text-blue-700',
      
      // Legacy types (for backward compatibility)
      bloodwork: 'bg-blue-50 text-blue-700',
      appointment: 'bg-blue-50 text-blue-700',
      medication: 'bg-blue-50 text-blue-700',
      allergy: 'bg-blue-50 text-blue-700',
      vitals: 'bg-blue-50 text-blue-700',
      sleep: 'bg-blue-50 text-blue-700',
      exercise: 'bg-green-50 text-green-700'
    };
    
    return colorMap[recordType] || 'bg-gray-50 text-gray-700';
  };

  // Helper function to render insights based on the data structure
  const renderInsights = (insights) => {
    console.log("Rendering insights:", insights);
    if (!insights) return null;
    
    // Get all insight categories (medical, nutritional, etc.)
    const categories = Object.keys(insights);
    
    if (categories.length === 0) return null;
    
    return (
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="bg-purple-50 p-6 rounded-lg">
            <h4 className="text-lg font-medium capitalize text-purple-800 mb-3">{category} Perspective</h4>
            <p className="mb-4">{insights[category].summary}</p>
            
            {insights[category].recommendations && (
              <div className="mb-4">
                <h5 className="font-medium text-purple-800 mb-2">Recommendations:</h5>
                <ul className="list-disc pl-6 space-y-2">
                  {insights[category].recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {insights[category].sources && (
              <div className="text-sm text-gray-600">
                <h5 className="font-medium mb-1">Sources:</h5>
                <ul className="list-disc pl-6 space-y-1">
                  {insights[category].sources.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">Loading record...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-red-600">{error}</p>
          <Link to="/" className="mt-4 inline-block text-teal-600 hover:text-teal-800">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Render no record found state
  if (!record) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600">Record not found.</p>
          <Link to="/" className="mt-4 inline-block text-teal-600 hover:text-teal-800">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <header className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-2 text-teal-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2zm0-8h2v6h-2z" />
            </svg>
            <div>
              <h1 className="text-2xl font-bold text-teal-700">SOMA | Companion</h1>
              <p className="text-xs text-gray-500">somavault.io</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              to="/"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="mb-3 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">{record.title}</h2>
            <p className="text-gray-600 mt-1">{formatDate(record.date)}</p>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <div className="flex space-x-2 items-center">
              {/* Combined specialty and record type into one tag */}
              <span className={`px-3 py-1 rounded-full ${getSpecialtyColor(record.specialty || 'other')}`}>
                {formatRecordType(record.specialty || 'other')}: {formatRecordType(record.recordType)}
              </span>
              <Link
                to={`/edit-record/${record.id}`}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={setDataMode}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  !isOpinionMode 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Data Mode
              </button>
              <button 
                onClick={setOpinionMode}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  isOpinionMode 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                Opinion Mode
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-teal-800 mb-4">
            {isOpinionMode ? "AI Insights" : "Record Details"}
          </h3>
          
          {!isOpinionMode ? (
            // DATA MODE - Show Record Details
            <div className="bg-gray-50 p-4 rounded-lg">
              {/* Basic Information Section */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 text-lg border-b pb-2 mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="font-medium">{formatDate(record.date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Specialty</p>
                    <p className="font-medium">{formatRecordType(record.specialty || 'other')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Record Type</p>
                    <p className="font-medium">{formatRecordType(record.recordType)}</p>
                  </div>
                  {record.content.location && (
                    <div>
                      <p className="text-gray-600 text-sm">Location</p>
                      <p className="font-medium">{record.content.location}</p>
                    </div>
                  )}
                  {record.content.doctor && (
                    <div>
                      <p className="text-gray-600 text-sm">Doctor/Medical Group</p>
                      <p className="font-medium">{record.content.doctor}</p>
                    </div>
                  )}
                  {record.content.duration && (
                    <div>
                      <p className="text-gray-600 text-sm">Duration</p>
                      <p className="font-medium">{record.content.duration}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 text-lg border-b pb-2 mb-3">Notes & Description</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="whitespace-pre-line">{record.content.details}</p>
                </div>
              </div>
            </div>
          ) : (
            // OPINION MODE - Show AI Insights
            record.insights && Object.keys(record.insights).length > 0 ? (
              renderInsights(record.insights)
            ) : (
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-600">No AI insights available for this record type.</p>
                <p className="text-sm text-gray-500 mt-2">Try a different record or switch back to Data Mode.</p>
              </div>
            )
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-teal-600 hover:text-teal-800 font-medium"
            >
              &larr; Back to Dashboard
            </Link>
            
            <div className="flex space-x-3">
              <Link
                to={`/edit-record/${record.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Record
              </Link>
              
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Share Record
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordDetails;