/**
 * PersonSelector Component
 * 
 * Reusable person/mode selector component for Chen Family demo.
 * Handles switching between Individual and Family modes.
 * 
 * @param {boolean} familyMode - Current family mode state
 * @param {string} selectedPerson - Currently selected person ('sarah' or 'david')
 * @param {boolean} showDropdown - Whether dropdown is currently open
 * @param {Function} onToggleDropdown - Callback to toggle dropdown visibility
 * @param {Function} onModeChange - Callback when mode/person changes (familyMode, selectedPerson)
 * @param {React.RefObject} dropdownRef - Ref for click outside handling
 */

import React from 'react';

const PersonSelector = ({
  familyMode,
  selectedPerson,
  showDropdown,
  onToggleDropdown,
  onModeChange,
  dropdownRef
}) => {
  const handleModeChange = (newFamilyMode, newSelectedPerson) => {
    onModeChange(newFamilyMode, newSelectedPerson);
    onToggleDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="dashboard-button white flex items-center"
        onClick={() => onToggleDropdown(!showDropdown)}
      >
        <i className={`fas ${familyMode ? 'fa-users' : 'fa-user'} mr-2`}></i>
        <span className="hidden sm:inline">
          {familyMode 
            ? 'Family | David & Sarah'
            : `Individual | ${selectedPerson === 'sarah' ? 'Sarah Chen' : 'David Chen'}`
          }
        </span>
        <i className="fas fa-chevron-down ml-2 text-xs"></i>
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Individual Mode</div>
            
            <button
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${
                !familyMode && selectedPerson === 'sarah' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => handleModeChange(false, 'sarah')}
            >
              <i className="fas fa-user mr-3"></i>
              <span>Individual | Sarah Chen</span>
              {!familyMode && selectedPerson === 'sarah' && <i className="fas fa-check ml-auto text-blue-600"></i>}
            </button>
            
            <button
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${
                !familyMode && selectedPerson === 'david' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => handleModeChange(false, 'david')}
            >
              <i className="fas fa-user mr-3"></i>
              <span>Individual | David Chen</span>
              {!familyMode && selectedPerson === 'david' && <i className="fas fa-check ml-auto text-blue-600"></i>}
            </button>
            
            <hr className="my-2" />
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Family Mode</div>
            
            <button
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center ${
                familyMode ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
              }`}
              onClick={() => handleModeChange(true, 'family')}
            >
              <i className="fas fa-users mr-3"></i>
              <span>Family | David & Sarah</span>
              {familyMode && <i className="fas fa-check ml-auto text-purple-600"></i>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonSelector;