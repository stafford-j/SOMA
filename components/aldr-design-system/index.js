/**
 * Aldr Design System - Component Library Export Index
 * 
 * This file exports all components from the Aldr Design System for easy importing
 * and usage across Aldr applications. Components are organized by category for
 * better developer experience.
 * 
 * Usage:
 * import { AldrButton, AldrCard, AldrHeader } from '@aldr/design-system';
 * 
 * Or import specific categories:
 * import { AldrButton, AldrInput } from '@aldr/design-system/forms';
 * import { AldrCard, AldrModal } from '@aldr/design-system/display';
 * 
 * @version 1.0.0
 * @author Aldr Design System Team
 */

// Layout Components
export { default as AldrHeader } from './layout/AldrHeader';
export { default as AldrLayout } from './layout/AldrLayout';
export { default as AldrNavigation } from './layout/AldrNavigation';

// Form Components
export { default as AldrButton } from './forms/AldrButton';
export { default as AldrInput } from './forms/AldrInput';
export { default as AldrForm } from './forms/AldrForm';

// Display Components
export { default as AldrCard } from './display/AldrCard';
export { default as AldrModal } from './display/AldrModal';
export { default as AldrDashboard } from './display/AldrDashboard';
export { default as AldrLoading } from './display/AldrLoading';

// Smart Features
export { default as AldrSmartIngest } from './smart-features/AldrSmartIngest';
export { default as AldrSmartSuggestions } from './smart-features/AldrSmartSuggestions';

// Vault-Specific Components
export { default as AldrVaultSelector } from './vault-specific/AldrVaultSelector';

// Component Categories for Organized Imports
export const Layout = {
  AldrHeader: require('./layout/AldrHeader').default,
  AldrLayout: require('./layout/AldrLayout').default,
  AldrNavigation: require('./layout/AldrNavigation').default
};

export const Forms = {
  AldrButton: require('./forms/AldrButton').default,
  AldrInput: require('./forms/AldrInput').default,
  AldrForm: require('./forms/AldrForm').default
};

export const Display = {
  AldrCard: require('./display/AldrCard').default,
  AldrModal: require('./display/AldrModal').default,
  AldrDashboard: require('./display/AldrDashboard').default,
  AldrLoading: require('./display/AldrLoading').default
};

export const SmartFeatures = {
  AldrSmartIngest: require('./smart-features/AldrSmartIngest').default,
  AldrSmartSuggestions: require('./smart-features/AldrSmartSuggestions').default
};

export const VaultSpecific = {
  AldrVaultSelector: require('./vault-specific/AldrVaultSelector').default
};

// Design System Metadata
export const designSystemInfo = {
  name: 'Aldr Design System',
  version: '1.0.0',
  components: {
    layout: 3,
    forms: 3,
    display: 4,
    smartFeatures: 2,
    vaultSpecific: 1,
    total: 13
  },
  colors: {
    primary: '#20B2AA', // Aldr Teal
    secondary: '#8A2BE2', // Aldr Purple
    success: '#4CAF50',
    warning: '#FFB84D',
    error: '#FF4444',
    gray: '#6c757d'
  },
  typography: {
    headings: 'Lora, serif',
    body: 'Inter, sans-serif',
    display: 'Playfair Display, serif'
  }
};

// Utility Functions
export const utils = {
  /**
   * Get the appropriate variant for a component based on context
   */
  getVariantForContext: (context) => {
    const variantMap = {
      primary: 'primary',
      success: 'success',
      warning: 'warning',
      error: 'danger',
      info: 'primary'
    };
    return variantMap[context] || 'primary';
  },

  /**
   * Generate consistent spacing classes
   */
  getSpacingClass: (size) => {
    const spacingMap = {
      xs: 'space-y-2',
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
      xl: 'space-y-12'
    };
    return spacingMap[size] || spacingMap.md;
  },

  /**
   * Get responsive grid classes
   */
  getGridClass: (columns) => {
    if (typeof columns === 'object') {
      const { sm = 1, md = 2, lg = 3 } = columns;
      return `grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg}`;
    }
    return `grid-cols-1 md:grid-cols-${columns}`;
  }
};

// Theme Configuration
export const theme = {
  colors: {
    aldrTeal: '#20B2AA',
    aldrPurple: '#8A2BE2',
    aldrLight: '#f8f9fa',
    aldrDark: '#333',
    aldrGray: '#6c757d'
  },
  fontFamilies: {
    heading: ['Lora', 'serif'],
    body: ['Inter', 'sans-serif'],
    display: ['Playfair Display', 'serif']
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  shadows: {
    sm: '0 2px 10px rgba(0, 0, 0, 0.05)',
    md: '0 5px 15px rgba(32, 178, 170, 0.15)',
    lg: '0 8px 30px rgba(138, 43, 226, 0.2)'
  }
};

export default {
  // All components
  AldrHeader,
  AldrLayout,
  AldrNavigation,
  AldrButton,
  AldrInput,
  AldrForm,
  AldrCard,
  AldrModal,
  AldrDashboard,
  AldrLoading,
  AldrSmartIngest,
  AldrSmartSuggestions,
  AldrVaultSelector,
  
  // Organized exports
  Layout,
  Forms,
  Display,
  SmartFeatures,
  VaultSpecific,
  
  // Utilities and theme
  utils,
  theme,
  designSystemInfo
};