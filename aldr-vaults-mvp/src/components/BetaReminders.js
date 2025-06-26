/**
 * BETA Reminders Component - Based on SmartSuggestions pattern
 * 
 * Smart reminders system that integrates with user's documents and profile
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const BetaReminders = () => {
  const { user } = useAuth();
  const [showAllReminders, setShowAllReminders] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      generateReminders();
    }
  }, [user]);

  const generateReminders = async () => {
    try {
      // Get user's documents and profile
      const { data: documents, error: docsError } = await supabase
        .from('documents')
        .select('*, vaults(name, type)')
        .eq('user_id', user.id);

      if (docsError) {
        console.error('Error loading documents:', docsError);
        setLoading(false);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error loading user data:', userError);
      }

      // Generate smart reminders based on documents and profile
      const generatedReminders = [];
      const currentDate = new Date();

      // Document-based reminders
      documents.forEach(doc => {
        const docAge = (currentDate - new Date(doc.created_at)) / (1000 * 60 * 60 * 24);
        
        if (doc.vaults?.type === 'identity') {
          // Identity document reminders
          if (doc.metadata?.document_type === 'passport') {
            generatedReminders.push({
              id: `passport-${doc.id}`,
              title: 'Check Passport Expiration Date',
              description: 'Verify your passport expiration and renew if needed',
              dueDate: new Date(currentDate.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              urgency: 'amber',
              vaultName: 'Aldr Identity',
              relatedDocument: doc,
              category: 'identity_verification'
            });
          }
          
          if (doc.metadata?.document_type === 'driversLicense') {
            generatedReminders.push({
              id: `license-${doc.id}`,
              title: 'Driver\'s License Renewal Check',
              description: 'Review driver\'s license expiration date',
              dueDate: new Date(currentDate.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              urgency: 'green',
              vaultName: 'Aldr Identity',
              relatedDocument: doc,
              category: 'identity_verification'
            });
          }
        }

        if (doc.vaults?.type === 'legal') {
          // Legal document reminders
          if (doc.metadata?.category === 'estate_planning') {
            generatedReminders.push({
              id: `estate-${doc.id}`,
              title: 'Estate Planning Review',
              description: 'Annual review of estate planning documents recommended',
              dueDate: new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              urgency: 'green',
              vaultName: 'Aldr Legal',
              relatedDocument: doc,
              category: 'legal_review'
            });
          }

          if (doc.metadata?.category === 'insurance') {
            generatedReminders.push({
              id: `insurance-${doc.id}`,
              title: 'Insurance Policy Review',
              description: 'Review insurance coverage and renewal dates',
              dueDate: new Date(currentDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              urgency: 'amber',
              vaultName: 'Aldr Legal',
              relatedDocument: doc,
              category: 'insurance_review'
            });
          }
        }
      });

      // Profile-based reminders
      if (userData?.metadata) {
        const profile = userData.metadata;
        
        // Health checkup reminders based on age
        if (profile.age && parseInt(profile.age) > 40) {
          generatedReminders.push({
            id: 'health-checkup',
            title: 'Annual Health Checkup',
            description: 'Schedule your annual comprehensive health examination',
            dueDate: new Date(currentDate.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            urgency: 'amber',
            vaultName: 'Aldr Health',
            category: 'health_maintenance'
          });
        }

        // Emergency contact update reminder
        if (profile.emergencyContact) {
          generatedReminders.push({
            id: 'emergency-contact',
            title: 'Update Emergency Contact',
            description: 'Verify emergency contact information is current',
            dueDate: new Date(currentDate.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            urgency: 'green',
            vaultName: 'Aldr Identity',
            category: 'profile_maintenance'
          });
        }
      }

      // Only add basic reminders for BETA
      if (generatedReminders.length === 0) {
        generatedReminders.push({
          id: 'welcome-reminder',
          title: 'Welcome to Aldr Vaults BETA',
          description: 'Upload documents to Identity or Legal vaults to see personalized reminders',
          dueDate: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          urgency: 'green',
          vaultName: 'Aldr System',
          category: 'getting_started'
        });
      }

      setReminders(generatedReminders.sort((a, b) => {
        const urgencyOrder = { red: 3, amber: 2, green: 1 };
        if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        }
        return new Date(a.dueDate) - new Date(b.dueDate);
      }));

    } catch (err) {
      console.error('Error generating reminders:', err);
    }
    
    setLoading(false);
  };

  const displayReminders = showAllReminders ? reminders.slice(0, 10) : reminders.slice(0, 3);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'red': return '#FF4444';
      case 'amber': return '#FFB84D';
      case 'green': return '#4CAF50';
      default: return '#4CAF50';
    }
  };

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'red': return 'Due Soon';
      case 'amber': return 'Due Later';
      case 'green': return 'Future';
      default: return 'Future';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getDaysUntilDue = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const handleReminderClick = (reminder) => {
    setSelectedDocument(reminder);
  };

  const closeDocumentModal = () => {
    setSelectedDocument(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center">
          <div className="loading-spinner"></div>
          <span className="ml-2">Generating smart reminders...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="smart-suggestions-section bg-white rounded-lg shadow-lg p-6">
        <div className="suggestions-header flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-bell text-2xl mr-3" style={{ color: 'var(--teal)' }}></i>
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Smart Reminders
              </h2>
              <p className="text-gray-600 text-sm">Personalized alerts based on your documents and profile</p>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="About Smart Reminders"
          >
            <i className="fas fa-info-circle text-lg"></i>
          </button>
        </div>

        {showInfo && (
          <div className="info-panel bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">About Smart Reminders</h3>
            <p className="text-blue-700 text-sm mb-2">
              Our AI analyzes your uploaded documents and profile information to generate personalized reminders for:
            </p>
            <ul className="text-blue-700 text-sm space-y-1 ml-4">
              <li>• Document renewal dates (passports, licenses, insurance)</li>
              <li>• Health checkups based on your age and medical history</li>
              <li>• Legal document reviews and updates</li>
              <li>• Security and backup maintenance</li>
              <li>• Emergency contact verification</li>
            </ul>
          </div>
        )}

        <div className="reminders-list">
          {displayReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="reminder-item"
              onClick={() => handleReminderClick(reminder)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3>{reminder.title}</h3>
                    <span 
                      className="reminder-urgency-badge"
                      style={{ backgroundColor: getUrgencyColor(reminder.urgency) }}
                    >
                      {getDaysUntilDue(reminder.dueDate)}
                    </span>
                  </div>
                  <p>{reminder.description}</p>
                  <div className="reminder-meta">
                    <span>
                      <i className="fas fa-calendar"></i>
                      {formatDate(reminder.dueDate)}
                    </span>
                    <span>
                      <i className="fas fa-folder"></i>
                      {reminder.vaultName}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reminders.length > 3 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAllReminders(!showAllReminders)}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              {showAllReminders ? 'Show Less' : `View All Reminders (${reminders.length})`}
            </button>
          </div>
        )}

        {reminders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-check-circle text-4xl mb-4 text-green-500"></i>
            <p className="text-lg font-medium mb-2">All caught up!</p>
            <p>No urgent reminders at the moment. Upload more documents to get personalized suggestions.</p>
          </div>
        )}
      </div>

      {/* Reminder Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedDocument.title}
                </h2>
                <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              <div className="flex items-center mt-2 space-x-4">
                <span 
                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: getUrgencyColor(selectedDocument.urgency) }}
                >
                  {getDaysUntilDue(selectedDocument.dueDate)}
                </span>
                <span className="text-gray-600">{selectedDocument.vaultName}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedDocument.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Due Date</h3>
                  <p className="text-gray-700">{formatDate(selectedDocument.dueDate)}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Category</h3>
                  <p className="text-gray-700 capitalize">{selectedDocument.category?.replace('_', ' ')}</p>
                </div>

                {selectedDocument.relatedDocument && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Related Document</h3>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium">{selectedDocument.relatedDocument.title}</p>
                      <p className="text-sm text-gray-600">
                        Uploaded: {formatDate(selectedDocument.relatedDocument.created_at)}
                      </p>
                      {selectedDocument.relatedDocument.file_url && (
                        <a
                          href={selectedDocument.relatedDocument.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-2 text-teal-600 hover:text-teal-700"
                        >
                          <i className="fas fa-external-link-alt mr-1"></i>
                          View Document
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-2">Suggested Actions</h3>
                  <ul className="space-y-2 text-gray-700">
                    {selectedDocument.category === 'identity_verification' && (
                      <>
                        <li>• Check expiration date on the document</li>
                        <li>• Schedule renewal appointment if needed</li>
                        <li>• Update any systems with new document numbers</li>
                      </>
                    )}
                    {selectedDocument.category === 'legal_review' && (
                      <>
                        <li>• Schedule appointment with legal advisor</li>
                        <li>• Review beneficiaries and asset allocation</li>
                        <li>• Update documents if life circumstances changed</li>
                      </>
                    )}
                    {selectedDocument.category === 'health_maintenance' && (
                      <>
                        <li>• Schedule appointment with primary care physician</li>
                        <li>• Prepare list of current medications and symptoms</li>
                        <li>• Update emergency contact information</li>
                      </>
                    )}
                    {selectedDocument.category === 'system_maintenance' && (
                      <>
                        <li>• Verify all documents are properly uploaded</li>
                        <li>• Check backup and security settings</li>
                        <li>• Review account permissions and access</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <button 
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors mr-4"
                  onClick={closeDocumentModal}
                >
                  Mark as Reviewed
                </button>
                <button 
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  onClick={closeDocumentModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BetaReminders;