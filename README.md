# SOMA Health Ecosystem

A comprehensive health data management ecosystem with both patient and provider interfaces.

![SOMA Logo](https://static.wixstatic.com/media/afc39f_da0a94021ba6434399c2fbd4fd0ee013~mv2.png)

This repository contains two complementary applications:

1. **SOMA Companion** - Patient-facing health records dashboard
2. **SOMA Colleague** - Provider-facing clinical interface

Both applications include sample data, so you can run them locally without any backend services.

## SOMA Companion (Patient Dashboard)

A modern SOMA-styled health records dashboard allowing patients to manage and explore their health information with AI insights.

### Key Features

- **Modern SOMA-styled UI**: Clean, professional healthcare interface
- **Health Records Management**: View all health records in a single dashboard
- **Health Categories**: Medical, dental, mental health, and alternative care
- **AI Insights**: Toggle between data mode and AI opinion mode 
- **Responsive Design**: Works on desktop and mobile devices

## SOMA Colleague (Provider Dashboard)

A clinical interface for healthcare providers to access patient-shared records while maintaining professional standards and documentation workflows.

### Key Features

- **Provider Dashboard**: View patients who have shared records
- **Clinical Data View**: See comprehensive medical information in a provider-focused format
- **Documentation Tools**: Add and edit clinical notes and assessments
- **Record Creation**: Create new medical records with structured clinical data

## Technology Stack

- **Frontend**: React.js, CSS3
- **Patient Dashboard**: Tailwind CSS
- **Provider Dashboard**: Custom medical UI components
- **Sample Data**: Built-in sample health records with AI insights

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/your-username/soma-ecosystem.git
   cd soma-ecosystem
   ```

2. Run the setup script and choose which application(s) to install
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. Follow the prompts to install SOMA Companion, SOMA Colleague, or both

### Starting the Applications

#### SOMA Companion (Patient Dashboard)
```bash
cd frontend
npm start
```
Visit `http://localhost:3000` in your browser

#### SOMA Colleague (Provider Dashboard)
```bash
cd colleague
npm start
```
Visit `http://localhost:3001` in your browser

## Project Structure

- `/frontend`: SOMA Companion patient application
  - `/src/components/dashboard`: Dashboard components
  - `/src/pages`: Application pages
  
- `/colleague`: SOMA Colleague provider application
  - `/src/components/dashboard`: Clinical interface components
  - `/src/pages`: Provider workflow pages

## Usage Scenarios

### Patient Experience (SOMA Companion)
- Navigate the dashboard to view health records sorted by date and category
- Click "View Details" to see more information about any record
- Toggle between Data and Opinion modes to see different perspectives
- Use the "Add New Record" button to create new health records

### Provider Experience (SOMA Colleague)
- View a list of patients who have shared their records
- Access detailed clinical information in a data-only view
- Add clinical notes and documentation to patient records
- Create new structured medical records with appropriate clinical fields

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments

- SOMA Health for design inspiration
- Claude from Anthropic for assistance with development