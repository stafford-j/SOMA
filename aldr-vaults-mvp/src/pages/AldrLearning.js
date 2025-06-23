/**
 * Aldr Learning Companion
 * 
 * An education and professional development management dashboard for organizing:
 * - University degrees and academic credentials
 * - Professional certifications and licenses
 * - Online courses and specializations
 * - Continuing education and compliance training
 * 
 * Features:
 * - Certification expiration tracking
 * - Professional development planning
 * - Skills and competency mapping
 * - Verification and credentialing support
 * 
 * @author Aldr Team
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import sampleLearningRecords from '../data/learning-records';
import '../styles/Dashboard.css';

const AldrLearning = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use sample learning records
  const actualRecords = sampleLearningRecords;

  // Learning reminders (expiring certifications)
  const learningReminders = [
    {
      id: 'reminder-1',
      title: 'CSM Certification Renewal',
      dueDate: '2024-11-10',
      lastDate: '2022-11-10',
      priority: 'high',
      icon: 'fa-certificate',
      type: 'renewal'
    },
    {
      id: 'reminder-2',
      title: 'GDPR Training Renewal',
      dueDate: '2025-05-20',
      lastDate: '2024-05-20',
      priority: 'medium',
      icon: 'fa-shield-alt',
      type: 'compliance'
    },
    {
      id: 'reminder-3',
      title: 'PMP PDU Requirements',
      dueDate: '2026-09-20',
      lastDate: '2023-09-20',
      priority: 'medium',
      icon: 'fa-tasks',
      type: 'continuing_education'
    },
  ];

  const processRecords = () => {
    // Sort by date (newest first)
    const recordsCopy = [...actualRecords].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get top 3 most recent records
    const recentRecords = recordsCopy.slice(0, 3);

    // Get active certifications (not expired)
    const today = new Date();
    const activeCertifications = recordsCopy
      .filter(record => 
        record.status === 'active' &&
        (record.category === 'professional_certification' || record.category === 'language_certification')
      )
      .slice(0, 3);

    // Get expiring certifications (within 6 months)
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    const expiringCertifications = recordsCopy
      .filter(record => 
        record.expirationDate && 
        new Date(record.expirationDate) <= sixMonthsFromNow &&
        new Date(record.expirationDate) > today
      )
      .sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate))
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
      activeCertifications,
      expiringCertifications,
      categories
    };
  };

  const { recentRecords, activeCertifications, expiringCertifications, categories } = processRecords();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      university_degree: 'fa-graduation-cap',
      professional_certification: 'fa-certificate',
      online_course: 'fa-laptop',
      language_certification: 'fa-language',
      professional_development: 'fa-user-tie',
      continuing_education: 'fa-book-open',
      other: 'fa-file-alt'
    };
    return iconMap[category] || 'fa-file-alt';
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
      completed: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800',
      in_progress: 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Calculate days until expiration
  const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="dashboard-container">
      {/* Header matching other Aldr vaults */}
      <header className="dashboard-header">
        <div className="header-left">
          <Link to="/" className="flex flex-col">
            <div className="flex items-center">
              <i className="fas fa-graduation-cap text-white text-3xl mr-4"></i>
              <div>
                <h1 className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Aldr Learning</h1>
                <div className="text-sm text-white italic mt-1">
                  Aldr /ˈɑːl-dər/ — life, age, lifetime
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="header-actions">
          <button className="dashboard-button white" onClick={() => alert('Add learning credential features coming soon!')}>
            <i className="fas fa-plus"></i>
            <span className="hidden sm:inline">Add Credential</span>
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
                    <i className="fas fa-graduation-cap text-xl"></i>
                  </div>
                  <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Learning & Credentials
                  </h1>
                </div>
                <button className="dashboard-button white" onClick={() => alert('Add new credential coming soon!')}>
                  <i className="fas fa-plus mr-2"></i>
                  Add Credential
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Learning Stats Summary */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-medal text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{actualRecords.length}</h3>
                      <p className="text-white text-opacity-80">Credentials</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-certificate text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{activeCertifications.length}</h3>
                      <p className="text-white text-opacity-80">Active Certifications</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-clock text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{expiringCertifications.length}</h3>
                      <p className="text-white text-opacity-80">Expiring Soon</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </section>

              {/* Learning Reminders */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Learning Reminders</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-bell"></i>
                    Manage Reminders
                  </button>
                </div>

                <div className="card">
                  <div className="divide-y">
                    {learningReminders.map(reminder => (
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

              {/* Active Certifications */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Active Certifications</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-eye"></i>
                    View All
                  </button>
                </div>

                {activeCertifications.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeCertifications.map(cert => (
                      <div key={cert.id} className="card hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                            <i className={`fas ${getCategoryIcon(cert.category)}`}></i>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-aldr-dark">{cert.title}</h3>
                            <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(cert.status)}`}>
                              {cert.status}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-aldr-gray mb-2">{cert.provider}</p>
                        <p className="text-sm text-aldr-gray mb-2">Issued: {formatDate(cert.date)}</p>
                        {cert.expirationDate && (
                          <p className="text-sm text-aldr-gray mb-4">
                            Expires: {formatDate(cert.expirationDate)}
                            <span className={`ml-2 px-2 py-1 rounded-pill text-xs ${
                              getDaysUntilExpiration(cert.expirationDate) < 90 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {getDaysUntilExpiration(cert.expirationDate)} days
                            </span>
                          </p>
                        )}

                        <button className="btn-secondary w-full text-sm" onClick={() => alert('Demo Mode: Full credential details coming in production version')}>
                          View Credential
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-aldr-gray">No active certifications found</p>
                )}
              </section>

              {/* Recent Learning Activity */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Recent Learning Activity</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-eye"></i>
                    View All
                  </button>
                </div>

                {recentRecords.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recentRecords.map(record => (
                      <div key={record.id} className="card hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                            <i className={`fas ${getCategoryIcon(record.category)}`}></i>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-aldr-dark">{record.title}</h3>
                            <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-aldr-gray mb-2">{formatCategoryName(record.category)}</p>
                        <p className="text-sm text-aldr-gray mb-2">{record.provider}</p>
                        <p className="text-sm text-aldr-gray mb-4">{formatDate(record.date)}</p>

                        <button className="btn-secondary w-full text-sm" onClick={() => alert('Demo Mode: Full learning record details coming in production version')}>
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-aldr-gray">No recent learning records found</p>
                )}
              </section>

              {/* Credentials by Category */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-aldr-dark mb-6">Credentials by Category</h2>

                {Object.keys(categories).length > 0 ? (
                  Object.entries(categories).map(([category, records]) => (
                    <div key={category} className="card mb-6">
                      <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold text-aldr-dark">
                          <i className={`fas ${getCategoryIcon(category)} mr-2 text-aldr-teal`}></i>
                          {formatCategoryName(category)}
                          <span className="ml-2 text-sm text-aldr-gray font-normal">
                            ({records.length} credentials)
                          </span>
                        </h3>
                        <button className="text-aldr-teal hover:text-aldr-purple font-medium text-sm">
                          View All
                        </button>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {records.slice(0, 2).map(record => (
                            <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-aldr-dark">{record.title}</h4>
                                <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(record.status)}`}>
                                  {record.status}
                                </span>
                              </div>
                              <p className="text-sm text-aldr-gray mb-2">{record.provider}</p>
                              <p className="text-sm text-aldr-gray mb-2">{formatDate(record.date)}</p>
                              {record.expirationDate && (
                                <p className="text-sm text-aldr-gray mb-2">
                                  Expires: {formatDate(record.expirationDate)}
                                </p>
                              )}
                              {record.skills && (
                                <div className="mb-4">
                                  <div className="flex flex-wrap gap-1">
                                    {record.skills.slice(0, 3).map((skill, index) => (
                                      <span key={index} className="bg-aldr-light text-aldr-dark px-2 py-1 rounded-pill text-xs">
                                        {skill}
                                      </span>
                                    ))}
                                    {record.skills.length > 3 && (
                                      <span className="text-xs text-aldr-gray">
                                        +{record.skills.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              <button className="btn-secondary text-sm w-full" onClick={() => alert('Demo Mode: Full credential details coming in production version')}>
                                View Credential
                              </button>
                            </div>
                          ))}
                        </div>

                        {records.length > 2 && (
                          <div className="text-center mt-4">
                            <button className="btn-secondary text-sm">
                              View All {formatCategoryName(category)} ({records.length})
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-aldr-gray">No credentials found</p>
                )}
              </section>

              {/* Recent Activity Feed */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Recent Activity</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-eye"></i>
                    View All
                  </button>
                </div>

                <div className="card">
                  <div className="divide-y">
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-user-tie"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Completed Leadership Excellence training</p>
                        <p className="text-sm text-aldr-gray">June 15, 2025</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aldr-purple flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-shield-alt"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Renewed GDPR compliance training</p>
                        <p className="text-sm text-aldr-gray">May 20, 2024</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-certificate"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Earned AWS Solutions Architect Professional</p>
                        <p className="text-sm text-aldr-gray">March 15, 2024</p>
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

export default AldrLearning;