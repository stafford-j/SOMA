import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="w-24 h-24 mb-8 bg-aldr-gradient rounded-full flex items-center justify-center">
        <span className="text-6xl font-bold text-white">?</span>
      </div>
      
      <h1 className="text-8xl font-bold heading-gradient mb-4">404</h1>
      
      <h2 className="text-3xl font-bold text-aldr-dark mb-6">Page Not Found</h2>
      
      <p className="text-aldr-gray mb-10 text-center max-w-md text-lg">
        The page you are looking for doesn't exist or has been moved to another location.
      </p>
      
      <div className="space-x-4">
        <Link
          to="/"
          className="btn-primary button-hover-lift"
        >
          Back to Dashboard
        </Link>
        
        <Link
          to="/support"
          className="btn-secondary button-hover-lift"
        >
          Contact Support
        </Link>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-aldr-gray">
          Need help finding something? Visit our <Link to="/help" className="text-aldr-teal hover:text-aldr-purple">help center</Link>.
        </p>
      </div>
    </div>
  );
};

export default NotFound;