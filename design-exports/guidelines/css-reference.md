# Aldr Vaults CSS Reference

This document provides CSS references and Tailwind class examples for implementing Aldr Vaults designs.

## Color Variables

```css
:root {
  --teal: #20B2AA;
  --purple: #8A2BE2;
  --dark: #333333;
  --light: #F8F9FA;
  --gray: #6C757D;
}
```

## Tailwind Classes

### Colors
- Primary Teal: `text-aldr-teal`, `bg-aldr-teal`, `border-aldr-teal`
- Secondary Purple: `text-aldr-purple`, `bg-aldr-purple`, `border-aldr-purple`
- Dark Text: `text-aldr-dark`
- Light Background: `bg-aldr-light`
- Gray/Muted: `text-aldr-gray`

### Gradient
- Aldr Gradient: `bg-aldr-gradient`
- Gradient Text: `bg-aldr-gradient bg-clip-text text-transparent`

### Typography
- Headings: `text-3xl md:text-4xl font-bold heading-gradient`
- Subheadings: `text-2xl font-bold text-aldr-dark`
- Body: `text-aldr-dark`
- Secondary text: `text-aldr-gray text-sm`

### Components

#### Buttons
```jsx
// Primary Button
<button className="btn-primary">
  Button Text
</button>

// Secondary Button
<button className="btn-secondary">
  Button Text
</button>
```

#### Cards
```jsx
<div className="card">
  Card content
</div>

// Vault Card with Hover
<div className="card vault-card hover:shadow-lg transition-all duration-300">
  Card content
</div>
```

#### Navbar
```jsx
<nav className="bg-aldr-gradient shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Navbar content -->
  </div>
</nav>
```

## Common Patterns

### Responsive Layouts
```jsx
// Grid for Cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Card items */}
</div>

// Flexible Layout
<div className="flex flex-col md:flex-row justify-between items-center">
  {/* Content */}
</div>
```

### Icons with Circle Background
```jsx
<div className="w-12 h-12 rounded-full bg-aldr-teal flex items-center justify-center text-white">
  <i className="fas fa-icon text-xl"></i>
</div>
```

### Section Headers
```jsx
<div className="mb-6">
  <h2 className="text-2xl font-bold text-aldr-dark">Section Title</h2>
</div>
```

## Animation

### Transitions
```jsx
// Hover transition
<button className="text-aldr-teal hover:text-aldr-purple transition-colors duration-300">
  Button Text
</button>

// Card hover effect
<div className="card hover:shadow-lg transition-all duration-300">
  Card Content
</div>
```

### Page Transitions
```css
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Component Definitions

```jsx
// Component class definitions in index.css
@layer components {
  .btn-primary {
    @apply bg-aldr-gradient text-white font-semibold py-3 px-7 rounded-pill;
  }
  
  .btn-secondary {
    @apply bg-transparent border border-aldr-teal text-aldr-teal font-semibold py-3 px-7 rounded-pill;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  .heading-gradient {
    @apply bg-clip-text text-transparent bg-aldr-gradient font-bold;
  }
}
```