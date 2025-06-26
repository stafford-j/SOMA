/**
 * Chen Family Demo Data
 * 
 * Complete family demo showing Sarah & David Chen personas
 * Features family toggle between Individual and Family modes
 * 50+ records per person across all 6 vaults
 */

export const chenFamilyData = {
  // Family Profile
  family: {
    name: "Chen Family",
    members: [
      {
        id: "sarah-chen",
        name: "Sarah Chen",
        age: 34,
        role: "Management Consultant",
        bio: "High-achieving consultant with 60% travel schedule. Navigating fertility journey across international healthcare systems.",
        languages: ["English (native)", "Mandarin (conversational)", "Portuguese (learning)"],
        countries: ["US (birth)", "UK (university)", "Singapore (5 years)", "Portugal (current)"]
      },
      {
        id: "david-chen",
        name: "David Chen", 
        age: 36,
        role: "Software Architect",
        bio: "Remote-first software architect specializing in distributed systems. Supporting Sarah's fertility journey while managing back pain from remote work.",
        languages: ["English (native)", "French (conversational)", "Portuguese (learning)"],
        countries: ["Canada (birth)", "Singapore (5 years)", "Portugal (current)"]
      }
    ],
    currentLocation: "Lisbon, Portugal",
    marriedSince: "2022-06-15",
    challenges: [
      "Managing fertility journey across international healthcare systems",
      "Remote work legal compliance across jurisdictions", 
      "Learning Portuguese for permanent residency",
      "Coordinating dual-career travel schedules"
    ]
  },

  // Sarah Chen's Records
  sarah: {
    // ALDR IDENTITY (Personal Attributes & Government IDs)
    identity: [
      {
        id: "sarah-passport-us",
        title: "US Passport",
        category: "government_id",
        type: "passport",
        number: "123456789",
        issueDate: "2020-03-15",
        expiryDate: "2030-03-15",
        issuingCountry: "United States",
        birthPlace: "San Francisco, CA",
        nationality: "American"
      },
      {
        id: "sarah-drivers-license",
        title: "Portuguese Driver's License",
        category: "government_id", 
        type: "drivers_license",
        number: "PT-789012345",
        issueDate: "2024-01-20",
        expiryDate: "2034-01-20",
        restrictions: "None",
        exchangedFrom: "California Driver's License"
      },
      {
        id: "sarah-personal-attributes",
        title: "Personal Health Profile",
        category: "personal_attributes",
        height: "5'6\" (168 cm)",
        weight: "135 lbs (61 kg)",
        bloodType: "O+",
        allergies: ["Penicillin", "Shellfish"],
        emergencyContact: {
          name: "David Chen",
          relationship: "Spouse", 
          phone: "+351 912 345 678"
        },
        medicalConditions: ["Chronic migraines", "Trying to conceive"]
      },
      {
        id: "sarah-birth-certificate",
        title: "US Birth Certificate",
        category: "citizenship_documents",
        registrationNumber: "SF-1990-445678",
        birthDate: "1990-08-22",
        birthPlace: "UCSF Medical Center, San Francisco",
        parents: ["Jennifer Chen", "Michael Chen"],
        certifiedCopy: true,
        apostilleDate: "2023-05-10"
      },
      {
        id: "sarah-social-security",
        title: "Social Security Card",
        category: "government_id",
        number: "XXX-XX-6789",
        issueDate: "1990-09-15",
        status: "Active",
        workEligibility: "US Citizen"
      }
    ],

    // ALDR LEGAL (Contracts, Visas, Insurance, Professional Licenses)
    legal: [
      {
        id: "sarah-mckinsey-contract",
        title: "McKinsey & Company Consulting Agreement",
        category: "employment_contracts",
        employer: "McKinsey & Company Portugal",
        startDate: "2023-01-15",
        contractType: "Senior Associate Consultant",
        salary: "€95,000 annually",
        benefits: ["Health insurance", "Travel allowance", "Professional development"],
        workLocation: "Hybrid - Lisbon office + client sites",
        noticePeriod: "3 months"
      },
      {
        id: "sarah-portugal-residence",
        title: "Portuguese Residence Permit",
        category: "immigration_documents",
        permitNumber: "PT-2023-556789",
        permitType: "Temporary Residence - Skilled Worker",
        issueDate: "2023-02-20",
        expiryDate: "2028-02-20",
        renewalEligible: true,
        workAuthorization: "Unrestricted",
        dependents: ["David Chen"]
      },
      {
        id: "sarah-health-insurance",
        title: "Multicare Health Insurance",
        category: "insurance_policies",
        provider: "Multicare Seguros",
        policyNumber: "MC-2024-778899",
        coverage: "Premium International",
        annualPremium: "€2,400",
        includes: ["Fertility treatments", "International coverage", "Private hospitals"],
        deductible: "€500",
        familyCoverage: "David Chen included"
      },
      {
        id: "sarah-professional-license",
        title: "Management Consulting Certification",
        category: "professional_licenses",
        issuingBody: "Institute of Management Consultants Portugal",
        licenseNumber: "IMC-PT-2023-445",
        issueDate: "2023-04-10",
        expiryDate: "2026-04-10",
        requirements: "40 hours CPD annually",
        status: "Active"
      },
      {
        id: "sarah-travel-insurance",
        title: "Annual Travel Insurance",
        category: "insurance_policies",
        provider: "Europ Assistance",
        policyNumber: "EA-2024-334455",
        coverage: "Worldwide",
        annualPremium: "€650",
        includes: ["Medical evacuation", "Trip cancellation", "Business travel"],
        familyCoverage: true
      },
      {
        id: "sarah-apartment-lease",
        title: "Lisbon Apartment Rental Agreement",
        category: "property_agreements",
        landlord: "João Santos Property Management",
        address: "Rua das Flores, 45, 1200-194 Lisboa",
        monthlyRent: "€1,800",
        leaseStart: "2023-03-01",
        leaseEnd: "2025-02-28",
        deposit: "€3,600",
        utilities: "Not included"
      },
      {
        id: "sarah-nif-portugal",
        title: "Portuguese Tax Number (NIF)",
        category: "tax_documents",
        nif: "234567890",
        registrationDate: "2023-02-15",
        taxStatus: "Portuguese Tax Resident",
        filingObligation: "Annual IRS return",
        category: "Category A - Employment"
      },
      {
        id: "sarah-car-insurance",
        title: "Car Insurance Policy",
        category: "insurance_policies",
        provider: "Tranquilidade Seguros",
        vehicle: "2022 BMW X3",
        policyNumber: "TRQ-2024-556677",
        annualPremium: "€890",
        coverage: "Comprehensive",
        drivers: ["Sarah Chen", "David Chen"]
      }
    ],

    // ALDR TRAVEL (Trip Planning, Bookings, Travel Experiences)
    travel: [
      {
        id: "sarah-london-jan2025",
        title: "McKinsey London Client Project",
        category: "business_travel",
        destination: "London, UK",
        dates: "2025-01-15 to 2025-01-18",
        purpose: "Financial Services Client Workshop",
        bookings: {
          flight: "TAP Air Portugal TP 1366",
          hotel: "The Langham London",
          transportation: "Uber for Business"
        },
        expenses: "€1,200 (company covered)",
        status: "Confirmed"
      },
      {
        id: "sarah-singapore-mar2025",
        title: "Singapore Client Engagement",
        category: "business_travel", 
        destination: "Singapore",
        dates: "2025-03-10 to 2025-03-17",
        purpose: "Digital Transformation Project",
        bookings: {
          flight: "Singapore Airlines SQ 359",
          hotel: "Marina Bay Sands",
          visa: "Not required (US passport)"
        },
        expenses: "€2,800 (company covered)",
        status: "Pending approval"
      },
      {
        id: "sarah-madrid-fertility",
        title: "Madrid Fertility Clinic Consultation",
        category: "medical_travel",
        destination: "Madrid, Spain",
        dates: "2025-02-08 to 2025-02-09",
        purpose: "IVF Consultation at IVI Madrid",
        bookings: {
          flight: "Iberia IB 3104",
          hotel: "Hotel Villa Magna",
          clinic: "IVI Madrid - Velázquez"
        },
        expenses: "€800 (personal)",
        travelWith: "David Chen"
      },
      {
        id: "sarah-porto-weekend",
        title: "Porto Weekend Getaway", 
        category: "personal_travel",
        destination: "Porto, Portugal",
        dates: "2025-01-25 to 2025-01-27",
        purpose: "Anniversary celebration",
        bookings: {
          train: "CP Alfa Pendular",
          hotel: "The Yeatman",
          activities: ["Port wine tasting", "Douro River cruise"]
        },
        expenses: "€650 (personal)",
        travelWith: "David Chen"
      },
      {
        id: "sarah-us-family-visit",
        title: "San Francisco Family Visit",
        category: "personal_travel",
        destination: "San Francisco, CA",
        dates: "2025-07-20 to 2025-08-05",
        purpose: "Visit parents and fertility specialist",
        bookings: {
          flight: "United Airlines UA 194",
          accommodation: "Parents' house",
          appointments: ["Dr. Sarah Kim - UCSF Fertility"]
        },
        expenses: "€1,500 (personal)",
        status: "Planning"
      },
      {
        id: "sarah-loyalty-programs",
        title: "Travel Loyalty Programs",
        category: "loyalty_programs",
        programs: [
          {
            airline: "TAP Air Portugal",
            program: "TAP Miles&Go",
            status: "Gold",
            miles: "45,000"
          },
          {
            airline: "Singapore Airlines",
            program: "KrisFlyer", 
            status: "Silver",
            miles: "28,000"
          },
          {
            hotel: "Marriott International",
            program: "Marriott Bonvoy",
            status: "Platinum Elite",
            points: "125,000"
          }
        ]
      }
    ],

    // ALDR MEMORIES (Photos, Journals, Personal Documentation)
    memories: [
      {
        id: "sarah-fertility-journey",
        title: "Fertility Journey Documentation",
        category: "personal_journey",
        startDate: "2023-06-01",
        description: "Documenting our path to parenthood across international healthcare systems",
        entries: [
          {
            date: "2023-06-15",
            location: "Lisbon",
            entry: "Started trying to conceive. Excited about this new chapter."
          },
          {
            date: "2023-12-10", 
            location: "Lisbon",
            entry: "6 months in. Decided to see a fertility specialist. Found great clinic in Lisbon."
          },
          {
            date: "2024-06-01",
            location: "Lisbon", 
            entry: "One year mark. Tests show everything normal. Exploring IVF options."
          },
          {
            date: "2024-12-01",
            location: "Lisbon",
            entry: "18 months. Planning IVF consultation in Madrid. Feeling hopeful."
          }
        ],
        photos: 15,
        documents: 8
      },
      {
        id: "sarah-career-milestones",
        title: "Professional Journey Memories",
        category: "career_achievements",
        milestones: [
          {
            date: "2018-06-01",
            achievement: "Graduated MBA from London Business School",
            location: "London, UK",
            photos: 25
          },
          {
            date: "2018-09-15",
            achievement: "Started at McKinsey Singapore office",
            location: "Singapore",
            photos: 12
          },
          {
            date: "2021-03-10",
            achievement: "Promoted to Senior Associate",
            location: "Singapore", 
            photos: 8
          },
          {
            date: "2023-01-15",
            achievement: "Transferred to McKinsey Portugal",
            location: "Lisbon",
            photos: 20
          }
        ]
      },
      {
        id: "sarah-wedding-memories",
        title: "Wedding Day - Singapore",
        category: "life_milestones",
        date: "2022-06-15",
        location: "Capella Singapore, Sentosa Island",
        description: "Our perfect day bringing together family from 3 continents",
        photos: 180,
        videos: 5,
        guestCount: 85,
        highlights: [
          "Morning tea ceremony with David's Chinese grandparents",
          "Sunset ceremony overlooking the South China Sea",
          "Reception dinner featuring both Western and Asian cuisine",
          "First dance to 'At Last' by Etta James"
        ]
      },
      {
        id: "sarah-travel-photography",
        title: "Global Adventures Photo Collection",
        category: "travel_memories",
        locations: [
          {
            country: "Portugal",
            photos: 145,
            highlights: ["Douro Valley", "Sintra castles", "Algarve beaches"]
          },
          {
            country: "Singapore", 
            photos: 230,
            highlights: ["Marina Bay skyline", "Hawker centers", "Botanical Gardens"]
          },
          {
            country: "UK",
            photos: 89,
            highlights: ["Lake District", "Scottish Highlands", "London neighborhoods"]
          },
          {
            country: "Spain",
            photos: 67,
            highlights: ["Barcelona architecture", "Andalusian villages", "Madrid museums"]
          }
        ],
        totalPhotos: 531
      },
      {
        id: "sarah-family-history",
        title: "Chen Family Heritage Project",
        category: "family_history",
        description: "Documenting our multicultural family story for future generations",
        branches: {
          maternal: "Irish-American lineage traced to County Cork",
          paternal: "Chinese heritage from Guangdong Province"
        },
        research: [
          "Immigration records from Angel Island (David's grandparents)",
          "Ellis Island records (Sarah's great-grandparents)",
          "Family recipes and traditions from both cultures",
          "Language preservation efforts (Mandarin and Gaelic)"
        ],
        interviews: 8,
        documents: 45,
        photos: 89
      }
    ],

    // ALDR LEARNING (Education, Certifications, Skill Development)
    learning: [
      {
        id: "sarah-portuguese-language",
        title: "Portuguese Language Certification",
        category: "language_learning",
        provider: "Instituto Camões",
        level: "B2 Intermediate",
        startDate: "2023-03-01",
        targetCompletion: "2025-06-30",
        hoursCompleted: 180,
        totalHours: 300,
        motivation: "Required for Portuguese permanent residency",
        progress: "60% complete"
      },
      {
        id: "sarah-fertility-education",
        title: "Fertility and Reproductive Health Course",
        category: "health_education",
        provider: "Harvard Medical School Online",
        duration: "12 weeks",
        completed: "2024-08-15",
        certificate: "Certificate in Reproductive Health",
        topics: ["IVF procedures", "Nutrition for fertility", "Stress management", "International fertility travel"],
        grade: "95%"
      },
      {
        id: "sarah-mba-london",
        title: "Master of Business Administration",
        category: "formal_education",
        institution: "London Business School",
        degree: "MBA",
        specialization: "Strategy and International Business",
        graduationDate: "2018-06-01",
        gpa: "3.8/4.0",
        thesis: "Digital Transformation in Emerging Markets",
        honors: "Dean's List 2017-2018"
      },
      {
        id: "sarah-consulting-certification",
        title: "Certified Management Consultant (CMC)",
        category: "professional_certification",
        issuingBody: "Institute of Management Consultants International",
        certificationDate: "2020-09-15",
        expiryDate: "2025-09-15",
        renewalRequirements: "40 CPD hours annually",
        status: "Active"
      },
      {
        id: "sarah-digital-transformation",
        title: "Digital Strategy Masterclass",
        category: "professional_development",
        provider: "INSEAD Executive Education",
        completed: "2024-03-20",
        duration: "5 days intensive",
        location: "Fontainebleau, France",
        certificate: "Digital Transformation Leadership",
        topics: ["AI in business", "Data analytics", "Change management"]
      },
      {
        id: "sarah-cross-cultural-communication",
        title: "Cross-Cultural Business Communication",
        category: "soft_skills",
        provider: "Cultural Detective Online",
        completed: "2023-11-10",
        modules: ["Asian business culture", "European workplace norms", "Virtual team management"],
        score: "92%",
        application: "Managing multicultural consulting teams"
      },
      {
        id: "sarah-financial-modeling",
        title: "Advanced Financial Modeling",
        category: "technical_skills",
        provider: "Wharton Executive Education",
        completed: "2021-05-20",
        format: "Online",
        duration: "8 weeks",
        certificate: "Financial Modeling and Valuation",
        skills: ["DCF modeling", "Scenario analysis", "Monte Carlo simulation"]
      },
      {
        id: "sarah-prenatal-preparation",
        title: "Prenatal Health and Preparation Course",
        category: "health_education",
        provider: "Hospital da Luz Lisboa",
        status: "Enrolled",
        startDate: "2025-02-01",
        duration: "6 weeks",
        topics: ["Pregnancy nutrition", "Birth preparation", "Newborn care", "Breastfeeding"],
        motivation: "Preparing for future pregnancy"
      }
    ]
  },

  // David Chen's Records  
  david: {
    // ALDR IDENTITY
    identity: [
      {
        id: "david-passport-canada",
        title: "Canadian Passport",
        category: "government_id",
        type: "passport",
        number: "CA987654321",
        issueDate: "2019-05-20",
        expiryDate: "2029-05-20",
        issuingCountry: "Canada",
        birthPlace: "Vancouver, BC",
        nationality: "Canadian"
      },
      {
        id: "david-personal-attributes",
        title: "Personal Health Profile",
        category: "personal_attributes",
        height: "6'0\" (183 cm)",
        weight: "175 lbs (79 kg)",
        bloodType: "A+",
        allergies: ["None known"],
        emergencyContact: {
          name: "Sarah Chen",
          relationship: "Spouse",
          phone: "+351 912 345 679"
        },
        medicalConditions: ["Lower back pain", "Mild myopia"]
      },
      {
        id: "david-drivers-license-pt",
        title: "Portuguese Driver's License",
        category: "government_id",
        type: "drivers_license", 
        number: "PT-567890123",
        issueDate: "2023-04-15",
        expiryDate: "2033-04-15",
        restrictions: "Corrective lenses required",
        exchangedFrom: "British Columbia Driver's License"
      },
      {
        id: "david-sin-canada",
        title: "Canadian Social Insurance Number",
        category: "government_id",
        number: "XXX-XXX-123",
        issueDate: "1987-02-10",
        status: "Active",
        workEligibility: "Canadian Citizen"
      }
    ],

    // ALDR LEGAL
    legal: [
      {
        id: "david-freelance-contracts",
        title: "Software Architecture Consulting Agreements",
        category: "employment_contracts",
        clients: [
          {
            company: "TechCorp Europe",
            contractValue: "€85,000 annually",
            services: "Distributed systems architecture",
            duration: "2023-01-01 to 2024-12-31"
          },
          {
            company: "FinTech Solutions Ltd",
            contractValue: "€45,000 project",
            services: "Cloud migration strategy",
            duration: "2024-06-01 to 2025-02-28"
          }
        ],
        totalIncome: "€130,000 annually",
        workArrangement: "Remote - Portuguese tax resident"
      },
      {
        id: "david-portugal-residence-dependent",
        title: "Portuguese Residence Permit (Dependent)",
        category: "immigration_documents",
        permitNumber: "PT-2023-556790",
        permitType: "Temporary Residence - Family Reunification",
        issueDate: "2023-03-15",
        expiryDate: "2028-03-15",
        primaryApplicant: "Sarah Chen",
        workAuthorization: "Unrestricted",
        status: "Active"
      },
      {
        id: "david-freelancer-insurance",
        title: "Professional Indemnity Insurance",
        category: "insurance_policies",
        provider: "Hiscox Portugal",
        policyNumber: "HIS-2024-889900",
        coverage: "€1,000,000",
        annualPremium: "€800",
        includes: ["Professional liability", "Cyber liability", "Legal defense costs"]
      },
      {
        id: "david-intellectual-property",
        title: "Software IP Portfolio",
        category: "intellectual_property",
        patents: [
          {
            title: "Distributed Cache Optimization System",
            number: "PT20240001234",
            status: "Filed",
            filingDate: "2024-03-15"
          }
        ],
        trademarks: [
          {
            name: "DataFlow Architect",
            number: "PT2024567890",
            class: "Computer software services",
            status: "Registered"
          }
        ]
      },
      {
        id: "david-equipment-insurance",
        title: "Home Office Equipment Insurance",
        category: "insurance_policies",
        provider: "Zurich Portugal",
        policyNumber: "ZUR-2024-445566",
        coverage: "€25,000",
        items: ["MacBook Pro", "Monitors", "Camera equipment", "Ergonomic furniture"],
        annualPremium: "€300"
      }
    ],

    // ALDR TRAVEL
    travel: [
      {
        id: "david-toronto-dec2024",
        title: "Toronto Family Christmas",
        category: "personal_travel",
        destination: "Toronto, Canada",
        dates: "2024-12-20 to 2025-01-05",
        purpose: "Family holiday visit",
        bookings: {
          flight: "Air Canada AC 4896",
          accommodation: "Parents' house",
          activities: ["Ice skating", "Niagara Falls", "CN Tower"]
        },
        expenses: "€1,200 (personal)",
        travelWith: "Sarah Chen"
      },
      {
        id: "david-berlin-conference",
        title: "DockerCon Europe 2025",
        category: "business_travel",
        destination: "Berlin, Germany", 
        dates: "2025-05-15 to 2025-05-18",
        purpose: "Technology conference - containerization trends",
        bookings: {
          flight: "Lufthansa LH 1154",
          hotel: "Hotel Adlon Kempinski",
          conference: "DockerCon Europe registration"
        },
        expenses: "€1,500 (business expense)",
        networking: "Meeting with European clients"
      },
      {
        id: "david-azores-photography",
        title: "Azores Photography Trip",
        category: "personal_travel",
        destination: "São Miguel, Azores",
        dates: "2025-04-10 to 2025-04-17",
        purpose: "Landscape photography project",
        bookings: {
          flight: "SATA Air Azores SP 4567",
          accommodation: "Rural photography lodge",
          equipment: "Professional camera gear rental"
        },
        expenses: "€900 (personal)",
        project: "Documenting Portuguese volcanic landscapes"
      },
      {
        id: "david-valencia-client",
        title: "Valencia Client Workshop",
        category: "business_travel",
        destination: "Valencia, Spain",
        dates: "2025-03-22 to 2025-03-24",
        purpose: "FinTech Solutions architecture review",
        bookings: {
          train: "Renfe AVE high-speed rail",
          hotel: "Hotel Caro",
          meetings: "Client office + team dinner"
        },
        expenses: "€650 (client billable)"
      }
    ],

    // ALDR MEMORIES
    memories: [
      {
        id: "david-photography-portfolio",
        title: "Professional Photography Collection",
        category: "creative_projects",
        genres: [
          {
            type: "Landscape",
            photos: 1200,
            locations: ["Portugal", "Singapore", "Canada", "UK"],
            equipment: "Canon R5 + 24-70mm f/2.8"
          },
          {
            type: "Street Photography",
            photos: 800,
            cities: ["Lisbon", "Singapore", "Vancouver", "London"],
            style: "Documentary"
          },
          {
            type: "Architecture",
            photos: 450,
            focus: ["Modern buildings", "Historic structures", "Urban planning"],
            awards: ["Lisbon Architecture Photography Contest - 2nd place"]
          }
        ],
        exhibitions: 3,
        sales: "€2,400 in print sales (2024)"
      },
      {
        id: "david-coding-achievements",
        title: "Software Development Milestones",
        category: "career_achievements", 
        projects: [
          {
            name: "Distributed Cache System",
            year: "2024",
            impact: "Improved performance by 300% for 50M+ users",
            technology: ["Go", "Redis", "Kubernetes"],
            recognition: "Tech Lead of the Year - TechCorp"
          },
          {
            name: "Open Source Contributions",
            ongoing: true,
            repositories: ["kubernetes/kubernetes", "docker/docker", "prometheus/prometheus"],
            contributions: 150,
            stars: "5,000+ combined"
          },
          {
            name: "Technical Blog",
            platform: "Medium + personal blog",
            articles: 45,
            followers: "12,000",
            topArticle: "Building Resilient Microservices - 50K views"
          }
        ]
      },
      {
        id: "david-sarah-relationship",
        title: "Our Love Story Documentation",
        category: "relationship_memories",
        timeline: [
          {
            date: "2019-09-15",
            event: "First met at Singapore expat networking event",
            location: "Clarke Quay, Singapore",
            photos: 5
          },
          {
            date: "2019-12-31",
            event: "First New Year's together",
            location: "Marina Bay, Singapore",
            photos: 15
          },
          {
            date: "2021-02-14",
            event: "Moved in together",
            location: "Orchard Road apartment, Singapore",
            photos: 25
          },
          {
            date: "2021-11-20",
            event: "Proposal at Sentosa sunset",
            location: "Palawan Beach, Singapore",
            photos: 30,
            video: "Proposal captured by hired photographer"
          }
        ]
      },
      {
        id: "david-remote-work-setup",
        title: "Home Office Evolution",
        category: "lifestyle_documentation",
        phases: [
          {
            period: "2020-2021",
            location: "Singapore apartment",
            setup: "Basic desk in bedroom",
            challenges: "No dedicated space"
          },
          {
            period: "2021-2023", 
            location: "Singapore 2-bedroom apartment",
            setup: "Dedicated office room",
            equipment: "Standing desk, dual monitors"
          },
          {
            period: "2023-present",
            location: "Lisbon apartment",
            setup: "Ergonomic office with view",
            equipment: "Premium setup for video calls",
            backPain: "Documented improvements with ergonomic furniture"
          }
        ],
        photos: 45,
        timelapseVideos: 3
      },
      {
        id: "david-supporting-sarah",
        title: "Fertility Journey Support Documentation",
        category: "personal_growth",
        description: "My role in supporting Sarah through our fertility journey",
        learning: [
          "Male fertility education and testing",
          "Emotional support techniques",
          "International fertility clinic research",
          "Managing work travel around treatment schedules"
        ],
        appointments: 12,
        journalEntries: 25,
        reflection: "Growing stronger as a couple through challenges"
      }
    ],

    // ALDR LEARNING
    learning: [
      {
        id: "david-kubernetes-certification", 
        title: "Certified Kubernetes Administrator (CKA)",
        category: "technical_certification",
        provider: "Cloud Native Computing Foundation",
        certificationDate: "2024-07-15",
        expiryDate: "2027-07-15",
        score: "89%",
        validationCode: "CKA-2024-789012",
        renewalRequirements: "Re-certification every 3 years"
      },
      {
        id: "david-portuguese-business",
        title: "Portuguese for Business Professionals",
        category: "language_learning",
        provider: "Berlitz Portugal",
        level: "B1 Intermediate",
        startDate: "2023-04-01",
        progress: "70% complete",
        hoursCompleted: 120,
        totalHours: 180,
        motivation: "Client communication and residency requirements"
      },
      {
        id: "david-computer-science-degree",
        title: "Bachelor of Computer Science",
        category: "formal_education",
        institution: "University of British Columbia",
        degree: "BSc Computer Science",
        specialization: "Distributed Systems",
        graduationDate: "2010-05-15",
        gpa: "3.7/4.0",
        thesis: "Scalable Database Sharding Strategies",
        relevantCourses: ["Algorithms", "Database Systems", "Networks", "Software Engineering"]
      },
      {
        id: "david-aws-solutions-architect",
        title: "AWS Certified Solutions Architect",
        category: "technical_certification",
        provider: "Amazon Web Services",
        level: "Professional",
        certificationDate: "2023-09-20",
        expiryDate: "2026-09-20",
        validationCode: "AWS-SAP-567890",
        preparationHours: 80,
        score: "91%"
      },
      {
        id: "david-photography-masterclass",
        title: "Advanced Landscape Photography",
        category: "creative_skills",
        provider: "Marc Adamus Photography Workshops",
        completed: "2024-06-10",
        location: "Iceland",
        duration: "7-day intensive workshop",
        techniques: ["Long exposure", "Focus stacking", "HDR processing", "Composition"],
        equipment: "Canon R5 + professional lenses"
      },
      {
        id: "david-ergonomics-course",
        title: "Workplace Ergonomics and Back Health",
        category: "health_education",
        provider: "Portuguese Physiotherapy Association",
        completed: "2024-04-25",
        format: "Online + practical sessions",
        motivation: "Managing back pain from remote work",
        certificate: "Ergonomic Workspace Design",
        implementation: "Applied to home office setup"
      },
      {
        id: "david-fertility-support-education",
        title: "Male Partner Support in Fertility Journey",
        category: "health_education",
        provider: "Resolve National Infertility Association",
        completed: "2024-02-14",
        format: "Online course + support groups",
        topics: ["Male fertility factors", "Emotional support", "Communication techniques", "Stress management"],
        motivation: "Supporting Sarah through IVF process"
      },
      {
        id: "david-go-programming-advanced",
        title: "Advanced Go Programming Patterns",
        category: "technical_skills",
        provider: "Ardan Labs",
        completed: "2024-01-20",
        duration: "4-day intensive",
        location: "Remote",
        topics: ["Concurrency patterns", "Memory optimization", "Performance tuning", "Testing strategies"],
        application: "Applied to TechCorp distributed systems"
      }
    ]
  },

  // Family Toggle Data (Shared/Connected Items)
  familyMode: {
    sharedDocuments: [
      {
        id: "joint-apartment-lease",
        title: "Lisbon Apartment Lease (Joint)",
        vault: "legal",
        owners: ["sarah", "david"],
        category: "property_agreements"
      },
      {
        id: "joint-fertility-plan",
        title: "Fertility Treatment Plan",
        vault: "health", 
        owners: ["sarah", "david"],
        category: "medical_plans"
      },
      {
        id: "joint-travel-insurance",
        title: "Family Travel Insurance",
        vault: "legal",
        owners: ["sarah", "david"],
        category: "insurance_policies"
      }
    ],
    
    crossVaultConnections: [
      {
        title: "Madrid Fertility Trip Coordination",
        connections: [
          { vault: "travel", item: "sarah-madrid-fertility", owner: "sarah" },
          { vault: "legal", item: "sarah-health-insurance", owner: "sarah" },
          { vault: "learning", item: "david-fertility-support-education", owner: "david" },
          { vault: "memories", item: "david-supporting-sarah", owner: "david" }
        ],
        description: "All aspects of coordinated fertility treatment in Madrid"
      },
      {
        title: "Portugal Residency Requirements", 
        connections: [
          { vault: "legal", item: "sarah-portugal-residence", owner: "sarah" },
          { vault: "legal", item: "david-portugal-residence-dependent", owner: "david" },
          { vault: "learning", item: "sarah-portuguese-language", owner: "sarah" },
          { vault: "learning", item: "david-portuguese-business", owner: "david" }
        ],
        description: "Coordinated effort for Portuguese permanent residency"
      },
      {
        title: "Work-Life Balance During Travel",
        connections: [
          { vault: "travel", item: "sarah-london-jan2025", owner: "sarah" },
          { vault: "travel", item: "david-berlin-conference", owner: "david" },
          { vault: "memories", item: "david-remote-work-setup", owner: "david" },
          { vault: "learning", item: "david-ergonomics-course", owner: "david" }
        ],
        description: "Managing dual careers with international travel"
      }
    ],

    familyCalendar: [
      {
        date: "2025-01-15",
        event: "Sarah's London business trip",
        impact: "David home alone, good for focused work",
        vault: "travel"
      },
      {
        date: "2025-02-08", 
        event: "Madrid fertility consultation",
        impact: "Both travel together, work schedules adjusted",
        vault: "travel"
      },
      {
        date: "2025-03-10",
        event: "Sarah's Singapore trip",
        impact: "David manages Portugal residence paperwork alone",
        vault: "travel"
      },
      {
        date: "2025-05-15",
        event: "David's Berlin conference", 
        impact: "Sarah handles fertility follow-up appointments",
        vault: "travel"
      }
    ]
  }
};

export default chenFamilyData;