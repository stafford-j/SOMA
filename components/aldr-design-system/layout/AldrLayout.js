/**
 * AldrLayout - Main Layout Component for Aldr Applications
 * 
 * A flexible layout component that provides consistent page structure
 * across all Aldr applications with configurable header, footer, and content areas.
 * 
 * Features:
 * - Flexible header configuration (custom, vault-specific, or none)
 * - Consistent footer with Aldr branding and legal information
 * - Responsive design with mobile optimization
 * - Configurable content padding and background
 * - Support for full-screen content when needed
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import AldrHeader from './AldrHeader';

const AldrLayout = ({ 
  children,
  showHeader = false,
  headerProps = {},
  showFooter = true,
  footerProps = {},
  contentClassName = "",
  contentPadding = true,
  fullWidth = false,
  backgroundColor = "bg-aldr-light",
  minHeight = "min-h-screen"
}) => {
  
  // Default footer links
  const defaultFooterLinks = [
    { label: "Privacy", href: "#", onClick: () => alert("Privacy policy would open here") },
    { label: "Terms", href: "#", onClick: () => alert("Terms of service would open here") },
    { label: "Support", href: "mailto:james@ruleyproduction.com" }
  ];

  const footerLinks = footerProps.links || defaultFooterLinks;

  return (
    <div className={`flex flex-col ${minHeight}`}>
      {/* Header */}
      {showHeader && (
        <AldrHeader {...headerProps} />
      )}

      {/* Main Content */}
      <main className={`flex-grow ${backgroundColor} ${contentClassName}`}>
        <div className={`${fullWidth ? 'w-full' : 'container mx-auto'} ${contentPadding ? 'px-4' : ''}`}>
          {children || <Outlet />}
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo Section */}
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  {footerProps.logo ? (
                    footerProps.logo
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-purple-600 flex items-center justify-center">
                        <i className="fas fa-shield-alt text-white text-xl"></i>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Aldr
                        </div>
                        <div className="text-sm text-gray-600 italic">
                          /ˈɑːl-dər/ — life, age, lifetime
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 md:space-x-8 text-aldr-gray">
                {footerLinks.map((link, index) => (
                  link.href ? (
                    <a 
                      key={index}
                      href={link.href} 
                      className="hover:text-aldr-teal transition-colors"
                      onClick={link.onClick}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      key={index}
                      onClick={link.onClick}
                      className="hover:text-aldr-teal transition-colors"
                    >
                      {link.label}
                    </button>
                  )
                ))}
              </div>
            </div>
            
            {/* Copyright and Legal */}
            <div className="border-t border-gray-200 mt-6 pt-6 text-center text-aldr-gray text-sm">
              <p>© {new Date().getFullYear()} {footerProps.companyName || "Conas Consulting Limited"}. All rights reserved.</p>
              {footerProps.legalNotice !== false && (
                <p className="mt-2 text-xs">
                  {footerProps.legalNotice || 
                    "This document contains proprietary research and analysis prepared by Conas Consulting Limited. Unauthorized reproduction or distribution is prohibited."
                  }
                </p>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

AldrLayout.propTypes = {
  children: PropTypes.node,
  showHeader: PropTypes.bool,
  headerProps: PropTypes.object,
  showFooter: PropTypes.bool,
  footerProps: PropTypes.shape({
    logo: PropTypes.node,
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func
    })),
    companyName: PropTypes.string,
    legalNotice: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  }),
  contentClassName: PropTypes.string,
  contentPadding: PropTypes.bool,
  fullWidth: PropTypes.bool,
  backgroundColor: PropTypes.string,
  minHeight: PropTypes.string
};

export default AldrLayout;