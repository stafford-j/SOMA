# Aldr Health Individual Full Demo - Project Structure

This document outlines the structure and organization of the Aldr Health Individual Full Demo project (previously SOMA Companion).

## Directory Structure

```
aldr-health-individual-full-demo/
├── docs/                  # Documentation
│   └── PROJECT_STRUCTURE.md
├── public/                # Public assets and HTML
│   ├── index.html        # Main HTML file
│   └── manifest.json     # Web app manifest
├── src/                   # Source code
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable React components
│   │   ├── auth/         # Authentication components
│   │   ├── care-plan/    # Care plan management components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── layout/       # Layout components
│   │   └── onboarding/   # User onboarding components
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Page layout components
│   ├── pages/            # Page components
│   ├── services/         # API and service integrations
│   └── utils/            # Utility functions
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

## Feature Overview

### Health Record Management

The application provides comprehensive health record management capabilities including:

- Creating, viewing, editing, and deleting health records
- Categorizing records by type and specialty
- Viewing detailed information about health records
- Filtering and searching records

### Patient Care Plan

- Visual representation of care plans
- Progress tracking for treatment plans
- Integration with health records
- Reminders and notifications

### Provider Sharing

- Secure sharing with healthcare providers
- Permission management for shared records
- Access logs and history

### User Management

- User authentication and profile management
- Security settings and preferences
- Identity verification

## Key Components

### Dashboard Components

The dashboard provides a comprehensive overview of the user's health information:
- Recent records
- Upcoming appointments
- Records by specialty and type
- Activity summary

### Care Plan Components

The care plan module visualizes the user's healthcare journey:
- Treatment plans
- Progress tracking
- Provider recommendations
- Appointment scheduling

## Technology Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For handling navigation and routing
- **TailwindCSS**: Utility-first CSS framework for styling
- **Axios**: For API requests

## Rebranding Notes

This project has been rebranded from SOMA Companion to Aldr Health Individual. The rebranding includes:
- Updated color scheme
- New brand name and references
- Consistent UI elements and design language