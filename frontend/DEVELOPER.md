# SOMA Companion - Developer Documentation

This document provides information for developers working on the SOMA Companion project.

## Project Structure

```
frontend/
├── public/              # Public assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # Dashboard components
│   │   │   ├── Dashboard.css             # SOMA styling
│   │   │   ├── Dashboard.js              # Main dashboard component
│   │   │   ├── DashboardTemplate.js      # Static HTML structure
│   │   │   ├── sample-records.js         # Sample health record data
│   │   │   └── soma-dashboard-template.js # SOMA-styled dashboard
│   │   ├── layout/      # Layout components (Navbar, etc.)
│   │   └── record/      # Record-related components
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx         # Dashboard page wrapper
│   │   ├── RecordDetails.js      # Record details page
│   │   ├── AddRecord.jsx         # Add record page
│   │   └── EditRecord.js         # Edit record page
│   ├── services/        # Service helpers
│   ├── App.js           # Main application component
│   └── index.js         # Entry point
└── package.json         # Dependencies and scripts
```

## Key Features

1. **SOMA Dashboard**
   - The dashboard displays health records in a clean, modern interface
   - Located in `src/components/dashboard/soma-dashboard-template.js`
   - Styled with SOMA brand colors in `Dashboard.css`

2. **Sample Data**
   - Sample health records with AI insights provided in `sample-records.js`
   - No backend needed for demonstration purposes

3. **Opinion Mode**
   - Toggle between Data and Opinion modes to see different perspectives
   - Implemented in record details page

## Component Documentation

### `SOMADashboardTemplate`

The main dashboard component displaying health records, appointments, and categories.

**Props:**
- `records`: Array of health records (optional, defaults to sample data)
- `loading`: Boolean indicating loading state
- `error`: Error message or null
- `userId`: User ID string

### `RecordDetails`

Displays detailed information about a specific health record.

**Features:**
- Fetches record by ID from URL parameters
- Toggles between Data and Opinion modes
- Displays record information, provider details, and insights

## How to Add New Features

### Adding a New Record Type

1. Update `sample-records.js` to include the new record type
2. Ensure proper categorization in the `recordType` field
3. Add appropriate styling in `Dashboard.css` if needed

### Modifying the Dashboard Layout

1. Edit `soma-dashboard-template.js` to change the dashboard structure
2. Update styles in `Dashboard.css` as needed
3. Test responsiveness on different screen sizes

## Known Limitations

- Edit and Share functionality not fully implemented
- Backend API integration not completed
- Add Record form submission not connected

## Future Enhancements

- Complete the backend API integration
- Implement real authentication
- Add form validation for record creation
- Implement search functionality
- Add filtering options for records
- Enhance mobile responsiveness

## Testing

- The application includes sample data for testing without a backend
- Toggle between Data and Opinion modes to test different views
- Navigate between dashboard and record details to test routing

## Need Help?

For questions or issues, please contact the SOMA Companion team.