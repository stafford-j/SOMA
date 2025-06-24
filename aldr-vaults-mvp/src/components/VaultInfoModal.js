import React from 'react';

const VaultInfoModal = ({ vault, isOpen, onClose }) => {
  if (!isOpen || !vault) return null;

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
        'Photo and media digitization',
        'Oral history recording',
        'Family tree construction',
        'Heritage story preservation',
        'Legal document integration'
      ],
      keyBenefits: [
        'Family legacy preservation',
        'Heritage story documentation',
        'Future generation preparation',
        'Cultural history maintenance'
      ],
      useCases: [
        'Family tree research and building',
        'Heritage story collection',
        'Photo and media organization',
        'Generational knowledge transfer',
        'Cultural preservation projects'
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

  const currentVault = vaultDetails[vault.id] || vaultDetails.identity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full ${vault.color} flex items-center justify-center mr-4 text-white`}>
                <i className={`fas ${vault.icon} text-xl`}></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {currentVault.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">Vault Information & Features</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{currentVault.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {currentVault.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check-circle text-teal-600 mr-3 mt-0.5"></i>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Benefits</h3>
            <ul className="space-y-2">
              {currentVault.keyBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-star text-purple-600 mr-3 mt-0.5"></i>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Common Use Cases</h3>
            <ul className="space-y-2">
              {currentVault.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-arrow-right text-gray-400 mr-3 mt-0.5"></i>
                  <span className="text-gray-700">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t">
            <div className="flex space-x-4">
              <button 
                className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                onClick={() => {
                  onClose();
                  // Navigate to vault - this would use the existing navigation logic
                }}
              >
                <i className="fas fa-arrow-right mr-2"></i>
                Open {currentVault.title}
              </button>
              <button 
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultInfoModal;