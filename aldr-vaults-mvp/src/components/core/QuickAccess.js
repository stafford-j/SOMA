/**
 * QuickAccess Component
 * 
 * Reusable vault navigation dropdown component.
 * 
 * @param {Array} vaults - Array of vault objects with id, name, icon, fullName
 * @param {boolean} showDropdown - Whether dropdown is currently open
 * @param {Function} onToggleDropdown - Callback to toggle dropdown visibility
 * @param {Function} onVaultClick - Callback when vault is clicked (vault)
 * @param {React.RefObject} dropdownRef - Ref for click outside handling
 * @param {Array} extraItems - Optional extra items to show at bottom of dropdown
 */

import React from 'react';

const QuickAccess = ({
  vaults,
  showDropdown,
  onToggleDropdown,
  onVaultClick,
  dropdownRef,
  extraItems = []
}) => {
  const handleVaultClick = (vault) => {
    onVaultClick(vault);
    onToggleDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="dashboard-button white"
        onClick={() => onToggleDropdown(!showDropdown)}
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
      
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {vaults.map((vault) => (
            <button
              key={vault.id}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => handleVaultClick(vault)}
            >
              <i className={`fas ${vault.icon} mr-3 text-gray-500`}></i>
              <span style={{ fontFamily: 'Playfair Display, serif' }}>{vault.name}</span>
            </button>
          ))}
          
          {extraItems.length > 0 && (
            <div className="border-t border-gray-200">
              {extraItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 rounded-b-lg"
                  onClick={() => {
                    item.onClick();
                    onToggleDropdown(false);
                  }}
                >
                  <i className={`fas ${item.icon} mr-3 text-gray-500`}></i>
                  <span style={{ fontFamily: 'Playfair Display, serif' }}>{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickAccess;