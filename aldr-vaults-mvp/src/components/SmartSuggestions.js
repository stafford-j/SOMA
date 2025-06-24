import React, { useState } from 'react';
import smartSuggestionsData from '../data/smart-suggestions-data';

const SmartSuggestions = () => {
  const [showAllReminders, setShowAllReminders] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const { reminders, crossVaultIntelligence } = smartSuggestionsData;
  
  // Get reminders sorted by urgency and date
  const sortedReminders = reminders.sort((a, b) => {
    const urgencyOrder = { red: 3, amber: 2, green: 1 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const displayReminders = showAllReminders ? sortedReminders.slice(0, 10) : sortedReminders.slice(0, 3);

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

  const handleReminderClick = (reminder) => {
    setSelectedDocument(reminder);
  };

  const handleManageReminders = () => {
    alert('Reminder management settings would open here in the full application.');
  };

  const DocumentModal = ({ document, onClose }) => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                {document.title}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="flex items-center mt-2 space-x-4">
              <span 
                className="px-3 py-1 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: getUrgencyColor(document.urgency) }}
              >
                {getUrgencyLabel(document.urgency)}
              </span>
              <span className="text-gray-600">Due: {formatDate(document.dueDate)}</span>
              {document.cost && <span className="text-green-600 font-medium">Cost: {document.cost}</span>}
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Document Details</h3>
                <div className="space-y-3">
                  <p><strong>Type:</strong> {document.fullDocument?.type}</p>
                  <p><strong>Vault:</strong> {document.vaultName}</p>
                  <p><strong>Description:</strong> {document.description}</p>
                </div>

                {document.crossVaultConnections && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Cross-Vault Intelligence</h3>
                    {document.crossVaultConnections.map((connection, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg mb-2">
                        <p className="font-medium text-blue-800">{connection.connection}</p>
                        <p className="text-sm text-blue-600">→ {connection.targetVaultName}</p>
                        <p className="text-sm text-gray-600 mt-1">{connection.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {document.fullDocument && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Full Document Information</h3>
                    <div className="space-y-4 text-sm">
                      {Object.entries(document.fullDocument).map(([key, value]) => {
                        if (key === 'type') return null;
                        if (typeof value === 'object' && value !== null) {
                          return (
                            <div key={key}>
                              <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>
                              <div className="ml-4 mt-1">
                                {Array.isArray(value) ? (
                                  <ul className="list-disc list-inside">
                                    {value.map((item, i) => (
                                      <li key={i}>{typeof item === 'object' ? JSON.stringify(item) : item}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card bg-white border border-gray-200 shadow-lg h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-600 to-purple-600 flex items-center justify-center mr-6">
                <i className="fas fa-lightbulb text-3xl text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-gray-800" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
                  Smart Suggestions
                </h2>
                <p className="text-lg text-gray-600">
                  Your life admin assistant. Connects the dots between vaults and reminds you what needs attention.
                </p>
              </div>
            </div>
            <button 
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg transition-colors"
              onClick={handleManageReminders}
              title="Manage Reminders"
            >
              <i className="fas fa-cog text-xl"></i>
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-6 flex-grow">
                {displayReminders.map((reminder) => (
                  <div 
                    key={reminder.id} 
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all cursor-pointer border border-gray-200"
                    onClick={() => handleReminderClick(reminder)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getUrgencyColor(reminder.urgency) }}
                        ></div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{reminder.title}</h4>
                          <p className="text-sm text-gray-600">
                            Due {formatDate(reminder.dueDate)} • {reminder.vaultName}
                            {reminder.cost && ` • Previous Cost: ${reminder.cost}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ 
                            backgroundColor: getUrgencyColor(reminder.urgency)
                          }}
                        >
                          {getUrgencyLabel(reminder.urgency)}
                        </span>
                        <i className="fas fa-chevron-right text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                ))}
        </div>

        <div className="flex justify-center mt-auto">
          <button 
            className="bg-gradient-to-r from-teal-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full max-w-sm"
            onClick={() => setShowAllReminders(!showAllReminders)}
          >
            <i className={`fas ${showAllReminders ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
            {showAllReminders ? 'Show Less' : 'View All Reminders'}
          </button>
        </div>
      </div>

      <DocumentModal 
        document={selectedDocument} 
        onClose={() => setSelectedDocument(null)} 
      />
    </>
  );
};

export default SmartSuggestions;