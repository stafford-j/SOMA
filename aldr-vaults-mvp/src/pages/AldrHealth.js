import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import sampleRecords from '../data/sample-records';
import UniformHeader from '../components/layout/UniformHeader';

const AldrHealth = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Force using sample records for testing
  const actualRecords = sampleRecords;

  // Add dermatology record to demo data if not present
  const dermatologyRecord = {
    id: 'dermatology-1',
    title: 'Annual Dermatology Checkup',
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
    ]
  };

  // Mock appointments data - all future dates
  const demoAppointments = [
    { id: 1, title: 'Dental Cleaning', specialty: 'dentistry', recordType: 'dental_cleaning', date: '2025-06-15' },
    { id: 2, title: 'Therapy Session', specialty: 'mental_health', recordType: 'therapy_session', date: '2025-07-20' },
    { id: 3, title: 'Annual Check-up', specialty: 'medical', recordType: 'annual_physical', date: '2025-11-01' }
  ];

  // Health check reminders (all future dates, most recent first)
  const healthReminders = [
    {
      id: 'reminder-1',
      title: 'Dental Checkup',
      dueDate: '2025-06-15',
      lastDate: '2024-12-18',
      priority: 'high',
      icon: 'fa-tooth'
    },
    {
      id: 'reminder-2',
      title: 'Dermatology Appointment',
      dueDate: '2025-07-05',
      lastDate: '2024-06-12',
      priority: 'medium',
      icon: 'fa-stethoscope'
    },
    {
      id: 'reminder-3',
      title: 'Annual Physical Check-up',
      dueDate: '2025-11-01',
      lastDate: '2024-11-05',
      priority: 'medium',
      icon: 'fa-user-md'
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

    // Get top 3 most recent records for desktop display
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

  return (
    <div className="dashboard-container">
      <UniformHeader />

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
            <div style={{ textAlign: 'center', margin: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
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
                  </svg>
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#228B22',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    65%
                  </div>
                </div>
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
          <div className="dashboard-button outline placeholder">
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
            </li>
          ))}
        </ul>
      </section>

      {/* Recent Records Section */}
      <section className="recent-activity" style={{ marginTop: '2rem' }}>
        <div className="activity-header">
          <h2 className="activity-title">Recent Health Records</h2>
          <Link to="/all-records" className="dashboard-button outline">
            <i className="fas fa-eye"></i>
            View All
          </Link>
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
          <Link to="/add-record" className="dashboard-button outline">
            <i className="fas fa-calendar-plus"></i>
            Add Appointment
          </Link>
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

      {/* Records by Category */}
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
                    {specialty === 'medical' ? (
                      <Link to="/medical-records" className="dashboard-button outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>
                        View All
                      </Link>
                    ) : (
                      <Link to={`/category/${specialty}`} className="dashboard-button outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>
                        View All
                      </Link>
                    )}
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
          <div className="dashboard-button outline placeholder">
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
    </div>
  );
};

export default AldrHealth;