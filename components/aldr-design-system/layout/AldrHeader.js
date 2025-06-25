/**
 * AldrHeader - Standardized Header Component for Aldr Design System
 * 
 * A unified, flexible header component that provides consistent navigation
 * and branding across all Aldr vault applications.
 * 
 * Features:
 * - Configurable title, icon, and actions
 * - Responsive design with mobile-friendly interactions
 * - Consistent Aldr branding and typography
 * - Built-in language toggle with tooltip
 * - Flexible action button system
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AldrHeader = ({ 
  title = "Aldr",
  subtitle = "Aldr /ˈɑːl-dər/ — life, age, lifetime",
  icon = "fa-heartbeat",
  homeRoute = "/",
  actions = [],
  showLanguageToggle = true,
  showBackToVaults = true,
  className = "",
  titleStyle = {},
  variant = "default" // default, minimal, vault-specific
}) => {
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(false);

  const handleLanguageClick = () => {
    setShowLanguageTooltip(true);
    setTimeout(() => setShowLanguageTooltip(false), 2000);
  };

  // Default typography based on Aldr design system
  const defaultTitleStyle = {
    fontFamily: variant === 'vault-specific' ? 'Lora, serif' : 'Playfair Display, serif',
    fontWeight: variant === 'vault-specific' ? '500' : 'bold',
    ...titleStyle
  };

  // Standard action buttons
  const defaultActions = [
    ...(actions || []),
    ...(showLanguageToggle ? [{
      key: 'language',
      icon: 'fa-globe',
      label: 'EN',
      onClick: handleLanguageClick,
      tooltip: showLanguageTooltip ? 'Multi-language support coming soon!' : null
    }] : []),
    {
      key: 'contact',
      icon: 'fa-envelope',
      label: 'Contact',
      href: 'mailto:james@ruleyproduction.com'
    },
    ...(showBackToVaults ? [{
      key: 'back',
      icon: 'fa-arrow-left',
      label: 'Back to Vaults',
      to: '/'
    }] : [])
  ];

  const renderAction = (action) => {
    const baseClassName = "dashboard-button white";
    const content = (
      <>
        <i className={`fas ${action.icon}`}></i>
        <span className="hidden sm:inline">{action.label}</span>
      </>
    );

    if (action.to) {
      return (
        <Link key={action.key} to={action.to} className={baseClassName}>
          {content}
        </Link>
      );
    }

    if (action.href) {
      return (
        <a key={action.key} href={action.href} className={baseClassName}>
          {content}
        </a>
      );
    }

    return (
      <div key={action.key} className="relative">
        <button 
          className={baseClassName}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {content}
        </button>
        {action.tooltip && (
          <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50">
            {action.tooltip}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className={`dashboard-header ${className}`}>
      <div className="header-left">
        <Link to={homeRoute} className="flex flex-col hover:opacity-80 transition-opacity">
          <div className="flex items-center">
            {variant === 'vault-specific' ? (
              // Vault-specific layout with icon + title + subtitle below
              <>
                <i className={`fas ${icon} text-white text-2xl mr-3`}></i>
                <div className="flex flex-col">
                  <h1 className={`text-white ${variant === 'vault-specific' ? 'text-4xl' : 'text-xl'}`} style={defaultTitleStyle}>
                    {title}
                  </h1>
                  {subtitle && variant === 'vault-specific' && (
                    <div className="text-base text-white italic mt-1">
                      {subtitle}
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Default layout with icon + title/subtitle stacked
              <>
                <i className={`fas ${icon} text-white text-3xl mr-4`}></i>
                <div>
                  <h1 className="text-white text-xl" style={defaultTitleStyle}>
                    {title}
                  </h1>
                  {subtitle && (
                    <div className="text-sm text-white italic mt-1">
                      {subtitle}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Link>
      </div>
      
      {variant === 'vault-specific' && (
        <div className="header-center flex flex-col items-center justify-center">
          <div className="flex items-center">
            <i className={`fas ${icon} text-white text-2xl mr-3`}></i>
            <h1 className="text-white text-4xl" style={defaultTitleStyle}>{title}</h1>
          </div>
          {subtitle && (
            <div className="text-base text-white italic mt-1">
              {subtitle}
            </div>
          )}
        </div>
      )}

      <div className="header-actions">
        {defaultActions.map(renderAction)}
      </div>
    </header>
  );
};

AldrHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  homeRoute: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    tooltip: PropTypes.string
  })),
  showLanguageToggle: PropTypes.bool,
  showBackToVaults: PropTypes.bool,
  className: PropTypes.string,
  titleStyle: PropTypes.object,
  variant: PropTypes.oneOf(['default', 'minimal', 'vault-specific'])
};

export default AldrHeader;