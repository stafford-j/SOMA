import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UniformHeader = ({ title = "Aldr Health Companion" }) => {
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(false);

  const handleLanguageClick = () => {
    setShowLanguageTooltip(true);
    setTimeout(() => setShowLanguageTooltip(false), 2000);
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <Link to="/" className="flex flex-col">
          <img 
            src="https://static.wixstatic.com/media/afc39f_ca3a562fc9ab4f2fa58e3db782784e50~mv2.png"
            alt="Aldr Health Logo" 
            className="h-12 w-auto object-contain mr-4"
            style={{ 
              imageRendering: 'high-quality',
              maxWidth: '200px'
            }}
          />
          <div className="text-sm text-white italic ml-1 mt-1 hidden sm:block">
            Aldr /ˈɑːl-dər/ — life, age, lifetime
          </div>
        </Link>
      </div>
      <div className="header-actions">
        <Link to="/aldr-id" className="dashboard-button white">
          <i className="fas fa-id-card"></i>
          <span className="hidden sm:inline">Aldr ID</span>
        </Link>
        <Link to="/add-record" className="dashboard-button white">
          <i className="fas fa-plus"></i>
          <span className="hidden sm:inline">Add New Record</span>
        </Link>
        <div className="relative">
          <button 
            className="dashboard-button white"
            onClick={handleLanguageClick}
          >
            <i className="fas fa-globe"></i>
            <span className="hidden sm:inline">EN</span>
          </button>
          {showLanguageTooltip && (
            <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50">
              Multi-language support coming soon!
              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
            </div>
          )}
        </div>
        <a 
          href="mailto:james@ruleyproduction.com" 
          className="dashboard-button white"
        >
          <i className="fas fa-envelope"></i>
          <span className="hidden sm:inline">Contact</span>
        </a>
        <button className="dashboard-button white" onClick={() => alert('Logout functionality to be implemented')}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
};

export default UniformHeader;