/**
 * AldrSmartSuggestions - Cross-Vault Intelligence Component
 * 
 * An intelligent suggestion engine that connects information across different
 * vaults and provides actionable reminders and recommendations.
 * 
 * Features:
 * - Cross-vault document linking and intelligence
 * - Priority-based reminder system with urgency indicators
 * - Expandable reminder lists with smart filtering
 * - Detailed document modal with cross-vault connections
 * - Configurable urgency thresholds and display options
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const AldrSmartSuggestions = ({ 
  reminders = [],
  crossVaultIntelligence = [],
  onReminderClick,
  onManageReminders,
  onViewDocument,
  className = "",
  title = "Smart Suggestions",
  description = "Your life admin assistant. Connects the dots between vaults and reminds you what needs attention.",
  maxInitialDisplay = 3,
  maxExpandedDisplay = 10,
  showSettings = true,
  urgencyThresholds = {
    red: 7,    // days until due
    amber: 30, // days until due
    green: 90  // days until due
  }
}) => {
  const [showAllReminders, setShowAllReminders] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filterUrgency, setFilterUrgency] = useState('all');

  // Default sample data for demo purposes
  const defaultReminders = [
    {
      id: 'reminder-1',
      title: 'Passport Renewal Required',
      description: 'Your passport expires soon and you have upcoming travel booked',
      dueDate: '2025-08-15',
      urgency: 'red',
      vaultName: 'Aldr Identity',
      cost: '€95',
      fullDocument: {
        type: 'Passport',
        number: 'P1234567',
        expiryDate: '2025-08-15',
        issueDate: '2015-08-15',
        nationality: 'Irish'
      },
      crossVaultConnections: [
        {
          connection: 'Upcoming Travel to Dublin',
          targetVaultName: 'Aldr Travel',
          description: 'Business trip scheduled for June 28, 2025 requires valid passport'
        }
      ]
    },
    {
      id: 'reminder-2',
      title: 'Health Insurance Review',
      description: 'Annual policy renewal approaching with potential cost savings',
      dueDate: '2025-12-31',
      urgency: 'amber',
      vaultName: 'Aldr Health',
      cost: '€1,200',
      fullDocument: {
        type: 'Insurance Policy',
        provider: 'VHI Healthcare',
        policyNumber: 'VHI123456',
        coverage: 'Private Health Insurance',
        renewalDate: '2025-12-31'
      },
      crossVaultConnections: [
        {
          connection: 'Recent Medical Expenses',
          targetVaultName: 'Aldr Health',
          description: 'Recent dermatology and physiotherapy claims may affect renewal terms'
        }
      ]
    },
    {
      id: 'reminder-3',
      title: 'Will Update Recommended',
      description: 'Recent property acquisition should be reflected in estate planning',
      dueDate: '2026-03-15',
      urgency: 'green',
      vaultName: 'Aldr Legal',
      fullDocument: {
        type: 'Will',
        lastUpdated: '2023-01-15',
        solicitor: 'Murphy & Associates',
        location: 'Dublin'
      },
      crossVaultConnections: [
        {
          connection: 'New Property Purchase',
          targetVaultName: 'Aldr Legal',
          description: 'House deed registered in December 2024 not reflected in current will'
        },
        {
          connection: 'Family Updates',
          targetVaultName: 'Aldr Memoirs',
          description: 'Recent family changes documented in memoirs should update beneficiary information'
        }
      ]
    }
  ];

  const allReminders = reminders.length > 0 ? reminders : defaultReminders;

  // Calculate urgency based on due date if not provided
  const calculateUrgency = useCallback((dueDate, providedUrgency) => {
    if (providedUrgency) return providedUrgency;
    
    const today = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= urgencyThresholds.red) return 'red';
    if (daysUntilDue <= urgencyThresholds.amber) return 'amber';
    return 'green';
  }, [urgencyThresholds]);

  // Process and sort reminders
  const processedReminders = useMemo(() => {
    const processed = allReminders.map(reminder => ({
      ...reminder,
      urgency: calculateUrgency(reminder.dueDate, reminder.urgency)
    }));

    // Filter by urgency if specified
    const filtered = filterUrgency === 'all' 
      ? processed 
      : processed.filter(r => r.urgency === filterUrgency);

    // Sort by urgency and date
    return filtered.sort((a, b) => {
      const urgencyOrder = { red: 3, amber: 2, green: 1 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }, [allReminders, calculateUrgency, filterUrgency]);

  const displayReminders = showAllReminders 
    ? processedReminders.slice(0, maxExpandedDisplay) 
    : processedReminders.slice(0, maxInitialDisplay);

  const getUrgencyColor = useCallback((urgency) => {
    switch (urgency) {
      case 'red': return '#FF4444';
      case 'amber': return '#FFB84D';
      case 'green': return '#4CAF50';
      default: return '#4CAF50';
    }
  }, []);

  const getUrgencyLabel = useCallback((urgency) => {
    switch (urgency) {
      case 'red': return 'Due Soon';
      case 'amber': return 'Due Later';
      case 'green': return 'Future';
      default: return 'Future';
    }
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }, []);

  const getDaysUntilDue = useCallback((dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysUntil = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`;
    if (daysUntil === 0) return 'Due today';
    if (daysUntil === 1) return 'Due tomorrow';
    return `${daysUntil} days until due`;
  }, []);

  const handleReminderClick = useCallback((reminder) => {
    setSelectedDocument(reminder);
    if (onReminderClick) {
      onReminderClick(reminder);
    }
  }, [onReminderClick]);

  const handleManageReminders = useCallback(() => {
    if (onManageReminders) {
      onManageReminders();
    } else {
      alert('Reminder management settings would open here in the full application.');
    }
  }, [onManageReminders]);

  // Statistics for display
  const stats = useMemo(() => {
    const urgencyCounts = processedReminders.reduce((acc, reminder) => {
      acc[reminder.urgency] = (acc[reminder.urgency] || 0) + 1;
      return acc;
    }, {});

    return {
      total: processedReminders.length,
      red: urgencyCounts.red || 0,
      amber: urgencyCounts.amber || 0,
      green: urgencyCounts.green || 0
    };
  }, [processedReminders]);

  // Document Modal Component
  const DocumentModal = useMemo(() => ({ document, onClose }) => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-5xl max-h-[90vh] overflow-y-auto w-full">
          <div className="p-6 border-b bg-gradient-to-r from-teal-50 to-purple-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {document.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: getUrgencyColor(document.urgency) }}
                  >
                    {getUrgencyLabel(document.urgency)}
                  </span>
                  <span className="text-gray-600 flex items-center">
                    <i className="fas fa-calendar mr-1"></i>
                    Due: {formatDate(document.dueDate)}
                  </span>
                  <span className="text-gray-600 flex items-center">
                    <i className="fas fa-clock mr-1"></i>
                    {getDaysUntilDue(document.dueDate)}
                  </span>
                  {document.cost && (
                    <span className="text-green-600 font-medium flex items-center">
                      <i className="fas fa-euro-sign mr-1"></i>
                      Previous Cost: {document.cost}
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{document.description}</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Document Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <i className="fas fa-file-alt mr-2 text-blue-600"></i>
                  Document Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <p><strong>Type:</strong> {document.fullDocument?.type}</p>
                  <p><strong>Vault:</strong> {document.vaultName}</p>
                  <p><strong>Description:</strong> {document.description}</p>
                  
                  {document.fullDocument && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Additional Information:</h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(document.fullDocument).map(([key, value]) => {
                          if (key === 'type') return null;
                          if (typeof value === 'object' && value !== null) {
                            return (
                              <div key={key}>
                                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>
                                <div className="ml-4 mt-1 bg-white p-2 rounded border">
                                  {Array.isArray(value) ? (
                                    <ul className="list-disc list-inside">
                                      {value.map((item, i) => (
                                        <li key={i}>{typeof item === 'object' ? JSON.stringify(item) : item}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                      {JSON.stringify(value, null, 2)}
                                    </pre>
                                  )}
                                </div>
                              </div>
                            );
                          }
                          return (
                            <p key={key}>
                              <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cross-Vault Intelligence */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <i className="fas fa-brain mr-2 text-purple-600"></i>
                  Cross-Vault Intelligence
                </h3>
                {document.crossVaultConnections && document.crossVaultConnections.length > 0 ? (
                  <div className="space-y-3">
                    {document.crossVaultConnections.map((connection, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <h4 className="font-medium text-blue-800 mb-1">{connection.connection}</h4>
                        <p className="text-sm text-blue-600 mb-2 flex items-center">
                          <i className="fas fa-arrow-right mr-1"></i>
                          {connection.targetVaultName}
                        </p>
                        <p className="text-sm text-gray-700">{connection.description}</p>
                        <button 
                          className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            if (onViewDocument) {
                              onViewDocument(connection);
                            } else {
                              alert(`Would navigate to ${connection.targetVaultName} to view related document.`);
                            }
                          }}
                        >
                          View Related Document
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                    <i className="fas fa-info-circle text-2xl mb-2"></i>
                    <p>No cross-vault connections identified for this reminder</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t flex flex-wrap gap-3">
              <button 
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                onClick={() => alert('Complete reminder action would be processed here.')}
              >
                <i className="fas fa-check mr-2"></i>
                Mark Complete
              </button>
              <button 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => alert(`Would navigate to ${document.vaultName} to manage this item.`)}
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Open in {document.vaultName}
              </button>
              <button 
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                onClick={() => alert('Snooze reminder options would be shown here.')}
              >
                <i className="fas fa-clock mr-2"></i>
                Snooze
              </button>
              <button 
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors ml-auto"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [formatDate, getDaysUntilDue, getUrgencyColor, getUrgencyLabel, onViewDocument]);

  return (
    <>
      <div className={`card bg-white border border-gray-200 shadow-lg h-full flex flex-col ${className}`}>
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-600 to-purple-600 flex items-center justify-center mr-6 shadow-lg">
                <i className="fas fa-lightbulb text-3xl text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-gray-800" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
                  {title}
                </h2>
                <p className="text-lg text-gray-600 max-w-lg">
                  {description}
                </p>
              </div>
            </div>
            {showSettings && (
              <button 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg transition-colors hover:bg-gray-100"
                onClick={handleManageReminders}
                title="Manage Reminders"
              >
                <i className="fas fa-cog text-xl"></i>
              </button>
            )}
          </div>

          {/* Statistics and Filters */}
          <div className="bg-gradient-to-r from-teal-50 to-purple-50 rounded-lg p-4 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.red}</div>
                  <div className="text-sm text-gray-600">Due Soon</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.amber}</div>
                  <div className="text-sm text-gray-600">Due Later</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.green}</div>
                  <div className="text-sm text-gray-600">Future</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Filter:</span>
                <select 
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All</option>
                  <option value="red">Due Soon</option>
                  <option value="amber">Due Later</option>
                  <option value="green">Future</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Reminders List */}
        <div className="space-y-3 mb-6 flex-grow">
          {displayReminders.length > 0 ? (
            displayReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all cursor-pointer border border-gray-200 hover:shadow-md"
                onClick={() => handleReminderClick(reminder)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: getUrgencyColor(reminder.urgency) }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{reminder.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Due {formatDate(reminder.dueDate)} • {reminder.vaultName}
                        {reminder.cost && ` • Previous Cost: ${reminder.cost}`}
                      </p>
                      <p className="text-xs text-gray-500">{getDaysUntilDue(reminder.dueDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: getUrgencyColor(reminder.urgency) }}
                    >
                      {getUrgencyLabel(reminder.urgency)}
                    </span>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-check-circle text-4xl mb-4 text-gray-300"></i>
              <p className="text-lg">No reminders</p>
              <p className="text-sm">All caught up! New suggestions will appear here.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center mt-auto">
          {processedReminders.length > maxInitialDisplay && (
            <button 
              className="bg-gradient-to-r from-teal-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full max-w-sm"
              onClick={() => setShowAllReminders(!showAllReminders)}
            >
              <i className={`fas ${showAllReminders ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
              {showAllReminders ? 'Show Less' : `View All Reminders (${processedReminders.length})`}
            </button>
          )}
        </div>
      </div>

      <DocumentModal 
        document={selectedDocument} 
        onClose={() => setSelectedDocument(null)} 
      />
    </>
  );
};

AldrSmartSuggestions.propTypes = {
  reminders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string.isRequired,
    urgency: PropTypes.oneOf(['red', 'amber', 'green']),
    vaultName: PropTypes.string.isRequired,
    cost: PropTypes.string,
    fullDocument: PropTypes.object,
    crossVaultConnections: PropTypes.arrayOf(PropTypes.shape({
      connection: PropTypes.string.isRequired,
      targetVaultName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }))
  })),
  crossVaultIntelligence: PropTypes.array,
  onReminderClick: PropTypes.func,
  onManageReminders: PropTypes.func,
  onViewDocument: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  maxInitialDisplay: PropTypes.number,
  maxExpandedDisplay: PropTypes.number,
  showSettings: PropTypes.bool,
  urgencyThresholds: PropTypes.shape({
    red: PropTypes.number,
    amber: PropTypes.number,
    green: PropTypes.number
  })
};

export default AldrSmartSuggestions;