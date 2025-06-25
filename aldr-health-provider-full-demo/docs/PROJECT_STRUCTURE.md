# Aldr Health Provider Full Demo - Project Structure

This document outlines the structure and organization of the Aldr Health Provider Full Demo project (previously SOMA Colleague).

## Directory Structure

```
aldr-health-provider-full-demo/
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
│   │   ├── dashboard/    # Provider dashboard components
│   │   └── layout/       # Layout components
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

### Provider Dashboard

The provider dashboard gives healthcare professionals a comprehensive view of their patients:
- Patient list and search
- Recent patient activity
- Patient record access
- Appointment scheduling

### Care Plan Management

The care plan management system allows providers to:
- Create and modify care plans for patients
- Track patient progress
- Set goals and milestones
- Communicate recommendations

### Patient Record Access

Providers can access patient records that have been shared with them:
- View detailed health information
- Add notes and observations
- Request additional information
- Track historical data

### Provider Administration

- Provider profile management
- Practice information
- Specialty and credentials
- Collaboration with other providers

## Key Components

### Dashboard Components

- Patient list with filtering and searching
- Patient record details
- Quick actions for common tasks
- Activity feeds and notifications

### Care Plan Components

- Care plan creation and editing
- Treatment protocols
- Progress visualization
- Integration with patient records

## Technology Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For handling navigation and routing
- **TailwindCSS**: Utility-first CSS framework for styling
- **Axios**: For API requests

## Rebranding Notes

This project has been rebranded from SOMA Colleague to Aldr Health Provider. The rebranding includes:
- Updated color scheme
- New brand name and references
- Consistent UI elements and design language across the Aldr ecosystem