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
          <div className="flex items-center">
            <i className="fas fa-heartbeat text-white text-3xl mr-4"></i>
            <div>
              <h1 className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Aldr Health</h1>
              <div className="text-sm text-white italic mt-1">
                Aldr /ˈɑːl-dər/ — life, age, lifetime
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="header-actions">
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
        <Link to="/" className="dashboard-button white">
          <i className="fas fa-arrow-left"></i>
          <span className="hidden sm:inline">Back to Vaults</span>
        </Link>
      </div>
    </header>
  );
};

export default UniformHeader;