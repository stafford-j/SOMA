/**
 * VaultHeader Component
 * 
 * Reusable header component for vault pages with configurable actions.
 * Provides consistent branding and navigation patterns across demos.
 * 
 * @param {string} title - Main title text (default: 'Aldr Vaults')
 * @param {string} subtitle - Norse definition subtitle (default: 'Aldr /ˈɑːl-dər/ — life, age, lifetime')
 * @param {React.ReactNode} actions - Custom action buttons/components to render in header-actions
 * @param {Function} onHomeClick - Callback for home button click (default: navigate to '/')
 * @param {string} homeIcon - Icon class for home button (default: Aldr logo image)
 * @param {boolean} showBanner - Whether to show BETA banner (default: true)
 */

import React from 'react';

const VaultHeader = ({
  title = 'Aldr Vaults',
  subtitle = 'Aldr /ˈɑːl-dər/ — life, age, lifetime',
  actions = null,
  onHomeClick = () => window.location.href = '/',
  homeIcon = 'image', // 'image' uses Aldr logo, or pass FontAwesome class
  showBanner = true
}) => {
  const renderHomeIcon = () => {
    if (homeIcon === 'image') {
      return (
        <img 
          src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png"
          alt="Home" 
          className="h-16 w-16 object-contain"
          style={{ 
            imageRendering: 'high-quality'
          }}
        />
      );
    } else {
      return <i className={`fas ${homeIcon} text-white text-3xl`}></i>;
    }
  };

  return (
    <>
      {/* BETA Banner */}
      {showBanner && (
        <div className="banner">
          Aldr Vaults is currently in BETA — this demo site is for partners, testers, and early collaborators
        </div>
      )}

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            onClick={onHomeClick}
            className="hover:opacity-80 transition-opacity"
            title="Back to Home"
          >
            {renderHomeIcon()}
          </button>
        </div>
        
        <div className="header-center flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
            {title}
          </h1>
          <div className="text-base text-white italic mt-1">
            {subtitle}
          </div>
        </div>
        
        <div className="header-actions">
          {actions}
        </div>
      </header>
    </>
  );
};

export default VaultHeader;