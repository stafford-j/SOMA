import React from 'react';
import { Outlet } from 'react-router-dom';
import aldrLogoTagline from '../assets/aldr-logo-tagline.png';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-aldr-light">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <img 
                  src={aldrLogoTagline}
                  alt="Aldr Logo with Tagline" 
                  className="h-auto max-w-full"
                  style={{ height: '80px' }}
                />
              </div>
            </div>
            
            <div className="flex space-x-8 text-aldr-gray">
              <a href="#" className="hover:text-aldr-teal">Privacy</a>
              <a href="#" className="hover:text-aldr-teal">Terms</a>
              <a href="#" className="hover:text-aldr-teal">Support</a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6 text-center text-aldr-gray text-sm">
            <p>© {new Date().getFullYear()} Conas Consulting Limited. All rights reserved.</p>
            <p className="mt-2 text-xs">This document contains proprietary research and analysis prepared by Conas Consulting Limited. Unauthorized reproduction or distribution is prohibited.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;