/**
 * VaultCard Component
 * 
 * Reusable vault card component that can be used across different demos.
 * Supports reminders, navigation, info modals, and coming soon states.
 * 
 * @param {Object} vault - Vault configuration object
 * @param {Array} reminders - Array of reminder objects for this vault
 * @param {Function} onVaultClick - Callback when vault is clicked
 * @param {Function} onInfoClick - Callback when info icon is clicked
 * @param {Function} onReminderClick - Callback when reminder is clicked
 * @param {boolean} showReminders - Whether to show reminder section
 * @param {Object} formatters - Formatting utility functions
 */

import React from 'react';

const VaultCard = ({
  vault,
  reminders = [],
  onVaultClick,
  onInfoClick,
  onReminderClick,
  showReminders = true,
  formatters = {}
}) => {
  // Default formatters if not provided
  const defaultFormatters = {
    formatFullDate: (date) => new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    getUrgencyColor: (urgency) => {
      const colors = {
        red: '#ef4444',
        amber: '#f59e0b', 
        orange: '#f97316',
        green: '#10b981'
      };
      return colors[urgency] || '#6b7280';
    }
  };

  const { formatFullDate, getUrgencyColor } = { ...defaultFormatters, ...formatters };

  const handleVaultClick = () => {
    if (onVaultClick) {
      onVaultClick(vault);
    }
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    if (onInfoClick) {
      onInfoClick(vault);
    }
  };

  const handleReminderClick = (reminder) => {
    if (onReminderClick) {
      onReminderClick(reminder);
    }
  };

  // Get display reminders (limit to first one for compact display)
  const displayReminders = reminders.slice(0, 1);

  return (
    <div className="vault-card-with-reminder">
      {/* Vault Button */}
      <button 
        className="vault-button-with-reminder" 
        onClick={handleVaultClick}
      >
        {/* Icon */}
        <i 
          className={`fas ${vault.icon} vault-icon-reminder`} 
          style={{ color: 'var(--teal)' }}
        />
        
        {/* Vault Name with Info Button */}
        <div className="vault-name-section-reminder">
          <span 
            className="vault-name-reminder" 
            style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}
          >
            {vault.name}
            {vault.coming_soon && (
              <span className="ml-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                Coming Soon
              </span>
            )}
          </span>
          
          {/* Info icon - inline after name */}
          {onInfoClick && (
            <div 
              className="vault-info-icon-reminder"
              onClick={handleInfoClick}
              title="View vault information"
            >
              <i className="fas fa-info"></i>
            </div>
          )}
        </div>
        
        {/* Open Vault Button - styled like View All Reminders */}
        <div className="vault-open-button-reminder">
          <i className="fas fa-chevron-right mr-1"></i>
          {vault.id === 'builder' ? vault.fullName : `${vault.fullName} Vault`}
        </div>
      </button>
      
      {/* Reminder Section */}
      {showReminders && displayReminders.length > 0 && (
        <div className="vault-reminder-display">
          {displayReminders.map((reminder) => (
            <div 
              key={reminder.id}
              className="reminder-item-format"
              onClick={() => handleReminderClick(reminder)}
            >
              <div className="reminder-details-single-line">
                <span className="up-next-label">Up Next:</span> 
                {reminder.title} | {formatFullDate(reminder.dueDate)}
                {reminder.cost && ` | ${reminder.cost}`}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Empty state for no reminders */}
      {showReminders && displayReminders.length === 0 && (
        <div className="vault-reminder-display">
          <div className="reminder-item-format opacity-60">
            <div className="reminder-details-single-line">
              <span className="up-next-label">Up Next:</span> 
              No upcoming reminders
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultCard;