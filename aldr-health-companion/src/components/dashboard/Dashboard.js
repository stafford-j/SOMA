import Navbar from '../layout/Navbar';
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import './Dashboard.css';
import SOMADashboardTemplate from './soma-dashboard-template';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [isOpinionMode, setIsOpinionMode] = useState(false); // Default to Data mode
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const location = useLocation();
  
  // Force set user ID first, then retrieve it
  useEffect(() => {
    console.log('Dashboard component mounted - setting userId');
    localStorage.setItem('userId', '1742961914546');
  }, []);
  
  // Get user ID from localStorage or fall back to hardcoded value
  const userId = localStorage.getItem('userId') || "1742961914546";

  // Memoize the fetchRecords function so we can call it from multiple places
  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const mode = isOpinionMode ? 'opinion' : 'data';
      
      console.log(`Fetching records from: http://localhost:5000/api/health-records/${userId}?mode=${mode}`);
      
      // Call API to get health records with timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const response = await fetch(`http://localhost:5000/api/health-records/${userId}?mode=${mode}`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        clearTimeout(timeoutId); // Clear the timeout if the request completes
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch records: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Records received:", data.length);
        
        if (!Array.isArray(data)) {
          console.error("Received non-array data:", data);
          throw new Error("Invalid data format received from server");
        }
        
        setRecords(data);
  
        // Initialize all categories as expanded by default
        const categories = {};
        data.forEach(record => {
          const specialty = record.specialty || 'other';
          const type = record.recordType;
          
          // Expand specialty level
          categories[specialty] = true;
          
          // Expand type level within specialty 
          categories[`${specialty}-${type}`] = true;
        });
        
        setExpandedCategories(prev => ({...prev, ...categories}));
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out - is the backend server running?');
        }
        throw fetchError;
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching records:", err);
      setError(`Failed to load health records: ${err.message || 'Unknown error'}`);
      setLoading(false);
      
      // Implement basic retry mechanism
      setTimeout(() => {
        console.log("Retrying fetch records...");
        setLoading(true);
        setError(null);
        fetchRecords();
      }, 3000); // Retry after 3 seconds
    }
  }, [isOpinionMode, userId]);

  // Fetch records when component mounts or opinion mode changes
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords, isOpinionMode]);
  
  // Add a refresh effect when returning to this page
  useEffect(() => {
    fetchRecords();
    
    // Set up periodic refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchRecords();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, [fetchRecords, location]);

  const toggleMode = () => {
    console.log(`Toggling mode from ${isOpinionMode ? 'Opinion' : 'Data'} to ${!isOpinionMode ? 'Opinion' : 'Data'}`);
    setIsOpinionMode(!isOpinionMode);
  };

  // Manual refresh function
  const handleRefresh = () => {
    fetchRecords();
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
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
      
      // Physiotherapy
      physio_assessment: 'bg-green-50 text-green-700',
      physio_treatment: 'bg-green-50 text-green-700',
      exercise_program: 'bg-green-50 text-green-700',
      progress_review: 'bg-green-50 text-green-700',
      
      // Chiropractic
      adjustment: 'bg-emerald-50 text-emerald-700',
      xray_assessment: 'bg-emerald-50 text-emerald-700',
      maintenance_visit: 'bg-emerald-50 text-emerald-700',
      
      // Massage/Bodywork
      deep_tissue: 'bg-purple-50 text-purple-700',
      trigger_point: 'bg-purple-50 text-purple-700',
      sports_massage: 'bg-purple-50 text-purple-700',
      thai_massage: 'bg-purple-50 text-purple-700',
      reflexology: 'bg-purple-50 text-purple-700',
      craniosacral: 'bg-purple-50 text-purple-700',
      myofascial: 'bg-purple-50 text-purple-700',
      
      // Mental Health
      therapy_session: 'bg-violet-50 text-violet-700',
      mental_assessment: 'bg-violet-50 text-violet-700',
      medication_review: 'bg-violet-50 text-violet-700',
      
      // Nutrition
      nutrition_assessment: 'bg-amber-50 text-amber-700',
      nutrition_followup: 'bg-amber-50 text-amber-700',
      diet_plan: 'bg-amber-50 text-amber-700',
      
      // Alternative/Complementary
      acupuncture: 'bg-indigo-50 text-indigo-700',
      naturopathy: 'bg-indigo-50 text-indigo-700',
      homeopathy: 'bg-indigo-50 text-indigo-700',
      ayurveda: 'bg-indigo-50 text-indigo-700',
      tcm: 'bg-indigo-50 text-indigo-700',
      energy_healing: 'bg-indigo-50 text-indigo-700',
      
      // Dentistry
      dental_checkup: 'bg-cyan-50 text-cyan-700',
      dental_cleaning: 'bg-cyan-50 text-cyan-700',
      dental_procedure: 'bg-cyan-50 text-cyan-700',
      dental_surgery: 'bg-cyan-50 text-cyan-700',
      
      // Optometry
      eye_exam: 'bg-sky-50 text-sky-700',
      eye_prescription: 'bg-sky-50 text-sky-700',
      eye_treatment: 'bg-sky-50 text-sky-700',
      
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

  /// Helper function to render insights based on the data structure
// eslint-disable-next-line no-unused-vars
const renderInsights = (insights) => {
  if (!insights) return null;
  
  // Get all insight categories (medical, nutritional, etc.)
  const categories = Object.keys(insights);
  
  if (categories.length === 0) return null;
  
  return (
    <div className="mt-3 border-t pt-3 border-purple-200">
      <h4 className="text-sm font-semibold text-purple-700">AI Insights:</h4>
      
      {categories.map(category => (
        <div key={category} className="mb-3">
          <h5 className="text-sm font-medium capitalize">{category} Perspective:</h5>
          <p className="text-sm mt-1">{insights[category].summary}</p>
          
          {insights[category].recommendations && (
            <div className="mt-2">
              <p className="text-xs font-medium">Recommendations:</p>
              <ul className="text-xs list-disc pl-5">
                {insights[category].recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
          
          {insights[category].sources && (
            <p className="text-xs text-gray-500 mt-1">
              Sources: {insights[category].sources.join(', ')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
 };
 
  // Function to render a record card (summary version)
  const renderRecordSummary = (record) => (
    <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition mb-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{record.title}</h3>
        {/* Combined specialty and record type into one tag */}
        <span className={`px-3 py-1 rounded-full text-xs ${getSpecialtyColor(record.specialty)}`}>
          {formatRecordType(record.specialty)}: {formatRecordType(record.recordType)}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">{formatDate(record.date)}</p>
      
      <div className="mt-4 flex space-x-2">
        <Link 
          to={`/record/${record.id}`}
          className="text-teal-600 text-sm font-medium hover:text-teal-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );

  // Render the dashboard content
  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
          <p className="text-gray-600">Loading your health records...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="p-6 border border-red-300 rounded-md bg-red-50 max-w-lg mx-auto my-8">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg font-medium text-red-800">Connection Error</h3>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Retry Connection
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reload Page
            </button>
          </div>
          <div className="mt-4 p-3 bg-white rounded-md border border-red-200">
            <h4 className="font-medium text-gray-700 mb-2">Troubleshooting Tips:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Make sure the backend server is running on port 5000</li>
              <li>Try running <code className="bg-gray-100 px-1 rounded">npm start</code> in the backend directory</li>
              <li>Check if there are any errors in the backend console</li>
              <li>Ensure your network connection is stable</li>
            </ul>
          </div>
        </div>
      );
    }
    
    if (records.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No health records found.</p>
          <Link 
            to="/add-record" 
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Add Your First Record
          </Link>
        </div>
      );
    }

    // Sort records by date (newest first)
    const sortedRecords = [...records].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    // Take the 3 most recent records, excluding appointment-type records
    const nonAppointmentRecords = sortedRecords.filter(record => 
      !record.recordType.includes('appointment') && 
      record.recordType !== 'annual_physical'
    );
    const recentRecords = nonAppointmentRecords.slice(0, 3);
    
    // Get upcoming appointments (those with dates in the future)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    
    // Get appointment-type records with future dates
    const upcomingAppointments = sortedRecords
      .filter(record => 
        ((record.recordType === 'annual_physical' || 
         record.recordType === 'consultation' ||
         record.recordType === 'physio_assessment' ||
         record.recordType === 'therapy_session' ||
         record.recordType === 'dental_checkup' ||
         record.recordType === 'eye_exam') && 
        new Date(record.date) >= today)
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date (ascending)
      .slice(0, 3); // Limit to 3 upcoming appointments
      
    // Make sure the Annual Check-up with date 2025-11-01 is included in upcoming appointments if available
    const annualCheckup = sortedRecords.find(record => 
      record.title === 'Annual Check-up' && 
      record.recordType === 'annual_physical' &&
      record.date.includes('2025-11-01')
    );
    
    if (annualCheckup && !upcomingAppointments.some(app => app.id === annualCheckup.id)) {
      // Add to upcoming appointments if not already there
      upcomingAppointments.unshift(annualCheckup);
      // Keep only 3 upcoming appointments
      if (upcomingAppointments.length > 3) {
        upcomingAppointments.pop();
      }
    }
    
    // Group all records by specialty first then by type
    const recordsBySpecialty = {};
    
    sortedRecords.forEach(record => {
      const specialty = record.specialty || 'other';
      if (!recordsBySpecialty[specialty]) {
        recordsBySpecialty[specialty] = {
          records: [],
          recordsByType: {}
        };
      }
      
      // Add to specialty list
      recordsBySpecialty[specialty].records.push(record);
      
      // Add to type list within specialty
      const type = record.recordType;
      if (!recordsBySpecialty[specialty].recordsByType[type]) {
        recordsBySpecialty[specialty].recordsByType[type] = [];
      }
      recordsBySpecialty[specialty].recordsByType[type].push(record);
    });

    return (
      <>
        {/* Recent Records Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-teal-800 border-b pb-2 border-teal-200">
              Recent Records
            </h2>
            <button 
              onClick={handleRefresh} 
              className="text-teal-600 hover:text-teal-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentRecords.length > 0 ? (
              recentRecords.map(record => renderRecordSummary(record))
            ) : (
              <p className="text-gray-500 col-span-3 text-center">No recent records found</p>
            )}
          </div>
        </section>
        
        {/* Upcoming Appointments Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-teal-800 border-b pb-2 border-teal-200">
            Upcoming Appointments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(record => renderRecordSummary(record))
            ) : (
              <p className="text-gray-500 col-span-3 text-center">No upcoming appointments</p>
            )}
          </div>
          <div className="mt-4 text-right">
            <Link 
              to="/add-record?type=appointment" 
              className="text-teal-600 hover:text-teal-800 font-medium flex items-center justify-end"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add an Upcoming Appointment
            </Link>
          </div>
        </section>
        
        {/* Records by Specialty & Type - Improved styling */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-teal-800 border-b pb-2 border-teal-200">
            Records by Category
          </h2>
          
          {Object.entries(recordsBySpecialty).map(([specialty, { records, recordsByType }]) => (
            <div key={specialty} className="mb-8 border rounded-lg overflow-hidden shadow-sm">
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 border-b cursor-pointer"
                onClick={() => toggleCategory(specialty)}
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {formatRecordType(specialty)}
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    ({records.length} records)
                  </span>
                </h3>
                <div className="flex items-center">
                  <Link 
                    to={`/category/${specialty}`} 
                    className="text-sm text-teal-600 hover:text-teal-800 mr-3 font-medium"
                  >
                    View All
                  </Link>
                  <span className="text-gray-400">
                    {expandedCategories[specialty] ? '▼' : '►'}
                  </span>
                </div>
              </div>
              
              {expandedCategories[specialty] && (
                <div className="p-4">
                  {/* First show record types within this specialty */}
                  {Object.entries(recordsByType).map(([type, typeRecords]) => (
                    <div key={`${specialty}-${type}`} className="mb-4 border rounded-lg overflow-hidden">
                      <div 
                        className="flex justify-between items-center p-2 bg-gray-50 border-b cursor-pointer"
                        onClick={() => toggleCategory(`${specialty}-${type}`)}
                      >
                        <div className="flex items-center">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getSpecialtyColor(specialty).split(' ')[0]}`}></span>
                          <h4 className="text-md font-medium text-gray-700">
                            {formatRecordType(type)}
                            <span className="ml-2 text-sm text-gray-500 font-normal">
                              ({typeRecords.length})
                            </span>
                          </h4>
                        </div>
                        <div className="flex items-center">
                          <Link 
                            to={`/category/${specialty}/${type}`} 
                            className="text-xs text-teal-600 hover:text-teal-800 mr-2"
                          >
                            View All
                          </Link>
                          <span className="text-gray-400">
                            {expandedCategories[`${specialty}-${type}`] ? '▼' : '►'}
                          </span>
                        </div>
                      </div>
                      
                      {expandedCategories[`${specialty}-${type}`] && (
                        <div className="p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {typeRecords.slice(0, 4).map(record => renderRecordSummary(record))}
                          </div>
                          
                          {typeRecords.length > 4 && (
                            <div className="text-center mt-3">
                              <Link 
                                to={`/category/${specialty}/${type}`}
                                className="px-4 py-2 inline-block bg-gray-100 text-teal-600 rounded hover:bg-gray-200 text-sm font-medium"
                              >
                                View All {formatRecordType(type)} Records ({typeRecords.length})
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </>
    );
  };

  // For now, either use the new template or the old content
  const useNewTemplate = true; // Set to false to use the original dashboard

  if (useNewTemplate) {
    return (
      <div>
        <Navbar />
        <SOMADashboardTemplate 
          records={records}
          loading={loading}
          error={error}
          userId={userId}
        />
      </div>
    );
  }

  // Original dashboard return
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <header className="bg-white shadow-md rounded-lg mb-6 p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-2 text-teal-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2zm0-8h2v6h-2z" />
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-teal-700" style={{ fontFamily: 'Playfair Display, serif' }}>Aldr Health Companion</h1>
                <p className="text-xs text-gray-500">aldrvault.io</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
              <Link 
                to="/add-record" 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-center"
              >
                Add Record
              </Link>
              <Link 
                to="/profile" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center"
              >
                Aldr ID
              </Link>
            </div>
          </div>
        </header>

        <main className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h2 className="text-2xl font-semibold text-teal-800">Your Health Journey</h2>
          </div>
          
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;