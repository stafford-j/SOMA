import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [isOpinionMode, setIsOpinionMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const location = useLocation();
  
  // This is our test user ID - would come from authentication in a real app
  const testUserId = "1742961914546";

  // Memoize the fetchRecords function so we can call it from multiple places
  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const mode = isOpinionMode ? 'opinion' : 'data';
      
      console.log(`Fetching records from: http://localhost:5000/api/health-records/${testUserId}?mode=${mode}`);
      
      // Call API to get health records
      const response = await fetch(`http://localhost:5000/api/health-records/${testUserId}?mode=${mode}`);
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch records: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Records received:", data.length);
      setRecords(data);

      // Initialize all categories as expanded by default
      const categories = {};
      data.forEach(record => {
        categories[record.recordType] = true;
      });
      setExpandedCategories(prev => ({...prev, ...categories}));
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching records:", err);
      setError("Failed to load health records. Please try again later.");
      setLoading(false);
    }
  }, [isOpinionMode, testUserId]);

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

  // Get category color
  const getCategoryColor = (recordType) => {
    const colorMap = {
      bloodwork: 'bg-blue-100 text-blue-800',
      vaccination: 'bg-emerald-100 text-emerald-800',
      appointment: 'bg-purple-100 text-purple-800',
      medication: 'bg-rose-100 text-rose-800',
      allergy: 'bg-amber-100 text-amber-800',
      imaging: 'bg-cyan-100 text-cyan-800',
      vitals: 'bg-indigo-100 text-indigo-800',
      sleep: 'bg-blue-100 text-blue-800',
      exercise: 'bg-orange-100 text-orange-800',
      mental_health: 'bg-violet-100 text-violet-800'
    };
    
    return colorMap[recordType] || 'bg-gray-100 text-gray-800';
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
        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(record.recordType)}`}>
          {formatRecordType(record.recordType)}
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
      return <p className="text-gray-600">Loading records...</p>;
    }
    
    if (error) {
      return <p className="text-red-600">{error}</p>;
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
    
    // Get the 3 most recent records
    const recentRecords = sortedRecords.slice(0, 3);
    
    // Group remaining records by type
    const recordsByType = {};
    
    sortedRecords.forEach(record => {
      const type = record.recordType;
      if (!recordsByType[type]) {
        recordsByType[type] = [];
      }
      recordsByType[type].push(record);
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
            {recentRecords.map(record => renderRecordSummary(record))}
          </div>
        </section>
        
        {/* Records by Category */}
        <section>
          <h2 className="text-xl font-semibold mb-6 text-teal-800 border-b pb-2 border-teal-200">
            Records by Category
          </h2>
          
          {Object.entries(recordsByType).map(([type, typeRecords]) => (
            <div key={type} className="mb-6">
              <div 
                className="flex justify-between items-center mb-3 cursor-pointer"
                onClick={() => toggleCategory(type)}
              >
                <h3 className={`text-lg font-medium ${getCategoryColor(type)} px-3 py-1 rounded-md`}>
                  {formatRecordType(type)}
                  <span className="ml-2 text-sm">
                    ({typeRecords.length})
                  </span>
                </h3>
                <span>
                  {expandedCategories[type] ? '▼' : '►'}
                </span>
              </div>
              
              {expandedCategories[type] && (
                <div className="ml-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {typeRecords.slice(0, 4).map(record => renderRecordSummary(record))}
                  </div>
                  
                  {typeRecords.length > 4 && (
                    <div className="text-right mt-2">
                      <button className="text-teal-600 hover:text-teal-800 font-medium">
                        View All {formatRecordType(type)} Records ({typeRecords.length})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
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
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
            <button 
              onClick={toggleMode}
              className={`px-4 py-2 rounded-md transition ${
                isOpinionMode 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {isOpinionMode ? 'Opinion Mode' : 'Data Mode'}
            </button>
            <Link 
              to="/add-record" 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-center"
            >
              Add Record
            </Link>
          </div>
        </div>
      </header>

      <main className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold text-teal-800">Your Health Journey</h2>
          <div className="mt-2 md:mt-0">
            <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
              isOpinionMode 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-teal-100 text-teal-800'
            }`}>
              {isOpinionMode ? 'Opinion Mode' : 'Data Mode'}
              {isOpinionMode && (
                <span className="ml-1">(AI insights enabled)</span>
              )}
            </span>
          </div>
        </div>
        
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Dashboard;