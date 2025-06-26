/**
 * WelcomeBanner Component
 * 
 * Shows helpful welcome information for new BETA users
 */

import React, { useState } from 'react';

const WelcomeBanner = ({ totalDocuments = 0, onDismiss }) => {
  const [dismissed, setDismissed] = useState(false);

  // Don't show if user has documents or has dismissed
  if (totalDocuments > 0 || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div className="welcome-banner bg-gradient-to-r from-teal-50 to-purple-50 border border-teal-200 rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div className="bg-teal-600 p-2 rounded-lg mr-3">
              <i className="fas fa-rocket text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                Welcome to Aldr Vaults BETA!
              </h3>
              <p className="text-teal-700 text-sm">Your secure document management system</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                <i className="fas fa-upload text-teal-600 mr-2"></i>
                Get Started
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Click any vault to start uploading documents</li>
                <li>• Identity vault: Store passports, licenses, IDs</li>
                <li>• Legal vault: Organize contracts, insurance, wills</li>
                <li>• Travel vault: Manage bookings and itineraries</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                <i className="fas fa-magic text-purple-600 mr-2"></i>
                Smart Features
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Smart Reminders: Get personalized alerts</li>
                <li>• Document Analytics: See insights and stats</li>
                <li>• Advanced Search: Find documents quickly</li>
                <li>• Smart Ingestion: AI-powered organization</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
              <div>
                <p className="text-yellow-800 text-sm font-medium">
                  BETA Version: Health vault coming soon!
                </p>
                <p className="text-yellow-700 text-xs mt-1">
                  We're adding medical records and health data management. All other vaults are fully functional.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          title="Dismiss welcome banner"
        >
          <i className="fas fa-times text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;