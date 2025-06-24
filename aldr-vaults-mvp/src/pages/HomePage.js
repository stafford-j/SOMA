import React, { useState, useEffect } from 'react';

const HomePage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Sample vault data for demonstration
  const [vaults] = useState([
    { 
      id: 'health', 
      name: 'Aldr Health',
      displayName: 'Health Vault',
      icon: 'fa-heart-pulse',
      color: 'bg-teal-500',
      description: 'Store and manage your health records, medical history, and wellness data',
      recordCount: 8,
      recentActivity: [
        { date: '2025-05-28T14:30:00', action: 'Added vaccination record', icon: 'fa-syringe' },
        { date: '2025-05-26T10:15:00', action: 'Updated medical history', icon: 'fa-file-medical' },
        { date: '2025-05-20T16:45:00', action: 'Added lab results', icon: 'fa-flask' }
      ]
    },
    { 
      id: 'legal', 
      name: 'Aldr Legal',
      displayName: 'Legal Vault',
      icon: 'fa-scale-balanced',
      color: 'bg-purple-600',
      description: 'Securely store contracts, agreements, and important legal documents',
      recordCount: 5,
      recentActivity: [
        { date: '2025-05-27T11:20:00', action: 'Added rental agreement', icon: 'fa-file-contract' },
        { date: '2025-05-22T14:10:00', action: 'Updated will and testament', icon: 'fa-file-signature' },
        { date: '2025-05-18T09:30:00', action: 'Added power of attorney', icon: 'fa-gavel' }
      ]
    },
    { 
      id: 'identity', 
      name: 'Aldr ID',
      displayName: 'Identity Vault',
      icon: 'fa-id-card',
      color: 'bg-blue-600',
      description: 'Store identification documents, certificates, and personal credentials',
      recordCount: 6,
      recentActivity: [
        { date: '2025-05-29T09:45:00', action: 'Added passport scan', icon: 'fa-passport' },
        { date: '2025-05-25T13:15:00', action: 'Updated driver\'s license', icon: 'fa-id-badge' },
        { date: '2025-05-21T10:30:00', action: 'Added birth certificate', icon: 'fa-certificate' }
      ]
    }
  ]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">      
      {/* Welcome Section */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">Welcome to Your Aldr Vault</h1>
        <p className="text-aldr-gray text-lg">
          Where all your important stuff goes
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-aldr-gradient text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <i className="fas fa-vault text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">3</h3>
              <p className="text-white text-opacity-80">Total Vaults</p>
            </div>
          </div>
          <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
            <div className="h-1 bg-white rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div className="card bg-aldr-gradient text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <i className="fas fa-file-alt text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">19</h3>
              <p className="text-white text-opacity-80">Total Records</p>
            </div>
          </div>
          <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
            <div className="h-1 bg-white rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        <div className="card bg-aldr-gradient text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
              <i className="fas fa-share-alt text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">2</h3>
              <p className="text-white text-opacity-80">Shared Records</p>
            </div>
          </div>
          <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
            <div className="h-1 bg-white rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>

      {/* Your Vaults Section */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-aldr-dark">Your Vaults</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vaults.map(vault => (
            <div 
              key={vault.id} 
              className="vault-card hover:shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 93, 91, 0.1), rgba(138, 43, 226, 0.1))',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full ${vault.color} flex items-center justify-center mr-4 text-white`}>
                  <i className={`fas ${vault.icon} text-xl`}></i>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-aldr-dark mr-2" style={{ fontFamily: 'Playfair Display, serif' }}>{vault.name}</h3>
                    <img 
                      src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png" 
                      alt="Aldr Vaults Lock" 
                      className="w-5 h-5 opacity-70"
                    />
                  </div>
                  <p className="text-aldr-gray text-sm">{vault.recordCount} records</p>
                </div>
              </div>
              
              <p className="text-aldr-gray mb-4 text-sm">{vault.description}</p>
              
              <div className="flex justify-between items-center">
                <button 
                  className="text-aldr-teal hover:text-aldr-purple font-medium text-sm"
                  onClick={() => {
                    if (vault.id === 'health') {
                      window.location.href = '/aldr-health';
                    } else if (vault.id === 'legal') {
                      window.location.href = '/aldr-legal';
                    } else if (vault.id === 'identity') {
                      window.location.href = '/aldr-id';
                    }
                  }}
                >
                  View Details
                </button>
                <button className="text-aldr-teal hover:text-aldr-purple">
                  <i className="fas fa-plus-circle"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Recent Activity Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-aldr-dark mb-6">Recent Activity</h2>
        
        <div className="card">
          <div className="divide-y">
            {vaults.flatMap(vault => (
              vault.recentActivity.map((activity, index) => (
                <div key={`${vault.id}-${index}`} className="py-3 flex items-center">
                  <div className={`w-10 h-10 rounded-full ${vault.color} flex items-center justify-center mr-4 text-white flex-shrink-0`}>
                    <i className={`fas ${activity.icon}`}></i>
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-aldr-dark">{activity.action}</p>
                    <p className="text-sm text-aldr-gray">{vault.name}</p>
                  </div>
                  <div className="text-right text-sm flex-shrink-0 flex items-center space-x-4">
                    <span className="text-aldr-gray">{formatDate(activity.date)}</span>
                    <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                      Open
                    </button>
                  </div>
                </div>
              ))
            )).sort((a, b) => 
              new Date(b.props.children[2].props.children[0].props.children) - 
              new Date(a.props.children[2].props.children[0].props.children)
            ).slice(0, 5)}
          </div>
          
          <div className="mt-4 text-center">
            <button className="btn-secondary text-sm">
              View All Activity
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;