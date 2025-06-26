/**
 * Chen Legal Companion
 * 
 * Legal document management dashboard for Chen Family
 * Matches the AldrLegal.js structure from Peter Murphy demo
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import chenFamilyData from '../data/chen-family-data';
import '../styles/Dashboard.css';

const ChenLegal = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Helper functions - defined first to avoid hoisting issues
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      employment_contracts: 'fa-briefcase',
      immigration_documents: 'fa-passport',
      insurance_policies: 'fa-shield-alt',
      professional_licenses: 'fa-certificate',
      property_agreements: 'fa-home',
      tax_documents: 'fa-file-invoice-dollar',
      intellectual_property: 'fa-lightbulb',
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

  const getRecords = () => {
    if (familyMode) {
      // Family mode: combine both person's records + shared documents
      const sarahRecords = chenFamilyData.sarah.legal.map(record => ({ ...record, owner: 'Sarah Chen' }));
      const davidRecords = chenFamilyData.david.legal.map(record => ({ ...record, owner: 'David Chen' }));
      const sharedRecords = chenFamilyData.familyMode.sharedDocuments
        .filter(doc => doc.vault === 'legal')
        .map(doc => ({ ...doc, owner: 'Shared' }));
      
      return [...sarahRecords, ...davidRecords, ...sharedRecords]
        .sort((a, b) => new Date(b.startDate || b.issueDate || b.date || '2024-01-01') - new Date(a.startDate || a.issueDate || a.date || '2024-01-01'));
    } else {
      // Individual mode: show selected person's records
      return selectedPerson === 'sarah' 
        ? chenFamilyData.sarah.legal 
        : chenFamilyData.david.legal;
    }
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

  // Use Chen family legal records
  const actualRecords = getRecords();

  // Legal document reminders (expiring soon)
  const legalReminders = actualRecords
    .filter(record => record.expiryDate)
    .map(record => ({
      id: record.id,
      title: record.title,
      dueDate: record.expiryDate,
      lastDate: record.startDate || record.issueDate,
      priority: new Date(record.expiryDate) < new Date(Date.now() + 90*24*60*60*1000) ? 'high' : 'medium',
      icon: getCategoryIcon(record.category)
    }))
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  const processRecords = () => {
    // Sort by date (newest first)
    const recordsCopy = [...actualRecords].sort((a, b) => new Date(b.startDate || b.issueDate || b.date || '2024-01-01') - new Date(a.startDate || a.issueDate || a.date || '2024-01-01'));

    // Get top 3 most recent records
    const recentRecords = recordsCopy.slice(0, 3);

    // Get documents expiring soon (within 6 months)
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    const expiringDocuments = recordsCopy
      .filter(record => 
        record.expiryDate && 
        new Date(record.expiryDate) <= sixMonthsFromNow &&
        new Date(record.expiryDate) > today
      )
      .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
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

  return (
    <div className="dashboard-container">
      {/* Header matching AldrLegal style */}
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            onClick={navigateToChenfamily}
            className="hover:opacity-80 transition-opacity"
            title="Back to Chen Family"
          >
            <img 
              src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png"
              alt="Back" 
              className="h-16 w-16 object-contain"
              style={{ 
                imageRendering: 'high-quality'
              }}
            />
          </button>
        </div>
        <div className="header-center flex flex-col items-center justify-center">
          <div className="flex items-center">
            <i className="fas fa-balance-scale text-white text-2xl mr-3"></i>
            <h1 className="text-white text-4xl" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
              {getPersonDisplayName()} - Aldr Legal
            </h1>
          </div>
          <div className="text-base text-white italic mt-1">
            Aldr /ˈɑːl-dər/ — life, age, lifetime
          </div>
        </div>
        <div className="header-actions">
          <button className="dashboard-button white" onClick={() => alert('Demo mode: Add Document functionality coming in production version')}>
            <i className="fas fa-plus"></i>
            <span className="hidden sm:inline">Add Document</span>
          </button>
          <button className="dashboard-button white" onClick={() => alert('Demo mode: Document sharing functionality coming in production version')}>
            <i className="fas fa-share"></i>
            <span className="hidden sm:inline">Share Documents</span>
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
              <h3 className="text-xl font-bold">{familyMode ? 'Family' : 'Individual'}</h3>
              <p className="text-white text-opacity-80">View Mode</p>
            </div>
          </div>
          <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
            <div className="h-1 bg-white rounded-full" style={{ width: familyMode ? '100%' : '50%' }}></div>
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
            {legalReminders.length === 0 && (
              <div className="py-4 text-center text-aldr-gray">
                No upcoming document reminders
              </div>
            )}
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
                      {record.status || 'Active'}
                    </span>
                    {familyMode && record.owner && (
                      <span className="ml-2 px-2 py-1 rounded-pill text-xs bg-gray-100 text-gray-600">
                        {record.owner}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-aldr-gray mb-2">{formatCategoryName(record.category)}</p>
                <p className="text-sm text-aldr-gray mb-4">{formatDate(record.startDate || record.issueDate)}</p>
                {record.employer && <p className="text-sm text-aldr-gray mb-4">Employer: {record.employer}</p>}
                {record.provider && <p className="text-sm text-aldr-gray mb-4">Provider: {record.provider}</p>}

                <button className="btn-secondary w-full text-sm" onClick={() => alert('Demo Mode: Full document details coming in production version')}>
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
                          {record.status || 'Active'}
                        </span>
                      </div>
                      {familyMode && record.owner && (
                        <p className="text-sm text-aldr-gray mb-2">Owner: {record.owner}</p>
                      )}
                      <p className="text-sm text-aldr-gray mb-2">{formatDate(record.startDate || record.issueDate)}</p>
                      {record.expiryDate && (
                        <p className="text-sm text-aldr-gray mb-2">
                          Expires: {formatDate(record.expiryDate)}
                        </p>
                      )}
                      {record.employer && (
                        <p className="text-sm text-aldr-gray mb-4">
                          Employer: {record.employer.length > 40 ? record.employer.substring(0, 40) + '...' : record.employer}
                        </p>
                      )}
                      {record.provider && (
                        <p className="text-sm text-aldr-gray mb-4">
                          Provider: {record.provider.length > 40 ? record.provider.substring(0, 40) + '...' : record.provider}
                        </p>
                      )}

                      <button className="btn-secondary text-sm w-full" onClick={() => alert('Demo Mode: Full document details coming in production version')}>
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
                <i className="fas fa-eye"></i>
              </div>
              <div className="flex-grow">
                <p className="font-medium text-aldr-dark">Viewed {getPersonDisplayName()} Legal Documents</p>
                <p className="text-sm text-aldr-gray">Today, now</p>
              </div>
              <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                Open
              </button>
            </div>
            <div className="py-3 flex items-center">
              <div className="w-10 h-10 rounded-full bg-aldr-purple flex items-center justify-center mr-4 text-white">
                <i className="fas fa-users"></i>
              </div>
              <div className="flex-grow">
                <p className="font-medium text-aldr-dark">Switched to {familyMode ? 'Family' : 'Individual'} Mode</p>
                <p className="text-sm text-aldr-gray">Today</p>
              </div>
              <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                Open
              </button>
            </div>
            <div className="py-3 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white">
                <i className="fas fa-file-contract"></i>
              </div>
              <div className="flex-grow">
                <p className="font-medium text-aldr-dark">Accessed Chen Family Legal Vault</p>
                <p className="text-sm text-aldr-gray">Today</p>
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
        <p className="text-aldr-gray">Chen Family Demo | {getPersonDisplayName()}</p>
        <p className="text-sm text-aldr-gray mt-2">
          © 2025 Aldr. All rights reserved.
        </p>
      </footer>
        </div>
      </div>
    </div>
  );
};

export default ChenLegal;