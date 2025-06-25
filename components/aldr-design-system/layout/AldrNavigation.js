/**
 * AldrNavigation - Unified Navigation Component for Aldr Design System
 * 
 * A flexible navigation component that provides consistent navigation
 * patterns across all Aldr applications.
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Configurable logo and navigation items
 * - Active state management
 * - Dropdown menu support
 * - Mobile-optimized touch targets
 * - Consistent Aldr branding
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const AldrNavigation = ({ 
  logo = null,
  logoTo = "/",
  navigationItems = [],
  actions = [],
  variant = "default", // default, minimal, transparent
  showMobileMenu = true,
  className = "",
  fixed = false,
  ...props
}) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Default logo
  const defaultLogo = (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
        <i className="fas fa-shield-alt text-white text-lg"></i>
      </div>
      <span className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
        Aldr
      </span>
    </div>
  );

  // Default navigation items
  const defaultNavItems = [
    { label: "Aldr ID", to: "/aldr-id", icon: "fa-id-card" },
    { label: "Health", to: "/aldr-health", icon: "fa-heartbeat" },
    { label: "Legal", to: "/aldr-legal", icon: "fa-gavel" }
  ];

  // Default actions
  const defaultActions = [
    {
      label: "Contact",
      href: "mailto:james@ruleyproduction.com",
      icon: "fa-envelope",
      variant: "primary"
    }
  ];

  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavItems;
  const navActions = actions.length > 0 ? actions : defaultActions;

  // Variant styles
  const variantClasses = {
    default: "bg-gradient-to-r from-aldr-teal to-aldr-purple shadow-md",
    minimal: "bg-white border-b border-gray-200",
    transparent: "bg-transparent"
  };

  // Check if item is active
  const isActiveItem = (item) => {
    if (item.to) {
      return location.pathname === item.to || 
             (item.activePattern && location.pathname.match(new RegExp(item.activePattern)));
    }
    return false;
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (itemId) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  // Render navigation item
  const renderNavItem = (item, index) => {
    const isActive = isActiveItem(item);
    const hasDropdown = item.children && item.children.length > 0;
    
    const linkClasses = [
      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
      variant === "minimal" ? "text-gray-700 hover:text-aldr-teal" : "text-white hover:text-opacity-80",
      isActive ? (variant === "minimal" ? "text-aldr-teal bg-aldr-teal bg-opacity-10" : "text-white bg-white bg-opacity-20") : ""
    ].join(" ");

    if (hasDropdown) {
      return (
        <div key={index} className="relative" ref={dropdownRef}>
          <button
            onClick={() => handleDropdownToggle(item.id || index)}
            className={`${linkClasses} space-x-2`}
          >
            {item.icon && <i className={`fas ${item.icon}`}></i>}
            <span>{item.label}</span>
            <i className={`fas fa-chevron-down transition-transform ${openDropdown === (item.id || index) ? 'rotate-180' : ''}`}></i>
          </button>
          
          {openDropdown === (item.id || index) && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              {item.children.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  to={child.to}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 space-x-2"
                >
                  {child.icon && <i className={`fas ${child.icon}`}></i>}
                  <span>{child.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.to) {
      return (
        <Link key={index} to={item.to} className={`${linkClasses} space-x-2`}>
          {item.icon && <i className={`fas ${item.icon}`}></i>}
          <span>{item.label}</span>
        </Link>
      );
    }

    if (item.href) {
      return (
        <a 
          key={index} 
          href={item.href} 
          target={item.target}
          rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
          className={`${linkClasses} space-x-2`}
        >
          {item.icon && <i className={`fas ${item.icon}`}></i>}
          <span>{item.label}</span>
        </a>
      );
    }

    return (
      <button 
        key={index}
        onClick={item.onClick}
        className={`${linkClasses} space-x-2`}
      >
        {item.icon && <i className={`fas ${item.icon}`}></i>}
        <span>{item.label}</span>
      </button>
    );
  };

  // Render action button
  const renderAction = (action, index) => {
    const actionClasses = [
      "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors space-x-2",
      action.variant === "primary" ? "bg-white text-aldr-teal hover:bg-opacity-90" :
      action.variant === "secondary" ? "bg-transparent border border-white text-white hover:bg-white hover:text-aldr-teal" :
      "text-white hover:text-opacity-80"
    ].join(" ");

    if (action.to) {
      return (
        <Link key={index} to={action.to} className={actionClasses}>
          {action.icon && <i className={`fas ${action.icon}`}></i>}
          <span className="hidden sm:inline">{action.label}</span>
        </Link>
      );
    }

    if (action.href) {
      return (
        <a 
          key={index}
          href={action.href}
          target={action.target}
          rel={action.target === "_blank" ? "noopener noreferrer" : undefined}
          className={actionClasses}
        >
          {action.icon && <i className={`fas ${action.icon}`}></i>}
          <span className="hidden sm:inline">{action.label}</span>
        </a>
      );
    }

    return (
      <button key={index} onClick={action.onClick} className={actionClasses}>
        {action.icon && <i className={`fas ${action.icon}`}></i>}
        <span className="hidden sm:inline">{action.label}</span>
      </button>
    );
  };

  return (
    <nav 
      className={`${variantClasses[variant]} ${fixed ? 'fixed top-0 left-0 right-0 z-50' : ''} ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to={logoTo} className="flex items-center">
                {logo || defaultLogo}
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:items-center md:space-x-4">
              {navItems.map((item, index) => renderNavItem(item, index))}
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navActions.map((action, index) => renderAction(action, index))}
          </div>
          
          {/* Mobile menu button */}
          {showMobileMenu && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.to ? (
                  <Link
                    to={item.to}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium space-x-3 ${
                      isActiveItem(item) 
                        ? 'text-aldr-teal bg-aldr-teal bg-opacity-10' 
                        : 'text-gray-700 hover:text-aldr-teal hover:bg-gray-50'
                    }`}
                  >
                    {item.icon && <i className={`fas ${item.icon}`}></i>}
                    <span>{item.label}</span>
                  </Link>
                ) : item.href ? (
                  <a
                    href={item.href}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-aldr-teal hover:bg-gray-50 space-x-3"
                  >
                    {item.icon && <i className={`fas ${item.icon}`}></i>}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-aldr-teal hover:bg-gray-50 space-x-3"
                  >
                    {item.icon && <i className={`fas ${item.icon}`}></i>}
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Actions */}
          <div className="border-t border-gray-200 px-2 py-3 space-y-1">
            {navActions.map((action, index) => (
              <div key={index}>
                {action.to ? (
                  <Link
                    to={action.to}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-aldr-teal bg-aldr-teal bg-opacity-10 space-x-3"
                  >
                    {action.icon && <i className={`fas ${action.icon}`}></i>}
                    <span>{action.label}</span>
                  </Link>
                ) : action.href ? (
                  <a
                    href={action.href}
                    target={action.target}
                    rel={action.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-aldr-teal bg-aldr-teal bg-opacity-10 space-x-3"
                  >
                    {action.icon && <i className={`fas ${action.icon}`}></i>}
                    <span>{action.label}</span>
                  </a>
                ) : (
                  <button
                    onClick={action.onClick}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-aldr-teal bg-aldr-teal bg-opacity-10 space-x-3"
                  >
                    {action.icon && <i className={`fas ${action.icon}`}></i>}
                    <span>{action.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

AldrNavigation.propTypes = {
  logo: PropTypes.node,
  logoTo: PropTypes.string,
  navigationItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    target: PropTypes.string,
    activePattern: PropTypes.string,
    children: PropTypes.array
  })),
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    target: PropTypes.string
  })),
  variant: PropTypes.oneOf(['default', 'minimal', 'transparent']),
  showMobileMenu: PropTypes.bool,
  className: PropTypes.string,
  fixed: PropTypes.bool
};

export default AldrNavigation;