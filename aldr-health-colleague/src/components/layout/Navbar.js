/**
 * Provider Navbar Component
 * 
 * The main navigation bar for the Aldr Health Colleague provider platform.
 * Displays the provider information and provides navigation options.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { providerInfo } from '../dashboard/provider-sample-data';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // Logout functionality for provider
    console.log('Provider logout');
  };
  
  return (
    <nav className="bg-teal-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="https://static.wixstatic.com/media/afc39f_da0a94021ba6434399c2fbd4fd0ee013~mv2.png"
                  alt="Aldr Logo"
                  className="h-8 mr-2 bg-white p-1 rounded"
                />
                <div>
                  <span className="text-white font-bold text-xl">Aldr Health Colleague</span>
                  <div className="text-teal-100 text-xs">
                    {providerInfo.name}, {providerInfo.credentials} | {providerInfo.specialty}
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="space-x-4">
                <Link 
                  to="/" 
                  className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/patients" 
                  className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Patients
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link 
              to="/provider-profile" 
              className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Provider Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium ml-4"
            >
              Log out
            </button>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-teal-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/patients"
              className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Patients
            </Link>
            <Link
              to="/provider-profile"
              className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Provider Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;