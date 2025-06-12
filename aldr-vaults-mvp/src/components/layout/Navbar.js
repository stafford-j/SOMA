import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import aldrLogo from '../../assets/aldr-logo-hq.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-aldr-gradient shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={aldrLogo}
                  alt="Aldr Logo" 
                  className="h-9 w-auto object-contain"
                  style={{ 
                    imageRendering: 'high-quality',
                    maxWidth: '100%'
                  }}
                />
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:items-center">
              <div className="space-x-6">
                <Link 
                  to="/aldr-id"
                  className="text-white hover:text-aldr-light px-3 py-2 font-medium" style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Aldr ID
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center space-x-4">
            <a 
              href="mailto:james@ruleyproduction.com" 
              className="btn-primary flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i> Contact
            </a>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-aldr-light focus:outline-none"
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
          <div className="px-4 pt-2 pb-4 space-y-2 bg-white shadow-lg rounded-b-lg">
            <Link 
              to="/aldr-id"
              className="text-aldr-teal hover:text-aldr-purple block px-3 py-2 rounded-md text-base font-medium w-full text-left" style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Aldr ID
            </Link>
            
            
            <a 
              href="mailto:james@ruleyproduction.com" 
              className="btn-primary flex items-center justify-center mt-2 w-full"
            >
              <i className="fas fa-envelope mr-2"></i> Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;