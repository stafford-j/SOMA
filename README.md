**We have Rebranded - Please note Aldr Vaults will be known as Aldr Vaults with Aldr Health and Aldr ID sub-domains going forward**

# Aldr Vaults (Formerly SOMA)

**© 2025 Conas Consulting. All Rights Reserved.**

**IMPORTANT NOTICE: This repository contains proprietary concepts and intellectual property owned exclusively by Conas Consulting. This material is shared publicly for demonstration purposes only.**


Aldr Vaults aims to give you complete ownership of your personal information through secure, private vaults. As we develop our aim is develop both on web 2 traditional servers and work towardsleveraging the revolutionary Autonomi network. Whether you're moving countries or rebuilding after displacement, Aldr Vaults' vision is to ensure your health records, identity, and essential documentation remain accessible, portable, and always under your control.

## 📋 Documentation

- [Executive Summary](ConceptDocs/executive-summary.md) - High-level overview of Aldr Vaults platform and market opportunity
- [Whitepaper](ConceptDocs/whitepaper.md) - Detailed explanation of technology and implementation
- [Concept Ownership](ConceptDocs/CONCEPT_OWNERSHIP.md) - Intellectual property declaration
- [Changelog](CHANGELOG.md) - Development progress and version history

This repository contains the three core components of the Aldr Vaults ecosystem:

1. **Aldr Health Companion** - Patient-facing health records dashboard
2. **Aldr Health Colleague** - Provider-facing clinical interface
3. **Aldr Vaults Bridge** - Identity & health record continuity solution for displaced populations

All components include sample data, so you can run them locally without external dependencies.

## Aldr Health Companion (Patient Dashboard)

A modern Aldr Vaults-styled health records dashboard allowing patients to manage and explore their health information with AI insights.

### Key Features

- **Modern Aldr Vaults-styled UI**: Clean, professional healthcare interface
- **Health Records Management**: View all health records in a single dashboard
- **Health Categories**: Medical, dental, mental health, and alternative care
- **AI Insights**: Toggle between data mode and AI opinion mode 
- **Responsive Design**: Works on desktop and mobile devices

## Aldr Vaults Colleague (Provider Dashboard)

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
   git clone https://github.com/your-username/Aldr Vaults-ecosystem.git
   cd Aldr Vaults-ecosystem
   ```

2. Run the setup script and choose which application(s) to install
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. Follow the prompts to install Aldr Vaults Companion, Aldr Vaults Colleague, or both

### Starting the Applications

#### Aldr Vaults Companion (Patient Dashboard)
```bash
cd "Aldr Vaults Companion (Individual)"
npm start
```
Visit `http://localhost:3000` in your browser

#### Aldr Vaults Colleague (Provider Dashboard)
```bash
cd "Aldr Vaults Colleague (Provider Platform)"
npm start
```
Visit `http://localhost:3001` in your browser

## Project Structure

- `/Aldr Vaults Companion (Individual)`: Aldr Vaults Companion patient application
  - `/src/components/dashboard`: Dashboard components
  - `/src/pages`: Application pages
  
- `/Aldr Vaults Colleague (Provider Platform)`: Aldr Vaults Colleague provider application
  - `/src/components/dashboard`: Clinical interface components
  - `/src/pages`: Provider workflow pages

## Screenshots and Demos

### Aldr Vaults Companion (Patient Dashboard)
<img src="https://static.wixstatic.com/media/afc39f_570d18746af94c1194c513b7b23a3945~mv2.png" alt="Aldr Vaults ID" width="300"/>

#### Aldr Vaults Companion Video Demo
[![Aldr Vaults Companion Video Demo](https://static.wixstatic.com/media/afc39f_570d18746af94c1194c513b7b23a3945~mv2.png =250x)](https://video.wixstatic.com/video/afc39f_00b381825dae4ef6a8bae53b3a350744/1080p/mp4/file.mp4)
*Click the image above to view the demo video*

### Aldr Vaults Colleague (Provider View)
<img src="https://static.wixstatic.com/media/afc39f_02068bd3082742128ba57b3e17af2e5b~mv2.png" alt="Aldr Vaults Bridge" width="300"/>

#### Aldr Vaults Colleague Video Demo
[![Aldr Vaults Colleague Video Demo](https://static.wixstatic.com/media/afc39f_02068bd3082742128ba57b3e17af2e5b~mv2.png =250x)](https://video.wixstatic.com/video/afc39f_f40f1cd5fca241b4998b3f551a51c627/1080p/mp4/file.mp4)
*Click the image above to view the demo video*

## Aldr Vaults Bridge

Aldr Vaults Bridge is designed for individuals who have been uprooted by conflict, disaster, or the search for a new life, when proving your identity, qualifications, and health history becomes essential. It provides a portable, private vault that travels with the individual across borders and systems, supporting continuity, access, and stability.

### Core Functions

- Carry essential records across systems and borders
- Rebuild lost or fragmented identity and medical history
- Present qualifications and credentials for work, education, or resettlement
- Ensure access to critical care and services in unfamiliar settings

### Key Features

- Built on Aldr Vaults ID with granular sharing permissions
- Works offline via secure, durable local storage (Home Vault)
- Multi-language record display and translation support
- Printable summaries for use in clinics, borders, or aid centres
- Integrates with humanitarian workflows and registration systems

### Use Cases

- Refugees re-entering healthcare systems
- Displaced professionals needing to transfer qualifications
- People navigating new countries with limited digital infrastructure
- Aid organizations assisting individuals with continuity of care

<img src="https://static.wixstatic.com/media/afc39f_02068bd3082742128ba57b3e17af2e5b~mv2.png" alt="Aldr Vaults Bridge" width="300"/>

## Usage Scenarios

### Patient Experience (Aldr Vaults Companion)
- Navigate the dashboard to view health records sorted by date and category
- Click "View Details" to see more information about any record
- Toggle between Data and Opinion modes to see different perspectives
- Use the "Add New Record" button to create new health records

### Provider Experience (Aldr Vaults Colleague)
- View a list of patients who have shared their records
- Access detailed clinical information in a data-only view
- Add clinical notes and documentation to patient records
- Create new structured medical records with appropriate clinical fields

## Copyright and License

**© 2025 Conas Consulting. All Rights Reserved.**

This project is proprietary software owned by Conas Consulting. No license is granted for commercial use, modification, or distribution. This repository is shared for demonstration and portfolio purposes only.

## Acknowledgments

- Conas Consulting design team for the Aldr Vaults platform concept
- Claude from Anthropic for assistance with development
