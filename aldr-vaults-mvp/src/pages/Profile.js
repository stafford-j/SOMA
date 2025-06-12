import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold heading-gradient mb-2">My Profile</h1>
        <p className="text-aldr-gray">Manage your account settings and preferences</p>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <div className="card">
            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-full bg-aldr-gradient text-white flex items-center justify-center text-5xl font-bold">
                AU
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mt-6 mb-1">Aldr User</h2>
            <p className="text-aldr-gray text-center mb-4">aldruser@example.com</p>
            
            <div className="flex justify-center mt-4">
              <button className="btn-primary">
                Edit Profile
              </button>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-aldr-dark">Account Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-aldr-gray">Total Vaults</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-aldr-gray">Documents</span>
                  <span className="font-medium">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-aldr-gray">Shared With</span>
                  <span className="font-medium">3 people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-aldr-gray">Member Since</span>
                  <span className="font-medium">May 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-2/3 space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-6 text-aldr-teal">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-aldr-dark mb-2">Full Name</label>
                <input 
                  type="text" 
                  value="Aldr User" 
                  className="w-full px-4 py-3 rounded-pill border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-aldr-dark mb-2">Email Address</label>
                <input 
                  type="email" 
                  value="aldruser@example.com" 
                  className="w-full px-4 py-3 rounded-pill border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-aldr-dark mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter phone number" 
                  className="w-full px-4 py-3 rounded-pill border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aldr-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-aldr-dark mb-2">Account ID</label>
                <div className="w-full px-4 py-3 rounded-pill border border-gray-200 bg-aldr-light font-medium">
                  aldr-12345-67890
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-bold mb-6 text-aldr-purple">Security Settings</h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-aldr-dark">Password</h3>
                  <p className="text-aldr-gray text-sm">Last changed 30 days ago</p>
                </div>
                <button className="btn-secondary mt-3 md:mt-0">
                  Change Password
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-aldr-dark">Two-Factor Authentication</h3>
                  <p className="text-aldr-gray text-sm">Add an extra layer of security to your account</p>
                </div>
                <button className="btn-secondary mt-3 md:mt-0">
                  Enable 2FA
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-aldr-dark">Security Log</h3>
                  <p className="text-aldr-gray text-sm">Review your account activity</p>
                </div>
                <button className="btn-secondary mt-3 md:mt-0">
                  View Log
                </button>
              </div>
            </div>
          </div>
          
          <div className="card bg-aldr-light border border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-aldr-dark">Danger Zone</h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 bg-white text-red-500 border border-red-500 rounded-pill hover:bg-red-50 transition">
                Deactivate Account
              </button>
              <button className="w-full px-4 py-3 bg-white text-red-600 border border-red-600 rounded-pill hover:bg-red-50 transition">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;