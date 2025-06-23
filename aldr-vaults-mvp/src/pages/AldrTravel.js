/**
 * Aldr Travel Companion
 * 
 * A travel document management dashboard for organizing:
 * - Travel itineraries and bookings
 * - Travel insurance and documentation
 * - Emergency contacts and information
 * - Cross-vault passport linking to Aldr ID
 * 
 * Features:
 * - Smart passport linking to Aldr ID
 * - Travel status tracking (upcoming, completed, planned)
 * - Travel requirements management
 * - Emergency contact organization
 * 
 * @author Aldr Team
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import sampleTravelRecords from '../data/travel-records';
import '../styles/Dashboard.css';

const AldrTravel = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use sample travel records
  const actualRecords = sampleTravelRecords;

  // Travel reminders (upcoming trips)
  const travelReminders = [
    {
      id: 'reminder-1',
      title: 'Dublin Trip Departure',
      dueDate: '2025-06-28',
      lastDate: '2025-06-01',
      priority: 'high',
      icon: 'fa-plane',
      type: 'departure'
    },
    {
      id: 'reminder-2', 
      title: 'Global Entry Interview',
      dueDate: '2025-07-15',
      lastDate: '2025-02-20',
      priority: 'medium',
      icon: 'fa-passport',
      type: 'appointment'
    },
    {
      id: 'reminder-3',
      title: 'Travel Insurance Renewal',
      dueDate: '2025-12-31',
      lastDate: '2025-01-01',
      priority: 'medium',
      icon: 'fa-shield-alt',
      type: 'renewal'
    },
  ];

  const processRecords = () => {
    // Sort by date (newest first)
    const recordsCopy = [...actualRecords].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get top 3 most recent records
    const recentRecords = recordsCopy.slice(0, 3);

    // Get upcoming trips (future departure dates)
    const today = new Date();
    const upcomingTrips = recordsCopy
      .filter(record => 
        record.departureDate && 
        new Date(record.departureDate) > today &&
        record.category !== 'travel_insurance' &&
        record.category !== 'emergency_contacts'
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      trip_planning: 'fa-map-marked-alt',
      business_travel: 'fa-briefcase',
      personal_travel: 'fa-heart',
      travel_insurance: 'fa-shield-alt',
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
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      planned: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      pending: 'bg-orange-100 text-orange-800',
      current: 'bg-green-100 text-green-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="dashboard-container">
      {/* Header matching other Aldr vaults */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="flex flex-col">
            <div className="flex items-center">
              <i className="fas fa-plane text-white text-3xl mr-4"></i>
              <div>
                <h1 className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Aldr Travel</h1>
                <div className="text-sm text-white italic mt-1">
                  Aldr /ˈɑːl-dər/ — life, age, lifetime
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="header-actions">
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
                    <i className="fas fa-plane text-xl"></i>
                  </div>
                  <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Travel Documents
                  </h1>
                </div>
                <button className="dashboard-button white" onClick={() => alert('Add new travel document coming soon!')}>
                  <i className="fas fa-plus mr-2"></i>
                  Add Travel Document
                </button>
              </div>
            </div>

            <div className="p-6">
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
                        <p className="text-sm text-aldr-gray">Your passport data is managed in Aldr ID and linked here for travel planning</p>
                      </div>
                    </div>
                    <Link to="/vault/aldr-id" className="dashboard-button outline">
                      <i className="fas fa-external-link-alt mr-2"></i>
                      View in Aldr ID
                    </Link>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="font-medium text-aldr-gray">Passport:</span>
                        <div className="text-aldr-dark">Irish Passport P1234567</div>
                      </div>
                      <div>
                        <span className="font-medium text-aldr-gray">Expires:</span>
                        <div className="text-aldr-dark">15 Aug 2029</div>
                      </div>
                      <div>
                        <span className="font-medium text-aldr-gray">Status:</span>
                        <div className="text-green-600 font-medium">Valid for Travel</div>
                      </div>
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
                      <h3 className="text-xl font-bold">5</h3>
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
                              {trip.status}
                            </span>
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
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-plane"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Booked Dublin business trip</p>
                        <p className="text-sm text-aldr-gray">Today, 2:30 PM</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aldr-purple flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-passport"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Applied for Global Entry</p>
                        <p className="text-sm text-aldr-gray">February 20, 2025</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-shield-alt"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Renewed travel insurance</p>
                        <p className="text-sm text-aldr-gray">January 1, 2025</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer with User ID */}
              <footer className="text-center mt-12 py-6 border-t border-gray-200">
                <p className="text-aldr-gray">Aldr ID: 1742961914546</p>
                <p className="text-sm text-aldr-gray mt-2">
                  © 2025 Aldr. All rights reserved.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AldrTravel;