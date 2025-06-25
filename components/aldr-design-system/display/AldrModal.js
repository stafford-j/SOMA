/**
 * AldrModal - Unified Modal Component for Aldr Design System
 * 
 * A flexible, reusable modal component that can display vault information,
 * document details, or any custom content with consistent styling.
 * 
 * Features:
 * - Configurable content types (vault info, document, custom)
 * - Responsive design with mobile optimization
 * - Consistent Aldr branding and animations
 * - Accessible keyboard navigation and focus management
 * - Flexible action button configuration
 * 
 * @version 1.0.0
 * @author Aldr Design System
 */

import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const AldrModal = ({ 
  isOpen = false,
  onClose,
  type = "custom", // "vault", "document", "custom"
  title,
  subtitle,
  icon,
  iconColor = "bg-teal-600",
  vault = null,
  document = null,
  customContent = null,
  actions = [],
  maxWidth = "2xl",
  className = "",
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true
}) => {
  
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  // Vault information data
  const vaultDetails = {
    identity: {
      title: 'Aldr Identity',
      description: 'Store your identity documents securely. Passport, ID cards, and personal credentials in one encrypted vault.',
      features: [
        'Secure passport and ID document storage',
        'Digital identity card creation',
        'Personal credential management',
        'Government document organization',
        'Biometric data protection',
        'Cross-border document portability'
      ],
      keyBenefits: [
        'Instant access to identity documents anywhere',
        'Secure backup of important credentials',
        'Travel-ready document management',
        'Government service integration ready'
      ],
      useCases: [
        'International travel documentation',
        'Government service applications',
        'Employment verification',
        'Banking and financial services',
        'Property and legal transactions'
      ]
    },
    health: {
      title: 'Aldr Health',
      description: 'Organize your complete health history. Medical records, prescriptions, and health data under your control.',
      features: [
        'Complete medical history tracking',
        'Prescription and medication management',
        'Health insurance documentation',
        'Medical appointment scheduling',
        'Lab results and test reports',
        'Emergency medical information'
      ],
      keyBenefits: [
        'Comprehensive health record portability',
        'Better healthcare provider communication',
        'Emergency medical information access',
        'Health trend tracking and insights'
      ],
      useCases: [
        'Medical consultations and referrals',
        'Health insurance claims',
        'Emergency medical situations',
        'Chronic condition management',
        'Preventive care tracking'
      ]
    },
    legal: {
      title: 'Aldr Legal',
      description: 'Manage your legal documents, contracts, and important papers. Estate planning made simple.',
      features: [
        'Will and estate document management',
        'Contract and agreement storage',
        'Property and insurance documents',
        'Legal compliance tracking',
        'Important deadline reminders',
        'Solicitor and legal contact management'
      ],
      keyBenefits: [
        'Organized legal document access',
        'Important deadline tracking',
        'Estate planning simplification',
        'Legal compliance assurance'
      ],
      useCases: [
        'Estate planning and will management',
        'Property purchases and sales',
        'Insurance policy management',
        'Employment contract tracking',
        'Legal compliance monitoring'
      ]
    },
    travel: {
      title: 'Aldr Travel',
      description: 'Organize travel documents, bookings, and itineraries. Your passport data links intelligently to Aldr Identity.',
      features: [
        'Travel document organization',
        'Visa and permit tracking',
        'Booking and itinerary management',
        'Travel insurance documentation',
        'Emergency contact information',
        'Cross-vault passport integration'
      ],
      keyBenefits: [
        'Stress-free travel preparation',
        'Important document accessibility abroad',
        'Travel compliance tracking',
        'Emergency information availability'
      ],
      useCases: [
        'International business travel',
        'Family vacation planning',
        'Visa application management',
        'Travel insurance claims',
        'Emergency travel situations'
      ]
    },
    memoirs: {
      title: 'Aldr Memoirs',
      description: 'Document family journals, preserve heritage stories, and build your family tree. Legacy planning connects seamlessly to Aldr Legal.',
      features: [
        'Family history documentation',
        'Journal and memoir writing tools',
        'Family tree construction',
        'Heritage story preservation',
        'Digital legacy planning',
        'Cross-vault legal integration'
      ],
      keyBenefits: [
        'Family legacy preservation',
        'Heritage story documentation',
        'Future generation preparation',
        'Cultural history maintenance'
      ],
      useCases: [
        'Family tree research and building',
        'Heritage journal writing',
        'Memory preservation projects',
        'Generational knowledge transfer',
        'Cultural preservation initiatives'
      ]
    },
    learning: {
      title: 'Aldr Learning',
      description: 'Store education credentials, certifications, and professional development records securely.',
      features: [
        'Academic credential storage',
        'Professional certification tracking',
        'Training and course documentation',
        'Skill and competency records',
        'Continuing education planning',
        'Career development tracking'
      ],
      keyBenefits: [
        'Complete educational record keeping',
        'Professional development tracking',
        'Certification renewal management',
        'Career advancement support'
      ],
      useCases: [
        'Job application documentation',
        'Professional certification renewal',
        'Academic transcript management',
        'Training compliance tracking',
        'Career development planning'
      ]
    },
    builder: {
      title: 'Aldr Builder',
      description: 'Create custom vaults with your own organization system. Add tags, categories, and workflows that work for you.',
      features: [
        'Custom vault creation',
        'Flexible categorization system',
        'Custom workflow design',
        'Advanced tagging and search',
        'Personalized organization rules',
        'Integration with existing vaults'
      ],
      keyBenefits: [
        'Completely customizable organization',
        'Adaptable to unique needs',
        'Advanced search and filtering',
        'Workflow automation possibilities'
      ],
      useCases: [
        'Specialized professional documents',
        'Hobby and interest organization',
        'Business document management',
        'Research and project tracking',
        'Custom compliance systems'
      ]
    }
  };

  if (!isOpen) return null;

  // Determine content based on type
  let modalContent;
  let modalTitle = title;
  let modalSubtitle = subtitle;
  let modalIcon = icon;
  let modalIconColor = iconColor;

  if (type === "vault" && vault) {
    const vaultData = vaultDetails[vault.id] || vaultDetails.identity;
    modalTitle = vaultData.title;
    modalSubtitle = "Vault Information & Features";
    modalIcon = vault.icon;
    modalIconColor = vault.color || iconColor;

    modalContent = (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">{vaultData.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2">
            {vaultData.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-check-circle text-teal-600 mr-3 mt-0.5 flex-shrink-0"></i>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Key Benefits</h3>
          <ul className="space-y-2">
            {vaultData.keyBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-star text-purple-600 mr-3 mt-0.5 flex-shrink-0"></i>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Common Use Cases</h3>
          <ul className="space-y-2">
            {vaultData.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <i className="fas fa-arrow-right text-gray-400 mr-3 mt-0.5 flex-shrink-0"></i>
                <span className="text-gray-700">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else if (type === "document" && document) {
    modalTitle = document.title || "Document Details";
    modalSubtitle = document.type || "Document Information";
    modalIcon = document.icon || "fa-file-alt";
    
    modalContent = (
      <div className="space-y-6">
        {document.description && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{document.description}</p>
          </div>
        )}

        {document.details && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Details</h3>
            <div className="space-y-2">
              {Object.entries(document.details).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {document.metadata && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Metadata</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(document.metadata, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  } else if (customContent) {
    modalContent = customContent;
  }

  // Default actions
  const defaultActions = [
    ...actions,
    {
      label: "Close",
      onClick: onClose,
      variant: "secondary"
    }
  ];

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-xl",
    xl: "max-w-2xl",
    "2xl": "max-w-4xl",
    "3xl": "max-w-6xl",
    full: "max-w-full mx-4"
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-lg ${sizeClasses[maxWidth]} max-h-[90vh] overflow-y-auto w-full ${className} animate-fade-in`}>
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center flex-1">
              {modalIcon && (
                <div className={`w-12 h-12 rounded-full ${modalIconColor} flex items-center justify-center mr-4 text-white flex-shrink-0`}>
                  <i className={`fas ${modalIcon} text-xl`}></i>
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {modalTitle}
                </h2>
                {modalSubtitle && (
                  <p className="text-gray-600 text-sm mt-1">{modalSubtitle}</p>
                )}
              </div>
            </div>
            {showCloseButton && (
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors ml-4"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {modalContent}
        </div>

        {/* Actions */}
        {defaultActions.length > 0 && (
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex flex-wrap gap-3 justify-end">
              {defaultActions.map((action, index) => {
                const baseClasses = "px-6 py-2 rounded-lg font-semibold transition-colors";
                const variantClasses = {
                  primary: "bg-teal-600 text-white hover:bg-teal-700",
                  secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
                  danger: "bg-red-600 text-white hover:bg-red-700",
                  success: "bg-green-600 text-white hover:bg-green-700"
                };
                
                return (
                  <button
                    key={index}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={`${baseClasses} ${variantClasses[action.variant] || variantClasses.primary} ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {action.icon && <i className={`fas ${action.icon} mr-2`}></i>}
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AldrModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['vault', 'document', 'custom']),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  vault: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    color: PropTypes.string
  }),
  document: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    details: PropTypes.object,
    metadata: PropTypes.object,
    icon: PropTypes.string
  }),
  customContent: PropTypes.node,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
    icon: PropTypes.string,
    disabled: PropTypes.bool
  })),
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']),
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
  closeOnBackdrop: PropTypes.bool,
  closeOnEscape: PropTypes.bool
};

export default AldrModal;