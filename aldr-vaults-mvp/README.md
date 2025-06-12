# Aldr Vaults MVP

**Repository:** https://github.com/stafford-j/SOMA

This is the main entry point for the Aldr Vaults platform, providing a comprehensive document management system focused on Health, Legal, and Identity documents.

## Overview

Aldr Vaults MVP is a React-based frontend application that demonstrates the core functionality of the Aldr platform. The platform defaults to Aldr Health Companion as the main landing page, with integrated navigation to Aldr ID, legal document management, and provider tools.

## Key Features

- **Aldr Health Companion** - Advanced health record management with AI insights
- **Aldr ID** - Personal health profile and identity management  
- **Aldr Legal** - Legal document management system
- **Multi-perspective AI insights** - 5 healthcare perspectives (Medical, Holistic, Mental Health, Nutritional, Physical Therapy)
- **Language toggle** - "Coming Soon" functionality for future multi-language support
- **Modern branding** - Teal/purple gradient design system

## Project Structure

```
aldr-vaults-mvp/
├── docs/               # Documentation files
├── public/             # Public assets and HTML
└── src/                # Source code
    ├── assets/         # Images, fonts, and other static assets
    ├── components/     # Reusable components
    ├── contexts/       # React contexts for state management
    ├── hooks/          # Custom React hooks
    ├── layouts/        # Layout components
    ├── pages/          # Page components
    ├── services/       # API service integrations
    └── utils/          # Utility functions
```

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Build for production: `npm run build`

## Technology Stack

- React
- React Router
- TailwindCSS
- Axios