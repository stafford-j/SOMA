/**
 * Chen Travel Companion
 * 
 * A travel document management dashboard for organizing:
 * - Travel itineraries and bookings
 * - Travel insurance and documentation
 * - Emergency contacts and information
 * - Cross-vault passport linking to Chen Identity
 * 
 * Features:
 * - Smart passport linking to Chen ID
 * - Travel status tracking (upcoming, completed, planned)
 * - Travel requirements management
 * - Emergency contact organization
 * - Family mode support (combine Sarah + David records)
 * - Individual mode support (show specific person)
 * 
 * @author Aldr Team
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import chenFamilyData from '../data/chen-family-data';
import '../styles/Dashboard.css';

const ChenTravel = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Helper functions defined before usage to avoid hoisting issues
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      business_travel: 'fa-briefcase',
      personal_travel: 'fa-heart',
      medical_travel: 'fa-heartbeat',
      family_travel: 'fa-users',
      adventure_travel: 'fa-mountain',
      cultural_travel: 'fa-camera',
      trip_planning: 'fa-map-marked-alt',
      travel_documents: 'fa-passport',
      emergency_contacts: 'fa-phone',
      other: 'fa-suitcase'
    };
    return iconMap[category] || 'fa-suitcase';
  };

  // Format category name
  const formatCategoryName = (category) => {
    return category
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get status color
  const getStatusColor = (status) => {
    const colorMap = {
      'Confirmed': 'bg-green-100 text-green-800',
      'Pending approval': 'bg-yellow-100 text-yellow-800',
      'Planning': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      planned: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      pending: 'bg-orange-100 text-orange-800',
      current: 'bg-green-100 text-green-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

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

  const getRecords = () => {
    if (familyMode) {
      // Family mode: combine both person's records with owner field
      const sarahRecords = chenFamilyData.sarah.travel.map(record => ({ 
        ...record, 
        owner: 'Sarah Chen',
        // Normalize date fields
        date: record.dates ? record.dates.split(' to ')[0] : record.departureDate || record.date || '2024-01-01',
        departureDate: record.dates ? record.dates.split(' to ')[0] : record.departureDate || '2024-01-01',
        returnDate: record.dates ? record.dates.split(' to ')[1] : record.returnDate || '2024-01-01'
      }));
      const davidRecords = chenFamilyData.david.travel.map(record => ({ 
        ...record, 
        owner: 'David Chen',
        // Normalize date fields
        date: record.dates ? record.dates.split(' to ')[0] : record.departureDate || record.date || '2024-01-01',
        departureDate: record.dates ? record.dates.split(' to ')[0] : record.departureDate || '2024-01-01',
        returnDate: record.dates ? record.dates.split(' to ')[1] : record.returnDate || '2024-01-01'
      }));
      
      return [...sarahRecords, ...davidRecords]
        .sort((a, b) => new Date(b.date || b.departureDate || '2024-01-01') - new Date(a.date || a.departureDate || '2024-01-01'));
    } else {
      // Individual mode: show selected person's records
      const personRecords = selectedPerson === 'sarah' 
        ? chenFamilyData.sarah.travel 
        : chenFamilyData.david.travel;
      
      return personRecords.map(record => ({
        ...record,
        // Normalize date fields
        date: record.dates ? record.dates.split(' to ')[0] : record.departureDate || record.date || '2024-01-01',
        departureDate: record.dates ? record.dates.split(' to ')[0] : record.departureDate || '2024-01-01',
        returnDate: record.dates ? record.dates.split(' to ')[1] : record.returnDate || '2024-01-01'
      }));
    }
  };

  // Use Chen family travel records
  const actualRecords = getRecords();

  // Travel reminders (upcoming trips)
  const travelReminders = [
    {
      id: 'reminder-1',
      title: familyMode ? 'Madrid Fertility Trip (Both)' : (selectedPerson === 'sarah' ? 'Madrid Fertility Consultation' : 'Berlin DockerCon Conference'),
      dueDate: familyMode ? '2025-02-08' : (selectedPerson === 'sarah' ? '2025-02-08' : '2025-05-15'),
      lastDate: '2025-01-01',
      priority: 'high',
      icon: 'fa-plane',
      type: 'departure'
    },
    {
      id: 'reminder-2', 
      title: familyMode ? 'Residence Permit Renewals' : (selectedPerson === 'sarah' ? 'Portuguese Language Exam' : 'Client Workshop Valencia'),
      dueDate: familyMode ? '2028-02-20' : (selectedPerson === 'sarah' ? '2025-06-30' : '2025-03-22'),
      lastDate: '2023-02-20',
      priority: 'medium',
      icon: 'fa-passport',
      type: 'appointment'
    },
    {
      id: 'reminder-3',
      title: 'Travel Insurance Renewal',
      dueDate: '2025-12-31',
      lastDate: '2024-01-01',
      priority: 'medium',
      icon: 'fa-shield-alt',
      type: 'renewal'
    },
  ];

  const processRecords = () => {
    // Sort by date (newest first)
    const recordsCopy = [...actualRecords].sort((a, b) => new Date(b.departureDate || b.date || '2024-01-01') - new Date(a.departureDate || a.date || '2024-01-01'));

    // Get top 3 most recent records
    const recentRecords = recordsCopy.slice(0, 3);

    // Get upcoming trips (future departure dates)
    const today = new Date();
    const upcomingTrips = recordsCopy
      .filter(record => 
        record.departureDate && 
        new Date(record.departureDate) > today
      )
      .sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate))
      .slice(0, 3);

    // Group records by category
    const categories = {};
    recordsCopy.forEach(record => {
      const category = record.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(record);
    });

    return {
      recentRecords,
      upcomingTrips,
      categories
    };
  };

  const { recentRecords, upcomingTrips, categories } = processRecords();

  return (
    <div className="dashboard-container">
      {/* Header matching homepage style */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link 
            to="/"
            className="hover:opacity-80 transition-opacity"
            title="Back to Home"
          >
            <img 
              src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png"
              alt="Home" 
              className="h-16 w-16 object-contain"
              style={{ 
                imageRendering: 'high-quality'
              }}
            />
          </Link>
        </div>
        <div className="header-center flex flex-col items-center justify-center">
          <div className="flex items-center">
            <i className="fas fa-plane text-white text-2xl mr-3"></i>
            <h1 className="text-white text-4xl" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
              {getPersonDisplayName()} Travel
            </h1>
          </div>
          <div className="text-base text-white italic mt-1">
            Aldr /ˈɑːl-dər/ — life, age, lifetime
          </div>
        </div>
        <div className="header-actions">
          <button className="dashboard-button white" onClick={() => alert('Add new travel document coming soon!')}>
            <i className="fas fa-plus"></i>
            <span className="hidden sm:inline">Add Travel Document</span>
          </button>
          <button className="dashboard-button white" onClick={() => alert('Smart travel planning features coming soon!')}>
            <i className="fas fa-route"></i>
            <span className="hidden sm:inline">Plan Trip</span>
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
              {/* Cross-Vault Passport Link */}
              <section className="mb-8">
                <div className="card bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-link"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-aldr-dark">Passport Information</h3>
                        <p className="text-sm text-aldr-gray">Passport data is managed in Chen Identity and linked here for travel planning</p>
                      </div>
                    </div>
                    <Link 
                      to={`/chen-identity${familyMode ? '?mode=family' : `?mode=individual&person=${selectedPerson}`}`} 
                      className="dashboard-button outline"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      View in Chen Identity
                    </Link>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {familyMode ? (
                        <>
                          <div>
                            <span className="font-medium text-aldr-gray">Sarah's Passport:</span>
                            <div className="text-aldr-dark">US Passport 123456789</div>
                          </div>
                          <div>
                            <span className="font-medium text-aldr-gray">David's Passport:</span>
                            <div className="text-aldr-dark">Canadian Passport CA987654321</div>
                          </div>
                          <div>
                            <span className="font-medium text-aldr-gray">Status:</span>
                            <div className="text-green-600 font-medium">Both Valid for Travel</div>
                          </div>
                        </>
                      ) : selectedPerson === 'sarah' ? (
                        <>
                          <div>
                            <span className="font-medium text-aldr-gray">Passport:</span>
                            <div className="text-aldr-dark">US Passport 123456789</div>
                          </div>
                          <div>
                            <span className="font-medium text-aldr-gray">Expires:</span>
                            <div className="text-aldr-dark">15 Mar 2030</div>
                          </div>
                          <div>
                            <span className="font-medium text-aldr-gray">Status:</span>
                            <div className="text-green-600 font-medium">Valid for Travel</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="font-medium text-aldr-gray">Passport:</span>
                            <div className="text-aldr-dark">Canadian Passport CA987654321</div>
                          </div>
                          <div>
                            <span className="font-medium text-aldr-gray">Expires:</span>
                            <div className="text-aldr-dark">20 May 2029</div>
                          </div>
                          <div>
                            <span className="font-medium text-aldr-gray">Status:</span>
                            <div className="text-green-600 font-medium">Valid for Travel</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Travel Stats Summary */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-suitcase text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{actualRecords.length}</h3>
                      <p className="text-white text-opacity-80">Travel Records</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-clock text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{upcomingTrips.length}</h3>
                      <p className="text-white text-opacity-80">Upcoming Trips</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-globe text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{familyMode ? '8' : (selectedPerson === 'sarah' ? '5' : '4')}</h3>
                      <p className="text-white text-opacity-80">Countries Visited</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </section>

              {/* Travel Reminders */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Travel Reminders</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-bell"></i>
                    Manage Reminders
                  </button>
                </div>

                <div className="card">
                  <div className="divide-y">
                    {travelReminders.map(reminder => (
                      <div key={reminder.id} className="py-4 flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white ${
                          reminder.priority === 'high' ? 'bg-red-500' : 'bg-aldr-teal'
                        }`}>
                          <i className={`fas ${reminder.icon}`}></i>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-aldr-dark">
                            {reminder.title}
                            {reminder.priority === 'high' && (
                              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-pill text-xs">
                                Due Soon
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-aldr-gray">Due: {formatDate(reminder.dueDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Upcoming Trips */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Upcoming Trips</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-calendar"></i>
                    View Calendar
                  </button>
                </div>

                {upcomingTrips.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingTrips.map(trip => (
                      <div key={trip.id} className="card hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                            <i className={`fas ${getCategoryIcon(trip.category)}`}></i>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-aldr-dark">{trip.title}</h3>
                            <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(trip.status)}`}>
                              {trip.status || 'Planned'}
                            </span>
                            {familyMode && trip.owner && (
                              <span className="ml-2 px-2 py-1 rounded-pill text-xs bg-gray-100 text-gray-600">
                                {trip.owner}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-aldr-gray mb-2">{trip.destination}</p>
                        <p className="text-sm text-aldr-gray mb-2">Departure: {formatDate(trip.departureDate)}</p>
                        <p className="text-sm text-aldr-gray mb-4">Return: {formatDate(trip.returnDate)}</p>

                        <button className="btn-secondary w-full text-sm" onClick={() => alert('Demo Mode: Full travel details coming in production version')}>
                          View Trip Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-aldr-gray">No upcoming trips found</p>
                )}
              </section>

              {/* Recent Travel Activity */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Recent Travel Activity</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-eye"></i>
                    View All
                  </button>
                </div>

                <div className="card">
                  <div className="divide-y">
                    {recentRecords.map(record => (
                      <div key={record.id} className="py-3 flex items-center">
                        <div className="w-10 h-10 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                          <i className={`fas ${getCategoryIcon(record.category)}`}></i>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-aldr-dark">
                            {record.purpose || record.title}
                            {familyMode && record.owner && (
                              <span className="ml-2 text-xs text-aldr-gray">({record.owner})</span>
                            )}
                          </p>
                          <p className="text-sm text-aldr-gray">{record.destination} • {formatDate(record.departureDate)}</p>
                        </div>
                        <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Travel by Category */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Travel by Category</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(categories).map(([category, records]) => (
                    <div key={category} className="card hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-aldr-gradient flex items-center justify-center mr-3 text-white">
                          <i className={`fas ${getCategoryIcon(category)}`}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-aldr-dark">{formatCategoryName(category)}</h3>
                          <p className="text-sm text-aldr-gray">{records.length} records</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {records.slice(0, 2).map(record => (
                          <div key={record.id} className="text-sm text-aldr-gray">
                            • {record.destination || record.title}
                            {familyMode && record.owner && (
                              <span className="text-xs ml-1">({record.owner})</span>
                            )}
                          </div>
                        ))}
                        {records.length > 2 && (
                          <div className="text-xs text-aldr-teal">
                            +{records.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Activity Feed */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Recent Activity Feed</h2>
                </div>

                <div className="card">
                  <div className="divide-y">
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-eye"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Viewed {getPersonDisplayName()} Travel Dashboard</p>
                        <p className="text-sm text-aldr-gray">Today, just now</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Switched to {familyMode ? 'Family' : 'Individual'} Mode</p>
                        <p className="text-sm text-aldr-gray">Today</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aldr-purple flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-link"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Linked passport data from Chen Identity</p>
                        <p className="text-sm text-aldr-gray">Yesterday, 3:45 PM</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer with Family ID */}
              <footer className="text-center mt-12 py-6 border-t border-gray-200">
                <p className="text-aldr-gray">
                  {familyMode ? 'Chen Family ID: CF-2024-789012' : (selectedPerson === 'sarah' ? 'Sarah Chen ID: SC-1990-445678' : 'David Chen ID: DC-1987-567890')}
                </p>
                <p className="text-sm text-aldr-gray mt-2">
                  © 2025 Aldr. All rights reserved.
                </p>
              </footer>
        </div>
      </div>
    </div>
  );
};

export default ChenTravel;