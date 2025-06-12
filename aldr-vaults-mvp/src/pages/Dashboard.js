import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Sample vault data for demonstration
  const vaults = [
    { id: 1, name: "Health Records", type: "health", count: 12, lastUpdated: "2025-05-25T15:30:00" },
    { id: 2, name: "Financial Documents", type: "financial", count: 8, lastUpdated: "2025-05-27T09:15:00" },
    { id: 3, name: "Personal ID", type: "identity", count: 3, lastUpdated: "2025-05-28T14:45:00" }
  ];

  // Format date in a readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold heading-gradient mb-2">My Vaults</h1>
        <p className="text-aldr-gray">Secure storage for your important information</p>
      </header>
      
      <div className="mb-10 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="btn-primary">
            <i className="fas fa-plus mr-2"></i> New Vault
          </button>
          <button className="btn-secondary">
            <i className="fas fa-sync-alt mr-2"></i> Refresh
          </button>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Search vaults..." 
            className="px-4 py-2 rounded-pill border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aldr-teal"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {vaults.map(vault => (
          <div key={vault.id} className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-aldr-teal">{vault.name}</h2>
              <span className="text-xs px-3 py-1 bg-aldr-light text-aldr-purple rounded-pill">
                {vault.type}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-aldr-gray">
                {vault.count} item{vault.count !== 1 ? 's' : ''}
              </p>
              <p className="text-aldr-gray text-sm">
                Last updated: {formatDate(vault.lastUpdated)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Link to={`/vault/${vault.id}`} className="text-aldr-teal hover:text-aldr-purple font-medium">
                View Details
              </Link>
              <div className="flex space-x-2">
                <button className="p-2 text-aldr-teal hover:text-aldr-purple">
                  <i className="fas fa-share-alt"></i>
                </button>
                <button className="p-2 text-aldr-teal hover:text-aldr-purple">
                  <i className="fas fa-cog"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* New Vault Card */}
        <div className="card border-2 border-dashed border-gray-300 hover:border-aldr-teal flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[220px]">
          <div className="w-16 h-16 rounded-full bg-aldr-light flex items-center justify-center mb-4">
            <i className="fas fa-plus text-2xl text-aldr-teal"></i>
          </div>
          <p className="text-aldr-teal font-medium">Create New Vault</p>
        </div>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-aldr-dark mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="p-3 border-l-4 border-aldr-teal bg-aldr-light rounded">
            <p className="text-aldr-dark font-medium">Health Records vault updated</p>
            <p className="text-aldr-gray text-sm">Today at 3:45 PM</p>
          </div>
          <div className="p-3 border-l-4 border-aldr-purple bg-aldr-light rounded">
            <p className="text-aldr-dark font-medium">New document added to Financial Documents</p>
            <p className="text-aldr-gray text-sm">Yesterday at 10:30 AM</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="btn-secondary text-sm">
            View All Activity
          </button>
        </div>
      </div>
      
      <div className="card bg-aldr-gradient text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Upgrade to Aldr Premium</h2>
            <p className="mb-4">Get unlimited vaults, advanced sharing, and more security features.</p>
            <button className="bg-white text-aldr-purple font-semibold py-2 px-6 rounded-pill">
              Learn More
            </button>
          </div>
          <div className="hidden md:block">
            <i className="fas fa-crown text-6xl opacity-80"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;