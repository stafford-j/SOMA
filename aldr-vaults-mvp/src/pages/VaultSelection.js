import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VaultSelection.css';
import SmartSuggestions from '../components/SmartSuggestions';
import SmartIngest from '../components/SmartIngest';
import VaultInfoModal from '../components/VaultInfoModal';
import smartSuggestionsData from '../data/smart-suggestions-data';

const VaultSelection = () => {
  const navigate = useNavigate();
  const [selectedVaultInfo, setSelectedVaultInfo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showVaultDropdown, setShowVaultDropdown] = useState(false);
  const [showBuilderInfo, setShowBuilderInfo] = useState(false);
  const dropdownRef = useRef(null);
  const builderRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowVaultDropdown(false);
      }
      if (builderRef.current && !builderRef.current.contains(event.target)) {
        setShowBuilderInfo(false);
      }
    };

    if (showVaultDropdown || showBuilderInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVaultDropdown, showBuilderInfo]);

  const handleVaultNavigation = (vaultPath) => {
    navigate(vaultPath);
  };

  const showComingSoon = (message) => {
    alert(message || 'This vault is coming soon!');
  };

  const handleInfoClick = (vault) => {
    setSelectedVaultInfo(vault);
  };

  const handleReminderClick = (reminder) => {
    setSelectedDocument(reminder);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      day: 'numeric', 
      month: 'long'
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'red': return '#FF4444';
      case 'amber': return '#FFB84D';
      case 'green': return '#4CAF50';
      default: return '#4CAF50';
    }
  };

  const getVaultFont = (vaultId) => {
    return 'Lora, serif'; // All vault titles now use Lora Medium
  };

  // Document Modal Component
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
                Due {formatDate(document.dueDate)}
              </span>
              <span className="text-gray-600">{document.vaultName}</span>
              {document.cost && <span className="text-green-600 font-medium">Cost: {document.cost}</span>}
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Document Details</h3>
                <div className="space-y-3">
                  <p><strong>Type:</strong> {document.fullDocument?.type}</p>
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
                    <div className="space-y-4 text-sm max-h-96 overflow-y-auto">
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
                                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap">
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
            
            <div className="mt-6 pt-4 border-t">
              <button 
                className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors mr-4"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const vaults = [
    { 
      id: 'health', 
      name: 'Health',
      fullName: 'Aldr Health',
      icon: 'fa-heartbeat',
      color: 'bg-red-600',
      description: 'Organize your complete health history. Medical records, prescriptions, and health data under your control.',
      reminders: smartSuggestionsData.vaultSpecificReminders.health?.slice(0, 3).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
    },
    { 
      id: 'identity', 
      name: 'Identity',
      fullName: 'Aldr Identity',
      icon: 'fa-id-card',
      color: 'bg-blue-600',
      description: 'Store your identity documents securely. Passport, ID cards, and personal credentials in one encrypted vault.',
      reminders: smartSuggestionsData.vaultSpecificReminders.identity?.slice(0, 3).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
    },
    { 
      id: 'learning', 
      name: 'Learning',
      fullName: 'Aldr Learning',
      icon: 'fa-graduation-cap',
      color: 'bg-green-600',
      description: 'Store education credentials, certifications, and professional development records securely.',
      reminders: smartSuggestionsData.vaultSpecificReminders.learning?.slice(0, 3).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
    },
    { 
      id: 'legal', 
      name: 'Legal',
      fullName: 'Aldr Legal',
      icon: 'fa-balance-scale',
      color: 'bg-purple-600',
      description: 'Manage your legal documents, contracts, and important papers. Estate planning made simple.',
      reminders: smartSuggestionsData.vaultSpecificReminders.legal?.slice(0, 3).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
    },
    { 
      id: 'memoirs', 
      name: 'Memoirs',
      fullName: 'Aldr Memoirs',
      icon: 'fa-heart',
      color: 'bg-pink-600',
      description: 'Document family journals, preserve heritage stories, and build your family tree. Legacy planning connects seamlessly to Aldr Legal.',
      reminders: smartSuggestionsData.vaultSpecificReminders.memoirs?.slice(0, 3).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
    },
    { 
      id: 'travel', 
      name: 'Travel',
      fullName: 'Aldr Travel',
      icon: 'fa-plane',
      color: 'bg-indigo-600',
      description: 'Organize travel documents, bookings, and itineraries. Your passport data links intelligently to Aldr Identity.',
      reminders: smartSuggestionsData.vaultSpecificReminders.travel?.slice(0, 3).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
    },
    { 
      id: 'builder', 
      name: 'Vault Builder',
      fullName: 'Aldr Vault Builder',
      icon: 'fa-tools',
      color: 'bg-orange-600',
      description: 'Create custom vaults with your own organization system. Add tags, categories, and workflows that work for you.',
      reminders: smartSuggestionsData.vaultSpecificReminders.builder?.slice(0, 3).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
    }
  ];

  return (
    <main className="landing-container">
      {/* BETA Banner */}
      <div className="banner">
        Aldr Vaults is currently in BETA — this demo site is for partners, testers, and early collaborators
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            onClick={() => window.location.href = '/'}
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
          </button>
        </div>
        <div className="header-center flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>Aldr Vaults</h1>
          <div className="text-base text-white italic mt-1">
            Aldr /ˈɑːl-dər/ — life, age, lifetime
          </div>
        </div>
        <div className="header-actions">
          <div className="relative" ref={dropdownRef}>
            <button 
              className="dashboard-button white"
              onClick={() => setShowVaultDropdown(!showVaultDropdown)}
            >
              <img 
                src="https://static.wixstatic.com/media/afc39f_40f8cc261df94f13974fc5756f1fafb9~mv2.png" 
                alt="Vault Lock" 
                className="w-5 h-5 mr-2"
                style={{ objectFit: 'contain' }}
              />
              <span className="hidden sm:inline">Quick Access</span>
              <i className="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            {showVaultDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {vaults.map((vault) => (
                  <button
                    key={vault.id}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      handleVaultNavigation(`/vault/aldr-${vault.id}`);
                      setShowVaultDropdown(false);
                    }}
                  >
                    <i className={`fas ${vault.icon} mr-3 text-gray-500`}></i>
                    <span style={{ fontFamily: 'Playfair Display, serif' }}>{vault.name}</span>
                  </button>
                ))}
                <div className="border-t border-gray-200">
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 rounded-b-lg"
                    onClick={() => {
                      handleVaultNavigation('/smart-ingestion');
                      setShowVaultDropdown(false);
                    }}
                  >
                    <i className="fas fa-brain mr-3 text-gray-500"></i>
                    <span style={{ fontFamily: 'Playfair Display, serif' }}>Smart Ingestion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={builderRef}>
            <button 
              className="dashboard-button white"
              onClick={() => setShowBuilderInfo(!showBuilderInfo)}
              onMouseEnter={() => setShowBuilderInfo(true)}
              onMouseLeave={() => setShowBuilderInfo(false)}
            >
              <i className="fas fa-tools"></i>
              <span className="hidden sm:inline">Aldr Builder</span>
            </button>
            {showBuilderInfo && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mr-3">
                    <i className="fas fa-tools text-white"></i>
                  </div>
                  <h3 className="font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>Aldr Builder</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create custom vaults with your own organization system. Add tags, categories, and workflows that work for you.
                </p>
                <button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm w-full"
                  onClick={() => {
                    setShowBuilderInfo(false);
                    showComingSoon('Custom vault builder coming soon!');
                  }}
                >
                  <i className="fas fa-plus mr-2"></i>
                  Create Custom Vault
                </button>
              </div>
            )}
          </div>
          <a href="https://aldrvaults.com" className="dashboard-button white" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe"></i>
            <span className="hidden sm:inline">AldrVaults.com</span>
          </a>
          <a href="mailto:james@ruleyproductions.com" className="dashboard-button white">
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </header>

      {/* Main Content Section - 50/50 Layout */}
      <section className="main-content-section">
        <div className="w-full px-8">
          <div className="main-content-grid-new">
            {/* Left: Smart Features (50%) */}
            <div className="smart-features-section">
              {/* Notifications (formerly Smart Suggestions) */}
              <div className="mb-8">
                <SmartSuggestions />
              </div>
              
              {/* Smart Ingestion */}
              <div>
                <SmartIngest />
              </div>
            </div>
            
            {/* Right: Vault Cards with Reminders (50%) */}
            <div className="vault-cards-section">
              <div className="vaults-grid-new">
                {vaults.map((vault) => (
                  <div key={vault.id} className="vault-card-with-reminder">
                    {/* Vault Button */}
                    <button 
                      className="vault-button-with-reminder" 
                      onClick={() => {
                        const routeMap = {
                          'identity': '/vault/aldr-id',
                          'health': '/vault/aldr-health', 
                          'legal': '/vault/aldr-legal',
                          'travel': '/vault/aldr-travel',
                          'memoirs': '/vault/aldr-memoirs',
                          'learning': '/vault/aldr-learning',
                          'builder': '/vault/aldr-builder'
                        };
                        if (vault.id === 'builder') {
                          showComingSoon('Custom vault builder coming soon!');
                        } else {
                          handleVaultNavigation(routeMap[vault.id] || `/vault/aldr-${vault.id}`);
                        }
                      }}
                    >
                      {/* Icon */}
                      <i className={`fas ${vault.icon} vault-icon-reminder`} style={{ color: 'var(--teal)' }}></i>
                      
                      {/* Vault Name with Info Button */}
                      <div className="vault-name-section-reminder">
                        <span className="vault-name-reminder" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
                          {vault.name}
                        </span>
                        
                        {/* Info icon - inline after name */}
                        <div 
                          className="vault-info-icon-reminder"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInfoClick(vault);
                          }}
                          title="View vault information"
                        >
                          <i className="fas fa-info"></i>
                        </div>
                      </div>
                      
                      {/* Open Vault Button - styled like View All Reminders */}
                      <div className="vault-open-button-reminder">
                        <i className="fas fa-chevron-right mr-1"></i>
                        {vault.id === 'builder' ? vault.fullName : `${vault.fullName} Vault`}
                      </div>
                    </button>
                    
                    {/* Reminder Section */}
                    {vault.reminders.length > 0 && (
                      <div className="vault-reminder-display">
                        {vault.reminders.slice(0, 1).map((reminder) => {
                          const fullReminder = smartSuggestionsData.reminders.find(r => r.id === reminder.id) || reminder;
                          return (
                            <div 
                              key={reminder.id}
                              className="reminder-item-format"
                              onClick={() => handleReminderClick(fullReminder)}
                            >
                              <div className="reminder-details-single-line">
                                <span className="up-next-label">Up Next:</span> {fullReminder.title || reminder.title} | {formatFullDate(fullReminder.dueDate || reminder.dueDate)}
                                {fullReminder.cost && ` | ${fullReminder.cost}`}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-12">
        <div className="w-full px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <img 
                src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png"
                alt="Aldr Vaults Icon" 
                className="h-8 w-8 object-contain"
                style={{ 
                  imageRendering: 'high-quality'
                }}
              />
              <span className="text-gray-600" style={{ fontFamily: 'Playfair Display, serif' }}>
                Aldr Vaults
              </span>
              <span className="text-gray-500">
                © 2025 Conas Consulting Limited. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VaultInfoModal 
        vault={selectedVaultInfo} 
        isOpen={!!selectedVaultInfo} 
        onClose={() => setSelectedVaultInfo(null)} 
      />
      
      <DocumentModal 
        document={selectedDocument} 
        onClose={() => setSelectedDocument(null)} 
      />
    </main>
  );
};

export default VaultSelection;