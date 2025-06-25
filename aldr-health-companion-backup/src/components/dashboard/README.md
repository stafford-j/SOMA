# SOMA Dashboard Templates

This directory contains templates and styles for the SOMA Health Companion dashboard.

## Files

- `Dashboard.css` - Main stylesheet with SOMA branding colors and components
- `DashboardTemplate.js` - Basic layout template with all UI components
- `soma-dashboard-template.js` - Functional template that handles loading/error states

## SOMA Brand Colors

- Primary Teal: #20B2AA
- Primary Purple: #8A2BE2
- Dark Text: #333
- Light Background: #f8f9fa
- Gray Text: #6c757d
- Medical Blue: #4169E1
- Holistic Green: #228B22
- Mental Purple: #9932CC

## Usage

To use these templates, import them into your main Dashboard component:

```jsx
import './Dashboard.css';
import SOMADashboardTemplate from './soma-dashboard-template';

const Dashboard = () => {
  // Your state and data logic here
  
  return (
    <SOMADashboardTemplate 
      records={yourRecordsData}
      loading={isLoading}
      error={errorState}
      userId={userIdFromState}
    />
  );
};
```

## Components Included

1. Header with SOMA logo
2. Category filters 
3. Tab navigation
4. Stat summary cards
5. Recent records list
6. Upcoming appointments
7. Activity feed
8. Modal dialog
9. Form elements

## Integration with Font Awesome

The templates use Font Awesome icons. Make sure the Font Awesome CSS is included in your project by adding this line to your HTML head:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
```

This has already been added to the `index.html` file.

## Responsive Design

All components are fully responsive and will adapt to mobile, tablet, and desktop viewports.