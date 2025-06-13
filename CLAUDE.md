# Aldr Ecosystem Project Brief

## 🚨 **IMPORTANT NOTES:**
**IRISH DIASPORA MARKET STRATEGY** - This is background market research and founder-market fit analysis only. Do NOT include Irish references or culturally specific content in the actual application UI, copy, or marketing materials. This remains a private strategic consideration for go-to-market planning.

## Project Overview
The Aldr Ecosystem is a comprehensive document storage and health management platform that allows users to organize and manage important documents across three main categories: Health, Legal, and Identity. The project evolved from the original SOMA Companion application into a full-featured document vault system.

## Project Structure
The repository contains multiple integrated projects:

### Core Aldr Projects
1. **Aldr Vaults MVP** - `/aldr-vaults-mvp/` - Main homepage and navigation hub
2. **Aldr Health Companion** - `/aldr-health-companion/` - Personal health record management (formerly SOMA Companion)
3. **SOMA Colleague (Provider Platform)** - `/SOMA Colleague (Provider Platform)/` - Healthcare provider interface (maintained separately)

### Demo Projects
4. **Aldr Health Individual Full Demo** - `/aldr-health-individual-full-demo/` - Complete demo version
5. **Aldr Health Provider Full Demo** - `/aldr-health-provider-full-demo/` - Provider demo version

## Current Priority
The primary focus is on the **Aldr Health Companion** as the main demo application. The MVP has been simplified to launch directly into Aldr Health Companion, with Aldr ID accessible via the header navigation. The overall dashboard (HomePage) and Aldr Legal are kept in place for the full platform experience, but the **demo showcases Aldr Health Companion & Aldr ID** as the core features.

## Tech Stack
- **Frontend**: React with React Router
- **Styling**: TailwindCSS
- **Icons**: Font Awesome
- **Build**: Create React App

## Branding
- **Primary Color**: Teal (#20B2AA)
- **Secondary Color**: Purple (#8A2BE2)
- **Gradient**: Linear gradient from Teal to Purple (45 degrees)
- **Fonts**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif

## Design Resources
Design specifications have been exported to:
- `/mnt/c/Users/james/Desktop/aldr-design-exports/`
- Also in the repo at `/design-exports/`

These exports contain:
- Brand guidelines document
- Component specifications
- CSS reference guide
- Logo assets

## Current Implementation Status

### Aldr Vaults MVP
The simplified MVP now defaults to Aldr Health Companion as the landing page with:
- Uniform header component across all pages with new Aldr Health logo
- Header navigation includes: Aldr ID, Add New Record, and Log Out buttons
- Aldr Health logo in header links back to the dashboard (root page)
- Homepage dashboard available at `/home` for reference
- Aldr Legal available at `/aldr-legal` for future development
- Clean, streamlined user experience focused on health management
- All SOMA references replaced with Aldr branding

#### Advanced RecordDetails Features (Completed 2025-06-11)
- **Sophisticated Data Mode vs Opinion Mode toggle system** allowing users to switch between factual medical records and AI-generated insights
- **User-controlled AI source selection** with transparent knowledge sources from 5 medical perspectives:
  - Medical Perspective (evidence-based clinical insights)
  - Holistic Perspective (integrative wellness approaches)
  - Mental Health Perspective (psychological and emotional considerations)
  - Nutritional Perspective (dietary and nutritional factors)
  - Physical Therapy Perspective (movement and rehabilitation insights)
- **Cross-disciplinary AI insights** demonstrating how different healthcare specialties view the same health record
- **Comprehensive sample data** with all major records having insights from all 5 perspectives
- **Full-screen layout optimization** with reorganized Quick Actions strip, dedicated View Mode section, and bottom Record Details/Related Records
- **Related Records section** displaying actual recent health records with proper navigation
- **Enhanced header spacing** for improved visual hierarchy

### Aldr Health Companion (formerly SOMA Companion)
Comprehensive health record management with:
- Rebranded to Aldr Health Companion with Playfair Display fonts
- Health statistics dashboard (16+ health records, diabetes management)
- Health check reminders with future dates and "Due Soon" indicators
- Recent health records display
- Upcoming appointments (all future dates)
- Extended sample data including chiropractic, massage, and other specialties
- Records organized by specialty and type with "View Details" functionality
- Recent activity feed
- Aldr ID integration

### Aldr Legal Companion
Legal document management system with:
- Legal document dashboard with Aldr branding
- Document categories: Estate Planning, Property, Personal Legal, Business
- Sample legal documents: Will, House Deed, Insurance policies, etc.
- Document expiration tracking and reminders
- Status indicators (current, active, expired)
- Recent legal activity feed

### Aldr ID
Personal health profile system with:
- Comprehensive health profile management
- Personal information, medical conditions, allergies, medications
- BMI calculator with metric/imperial conversion
- Edit/view modes with form validation
- Data persistence using localStorage
- Integration with Aldr branding and design system

## Key Files

### Aldr Vaults MVP
- `/aldr-vaults-mvp/src/pages/AldrHealth.js` - Main landing page (health dashboard)
- `/aldr-vaults-mvp/src/pages/AldrId.js` - Personal health profile system
- `/aldr-vaults-mvp/src/pages/AddRecord.js` - Add new health record page
- `/aldr-vaults-mvp/src/pages/HomePage.js` - Original dashboard (available at /home)
- `/aldr-vaults-mvp/src/pages/AldrLegal.js` - Legal document management
- `/aldr-vaults-mvp/src/components/layout/UniformHeader.js` - Uniform header component
- `/aldr-vaults-mvp/src/components/layout/Navbar.js` - Original navigation component
- `/aldr-vaults-mvp/src/data/sample-records.js` - Health record demo data
- `/aldr-vaults-mvp/src/styles/Dashboard.css` - Aldr-branded dashboard styling
- `/aldr-vaults-mvp/tailwind.config.js` - Styling configuration

### Aldr Health Companion
- `/aldr-health-companion/src/components/dashboard/Dashboard.js` - Main health dashboard
- `/aldr-health-companion/src/components/dashboard/soma-dashboard-template.js` - Aldr-branded template
- `/aldr-health-companion/src/components/dashboard/sample-records.js` - Extended health record data
- `/aldr-health-companion/src/pages/Profile.jsx` - Health profile (basis for Aldr ID)
- `/aldr-health-companion/src/components/layout/Navbar.js` - Navigation component

## How to Run the Applications

**Note: User is on Windows PowerShell - use Windows path format (backslashes) not Linux paths**

### Aldr Vaults MVP (Main Platform - Defaults to Aldr Health)
```powershell
cd Documents\soma-companion\aldr-vaults-mvp
npm install
npm start
```
Access at: http://localhost:3000 (opens directly to Aldr Health)

### Aldr Health Companion
```powershell
cd Documents\soma-companion\aldr-health-companion
npm install
npm start
```
Access at: http://localhost:3000 (different port if MVP is running)

### Backend (for Health Companion)
```powershell
cd Documents\soma-companion\backend
npm install
npm start
```
Runs on: http://localhost:5000

## Language Toggle Implementation Assessment

### Difficulty: **Moderate** (2-3 days for proper implementation)

**Implementation Approach:**
1. **React i18n Integration** - Use react-i18next library
2. **Translation Files** - JSON files for each language (en.json, fr.json, es.json, etc.)
3. **Context Provider** - Global language state management
4. **Header Integration** - Language toggle dropdown in UniformHeader component
5. **Text Extraction** - Replace hardcoded strings with translation keys

**Key Areas Requiring Translation:**
- Header navigation (Aldr ID, Add New Record, Contact, Log Out)
- Dashboard content (Health Stats, Recent Records, Appointments)
- Form labels and buttons
- Record details and medical terminology
- Error messages and notifications

**Recommended Languages:**
- **English** (default)
- **French** (Canadian French for international appeal)
- **Spanish** (large global market)

**Technical Requirements:**
- Install react-i18next dependency
- Create translation JSON files
- Wrap App with I18nextProvider
- Update all components with useTranslation hook
- Add language detection and persistence (localStorage)

**Estimated Effort:** 16-24 hours of development time for full implementation

### ✅ **Quick Implementation Added (June 12, 2025)**
Added "Coming Soon" language toggle button to UniformHeader:
- Globe icon with "EN" label
- Click shows tooltip: "Multi-language support coming soon!"
- Positioned between Add New Record and Contact buttons
- Auto-dismisses after 2 seconds
- Ready for future i18n integration

## Next Steps

### Immediate Priority: GitHub Repository Setup & Vercel Deployment
1. **Update GitHub repository** with latest Aldr Vaults MVP code
   - Ensure all recent RecordDetails.js improvements are committed
   - Update sample-records.js with expanded cross-disciplinary insights
   - Include comprehensive CLAUDE.md documentation
   - Add deployment configuration files

2. **Vercel deployment setup** for https://vercel.com/
   - Configure build settings for React application
   - Set up custom domain if needed
   - Ensure proper routing for SPA (Single Page Application)
   - Test deployment with current feature set

### Future Development Roadmap
3. Integrate all applications with shared authentication
4. Implement real backend connections for all vaults
5. Add document upload/storage functionality
6. Implement user authentication and security
7. Create mobile-responsive refinements
8. Add data export/import capabilities
9. Expand AI insights system with real medical knowledge base
10. Add care plan integration (connect with SOMA Colleague platform)

## 🎯 **TARGET MARKET STRATEGY: Background Research Only (June 11, 2025)**

### **Market Opportunity Analysis (Private/Internal Use Only)**
- **70+ million global diaspora communities** represent underserved cross-border health management market
- **High-income demographics** in major international cities with complex healthcare needs
- **Frequent international travel** creating health record portability challenges
- **Tech-forward communities** ready for digital health solutions

### **Founder-Market Fit Advantage (Private/Internal Use Only)**
- **Personal lived experience** with cross-border health record management
- **Authentic pain point validation** from firsthand challenges
- **International network** for market validation
- **Cross-border expertise** in healthcare systems

### **Go-to-Market Strategy (Private/Internal Use Only)**
1. **Phase 1: Cross-border health management** (founder's lived experience)
2. **Phase 2: Major international hub cities**
3. **Phase 3: Global platform expansion**

### **Competitive Advantages**
- **Cross-border health record expertise**
- **Family health management** - helping manage elderly parents from different countries
- **Opinion Mode** helps navigate different medical cultures globally

**Note: This market analysis is for strategic planning only. Public-facing materials should remain culturally neutral and globally applicable.**

## Key Technical Achievements (June 11, 2025)

### Advanced Opinion Mode Implementation
- **Multi-perspective AI insights system** that demonstrates cross-disciplinary healthcare approaches
- **User-controlled knowledge sources** with transparent sourcing from medical literature
- **Perspective key standardization** ensuring consistency across all health records
- **"Everybody has an opinion" principle** - every record type now receives insights from all 5 healthcare perspectives

### Sample Data Expansion
- **16 comprehensive health records** spanning medical, physiotherapy, massage, mental health, nutrition, dentistry, and alternative medicine
- **Cross-disciplinary insights** for all major records (CBT sessions get nutritional opinions, dental cleanings get mental health perspectives, etc.)
- **Realistic medical scenarios** including dermatology consultations, blood work, and alternative treatments

### Layout & UX Improvements
- **Full-screen record viewing** with optimized Quick Actions strip
- **Dedicated View Mode section** for clear Data/Opinion mode switching
- **Related Records display** showing actual recent health records with proper navigation
- **Enhanced visual hierarchy** with improved spacing and typography

## Notes for Future Development
- Maintain the established brand guidelines for consistency
- Preserve the three-tier categorization system (Health, Legal, Identity)
- The sophisticated Opinion Mode system is the foundation for future AI health insights
- Local asset files are stored in `/src/assets/`
- All perspective keys are standardized: medical, holistic, mental_health, nutritional, physical_therapy