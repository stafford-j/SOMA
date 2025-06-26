/**
 * BETA Dashboard for Aldr Vaults BETA
 * 
 * Main dashboard for authenticated users in the BETA version
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { VaultCard, VaultHeader } from '../components/core';
import { supabase, VAULT_TYPES } from '../config/supabase';
import BetaReminders from '../components/BetaReminders';
import BetaSmartIngest from '../components/BetaSmartIngest';

const BetaDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    initializeUserVaults();
  }, [user, navigate]);

  const initializeUserVaults = async () => {
    try {
      // Check if user has vaults, if not create default ones
      const { data: existingVaults, error } = await supabase
        .from('vaults')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching vaults:', error);
        setLoading(false);
        return;
      }

      console.log('Existing vaults from database:', existingVaults);

      if (existingVaults.length === 0) {
        // Create default vaults for new user
        await createDefaultVaults();
      } else {
        // Remove duplicates - keep only one vault per type
        const uniqueVaults = {};
        existingVaults.forEach(vault => {
          if (!uniqueVaults[vault.type] || vault.id > uniqueVaults[vault.type].id) {
            uniqueVaults[vault.type] = vault;
          }
        });
        
        const deduplicatedVaults = Object.values(uniqueVaults);
        console.log('After deduplication:', deduplicatedVaults);
        
        // Process existing vaults to add BETA restrictions
        const processedVaults = deduplicatedVaults.map(vault => ({
          ...vault,
          // Mark Health as coming soon in BETA
          coming_soon: vault.type === 'health',
          // Update Health description for BETA
          description: vault.type === 'health' 
            ? 'Coming Soon - Health vault is not available in BETA.'
            : vault.description
        }));
        setVaults(processedVaults);
      }
    } catch (err) {
      console.error('Error initializing vaults:', err);
    }
    
    setLoading(false);
  };

  const createDefaultVaults = async () => {
    console.log('Creating default vaults for user:', user.id);
    
    const defaultVaults = [
      {
        name: 'Identity',
        type: VAULT_TYPES.IDENTITY,
        icon: 'fa-id-card',
        color: 'bg-blue-600',
        description: 'Store personal attributes and government identification documents securely.',
        user_id: user.id
      },
      {
        name: 'Health', 
        type: VAULT_TYPES.HEALTH,
        icon: 'fa-heartbeat',
        color: 'bg-red-600',
        description: 'Coming Soon - Health vault is not available in BETA.',
        user_id: user.id,
        coming_soon: true
      },
      {
        name: 'Legal',
        type: VAULT_TYPES.LEGAL,
        icon: 'fa-balance-scale', 
        color: 'bg-purple-600',
        description: 'Manage contracts, insurance policies, visas, and legal documents.',
        user_id: user.id
      },
      {
        name: 'Travel',
        type: VAULT_TYPES.TRAVEL,
        icon: 'fa-plane',
        color: 'bg-indigo-600', 
        description: 'Organize travel bookings, itineraries, and travel logistics.',
        user_id: user.id
      },
      {
        name: 'Memories',
        type: VAULT_TYPES.MEMORIES,
        icon: 'fa-heart',
        color: 'bg-pink-600',
        description: 'Document life stories, achievements, and preserve family heritage.',
        user_id: user.id
      },
      {
        name: 'Learning',
        type: VAULT_TYPES.LEARNING,
        icon: 'fa-graduation-cap',
        color: 'bg-green-600',
        description: 'Track education, certifications, and professional development.',
        user_id: user.id
      }
    ];

    const { data, error } = await supabase
      .from('vaults')
      .insert(defaultVaults)
      .select();

    if (error) {
      console.error('Error creating default vaults:', error);
    } else {
      console.log('Created vaults:', data);
      // Process the created vaults to add BETA restrictions
      const processedVaults = data.map(vault => ({
        ...vault,
        coming_soon: vault.type === 'health'
      }));
      setVaults(processedVaults);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  const handleVaultClick = (vault) => {
    if (vault.coming_soon) {
      alert('This vault is coming soon and not available in BETA.');
      return;
    }
    
    // Navigate to the appropriate vault page
    navigate(`/beta/vault/${vault.type}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading your vaults...</div>
      </div>
    );
  }

  return (
    <main className="landing-container">
      <VaultHeader 
        title="Aldr Vaults BETA"
        subtitle="Your secure document vaults"
        actions={
          <>
            <div className="dashboard-button white">
              <i className="fas fa-user mr-2"></i>
              <span className="hidden sm:inline">{user?.user_metadata?.first_name || user?.email}</span>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="dashboard-button white"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </>
        }
      />

      <section className="main-content-section">
        <div className="w-full px-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome to Aldr Vaults BETA
            </h2>
            <p className="text-white opacity-90">
              Your secure document storage and management system
            </p>
          </div>

          <div className="main-content-grid-new">
            {/* Left: Smart Features (50%) */}
            <div className="smart-features-section">
              {/* Smart Reminders */}
              <div className="mb-8">
                <BetaReminders />
              </div>
              
              {/* Smart Ingestion */}
              <div>
                <BetaSmartIngest />
              </div>
            </div>
            
            {/* Right: Vault Cards (50%) */}
            <div className="vault-cards-section">
              <div className="vaults-grid-new">
                {vaults.map((vault) => (
                  <VaultCard
                    key={vault.id}
                    vault={{
                      id: vault.type,
                      name: vault.name,
                      fullName: `Aldr ${vault.name}`,
                      icon: vault.icon,
                      color: vault.color,
                      description: vault.description,
                      coming_soon: vault.coming_soon
                    }}
                    reminders={[]}
                    onVaultClick={() => handleVaultClick(vault)}
                    onInfoClick={() => {}}
                    showReminders={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BetaDashboard;