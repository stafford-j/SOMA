import React from 'react';

// Super minimal Dashboard component with no dependencies
const MinimalDashboard = () => {
  // Force set user ID
  localStorage.setItem('userId', '1742961914546');

  return (
    <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h1 style={{color: '#0d9488', fontSize: '24px', marginBottom: '20px'}}>
        SOMA Companion Dashboard (Minimal Version)
      </h1>
      
      <div style={{background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        <p style={{marginBottom: '15px'}}>
          This is a minimal dashboard with no dependencies or API calls.
        </p>
        
        <p>
          User ID: {localStorage.getItem('userId') || 'Not set'}
        </p>
        
        <button 
          style={{
            marginTop: '20px',
            background: '#0d9488',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Button clicked!')}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default MinimalDashboard;