/**
 * Aldr Legal Companion
 * 
 * A legal document management dashboard for organizing and managing:
 * - Estate Planning documents
 * - Property documents  
 * - Personal Legal documents
 * - Business documents
 * 
 * Features:
 * - Responsive design
 * - Document expiration tracking
 * - Category-based organization
 * - Recent activity tracking
 * 
 * @author Aldr Team
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import sampleLegalRecords from '../data/legal-records';

const AldrLegal = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Use sample legal records
  const actualRecords = sampleLegalRecords;

  // Legal document reminders (expiring soon)
  const legalReminders = [
    {
      id: 'reminder-1',
      title: 'Property Insurance Renewal',
      dueDate: '2025-06-15',
      lastDate: '2024-09-01',
      priority: 'high',
      icon: 'fa-home'
    },
    {
      id: 'reminder-2',
      title: 'Will Review Recommended',
      dueDate: '2025-07-15',
      lastDate: '2024-03-15',
      priority: 'medium',
      icon: 'fa-file-signature'
    },
    {
      id: 'reminder-3',
      title: 'Employment Contract Renewal',
      dueDate: '2025-11-01',
      lastDate: '2024-06-01',
      priority: 'medium',
      icon: 'fa-handshake'
    },
  ];

  const processRecords = () => {
    // Sort by date (newest first)
    const recordsCopy = [...actualRecords].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get top 3 most recent records
    const recentRecords = recordsCopy.slice(0, 3);

    // Get documents expiring soon (within 6 months)
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    const expiringDocuments = recordsCopy
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
      expiringDocuments,
      categories
    };
  };

  const { recentRecords, expiringDocuments, categories } = processRecords();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      estate_planning: 'fa-file-signature',
      property: 'fa-home',
      personal_legal: 'fa-id-card',
      business: 'fa-briefcase',
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
      current: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="flex justify-between items-center mb-8 card">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-aldr-purple flex items-center justify-center mr-4 text-white">
            <i className="fas fa-scale-balanced text-xl"></i>
          </div>
          <h1 className="text-3xl font-bold heading-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
            Aldr Legal
          </h1>
        </div>
        <div>
          <Link to="/add-record" className="btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Add New Document
          </Link>
        </div>
      </header>

      {/* Legal Stats Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-aldr-gradient text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <i className="fas fa-file-alt text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{actualRecords.length}</h3>
              <p className="text-white text-opacity-80">Legal Documents</p>
            </div>
          </div>
          <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
            <div className="h-1 bg-white rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="card bg-aldr-gradient text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <i className="fas fa-exclamation-triangle text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">{expiringDocuments.length}</h3>
              <p className="text-white text-opacity-80">Expiring Soon</p>
            </div>
          </div>
          <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
            <div className="h-1 bg-white rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
        
        <div className="card bg-aldr-gradient text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <i className="fas fa-shield-alt text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">2</h3>
              <p className="text-white text-opacity-80">Shared Access</p>
            </div>
          </div>
          <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
            <div className="h-1 bg-white rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </section>

      {/* Legal Document Reminders */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-aldr-dark">Document Reminders</h2>
          <button className="btn-secondary text-sm">
            <i className="fas fa-bell"></i>
            Manage Reminders
          </button>
        </div>

        <div className="card">
          <div className="divide-y">
            {legalReminders.map(reminder => (
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

      {/* Recent Legal Documents Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-aldr-dark">Recent Legal Documents</h2>
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
                <p className="text-sm text-aldr-gray mb-4">{formatDate(record.date)}</p>
                <p className="text-sm text-aldr-gray mb-4">{record.description}</p>

                <button className="btn-secondary w-full text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-aldr-gray">No recent documents found</p>
        )}
      </section>

      {/* Documents by Category */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-aldr-dark mb-6">Documents by Category</h2>

        {Object.keys(categories).length > 0 ? (
          Object.entries(categories).map(([category, records]) => (
            <div key={category} className="card mb-6">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-aldr-dark">
                  <i className={`fas ${getCategoryIcon(category)} mr-2 text-aldr-teal`}></i>
                  {formatCategoryName(category)}
                  <span className="ml-2 text-sm text-aldr-gray font-normal">
                    ({records.length} documents)
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
                      <p className="text-sm text-aldr-gray mb-2">{formatDate(record.date)}</p>
                      {record.expirationDate && (
                        <p className="text-sm text-aldr-gray mb-2">
                          Expires: {formatDate(record.expirationDate)}
                        </p>
                      )}
                      <p className="text-sm text-aldr-gray mb-4">
                        {record.description.length > 80
                          ? record.description.substring(0, 80) + '...'
                          : record.description}
                      </p>

                      <button className="btn-secondary text-sm w-full">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>

                {records.length > 2 && (
                  <div className="text-center mt-4">
                    <button className="btn-secondary text-sm">
                      View All {formatCategoryName(category)} Documents ({records.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-aldr-gray">No documents found</p>
        )}
      </section>

      {/* Activity Feed */}
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
                <i className="fas fa-file-signature"></i>
              </div>
              <div className="flex-grow">
                <p className="font-medium text-aldr-dark">Updated Will and Testament</p>
                <p className="text-sm text-aldr-gray">Today, 2:30 PM</p>
              </div>
              <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                Open
              </button>
            </div>
            <div className="py-3 flex items-center">
              <div className="w-10 h-10 rounded-full bg-aldr-purple flex items-center justify-center mr-4 text-white">
                <i className="fas fa-home"></i>
              </div>
              <div className="flex-grow">
                <p className="font-medium text-aldr-dark">Added property insurance policy</p>
                <p className="text-sm text-aldr-gray">Yesterday, 10:15 AM</p>
              </div>
              <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                Open
              </button>
            </div>
            <div className="py-3 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white">
                <i className="fas fa-search"></i>
              </div>
              <div className="flex-grow">
                <p className="font-medium text-aldr-dark">Viewed employment contract</p>
                <p className="text-sm text-aldr-gray">June 5, 2025, 4:45 PM</p>
              </div>
              <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                Open
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
  );
};

export default AldrLegal;