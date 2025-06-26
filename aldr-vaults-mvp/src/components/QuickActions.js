/**
 * QuickActions Component
 * 
 * Provides quick navigation and common actions across the BETA system
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = ({ currentVault = null, className = "" }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-home',
      color: 'bg-teal-600 hover:bg-teal-700',
      action: () => navigate('/beta'),
      description: 'Return to main dashboard'
    },
    {
      id: 'identity',
      label: 'Identity',
      icon: 'fas fa-id-card',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => navigate('/beta/vault/identity'),
      description: 'Personal identity documents'
    },
    {
      id: 'legal',
      label: 'Legal',
      icon: 'fas fa-balance-scale',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => navigate('/beta/vault/legal'),
      description: 'Legal documents and contracts'
    },
    {
      id: 'travel',
      label: 'Travel',
      icon: 'fas fa-plane',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => navigate('/beta/vault/travel'),
      description: 'Travel documents and bookings'
    },
    {
      id: 'memories',
      label: 'Memories',
      icon: 'fas fa-heart',
      color: 'bg-pink-600 hover:bg-pink-700',
      action: () => navigate('/beta/vault/memories'),
      description: 'Family memories and heritage'
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: 'fas fa-graduation-cap',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => navigate('/beta/vault/learning'),
      description: 'Education and certifications'
    }
  ];

  // Filter out current vault from quick actions
  const availableActions = quickActions.filter(action => action.id !== currentVault);

  return (
    <div className={`quick-actions-container bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-bolt mr-2 text-yellow-500"></i>
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`${action.color} text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md flex flex-col items-center text-center`}
            title={action.description}
          >
            <i className={`${action.icon} text-xl mb-2`}></i>
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 text-sm mb-2">
          <i className="fas fa-lightbulb mr-1"></i>
          BETA Tips
        </h4>
        <ul className="text-blue-700 text-xs space-y-1">
          <li>• Upload documents to see personalized reminders</li>
          <li>• Use search to quickly find specific documents</li>
          <li>• Analytics show insights based on your documents</li>
          <li>• Health vault coming soon with advanced features</li>
        </ul>
      </div>
    </div>
  );
};

export default QuickActions;