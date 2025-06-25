# Aldr Design System Migration Guide

This guide helps you migrate from existing SOMA Companion components to the new standardized Aldr Design System components.

## 🎯 Migration Overview

The Aldr Design System provides improved versions of existing components with:
- **Standardized APIs** - Consistent prop interfaces across all components
- **Enhanced Features** - More configuration options and functionality
- **Better Performance** - Optimized rendering and bundle size
- **Improved Accessibility** - Full ARIA support and keyboard navigation
- **Mobile Optimization** - 44px touch targets and responsive design

## 📋 Component Migration Matrix

| Legacy Component | New Component | Status | Breaking Changes |
|------------------|---------------|---------|------------------|
| `UniformHeader` | `AldrHeader` | ✅ Ready | Prop name changes |
| `SmartIngest` | `AldrSmartIngest` | ✅ Ready | Enhanced API |
| `SmartSuggestions` | `AldrSmartSuggestions` | ✅ Ready | New features added |
| `VaultInfoModal` | `AldrModal` | ✅ Ready | Unified modal API |
| `MainLayout` | `AldrLayout` | ✅ Ready | Simplified props |
| `Navbar` | `AldrNavigation` | ✅ Ready | New navigation API |
| `dashboard-button` (CSS) | `AldrButton` | ✅ Ready | Component-based |
| Custom cards | `AldrCard` | ✅ Ready | Standardized variants |
| Form inputs | `AldrInput` | ✅ Ready | Built-in validation |
| Dashboard layouts | `AldrDashboard` | ✅ Ready | Flexible data structure |

## 🔄 Step-by-Step Migration

### Phase 1: Install Design System

1. **Copy the design system to your project:**
   ```bash
   cp -r /path/to/components/aldr-design-system ./src/components/
   ```

2. **Update your imports:**
   ```jsx
   // Add to your main component file
   import { 
     AldrHeader, 
     AldrLayout, 
     AldrButton 
   } from './components/aldr-design-system';
   ```

### Phase 2: Component-by-Component Migration

#### UniformHeader → AldrHeader

**Before:**
```jsx
import UniformHeader from '../components/layout/UniformHeader';

<UniformHeader title="Aldr Health Companion" />
```

**After:**
```jsx
import { AldrHeader } from './components/aldr-design-system';

<AldrHeader 
  title="Aldr Health"
  subtitle="Aldr /ˈɑːl-dər/ — life, age, lifetime"
  variant="vault-specific"
  icon="fa-heartbeat"
  showLanguageToggle={true}
  showBackToVaults={true}
/>
```

**Key Changes:**
- ✅ Added `variant` prop for different header styles
- ✅ Separated `title` and `subtitle` props
- ✅ Added `icon` prop for vault-specific headers
- ✅ More flexible action button configuration

#### SmartIngest → AldrSmartIngest

**Before:**
```jsx
import SmartIngest from '../components/SmartIngest';

<SmartIngest />
```

**After:**
```jsx
import { AldrSmartIngest } from './components/aldr-design-system';

<AldrSmartIngest
  title="Smart Document Ingestion"
  onApprove={handleApprove}
  onReject={handleReject}
  onEdit={handleEdit}
  showSettings={true}
  maxDisplayDocuments={10}
  confidenceThresholds={{ high: 95, medium: 85, low: 0 }}
/>
```

**Key Changes:**
- ✅ Added callback props for better integration
- ✅ Configurable display limits and thresholds
- ✅ Enhanced document processing workflow
- ✅ Improved error handling

#### dashboard-button CSS → AldrButton Component

**Before:**
```jsx
<button className="dashboard-button white">
  <i className="fas fa-plus"></i>
  <span className="hidden sm:inline">Add Record</span>
</button>
```

**After:**
```jsx
import { AldrButton } from './components/aldr-design-system';

<AldrButton 
  variant="white" 
  icon="fa-plus"
  size="md"
>
  Add Record
</AldrButton>
```

**Key Changes:**
- ✅ Component-based instead of CSS classes
- ✅ Built-in responsive text hiding
- ✅ 8 different variants available
- ✅ Loading states and disabled support

#### VaultInfoModal → AldrModal

**Before:**
```jsx
import VaultInfoModal from '../components/VaultInfoModal';

<VaultInfoModal 
  vault={selectedVault} 
  isOpen={showModal} 
  onClose={() => setShowModal(false)} 
/>
```

**After:**
```jsx
import { AldrModal } from './components/aldr-design-system';

<AldrModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  type="vault"
  vault={selectedVault}
  maxWidth="2xl"
  actions={[
    {
      label: "Open Vault",
      onClick: handleOpenVault,
      variant: "primary",
      icon: "fa-arrow-right"
    }
  ]}
/>
```

**Key Changes:**
- ✅ Unified modal for vault info, documents, and custom content
- ✅ Flexible action button system
- ✅ Configurable sizing and behavior
- ✅ Better keyboard and accessibility support

### Phase 3: Layout Migration

#### MainLayout → AldrLayout

**Before:**
```jsx
import MainLayout from '../layouts/MainLayout';

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
```

**After:**
```jsx
import { AldrLayout } from './components/aldr-design-system';

function App() {
  return (
    <AldrLayout
      showHeader={false}
      showFooter={true}
      contentPadding={true}
      backgroundColor="bg-aldr-light"
    >
      <Outlet />
    </AldrLayout>
  );
}
```

**Key Changes:**
- ✅ Configurable header and footer display
- ✅ Content padding and background options
- ✅ Better responsive behavior

### Phase 4: Smart Features Migration

#### SmartSuggestions → AldrSmartSuggestions

**Before:**
```jsx
import SmartSuggestions from '../components/SmartSuggestions';

<SmartSuggestions />
```

**After:**
```jsx
import { AldrSmartSuggestions } from './components/aldr-design-system';

<AldrSmartSuggestions
  title="Smart Suggestions"
  maxInitialDisplay={3}
  maxExpandedDisplay={10}
  urgencyThresholds={{ red: 7, amber: 30, green: 90 }}
  onReminderClick={handleReminderClick}
  onManageReminders={handleManageReminders}
  showSettings={true}
/>
```

**Key Changes:**
- ✅ Configurable urgency thresholds
- ✅ Better data management
- ✅ Enhanced filtering and sorting
- ✅ Improved cross-vault intelligence display

## 🎨 CSS Classes Migration

### Dashboard Buttons

**Before:**
```css
.dashboard-button {
  background: var(--primary-teal);
  color: white;
  /* ... */
}

.dashboard-button.white {
  background: white;
  color: var(--primary-teal);
}

.dashboard-button.outline {
  background: transparent;
  border: 2px solid var(--primary-teal);
}
```

**After:**
```jsx
// No CSS needed - use AldrButton component
<AldrButton variant="primary">Primary</AldrButton>
<AldrButton variant="white">White</AldrButton>
<AldrButton variant="outline">Outline</AldrButton>
```

### Card Styling

**Before:**
```css
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  /* ... */
}
```

**After:**
```jsx
// Use AldrCard component with variants
<AldrCard variant="default">Content</AldrCard>
<AldrCard variant="elevated">Elevated</AldrCard>
<AldrCard variant="gradient">Gradient</AldrCard>
```

## 📝 Props Mapping Reference

### AldrHeader Props

| Legacy Prop | New Prop | Notes |
|-------------|----------|-------|
| `title` | `title` | Same |
| N/A | `subtitle` | New - for Norse definition |
| N/A | `variant` | New - 'default', 'vault-specific' |
| N/A | `icon` | New - vault-specific icon |
| N/A | `actions` | New - custom action buttons |

### AldrButton Props

| Legacy Class | New Prop | Notes |
|--------------|----------|-------|
| `dashboard-button` | `variant="primary"` | Default |
| `dashboard-button white` | `variant="white"` | White background |
| `dashboard-button outline` | `variant="outline"` | Outlined style |
| N/A | `loading={true}` | New - loading state |
| N/A | `disabled={true}` | New - disabled state |

### AldrModal Props

| Legacy Prop | New Prop | Notes |
|-------------|----------|-------|
| `isOpen` | `isOpen` | Same |
| `onClose` | `onClose` | Same |
| `vault` | `vault` | Same |
| N/A | `type` | New - 'vault', 'document', 'custom' |
| N/A | `actions` | New - action button array |
| N/A | `maxWidth` | New - size configuration |

## 🚨 Breaking Changes

### 1. Import Changes
- **Old**: Individual file imports
- **New**: Centralized design system imports

### 2. CSS Dependencies
- **Old**: CSS classes for styling
- **New**: Component props for configuration

### 3. API Standardization
- **Old**: Inconsistent prop names across components
- **New**: Standardized prop interfaces

### 4. Enhanced Features
- **Old**: Limited configuration options
- **New**: Extensive customization through props

## ✅ Migration Checklist

### Pre-Migration
- [ ] Backup existing components
- [ ] Review current usage patterns
- [ ] Plan migration phases
- [ ] Set up testing environment

### Component Migration
- [ ] Migrate AldrHeader
- [ ] Migrate AldrButton usage
- [ ] Migrate AldrModal
- [ ] Migrate Smart Features
- [ ] Update Layout components

### Testing
- [ ] Test component functionality
- [ ] Verify responsive behavior
- [ ] Check accessibility features
- [ ] Validate performance impact

### Cleanup
- [ ] Remove legacy component files
- [ ] Clean up unused CSS
- [ ] Update documentation
- [ ] Remove old imports

## 🎯 Best Practices

### 1. Gradual Migration
```jsx
// Migrate one component at a time
// Keep both old and new versions during transition
import UniformHeader from '../legacy/UniformHeader'; // Old
import { AldrHeader } from './components/aldr-design-system'; // New

// Use feature flags or environment variables to switch
const useNewDesignSystem = process.env.REACT_APP_NEW_DESIGN_SYSTEM === 'true';

return useNewDesignSystem ? <AldrHeader /> : <UniformHeader />;
```

### 2. Prop Validation
```jsx
// Use PropTypes for validation during migration
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Document expected props for migration
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'vault-specific'])
};
```

### 3. Testing Strategy
```jsx
// Test both old and new components during migration
describe('Header Migration', () => {
  test('old UniformHeader works', () => {
    render(<UniformHeader title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('new AldrHeader works', () => {
    render(<AldrHeader title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## 🆘 Troubleshooting

### Common Issues

1. **Import Errors**
   ```jsx
   // Problem: Cannot resolve module
   import { AldrButton } from '@aldr/design-system';
   
   // Solution: Use relative path
   import { AldrButton } from './components/aldr-design-system';
   ```

2. **CSS Conflicts**
   ```css
   /* Problem: Old CSS still applied */
   .dashboard-button {
     /* conflicting styles */
   }
   
   /* Solution: Remove or scope old CSS */
   .legacy .dashboard-button {
     /* scoped legacy styles */
   }
   ```

3. **Props Not Working**
   ```jsx
   // Problem: Using old prop names
   <AldrHeader headerTitle="Test" />
   
   // Solution: Use new prop names
   <AldrHeader title="Test" />
   ```

### Performance Issues

1. **Bundle Size Increase**
   ```jsx
   // Problem: Importing entire design system
   import AldrDesignSystem from './components/aldr-design-system';
   
   // Solution: Import only what you need
   import { AldrButton, AldrCard } from './components/aldr-design-system';
   ```

2. **Re-render Issues**
   ```jsx
   // Problem: Creating objects in render
   <AldrHeader actions={[{ label: 'Test', onClick: () => {} }]} />
   
   // Solution: Define objects outside render
   const headerActions = [{ label: 'Test', onClick: handleClick }];
   <AldrHeader actions={headerActions} />
   ```

## 📞 Support

For migration assistance:
- Check component documentation in README.md
- Review usage examples in component files
- Test with existing SOMA Companion implementations
- Validate against Aldr Vaults MVP integration

## 🎉 Migration Benefits

After completing the migration, you'll have:

- ✅ **Consistent UI/UX** across all applications
- ✅ **Better Performance** with optimized components
- ✅ **Enhanced Accessibility** with full ARIA support
- ✅ **Mobile Optimization** with responsive design
- ✅ **Future-Proof** architecture for new features
- ✅ **Easier Maintenance** with standardized APIs
- ✅ **Better Testing** with component-based architecture

---

**Migration Complete!** Your application now uses the standardized Aldr Design System with improved performance, accessibility, and maintainability.