# Aldr Vaults MVP - Project Structure

This document outlines the structure and organization of the Aldr Vaults MVP project.

## Directory Structure

```
aldr-vaults-mvp/
├── docs/                  # Documentation
│   └── PROJECT_STRUCTURE.md
├── public/                # Public assets and HTML
│   ├── index.html        # Main HTML file
│   └── manifest.json     # Web app manifest
├── src/                   # Source code
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable React components
│   │   └── layout/       # Layout components
│   │       └── Navbar.js # Main navigation component
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Page layout components
│   │   └── MainLayout.js # Main application layout
│   ├── pages/            # Page components
│   │   ├── Dashboard.js  # Dashboard page
│   │   ├── NotFound.js   # 404 page
│   │   └── Profile.js    # User profile page
│   ├── services/         # API and service integrations
│   │   └── authService.js # Authentication service
│   ├── utils/            # Utility functions
│   │   └── dateUtils.js  # Date formatting utilities
│   ├── App.css           # App-specific styles
│   ├── App.js            # Main application component
│   ├── index.css         # Global styles
│   ├── index.js          # Application entry point
│   └── reportWebVitals.js # Performance measurement
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project overview
└── tailwind.config.js    # Tailwind CSS configuration
```

## Key Components

### Core Application Files

- `src/App.js`: The main application component defining routes and application structure
- `src/index.js`: Entry point for the React application

### Pages

- `Dashboard.js`: Main landing page with overview of user's vaults and activity
- `Profile.js`: User profile and account settings
- `NotFound.js`: 404 error page for handling invalid routes

### Layouts

- `MainLayout.js`: Provides consistent layout with header, footer, and main content area

### Services

- `authService.js`: Handles user authentication, login/logout functionality

### Utilities

- `dateUtils.js`: Helper functions for date formatting and manipulation

## Technology Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For handling navigation and routing
- **TailwindCSS**: Utility-first CSS framework for styling
- **Axios** (planned): For API requests

## Styling Approach

The project uses TailwindCSS for styling, with the following organization:

- Global styles in `index.css`
- App-specific styles in `App.css`
- Component-specific styles using Tailwind utility classes directly in components

## Branding

The Aldr branding is implemented through:

- Custom TailwindCSS theme colors in `tailwind.config.js`
- Consistent UI elements and color scheme across components
- Logo and branding assets (to be added)