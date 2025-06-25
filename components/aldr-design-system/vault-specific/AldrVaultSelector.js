/**
 * AldrVaultSelector - Vault Selection Component for Aldr Applications
 * 
 * A component for selecting and navigating between different Aldr vaults
 * with consistent styling and behavior patterns.
 * 
 * Features:
 * - Grid layout with responsive design
 * - Vault status indicators (available, coming soon, locked)
 * - Hover effects and interaction states
 * - Modal integration for vault information
 * - Customizable vault configurations
 * - Mobile-optimized touch targets
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AldrModal from '../display/AldrModal';
import AldrButton from '../forms/AldrButton';

const AldrVaultSelector = ({ 
  vaults = [],
  title = "Aldr Vaults",
  subtitle = "Your secure document vaults",
  showInfoButton = true,
  showComingSoon = true,
  className = "",
  gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  onVaultClick = null,
  ...props
}) => {

  const [selectedVault, setSelectedVault] = useState(null);
  const [showVaultModal, setShowVaultModal] = useState(false);

  // Default vault configurations
  const defaultVaults = [
    {
      id: 'identity',
      name: 'Aldr Identity',
      description: 'Store your identity documents securely',
      icon: 'fa-id-card',
      color: 'bg-blue-600',
      route: '/vault/aldr-id',
      status: 'available',
      count: 5
    },
    {
      id: 'health',
      name: 'Aldr Health',
      description: 'Organize your complete health history',
      icon: 'fa-heartbeat',
      color: 'bg-red-500',
      route: '/vault/aldr-health',
      status: 'available',
      count: 12
    },
    {
      id: 'legal',
      name: 'Aldr Legal',
      description: 'Manage your legal documents and contracts',
      icon: 'fa-gavel',
      color: 'bg-purple-600',
      route: '/vault/aldr-legal',
      status: 'available',
      count: 8
    },
    {
      id: 'travel',
      name: 'Aldr Travel',
      description: 'Organize travel documents and itineraries',
      icon: 'fa-plane',
      color: 'bg-green-600',
      route: '/vault/aldr-travel',
      status: 'coming-soon'
    },
    {
      id: 'memoirs',
      name: 'Aldr Memoirs',
      description: 'Document family heritage and memories',
      icon: 'fa-heart',
      color: 'bg-pink-600',
      route: '/vault/aldr-memoirs',
      status: 'coming-soon'
    },
    {
      id: 'learning',
      name: 'Aldr Learning',
      description: 'Store education credentials and certifications',
      icon: 'fa-graduation-cap',
      color: 'bg-indigo-600',
      route: '/vault/aldr-learning',
      status: 'coming-soon'
    }
  ];

  const vaultList = vaults.length > 0 ? vaults : defaultVaults;
  const availableVaults = vaultList.filter(vault => vault.status === 'available');
  const comingSoonVaults = showComingSoon ? vaultList.filter(vault => vault.status === 'coming-soon') : [];

  // Handle vault interaction
  const handleVaultClick = (vault) => {
    if (onVaultClick) {
      onVaultClick(vault);
      return;
    }

    if (vault.status === 'available' && vault.route) {
      // Navigation will be handled by Link component
      return;
    }

    if (vault.status === 'coming-soon') {
      alert(`${vault.name} is coming soon! Stay tuned for updates.`);
    }
  };

  // Handle info button click
  const handleInfoClick = (vault, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVault(vault);
    setShowVaultModal(true);
  };

  // Get status badge
  const getStatusBadge = (vault) => {
    switch (vault.status) {
      case 'available':
        return vault.count !== undefined ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {vault.count} documents
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <i className="fas fa-check mr-1"></i>
            Available
          </span>
        );
      case 'coming-soon':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <i className="fas fa-clock mr-1"></i>
            Coming Soon
          </span>
        );
      case 'locked':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <i className="fas fa-lock mr-1"></i>
            Locked
          </span>
        );
      default:
        return null;
    }
  };

  // Vault Card Component
  const VaultCard = ({ vault }) => {
    const isClickable = vault.status === 'available' && vault.route;
    const baseClasses = [
      "relative group p-6 rounded-xl border-2 border-gray-200 transition-all duration-300",
      "hover:border-aldr-teal hover:shadow-lg",
      vault.status === 'coming-soon' ? "opacity-75" : "",
      vault.status === 'locked' ? "opacity-50" : "",
      isClickable ? "cursor-pointer" : "cursor-default"
    ].filter(Boolean).join(" ");

    const cardContent = (
      <div className={baseClasses} onClick={() => handleVaultClick(vault)}>
        {/* Vault Icon */}
        <div className={`w-16 h-16 rounded-full ${vault.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <i className={`fas ${vault.icon} text-2xl text-white`}></i>
        </div>

        {/* Vault Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-aldr-teal transition-colors">
              {vault.name}
            </h3>
            {showInfoButton && (
              <button
                onClick={(e) => handleInfoClick(vault, e)}
                className="text-gray-400 hover:text-aldr-teal transition-colors p-1"
                aria-label={`More info about ${vault.name}`}
              >
                <i className="fas fa-info-circle"></i>
              </button>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {vault.description}
          </p>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            {getStatusBadge(vault)}
            
            {vault.status === 'available' && (
              <AldrButton
                variant="ghost"
                size="sm"
                icon="fa-arrow-right"
                onClick={() => handleVaultClick(vault)}
              >
                Open
              </AldrButton>
            )}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-aldr-teal to-aldr-purple opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
      </div>
    );

    // Wrap with Link if vault is available and has route
    if (isClickable) {
      return (
        <Link to={vault.route} className="block">
          {cardContent}
        </Link>
      );
    }

    return cardContent;
  };

  return (
    <div className={`space-y-8 ${className}`} {...props}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Lora, serif' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Available Vaults */}
      {availableVaults.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Vaults</h2>
          <div className={`grid ${gridCols} gap-6`}>
            {availableVaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} />
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon Vaults */}
      {comingSoonVaults.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Coming Soon</h2>
          <div className={`grid ${gridCols} gap-6`}>
            {comingSoonVaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} />
            ))}
          </div>
        </section>
      )}

      {/* Vault Information Modal */}
      <AldrModal
        isOpen={showVaultModal}
        onClose={() => {
          setShowVaultModal(false);
          setSelectedVault(null);
        }}
        type="vault"
        vault={selectedVault}
        actions={selectedVault?.status === 'available' && selectedVault?.route ? [
          {
            label: `Open ${selectedVault?.name}`,
            onClick: () => {
              setShowVaultModal(false);
              if (selectedVault?.route) {
                window.location.href = selectedVault.route;
              }
            },
            variant: "primary",
            icon: "fa-arrow-right"
          }
        ] : []}
      />
    </div>
  );
};

AldrVaultSelector.propTypes = {
  vaults: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    route: PropTypes.string,
    status: PropTypes.oneOf(['available', 'coming-soon', 'locked']).isRequired,
    count: PropTypes.number
  })),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showInfoButton: PropTypes.bool,
  showComingSoon: PropTypes.bool,
  className: PropTypes.string,
  gridCols: PropTypes.string,
  onVaultClick: PropTypes.func
};

export default AldrVaultSelector;