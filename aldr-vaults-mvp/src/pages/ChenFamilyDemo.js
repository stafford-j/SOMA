import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VaultSelection.css';
import SmartSuggestions from '../components/SmartSuggestions';
import SmartIngest from '../components/SmartIngest';
import VaultInfoModal from '../components/VaultInfoModal';
import chenFamilyData from '../data/chen-family-data';
import smartSuggestionsData from '../data/smart-suggestions-data';

const ChenFamilyDemo = () => {
  const navigate = useNavigate();
  const [selectedVaultInfo, setSelectedVaultInfo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showVaultDropdown, setShowVaultDropdown] = useState(false);
  const [showBuilderInfo, setShowBuilderInfo] = useState(false);
  const [showChenIntro, setShowChenIntro] = useState(false);
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [familyMode, setFamilyMode] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('sarah'); // sarah, david, or family
  const dropdownRef = useRef(null);
  const builderRef = useRef(null);
  const modeDropdownRef = useRef(null);

  // Show intro modal on first visit
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('aldr-chen-intro-seen');
    if (!hasSeenIntro) {
      setShowChenIntro(true);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowVaultDropdown(false);
      }
      if (builderRef.current && !builderRef.current.contains(event.target)) {
        setShowBuilderInfo(false);
      }
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target)) {
        setShowModeDropdown(false);
      }
    };

    if (showVaultDropdown || showBuilderInfo || showModeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVaultDropdown, showBuilderInfo, showModeDropdown]);

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

  const handleCloseChenIntro = () => {
    setShowChenIntro(false);
    localStorage.setItem('aldr-chen-intro-seen', 'true');
  };

  const toggleFamilyMode = () => {
    setFamilyMode(!familyMode);
    if (!familyMode) {
      setSelectedPerson('family');
    } else {
      setSelectedPerson('sarah');
    }
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

  const getPersonDisplayName = () => {
    if (familyMode) return 'Chen Family';
    return selectedPerson === 'sarah' ? 'Sarah Chen' : 'David Chen';
  };

  const getPersonData = () => {
    if (familyMode) return chenFamilyData.familyMode;
    return selectedPerson === 'sarah' ? chenFamilyData.sarah : chenFamilyData.david;
  };

  // Chen Family Intro Modal Component
  const ChenIntroModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-teal-600" style={{ fontFamily: 'Playfair Display, serif' }}>
                Aldr Demo | Chen Family
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {/* Family Introduction */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Experience Aldr Through Family Eyes</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <p><strong>Sarah Chen (34):</strong> Management consultant navigating fertility journey across countries</p>
                  <p><strong>David Chen (36):</strong> Software architect managing remote work and health challenges</p>
                  <p><strong>Married 3 years:</strong> Currently in Lisbon, lived in US, UK, Singapore, Canada</p>
                  <p><strong>Family Toggle:</strong> Switch between Individual and Family Mode to see shared connections</p>
                </div>
              </div>

              {/* Background Context */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">International Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Sarah's Path</h4>
                    <p className="text-sm text-blue-700">US (birth) → UK (MBA) → Singapore (McKinsey) → Portugal (current)</p>
                    <p className="text-sm text-blue-600 mt-1">Challenges: Fertility journey across healthcare systems, consulting travel, Portuguese residency</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800">David's Path</h4>
                    <p className="text-sm text-green-700">Canada (birth) → Singapore (met Sarah) → Portugal (supporting Sarah)</p>
                    <p className="text-sm text-green-600 mt-1">Challenges: Remote work across jurisdictions, back pain management, supporting fertility journey</p>
                  </div>
                </div>
              </div>

              {/* Demo Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Demo Features</h3>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 space-y-2">
                  <p><strong>🔄 Family Toggle:</strong> Switch between Individual and Family modes</p>
                  <p><strong>🔗 Cross-Vault Intelligence:</strong> See how documents connect across vaults</p>
                  <p><strong>📊 Rich Data:</strong> 50+ realistic records per person across 6 vaults</p>
                  <p><strong>🌍 Real Scenarios:</strong> Fertility journey, international careers, multi-country living</p>
                </div>
              </div>

              {/* Navigation Instructions */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">How to Explore</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Individual Mode:</strong> Explore Sarah or David's personal vaults</p>
                  <p><strong>Family Mode:</strong> See shared documents and cross-vault connections</p>
                  <p><strong>Cross-Vault Intelligence:</strong> Notice how fertility treatment connects Travel, Legal, Learning, and Memories</p>
                  <p><strong>Real-Life Scenarios:</strong> See how international couples manage life across borders</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t flex flex-wrap gap-3">
              <button 
                className="bg-gradient-to-r from-teal-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex-1 max-w-sm"
                onClick={onClose}
              >
                <i className="fas fa-users mr-2"></i>
                Explore Chen Family Demo
              </button>
              <button 
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                onClick={onClose}
              >
                Skip Intro
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
              {document.dueDate && (
                <span 
                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: getUrgencyColor(document.urgency) }}
                >
                  {document.expiryDate ? `Expires ${formatDate(document.dueDate)}` : `Due ${formatDate(document.dueDate)}`}
                </span>
              )}
              {document.vaultName && <span className="text-gray-600">{document.vaultName}</span>}
              {document.owner && <span className="text-blue-600 font-medium">Owner: {document.owner}</span>}
              {document.cost && <span className="text-green-600 font-medium">Cost: {document.cost}</span>}
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Document Details</h3>
                <div className="space-y-3">
                  <p><strong>Type:</strong> {document.fullDocument?.type || document.type || document.category?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  <p><strong>Description:</strong> {document.description || 'Full document details available'}</p>
                  {document.number && <p><strong>Number:</strong> {document.number}</p>}
                  {document.issueDate && <p><strong>Issue Date:</strong> {formatDate(document.issueDate)}</p>}
                  {document.expiryDate && <p><strong>Expiry Date:</strong> {formatDate(document.expiryDate)}</p>}
                  {document.issuingCountry && <p><strong>Issuing Country:</strong> {document.issuingCountry}</p>}
                  {document.nationality && <p><strong>Nationality:</strong> {document.nationality}</p>}
                  {document.birthPlace && <p><strong>Birth Place:</strong> {document.birthPlace}</p>}
                  {document.status && <p><strong>Status:</strong> {document.status}</p>}
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

  const getChenReminders = (vaultId) => {
    // Get actual records from chen-family-data instead of separate reminders
    if (familyMode) {
      // Family mode: combine both people's records for this vault
      const sarahRecords = chenFamilyData.sarah[vaultId] || [];
      const davidRecords = chenFamilyData.david[vaultId] || [];
      const allRecords = [
        ...sarahRecords.map(record => ({ ...record, owner: 'Sarah Chen' })),
        ...davidRecords.map(record => ({ ...record, owner: 'David Chen' }))
      ];
      // Sort by dates and return first record as "up next"
      return allRecords
        .sort((a, b) => new Date(a.expiryDate || a.dueDate || a.startDate || '2025-01-01') - new Date(b.expiryDate || b.dueDate || b.startDate || '2025-01-01'))
        .slice(0, 1)
        .map(record => ({
          ...record,
          dueDate: record.expiryDate || record.dueDate || record.startDate,
          urgency: record.expiryDate && new Date(record.expiryDate) < new Date(Date.now() + 90*24*60*60*1000) ? 'red' : 'green'
        }));
    } else {
      // Individual mode: get selected person's records for this vault
      const records = chenFamilyData[selectedPerson][vaultId] || [];
      return records
        .sort((a, b) => new Date(a.expiryDate || a.dueDate || a.startDate || '2025-01-01') - new Date(b.expiryDate || b.dueDate || b.startDate || '2025-01-01'))
        .slice(0, 1)
        .map(record => ({
          ...record,
          dueDate: record.expiryDate || record.dueDate || record.startDate,
          urgency: record.expiryDate && new Date(record.expiryDate) < new Date(Date.now() + 90*24*60*60*1000) ? 'red' : 'green'
        }));
    }
  };

  const vaults = [
    { 
      id: 'identity', 
      name: 'Identity',
      fullName: 'Aldr Identity',
      icon: 'fa-id-card',
      color: 'bg-blue-600',
      description: 'Store personal attributes and government identification documents securely.',
      reminders: getChenReminders('identity')
    },
    { 
      id: 'legal', 
      name: 'Legal',
      fullName: 'Aldr Legal',
      icon: 'fa-balance-scale',
      color: 'bg-purple-600',
      description: 'Manage contracts, insurance policies, visas, and legal documents.',
      reminders: getChenReminders('legal')
    },
    { 
      id: 'travel', 
      name: 'Travel',
      fullName: 'Aldr Travel',
      icon: 'fa-plane',
      color: 'bg-indigo-600',
      description: 'Organize travel bookings, itineraries, and travel logistics.',
      reminders: getChenReminders('travel')
    },
    { 
      id: 'memories', 
      name: 'Memories',
      fullName: 'Aldr Memories',
      icon: 'fa-heart',
      color: 'bg-pink-600',
      description: 'Document life stories, achievements, and preserve family heritage.',
      reminders: getChenReminders('memories')
    },
    { 
      id: 'learning', 
      name: 'Learning',
      fullName: 'Aldr Learning',
      icon: 'fa-graduation-cap',
      color: 'bg-green-600',
      description: 'Track education, certifications, and professional development.',
      reminders: getChenReminders('learning')
    },
    { 
      id: 'builder', 
      name: 'Vault Builder',
      fullName: 'Aldr Vault Builder',
      icon: 'fa-tools',
      color: 'bg-orange-600',
      description: 'Create custom vaults with your own organization system.',
      reminders: []
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
          {/* Unified Mode/Person Selector */}
          <div className="relative" ref={modeDropdownRef}>
            <button 
              className="dashboard-button white flex items-center"
              onClick={() => setShowModeDropdown(!showModeDropdown)}
            >
              <i className={`fas ${familyMode ? 'fa-users' : 'fa-user'} mr-2`}></i>
              <span className="hidden sm:inline">
                {familyMode 
                  ? 'Family | David & Sarah'
                  : `Individual | ${selectedPerson === 'sarah' ? 'Sarah Chen' : 'David Chen'}`
                }
              </span>
              <i className="fas fa-chevron-down ml-2 text-xs"></i>
            </button>
            {showModeDropdown && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Individual Mode</div>
                  <button
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${!familyMode && selectedPerson === 'sarah' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    onClick={() => {
                      setFamilyMode(false);
                      setSelectedPerson('sarah');
                      setShowModeDropdown(false);
                    }}
                  >
                    <i className="fas fa-user mr-3"></i>
                    <span>Individual | Sarah Chen</span>
                    {!familyMode && selectedPerson === 'sarah' && <i className="fas fa-check ml-auto text-blue-600"></i>}
                  </button>
                  <button
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${!familyMode && selectedPerson === 'david' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    onClick={() => {
                      setFamilyMode(false);
                      setSelectedPerson('david');
                      setShowModeDropdown(false);
                    }}
                  >
                    <i className="fas fa-user mr-3"></i>
                    <span>Individual | David Chen</span>
                    {!familyMode && selectedPerson === 'david' && <i className="fas fa-check ml-auto text-blue-600"></i>}
                  </button>
                  <hr className="my-2" />
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Family Mode</div>
                  <button
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${familyMode ? 'bg-purple-50 text-purple-600' : 'text-gray-700'}`}
                    onClick={() => {
                      setFamilyMode(true);
                      setSelectedPerson('family');
                      setShowModeDropdown(false);
                    }}
                  >
                    <i className="fas fa-users mr-3"></i>
                    <span>Family | David & Sarah</span>
                    {familyMode && <i className="fas fa-check ml-auto text-purple-600"></i>}
                  </button>
                </div>
              </div>
            )}
          </div>

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
                      if (vault.id === 'builder') {
                        showComingSoon('Custom vault builder coming soon!');
                      } else {
                        showComingSoon(`${vault.fullName} opening soon!`);
                      }
                      setShowVaultDropdown(false);
                    }}
                  >
                    <i className={`fas ${vault.icon} mr-3 text-gray-500`}></i>
                    <span style={{ fontFamily: 'Playfair Display, serif' }}>{vault.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="https://aldrvaults.com" className="dashboard-button white" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe"></i>
            <span className="hidden sm:inline">AldrVaults.com</span>
          </a>
          <div className="relative">
            <button 
              className="dashboard-button white"
              onMouseEnter={() => setShowLanguageTooltip(true)}
              onMouseLeave={() => setShowLanguageTooltip(false)}
              onClick={() => alert('Language toggle coming soon! Currently working on Portuguese translation support.')}
            >
              <i className="fas fa-language"></i>
              <span className="hidden sm:inline">EN</span>
            </button>
            {showLanguageTooltip && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-black text-white text-sm p-2 rounded-lg shadow-lg z-50">
                Coming Soon: Portuguese language support
              </div>
            )}
          </div>
          <a href="mailto:james@ruleyproductions.com" className="dashboard-button white">
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="main-content-section">
        <div className="w-full px-8">
          {/* Mode Indicator */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {getPersonDisplayName()}
            </h2>
            <p className="text-white opacity-90">
              {familyMode 
                ? 'Family Mode: Shared documents and cross-vault connections'
                : `Individual Mode: ${selectedPerson === 'sarah' ? "Sarah's" : "David's"} personal vaults`
              }
            </p>
          </div>

          <div className="main-content-grid-new">
            {/* Left: Smart Features (50%) */}
            <div className="smart-features-section">
              {/* Smart Reminders (using exact Peter Murphy component) */}
              <div className="mb-8">
                <SmartSuggestions />
              </div>
              
              {/* Smart Ingestion */}
              <div>
                <SmartIngest />
              </div>
            </div>
            
            {/* Right: Vault Cards (50%) */}
            <div className="vault-cards-section">
              <div className="vaults-grid-new">
                {vaults.map((vault) => (
                  <div key={vault.id} className="vault-card-with-reminder">
                    {/* Vault Button */}
                    <button 
                      className="vault-button-with-reminder" 
                      onClick={() => {
                        if (vault.id === 'builder') {
                          showComingSoon('Custom vault builder coming soon!');
                        } else if (vault.id === 'identity') {
                          // Navigate to Chen Identity vault with mode/person params
                          const params = familyMode 
                            ? '?mode=family'
                            : `?mode=individual&person=${selectedPerson}`;
                          navigate(`/chen-identity${params}`);
                        } else if (vault.id === 'legal') {
                          // Navigate to Chen Legal vault with mode/person params
                          const params = familyMode 
                            ? '?mode=family'
                            : `?mode=individual&person=${selectedPerson}`;
                          navigate(`/chen-legal${params}`);
                        } else if (vault.id === 'travel') {
                          // Navigate to Chen Travel vault with mode/person params
                          const params = familyMode 
                            ? '?mode=family'
                            : `?mode=individual&person=${selectedPerson}`;
                          navigate(`/chen-travel${params}`);
                        } else if (vault.id === 'memories') {
                          // Navigate to Chen Memories vault with mode/person params
                          const params = familyMode 
                            ? '?mode=family'
                            : `?mode=individual&person=${selectedPerson}`;
                          navigate(`/chen-memories${params}`);
                        } else if (vault.id === 'learning') {
                          // Navigate to Chen Learning vault with mode/person params
                          const params = familyMode 
                            ? '?mode=family'
                            : `?mode=individual&person=${selectedPerson}`;
                          navigate(`/chen-learning${params}`);
                        } else {
                          showComingSoon(`${vault.fullName} opening soon with ${familyMode ? 'family' : 'individual'} mode!`);
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
                        
                        {/* Info icon */}
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
                          return (
                            <div 
                              key={reminder.id}
                              className="reminder-item-format"
                              onClick={() => {
                                // Navigate directly to the vault where this record lives
                                const params = familyMode 
                                  ? '?mode=family'
                                  : `?mode=individual&person=${selectedPerson}`;
                                navigate(`/chen-${vault.id}${params}`);
                              }}
                            >
                              <div className="reminder-details-single-line">
                                <span className="up-next-label">Up Next:</span> {reminder.title} | {formatFullDate(reminder.dueDate)}
                                {familyMode && reminder.owner && ` | ${reminder.owner}`}
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
      <ChenIntroModal 
        isOpen={showChenIntro} 
        onClose={handleCloseChenIntro} 
      />
      
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

export default ChenFamilyDemo;