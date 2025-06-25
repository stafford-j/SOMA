# Aldr Design System

A comprehensive, standardized component library for Aldr ecosystem applications, providing consistent UI/UX patterns, advanced smart features, and seamless integration across all vault platforms.

## 🚀 Overview

The Aldr Design System contains **13 production-ready components** organized into 5 categories, built specifically for document management applications with blockchain integration, AI-powered features, and cross-vault intelligence.

### Key Features

- **🎨 Consistent Branding** - Unified Aldr visual identity with teal/purple gradient scheme
- **📱 Mobile-First Design** - 44px touch targets and responsive layouts
- **♿ Accessibility Ready** - ARIA labels, keyboard navigation, and screen reader support
- **🧠 Smart Features** - AI document processing and cross-vault intelligence components
- **🔒 Vault Integration** - Purpose-built components for secure document management
- **⚡ Performance Optimized** - Lightweight, tree-shakeable exports

## 📦 Installation

```bash
# Copy the design system to your project
cp -r /path/to/soma-companion/components/aldr-design-system ./src/components/

# Install required dependencies
npm install react react-router-dom prop-types
```

## 🎯 Quick Start

```jsx
import React from 'react';
import { 
  AldrLayout, 
  AldrHeader, 
  AldrCard, 
  AldrButton 
} from './components/aldr-design-system';

function App() {
  return (
    <AldrLayout
      showHeader={true}
      headerProps={{
        title: "My Aldr App",
        variant: "vault-specific",
        icon: "fa-shield-alt"
      }}
    >
      <div className="p-8 space-y-6">
        <AldrCard title="Welcome" icon="fa-home">
          <p>Get started with the Aldr Design System</p>
          <AldrButton variant="primary" icon="fa-arrow-right">
            Explore Components
          </AldrButton>
        </AldrCard>
      </div>
    </AldrLayout>
  );
}
```

## 📚 Components

### Layout Components

| Component | Purpose | Key Features |
|-----------|---------|-------------|
| **AldrHeader** | Unified header with branding | Vault-specific variants, responsive actions |
| **AldrLayout** | Main page layout wrapper | Configurable header/footer, full-width support |
| **AldrNavigation** | Responsive navigation | Mobile hamburger, dropdown support |

### Form Components

| Component | Purpose | Key Features |
|-----------|---------|-------------|
| **AldrButton** | Standardized buttons | 8 variants, loading states, icon support |
| **AldrInput** | Form input fields | Validation, password toggle, prefix/suffix icons |
| **AldrForm** | Complete form handling | Built-in validation, multi-step support |

### Display Components

| Component | Purpose | Key Features |
|-----------|---------|-------------|
| **AldrCard** | Content containers | 6 variants, hover effects, loading states |
| **AldrModal** | Overlay dialogs | Vault info, document details, custom content |
| **AldrDashboard** | Statistics and metrics | Activity feeds, quick actions, empty states |
| **AldrLoading** | Loading indicators | 8 variants, skeleton screens, overlay support |

### Smart Features

| Component | Purpose | Key Features |
|-----------|---------|-------------|
| **AldrSmartIngest** | AI document processing | ML classification, confidence scoring, approval workflow |
| **AldrSmartSuggestions** | Cross-vault intelligence | Reminder system, document linking, urgency indicators |

### Vault-Specific Components

| Component | Purpose | Key Features |
|-----------|---------|-------------|
| **AldrVaultSelector** | Vault selection interface | Grid layout, status indicators, modal integration |

## 🎨 Design Tokens

### Colors

```css
:root {
  --aldr-teal: #20B2AA;      /* Primary brand color */
  --aldr-purple: #8A2BE2;    /* Secondary brand color */
  --aldr-light: #f8f9fa;     /* Light background */
  --aldr-dark: #333;         /* Dark text */
  --aldr-gray: #6c757d;      /* Muted text */
}
```

### Typography

- **Headings**: Lora Medium (serif) - All vault names and main titles
- **Body Text**: Inter (sans-serif) - All content and UI text  
- **Display**: Playfair Display (serif) - Special branding elements

### Spacing

- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2rem (32px)
- **xl**: 3rem (48px)

## 🧩 Usage Examples

### Smart Document Processing

```jsx
import { AldrSmartIngest } from './components/aldr-design-system';

function DocumentProcessor() {
  const handleApprove = async (documentId) => {
    // Process document approval
    console.log(`Approved document ${documentId}`);
  };

  return (
    <AldrSmartIngest
      title="Smart Document Ingestion"
      onApprove={handleApprove}
      onReject={(id) => console.log(`Rejected ${id}`)}
      maxDisplayDocuments={5}
      confidenceThresholds={{ high: 95, medium: 85, low: 0 }}
    />
  );
}
```

### Vault Selection Interface

```jsx
import { AldrVaultSelector } from './components/aldr-design-system';

function VaultSelection() {
  const customVaults = [
    {
      id: 'health',
      name: 'Aldr Health',
      description: 'Your medical records and health data',
      icon: 'fa-heartbeat',
      color: 'bg-red-500',
      route: '/health',
      status: 'available',
      count: 23
    }
  ];

  return (
    <AldrVaultSelector
      vaults={customVaults}
      title="Choose Your Vault"
      onVaultClick={(vault) => console.log('Selected:', vault)}
      showInfoButton={true}
    />
  );
}
```

### Cross-Vault Intelligence

```jsx
import { AldrSmartSuggestions } from './components/aldr-design-system';

function IntelligentSuggestions() {
  const reminders = [
    {
      id: 'passport-renewal',
      title: 'Passport Renewal Required',
      description: 'Your passport expires soon',
      dueDate: '2025-08-15',
      urgency: 'red',
      vaultName: 'Aldr Identity',
      crossVaultConnections: [
        {
          connection: 'Upcoming Travel',
          targetVaultName: 'Aldr Travel',
          description: 'Business trip requires valid passport'
        }
      ]
    }
  ];

  return (
    <AldrSmartSuggestions
      reminders={reminders}
      title="Smart Suggestions"
      maxInitialDisplay={3}
      onReminderClick={(reminder) => console.log('Clicked:', reminder)}
    />
  );
}
```

### Form with Validation

```jsx
import { AldrForm, AldrInput } from './components/aldr-design-system';

function UserForm() {
  const validationRules = {
    email: { 
      required: true, 
      email: true 
    },
    password: { 
      required: true, 
      minLength: 8 
    }
  };

  const handleSubmit = async (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <AldrForm
      title="Account Setup"
      onSubmit={handleSubmit}
      validationRules={validationRules}
      submitText="Create Account"
    >
      <AldrInput
        name="email"
        label="Email Address"
        type="email"
        icon="fa-envelope"
        placeholder="Enter your email"
      />
      <AldrInput
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
    </AldrForm>
  );
}
```

## 🎭 Component Variants

### Button Variants

- **primary** - Teal background, white text
- **secondary** - Gray background, dark text
- **outline** - Transparent with teal border
- **white** - White background, teal text
- **danger** - Red background for destructive actions
- **success** - Green background for positive actions
- **ghost** - Transparent with hover effects
- **gradient** - Teal to purple gradient

### Card Variants

- **default** - Light border and shadow
- **gradient** - Teal to purple background
- **bordered** - Thick teal border
- **elevated** - Strong shadow effect
- **outline** - Border only, transparent background
- **soft** - Light gray background

### Loading Variants

- **spinner** - Rotating circle
- **skeleton** - Content placeholders
- **skeleton-card** - Card-shaped placeholder
- **skeleton-grid** - Grid of placeholders
- **skeleton-list** - List-shaped placeholders
- **pulse** - Pulsing circle
- **dots** - Animated dots
- **bars** - Animated bars

## 📱 Responsive Design

All components follow mobile-first design principles:

- **Touch Targets**: Minimum 44px height for mobile accessibility
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: Responsive grid classes for all screen sizes
- **Typography**: Scalable font sizes and line heights

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant colors
- **Semantic HTML**: Proper HTML structure

## 🔧 Advanced Configuration

### Theme Customization

```jsx
import { theme } from './components/aldr-design-system';

// Customize colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    aldrTeal: '#1E90FF', // Custom primary color
  }
};
```

### Utility Functions

```jsx
import { utils } from './components/aldr-design-system';

// Get responsive grid classes
const gridClass = utils.getGridClass({ sm: 1, md: 2, lg: 3 });

// Generate spacing
const spacing = utils.getSpacingClass('lg'); // 'space-y-8'

// Get variant for context
const variant = utils.getVariantForContext('error'); // 'danger'
```

## 🚀 Migration from Legacy Components

### From UniformHeader to AldrHeader

```jsx
// Before
<UniformHeader title="Aldr Health Companion" />

// After  
<AldrHeader 
  title="Aldr Health" 
  variant="vault-specific"
  icon="fa-heartbeat"
/>
```

### From dashboard-button to AldrButton

```jsx
// Before
<button className="dashboard-button white">
  <i className="fas fa-plus"></i>
  <span>Add Record</span>
</button>

// After
<AldrButton variant="white" icon="fa-plus">
  Add Record
</AldrButton>
```

### From SmartIngest to AldrSmartIngest

```jsx
// Before
<SmartIngest />

// After
<AldrSmartIngest
  onApprove={handleApprove}
  onReject={handleReject}
  showSettings={true}
/>
```

## 📊 Performance

- **Bundle Size**: ~45KB minified + gzipped
- **Tree Shaking**: Import only what you need
- **Lazy Loading**: Modal content loaded on demand
- **Optimized**: Minimal re-renders with React.memo

## 🧪 Testing

Components include built-in accessibility and functionality testing:

```jsx
import { render, screen } from '@testing-library/react';
import { AldrButton } from './components/aldr-design-system';

test('renders button with correct text', () => {
  render(<AldrButton>Click me</AldrButton>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

## 🤝 Contributing

When adding new components:

1. Follow naming convention: `Aldr[ComponentName]`
2. Include comprehensive PropTypes
3. Add responsive design support
4. Include accessibility features
5. Document with usage examples
6. Export from main index.js

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Initial release with 13 components
- ✅ Complete documentation and examples
- ✅ Mobile-first responsive design
- ✅ Accessibility compliance
- ✅ Smart features integration

## 📄 License

This design system is part of the Aldr ecosystem and follows the same licensing terms as the main project.

---

**Built for the Aldr Ecosystem** | **Version 1.0.0** | **13 Components** | **Production Ready**