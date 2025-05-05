/**
 * SOMA Dashboard Template
 * 
 * A modern, SOMA-styled dashboard for health records displaying:
 * - Health Statistics
 * - Recent Records
 * - Upcoming Appointments
 * - Health Check Reminders
 * - Records by Category
 * - Recent Activity
 * 
 * Features:
 * - Responsive design
 * - Loading and error states
 * - Sample data integration
 * - Category-based organization
 * 
 * @author SOMA Companion Team
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import sampleRecords from './sample-records';

const SOMADashboardTemplate = ({ records = [], loading = false, error = null, userId = "1234" }) => {
  // Force using sample records for testing
  const actualRecords = sampleRecords;

  // Add dermatology record to demo data if not present
  const dermatologyRecord = {
    id: 'dermatology-1',
    title: 'Dermatology Consultation',
    specialty: 'medical',
    recordType: 'consultation',
    date: '2025-04-06',
    description: 'Full body skin examination at FACHARZTZENTRUM CARVOEIRO with Dr. Shirin Samimi-Fard',
    provider: 'Consultório Médico de Especialidades, Carvoeiro',
    location: 'Carvoeiro, Portugal',
    findings: [
      'Two pigmented moles on the back (non-suspicious, to be monitored yearly)',
      'Rosacea stadium I on nose with telangiectasias and diffuse erythema',
      'Sunburn freckles on both shoulders',
      'Psoriatic plaques on knees (right more pronounced)',
      'Small wart on left leg (shaved under local anesthesia)'
    ],
    treatments: [
      'Calcipotriol cream for psoriatic plaques (twice daily)',
      'IPL and Laser treatment for rosacea planned for winter',
      'Wart removal performed'
    ],
    insights: {
      medical: {
        summary: "Multiple skin conditions identified requiring regular monitoring and targeted treatments.",
        recommendations: [
          "Annual skin cancer screenings due to history of sunburns.",
          "Use broad-spectrum sunscreen daily.",
          "Continue Calcipotriol cream application as prescribed.",
          "Return for IPL/Laser treatment of rosacea in winter."
        ],
        sources: ["Consultório Médico de Especialidades Carvoeiro", "Fotofinder System with AI scoring"]
      },
      holistic: {
        summary: "Skin conditions may be exacerbated by sun exposure and potentially linked to immune system regulation.",
        recommendations: [
          "Maintain proper sun protection, especially for shoulders with existing sun damage.",
          "Consider anti-inflammatory diet which may help manage psoriasis symptoms.",
          "Stay adequately hydrated for overall skin health."
        ],
        sources: ["Mayo Clinic", "European Academy of Dermatology"]
      }
    }
  };

  // Mock appointments data - preserve in case records is empty
  const demoAppointments = [
    { id: 1, title: 'Annual Check-up', specialty: 'medical', recordType: 'annual_physical', date: '2025-11-01' },
    { id: 2, title: 'Dental Cleaning', specialty: 'dentistry', recordType: 'dental_cleaning', date: '2025-06-15' },
    { id: 3, title: 'Therapy Session', specialty: 'mental_health', recordType: 'therapy_session', date: '2025-05-20' }
  ];

  // Health check reminders
  const healthReminders = [
    {
      id: 'reminder-1',
      title: 'Annual Physical Check-up',
      dueDate: '2025-11-01',
      lastDate: '2024-11-05',
      priority: 'medium',
      icon: 'fa-user-md'
    },
    {
      id: 'reminder-2',
      title: 'Dermatology Appointment',
      dueDate: '2025-06-05',
      lastDate: '2024-06-12',
      priority: 'high',
      icon: 'fa-stethoscope'
    },
    {
      id: 'reminder-3',
      title: 'Dental Checkup',
      dueDate: '2025-06-15',
      lastDate: '2024-12-18',
      priority: 'medium',
      icon: 'fa-tooth'
    },
  ];

  // Format records by category and ensure dermatology record is included
  const processRecords = () => {
    let recordsCopy = [...actualRecords];

    // Add dermatology record if not present
    if (!recordsCopy.find(r => r.title === 'Annual Dermatology Checkup')) {
      recordsCopy.push(dermatologyRecord);
    }

    // Sort by date (newest first)
    recordsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get top 3 most recent records
    const recentRecords = recordsCopy.slice(0, 3);

    // Get upcoming appointments (future dates)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointmentTypes = ['annual_physical', 'consultation', 'therapy_session', 'dental_checkup', 'eye_exam'];

    let upcomingAppointments = recordsCopy
      .filter(record =>
        appointmentTypes.includes(record.recordType) &&
        new Date(record.date) >= today
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    // If no appointments in data, use demo appointments
    if (upcomingAppointments.length === 0) {
      upcomingAppointments = demoAppointments;
    }

    // Group records by category
    const categories = {};

    recordsCopy.forEach(record => {
      const specialty = record.specialty || 'other';
      if (!categories[specialty]) {
        categories[specialty] = [];
      }
      categories[specialty].push(record);
    });

    return {
      recentRecords,
      upcomingAppointments,
      categories
    };
  };

  const { recentRecords, upcomingAppointments, categories } = processRecords();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get specialty icon
  const getSpecialtyIcon = (specialty) => {
    const iconMap = {
      medical: 'fa-stethoscope',
      physiotherapy: 'fa-walking',
      chiropractic: 'fa-bone',
      massage: 'fa-hands',
      mental_health: 'fa-brain',
      nutrition: 'fa-apple-alt',
      alternative: 'fa-leaf',
      dentistry: 'fa-tooth',
      optometry: 'fa-eye',
      other: 'fa-notes-medical'
    };

    return iconMap[specialty] || 'fa-file-medical';
  };

  // Format specialty name
  const formatSpecialtyName = (specialty) => {
    return specialty
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Render loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-left">
            <img
              src="https://static.wixstatic.com/media/afc39f_da0a94021ba6434399c2fbd4fd0ee013~mv2.png"
              alt="SOMA Logo"
              className="dashboard-logo"
            />
            <h1 className="dashboard-title">Health Dashboard</h1>
          </div>
        </header>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <div className="loading-spinner"></div>
          <p>Loading your health records...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-left">
            <img
              src="https://static.wixstatic.com/media/afc39f_da0a94021ba6434399c2fbd4fd0ee013~mv2.png"
              alt="SOMA Logo"
              className="dashboard-logo"
            />
            <h1 className="dashboard-title">Health Dashboard</h1>
          </div>
        </header>
        <div className="modal-container" style={{ margin: '2rem auto' }}>
          <div className="modal-header">
            <h3 className="modal-title">Connection Error</h3>
          </div>
          <div className="modal-content">
            <p>{error}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={() => window.location.reload()} className="dashboard-button">Retry Connection</button>
              <button onClick={() => window.location.reload()} className="dashboard-button outline">Reload Page</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img
            src="https://static.wixstatic.com/media/afc39f_da0a94021ba6434399c2fbd4fd0ee013~mv2.png"
            alt="SOMA Logo"
            className="dashboard-logo"
          />
          <h1 className="dashboard-title">Health Dashboard</h1>
        </div>
        <div className="header-actions">
          <Link to="/add-record" className="dashboard-button">
            <i className="fas fa-plus"></i>
            Add New Record
          </Link>
        </div>
      </header>

      {/* Health Stats Summary */}
      <section className="dashboard-cards">
        <div className="dashboard-card medical">
          <div className="card-header">
            <div className="card-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h2 className="card-title">Health Records</h2>
          </div>
          <div className="card-content">
            <p className="card-value">{actualRecords.length}</p>
            <p>Total health records in your account</p>
          </div>
        </div>

        <div className="dashboard-card holistic">
          <div className="card-header">
            <div className="card-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <h2 className="card-title">Diabetes Management</h2>
          </div>
          <div className="card-content">
            <div className="progress-indicator">
              <div className="progress-circle">
                <svg viewBox="0 0 36 36" style={{ transform: 'rotate(0deg)' }}>
                  <path className="progress-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="2"
                  />
                  <path className="progress-fill"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#228B22"
                    strokeWidth="2.5"
                    strokeDasharray={`${65}, 100`}
                    strokeLinecap="round"
                    transform="rotate(-90, 18, 18)"
                  />
                  <text x="18" y="21" textAnchor="middle" fill="#228B22" fontWeight="bold" fontSize="9px" style={{ transform: 'rotate(0deg)', transformOrigin: 'center' }}>65%</text>
                </svg>
              </div>
              <p style={{ fontWeight: 'bold', color: '#228B22' }}>Overall Progress</p>
            </div>
            <p style={{ margin: '0.5rem 0' }}>Type 2 Diabetes Care Plan</p>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '0.75rem' }}>
              <Link to="/care-plan" className="dashboard-button">
                <i className="fas fa-clipboard-list"></i>
                View Care Plan
              </Link>
            </div>
          </div>
        </div>

        <div className="dashboard-card mental">
          <div className="card-header">
            <div className="card-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h2 className="card-title">Shared Access</h2>
          </div>
          <div className="card-content">
            <p className="card-value">2</p>
            <p>People with access to your health data</p>
          </div>
        </div>
      </section>

      {/* Health Check Reminders */}
      <section className="recent-activity" style={{ marginTop: '2rem' }}>
        <div className="activity-header">
          <h2 className="activity-title">Health Check Reminders</h2>
          <div className="dashboard-button outline" style={{ cursor: 'default' }}>
            <i className="fas fa-bell"></i>
            Manage Reminders
          </div>
        </div>

        <ul className="activity-list">
          {healthReminders.map(reminder => (
            <li key={reminder.id} className="activity-item">
              <div className="activity-icon" style={{
                backgroundColor: reminder.priority === 'high' ? 'rgba(220, 38, 38, 0.1)' : 'var(--light-bg)',
                color: reminder.priority === 'high' ? '#DC2626' : 'var(--primary-teal)'
              }}>
                <i className={`fas ${reminder.icon}`}></i>
              </div>
              <div className="activity-info">
                <p className="activity-text">
                  {reminder.title}
                  {reminder.priority === 'high' && (
                    <span style={{
                      backgroundColor: '#DC2626',
                      color: 'white',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      marginLeft: '0.5rem'
                    }}>
                      Due Soon
                    </span>
                  )}
                </p>
                <p className="activity-time">Due: {formatDate(reminder.dueDate)}</p>
              </div>
              <div className="dashboard-button" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'default' }}>
                Schedule
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent Records Section */}
      <section className="recent-activity" style={{ marginTop: '2rem' }}>
        <div className="activity-header">
          <h2 className="activity-title">Recent Health Records</h2>
          <div className="dashboard-button outline" style={{ cursor: 'default' }}>
            <i className="fas fa-eye"></i>
            View All
          </div>
        </div>

        {recentRecords.length > 0 ? (
          <div className="dashboard-cards">
            {recentRecords.map(record => (
              <div key={record.id} className={`dashboard-card ${record.specialty}`}>
                <div className="card-header">
                  <div className="card-icon">
                    <i className={`fas ${getSpecialtyIcon(record.specialty)}`}></i>
                  </div>
                  <h2 className="card-title">{record.title}</h2>
                </div>
                <div className="card-content">
                  <p style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'rgba(32, 178, 170, 0.1)',
                    display: 'inline-block',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    marginBottom: '0.5rem'
                  }}>
                    {formatSpecialtyName(record.specialty)}
                  </p>
                  <p>{formatDate(record.date)}</p>
                  <p>{record.description || "No description available"}</p>
                </div>

                <Link to={`/record/${record.id}`} className="dashboard-button outline" style={{ marginTop: '1rem' }}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No recent records found</p>
        )}
      </section>

      {/* Upcoming Appointments Section */}
      <section className="recent-activity" style={{ marginTop: '2rem' }}>
        <div className="activity-header">
          <h2 className="activity-title">Upcoming Appointments</h2>
          <div className="dashboard-button outline" style={{ cursor: 'default' }}>
            <i className="fas fa-calendar-plus"></i>
            Add Appointment
          </div>
        </div>

        <ul className="activity-list">
          {upcomingAppointments.map(appointment => (
            <li key={appointment.id} className="activity-item">
              <div className="activity-icon">
                <i className={`fas ${getSpecialtyIcon(appointment.specialty)}`}></i>
              </div>
              <div className="activity-info">
                <p className="activity-text">{appointment.title}</p>
                <p className="activity-time">{formatDate(appointment.date)}</p>
              </div>
              <Link to={`/record/${appointment.id}`} className="dashboard-button outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                Details
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Records by Category - Using expandable categories similar to original dashboard */}
      <section style={{ marginTop: '2rem' }}>
        <div style={{
          borderBottom: '2px solid var(--primary-teal)',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <h2 className="activity-title">Records by Category</h2>
        </div>

        {Object.keys(categories).length > 0 ? (
          Object.entries(categories).map(([specialty, records]) => {
            // Group records by type within specialty
            const recordsByType = {};
            records.forEach(record => {
              const type = record.recordType;
              if (!recordsByType[type]) {
                recordsByType[type] = [];
              }
              recordsByType[type].push(record);
            });

            return (
              <div key={specialty} className="recent-activity" style={{ marginBottom: '1.5rem' }}>
                <div className="activity-header" style={{ cursor: 'pointer' }}>
                  <h2 className="activity-title">
                    <i className={`fas ${getSpecialtyIcon(specialty)}`} style={{ marginRight: '0.5rem' }}></i>
                    {formatSpecialtyName(specialty)}
                    <span style={{
                      fontSize: '0.8rem',
                      color: 'var(--gray-text)',
                      marginLeft: '0.5rem'
                    }}>
                      ({records.length})
                    </span>
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="dashboard-button outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginRight: '0.5rem', cursor: 'default' }}>
                      View All
                    </div>
                    <span style={{ color: 'var(--gray-text)' }}>▼</span>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  {/* Record Types within this specialty */}
                  {Object.entries(recordsByType).map(([type, typeRecords]) => (
                    <div key={`${specialty}-${type}`} style={{
                      marginBottom: '1.5rem',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                        cursor: 'pointer'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: specialty === 'medical' ? 'var(--medical-blue)' :
                                          specialty === 'dentistry' ? 'var(--primary-teal)' :
                                          specialty === 'mental_health' ? 'var(--mental-purple)' :
                                          'var(--holistic-green)',
                            display: 'inline-block',
                            marginRight: '0.5rem'
                          }}></span>
                          <h3 style={{ fontWeight: 500, fontSize: '1rem' }}>
                            {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            <span style={{ fontSize: '0.8rem', color: 'var(--gray-text)', marginLeft: '0.4rem' }}>
                              ({typeRecords.length})
                            </span>
                          </h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--primary-teal)',
                            marginRight: '0.5rem',
                            cursor: 'default'
                          }}>
                            View All
                          </div>
                          <span style={{ color: 'var(--gray-text)' }}>▼</span>
                        </div>
                      </div>

                      <div style={{ padding: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                          {typeRecords.slice(0, 2).map(record => (
                            <div key={record.id} style={{
                              padding: '1rem',
                              border: '1px solid rgba(0,0,0,0.1)',
                              borderRadius: '8px',
                              backgroundColor: 'white'
                            }}>
                              <div style={{ marginBottom: '0.5rem' }}>
                                <h4 style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.25rem' }}>{record.title}</h4>
                                <p style={{ color: 'var(--gray-text)', fontSize: '0.8rem' }}>{formatDate(record.date)}</p>
                              </div>
                              {record.description && (
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                                  {record.description.length > 80
                                    ? record.description.substring(0, 80) + '...'
                                    : record.description}
                                </p>
                              )}

                              <Link to={`/record/${record.id}`} className="dashboard-button outline" style={{
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.8rem',
                                display: 'inline-block'
                              }}>
                                View Details
                              </Link>
                            </div>
                          ))}
                        </div>

                        {typeRecords.length > 2 && (
                          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <div style={{
                              display: 'inline-block',
                              padding: '0.5rem 1rem',
                              backgroundColor: 'rgba(0,0,0,0.05)',
                              borderRadius: '4px',
                              color: 'var(--primary-teal)',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              cursor: 'default'
                            }}>
                              View All {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Records ({typeRecords.length})
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', padding: '1rem' }}>No records found</p>
        )}
      </section>

      {/* Activity Feed */}
      <section className="recent-activity" style={{ marginTop: '2rem' }}>
        <div className="activity-header">
          <h2 className="activity-title">Recent Activity</h2>
          <div className="dashboard-button outline" style={{ cursor: 'default' }}>
            <i className="fas fa-eye"></i>
            View All
          </div>
        </div>

        <ul className="activity-list">
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Added new blood pressure reading</p>
              <p className="activity-time">Today, 2:30 PM</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-sync-alt"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Updated medication information</p>
              <p className="activity-time">Yesterday, 10:15 AM</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-search"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Viewed lab results</p>
              <p className="activity-time">May 3, 2025, 4:45 PM</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Shared access with Dr. Smith</p>
              <p className="activity-time">April 29, 2025, 11:20 AM</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Footer with User ID */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '1rem',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        color: 'var(--gray-text)',
        fontSize: '0.9rem'
      }}>
        <p>SOMA ID: {userId}</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          © 2025 SOMA Health. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SOMADashboardTemplate;