import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VaultSelection.css';

const VaultSelection = () => {
  const navigate = useNavigate();

  const handleVaultNavigation = (vaultPath) => {
    navigate(vaultPath);
  };

  const showComingSoon = (message) => {
    alert(message || 'This vault is coming soon!');
  };

  return (
    <main className="landing-container">
      {/* BETA Banner */}
      <div className="banner">
        Aldr Vaults is currently in BETA — this site is for partners, testers, and early collaborators.
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="flex items-center">
            <img 
              src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png"
              alt="Aldr Vaults Icon" 
              className="h-12 w-12 object-contain mr-4"
              style={{ 
                imageRendering: 'high-quality'
              }}
            />
            <div>
              <h1 className="text-white text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Aldr Vaults</h1>
              <div className="text-sm text-white italic mt-1">
                Aldr /ˈɑːl-dər/ — life, age, lifetime
              </div>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <a href="https://aldrvaults.com" className="dashboard-button white" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe"></i>
            <span className="hidden sm:inline">Website</span>
          </a>
          <a href="mailto:james@ruleyproductions.com" className="dashboard-button white">
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </header>

      {/* Smart Ingestion Hub */}
      <section className="pt-8 pb-8">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="card bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-6">
                    <i className="fas fa-brain text-3xl"></i>
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold mb-2">Smart Ingestion Hub</h2>
                    <p className="text-lg text-white text-opacity-90">Machine learning-powered document processing across all vaults</p>
                    <p className="text-sm text-white text-opacity-75 mt-1">
                      Emails automatically analyzed, categorized, and routed to the right vault
                    </p>
                  </div>
                </div>
                <button 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  onClick={() => handleVaultNavigation('/smart-ingestion')}
                >
                  <i className="fas fa-rocket mr-2"></i>
                  View Smart Ingestion
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vault Selection */}
      <section className="vaults-section">
        <div className="container">
          <div className="vaults-grid">
            {/* Aldr Identity Vault */}
            <div className="vault-card available">
              <div className="vault-header">
                <i className="fas fa-id-card text-4xl text-white"></i>
                <img src="https://static.wixstatic.com/media/afc39f_858a86c0d96f4779b594892464cdbdf3~mv2.png" alt="Aldr Identity" className="vault-logo" />
              </div>
              <div className="vault-body">
                <p>Store your identity documents securely. Passport, ID cards, and personal credentials in one encrypted vault.</p>
                <button className="vault-button primary" onClick={() => handleVaultNavigation('/vault/aldr-id')}>
                  <i className="fas fa-arrow-right"></i>
                  Enter Vault
                </button>
              </div>
            </div>

            {/* Aldr Health Vault */}
            <div className="vault-card available">
              <div className="vault-header">
                <i className="fas fa-heartbeat text-4xl text-white"></i>
                <img src="https://static.wixstatic.com/media/afc39f_25568bb9581b4405b731b19af283837f~mv2.png" alt="Aldr Health" className="vault-logo" />
              </div>
              <div className="vault-body">
                <p>Organize your complete health history. Medical records, prescriptions, and health data under your control.</p>
                <button className="vault-button primary" onClick={() => handleVaultNavigation('/vault/aldr-health')}>
                  <i className="fas fa-arrow-right"></i>
                  Enter Vault
                </button>
              </div>
            </div>

            {/* Aldr Legal Vault */}
            <div className="vault-card available">
              <div className="vault-header">
                <i className="fas fa-balance-scale text-4xl text-white"></i>
                <img src="https://static.wixstatic.com/media/afc39f_bef7c9dd4d4f48ce908637fbb64d5731~mv2.png" alt="Aldr Legal" className="vault-logo" />
              </div>
              <div className="vault-body">
                <p>Manage your legal documents, contracts, and important papers. Estate planning made simple.</p>
                <button className="vault-button primary" onClick={() => handleVaultNavigation('/vault/aldr-legal')}>
                  <i className="fas fa-arrow-right"></i>
                  Enter Vault
                </button>
              </div>
            </div>

            {/* Aldr Travel Vault */}
            <div className="vault-card available">
              <div className="vault-header">
                <i className="fas fa-plane text-4xl text-white"></i>
                <img src="https://static.wixstatic.com/media/afc39f_6dffa8a312684af5877b172a934f347b~mv2.png" alt="Aldr Travel" className="vault-logo" />
              </div>
              <div className="vault-body">
                <p>Organize travel documents, bookings, and itineraries. Your passport data links intelligently to Aldr Identity.</p>
                <button className="vault-button primary" onClick={() => handleVaultNavigation('/vault/aldr-travel')}>
                  <i className="fas fa-arrow-right"></i>
                  Enter Vault
                </button>
              </div>
            </div>

            {/* Aldr Memoirs Vault */}
            <div className="vault-card available">
              <div className="vault-header">
                <i className="fas fa-heart text-4xl text-white"></i>
                <img src="https://static.wixstatic.com/media/afc39f_b392a0a663664601a85077210ce117be~mv2.png" alt="Aldr Memoirs" className="vault-logo" />
              </div>
              <div className="vault-body">
                <p>Document family journals, preserve heritage stories, and build your family tree. Legacy planning connects seamlessly to Aldr Legal.</p>
                <button className="vault-button primary" onClick={() => handleVaultNavigation('/vault/aldr-memoirs')}>
                  <i className="fas fa-arrow-right"></i>
                  Enter Vault
                </button>
              </div>
            </div>

            {/* Aldr Learning Vault */}
            <div className="vault-card available">
              <div className="vault-header">
                <i className="fas fa-graduation-cap text-4xl text-white"></i>
                <img src="https://static.wixstatic.com/media/afc39f_5c5dbbdd6a5d4d57b72e34c8487ace88~mv2.png" alt="Aldr Learning" className="vault-logo" />
              </div>
              <div className="vault-body">
                <p>Store education credentials, certifications, and professional development records securely.</p>
                <button className="vault-button primary" onClick={() => handleVaultNavigation('/vault/aldr-learning')}>
                  <i className="fas fa-arrow-right"></i>
                  Enter Vault
                </button>
              </div>
            </div>

            {/* Aldr Builder Vault */}
            <div className="vault-card custom">
              <div className="vault-header">
                <i className="fas fa-tools text-4xl text-white"></i>
                <img src="https://static.wixstatic.com/media/afc39f_a14d742211ca47ec9e099b6a98c9f3d1~mv2.png" alt="Aldr Builder" className="vault-logo" />
              </div>
              <div className="vault-body">
                <p>Create custom vaults with your own organization system. Add tags, categories, and workflows that work for you.</p>
                <button className="vault-button secondary" onClick={() => showComingSoon('Custom vault builder coming soon!')}>
                  <i className="fas fa-arrow-right"></i>
                  Create Custom Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Info */}
      <section className="security-section">
        <div className="container">
          <h2 className="section-title">Built for Security & Privacy</h2>
          
          <div className="security-grid">
            <div className="security-item">
              <i className="fas fa-shield-alt"></i>
              <h4>You Own Your Data</h4>
              <p>Your information stays encrypted and accessible only to you.</p>
            </div>
            <div className="security-item">
              <i className="fas fa-globe"></i>
              <h4>Global Access</h4>
              <p>Access your vaults securely from anywhere in the world.</p>
            </div>
            <div className="security-item">
              <i className="fas fa-network-wired"></i>
              <h4>Decentralized Storage</h4>
              <p>Built for ultimate security and resilience with your data under your control.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VaultSelection;