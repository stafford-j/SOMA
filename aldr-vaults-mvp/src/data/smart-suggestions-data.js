// Smart Suggestions Data - Comprehensive Mock Data for Demo
export const smartSuggestionsData = {
  reminders: [
    {
      id: 'property-insurance-1',
      title: 'Property Insurance Renewal',
      dueDate: '2025-06-15',
      urgency: 'red', // Due Soon
      cost: '€890',
      vault: 'legal',
      vaultName: 'Aldr Legal',
      description: 'Annual property insurance renewal due',
      fullDocument: {
        type: 'Property Insurance Policy',
        policyNumber: 'FID-2024-8834729',
        provider: 'Fidelidade Seguros',
        propertyAddress: 'Villa with Sea View, Lagos, Algarve, Portugal',
        coverage: {
          building: '€520,000',
          contents: '€85,000',
          liability: '€2,000,000'
        },
        currentPremium: '€890',
        paymentHistory: [
          { year: 2024, cost: '€890' },
          { year: 2023, cost: '€845' },
          { year: 2022, cost: '€798' },
          { year: 2021, cost: '€756' }
        ],
        renewalTerms: 'Annual renewal with 30-day notice period',
        keyContacts: {
          agent: 'João Silva',
          phone: '+351 282 123 456',
          email: 'joao.silva@fidelidade.pt'
        },
        documents: ['Policy Certificate', 'Premium Schedule', 'Terms & Conditions']
      }
    },
    {
      id: 'will-review-1',
      title: 'Will Review Recommended',
      dueDate: '2025-07-15',
      urgency: 'amber', // Due Later
      vault: 'legal',
      vaultName: 'Aldr Legal',
      description: 'Annual will review and potential amendments',
      crossVaultConnections: [
        {
          targetVault: 'memoirs',
          targetVaultName: 'Aldr Memoirs',
          connection: 'Digital legacy planning may need updates',
          description: 'Recent family photos and journals may affect inheritance wishes'
        }
      ],
      fullDocument: {
        type: 'Last Will and Testament',
        dateCreated: '2022-03-15',
        lastReviewed: '2024-07-15',
        solicitor: 'Murphy & Associates Solicitors',
        witnessDetails: {
          witness1: 'Michael O\'Sullivan',
          witness2: 'Claire Murphy'
        },
        executors: ['Peter Murphy', 'Claire Murphy'],
        beneficiaries: [
          { name: 'Claire Murphy', relationship: 'Spouse', allocation: '60%' },
          { name: 'Ruby Murphy', relationship: 'Daughter', allocation: '20%' },
          { name: 'Riley Murphy', relationship: 'Child', allocation: '20%' }
        ],
        assets: {
          property: 'Primary residence in Lagos, Algarve, Portugal',
          investments: 'Investment portfolio managed by BPI Private Banking',
          personalEffects: 'Jewelry, artwork, personal collections'
        },
        amendments: [
          {
            date: '2024-07-15',
            change: 'Updated investment portfolio allocation',
            reason: 'Portfolio restructuring'
          }
        ],
        nextReviewDue: '2025-07-15',
        documents: ['Original Will', 'Codicil Amendment 2024', 'Probate Instructions']
      }
    },
    {
      id: 'company-annual-filing-1',
      title: 'Aldr Vaults Annual Company Filing',
      dueDate: '2025-05-31',
      urgency: 'green', // Future
      vault: 'legal',
      vaultName: 'Aldr Legal',
      description: 'Annual corporate tax return and company filing due',
      fullDocument: {
        type: 'Corporate Tax Return',
        company: 'Aldr Vaults, Lda',
        nipc: 'PT-515-789-456',
        taxYear: '2024',
        filingDeadline: '2025-05-31',
        revenue: {
          current: '€180,000',
          history: [
            { period: '2024', amount: '€180,000' },
            { period: '2023', amount: '€95,000' }
          ]
        },
        obligations: {
          corporateTax: 'Annual return due May 31',
          vatFiling: 'Quarterly filing required',
          socialSecurity: 'Monthly contributions for employees',
          accountingRecords: 'Mandatory accounting books maintained'
        },
        taxOptimization: {
          location: 'Portuguese tech startup benefits',
          deductions: 'R&D tax credits available',
          internationalTreaties: 'Double taxation treaties with Ireland'
        },
        documents: ['Annual Accounts', 'Tax Calculation', 'VAT Returns', 'Corporate Book']
      }
    },
    {
      id: 'passport-renewal-1',
      title: 'Passport Renewal Required',
      dueDate: '2025-08-30',
      urgency: 'amber',
      vault: 'identity',
      vaultName: 'Aldr Identity',
      description: 'Irish passport expires in 6 months',
      crossVaultConnections: [
        {
          targetVault: 'travel',
          targetVaultName: 'Aldr Travel',
          connection: 'Upcoming trips may be affected',
          description: 'Business travel to London scheduled for September 2025'
        }
      ],
      fullDocument: {
        type: 'Irish Passport',
        passportNumber: 'P1234567',
        issueDate: '2015-09-01',
        expiryDate: '2025-08-30',
        issuingOffice: 'Dublin Passport Office',
        emergencyContact: {
          name: 'Claire Murphy',
          relationship: 'Spouse',
          phone: '+353 87 123 4567'
        },
        renewalProcess: {
          application: 'Online application available at dfa.ie',
          documents: ['Current passport', 'Passport photos', 'Application form'],
          fees: '€75 for standard service',
          processingTime: '10-15 working days',
          expeditedService: '€200 for 5-day service'
        },
        travelHistory: [
          { destination: 'London, UK', dates: '2024-03-15 to 2024-03-18' },
          { destination: 'Paris, France', dates: '2023-11-20 to 2023-11-25' },
          { destination: 'Berlin, Germany', dates: '2023-06-10 to 2023-06-14' }
        ]
      }
    },
    {
      id: 'visa-renewal-1',
      title: 'US Visa Renewal',
      dueDate: '2025-09-15',
      urgency: 'amber',
      vault: 'travel',
      vaultName: 'Aldr Travel',
      description: 'US B1/B2 visa expires soon',
      cost: '$185',
      fullDocument: {
        type: 'US B1/B2 Visa',
        visaNumber: 'US-B1B2-789012',
        issueDate: '2020-09-15',
        expiryDate: '2025-09-14',
        issuingConsulate: 'US Embassy Dublin',
        visaClass: 'B1/B2 (Business/Tourism)',
        entries: 'Multiple',
        validity: '5 years',
        renewalRequirements: {
          application: 'DS-160 Online Form',
          interview: 'Required for first-time applicants',
          fees: '$185 application fee + $10 photo fee',
          documents: ['Valid passport', 'Previous visa', 'Travel itinerary'],
          processingTime: '3-5 weeks'
        },
        travelHistory: [
          { destination: 'New York, USA', dates: '2024-05-10 to 2024-05-17', purpose: 'Business' },
          { destination: 'San Francisco, USA', dates: '2023-09-05 to 2023-09-12', purpose: 'Conference' }
        ]
      }
    },
    {
      id: 'health-insurance-1',
      title: 'Health Insurance Review',
      dueDate: '2025-12-01',
      urgency: 'green',
      vault: 'health',
      vaultName: 'Aldr Health',
      description: 'Annual health insurance plan review',
      cost: '€1,350',
      fullDocument: {
        type: 'Portuguese Health Insurance Policy',
        provider: 'Médis - Companhia Portuguesa de Seguros de Saúde',
        planName: 'Médis Mais Saúde Premium',
        policyNumber: 'MED-PT-456789',
        coverage: {
          hospitalBenefit: 'Private room, specialist fees covered',
          outpatient: '€150 per visit specialist consultation',
          dental: 'Annual checkup, basic treatments covered',
          optical: '€100 towards eye tests and glasses',
          internationalCoverage: 'EU and worldwide emergency coverage'
        },
        annualPremium: '€1,350',
        paymentSchedule: 'Monthly direct debit €112.50',
        coverageHistory: [
          { year: 2024, premium: '€1,350', claims: '€485' },
          { year: 2023, premium: '€1,280', claims: '€220' }
        ],
        dependents: [
          { name: 'Claire Murphy', relationship: 'Spouse' },
          { name: 'Ruby Murphy', relationship: 'Daughter' },
          { name: 'Riley Murphy', relationship: 'Child' }
        ]
      }
    },
    {
      id: 'car-insurance-1',
      title: 'Car Insurance Renewal',
      dueDate: '2025-10-20',
      urgency: 'green',
      vault: 'legal',
      vaultName: 'Aldr Legal',
      description: 'Annual car insurance renewal',
      cost: '€720',
      fullDocument: {
        type: 'Motor Insurance Policy',
        provider: 'Tranquilidade Seguros',
        policyNumber: 'TRQ-MOT-456789',
        vehicle: {
          make: 'BMW',
          model: '320d',
          year: '2022',
          registration: '12-34-AB',
          value: '€35,000'
        },
        coverage: {
          type: 'Comprehensive (Todo o Risco)',
          excess: '€200',
          breakdown: 'ACP Roadside Assistance included',
          europeanCover: 'Full EU coverage included',
          greenCard: 'International travel coverage'
        },
        annualPremium: '€720',
        noClaims: '5 years protected',
        drivers: [
          { name: 'Peter Murphy', license: 'Irish + Portuguese Exchange', years: '12' },
          { name: 'Claire Murphy', license: 'Irish + Portuguese Exchange', years: '8' }
        ]
      }
    },
    {
      id: 'family-tree-update-1',
      title: 'Family Tree Documentation',
      dueDate: '2025-12-25',
      urgency: 'green',
      vault: 'memoirs',
      vaultName: 'Aldr Memoirs',
      description: 'Annual family history update for Christmas',
      crossVaultConnections: [
        {
          targetVault: 'legal',
          targetVaultName: 'Aldr Legal',
          connection: 'Will beneficiaries may need updates',
          description: 'New family members or changed relationships could affect inheritance planning'
        }
      ],
      fullDocument: {
        type: 'Family Tree Documentation',
        lastUpdated: '2024-12-25',
        branches: {
          maternal: 'O\'Brien family lineage traced to 1890',
          paternal: 'Stafford family records from County Cork'
        },
        recentAdditions: [
          { name: 'Baby O\'Brien', relationship: 'Great-nephew', born: '2024-08-15' },
          { event: 'Cousin Mary married John Sullivan', date: '2024-06-20' }
        ],
        sources: [
          'Irish Census Records 1901, 1911',
          'Church registers St. Patrick\'s Cathedral',
          'Immigration records Ellis Island'
        ],
        digitizationProgress: {
          photos: '85% of family photos scanned',
          documents: 'Birth/death certificates digitized',
          stories: '12 oral history recordings completed'
        }
      }
    },
    {
      id: 'certification-renewal-1',
      title: 'Professional Certification Renewal',
      dueDate: '2025-06-30',
      urgency: 'red',
      vault: 'learning',
      vaultName: 'Aldr Learning',
      description: 'AWS Solutions Architect certification expires',
      cost: '$300',
      fullDocument: {
        type: 'Professional Certification',
        certification: 'AWS Certified Solutions Architect - Professional',
        certificationId: 'AWS-SAP-789012',
        issueDate: '2022-07-01',
        expiryDate: '2025-06-30',
        validationUrl: 'aws.amazon.com/verification',
        renewalRequirements: {
          continuingEducation: '120 hours of AWS training',
          exam: 'SAP-C02 recertification exam',
          cost: '$300 exam fee',
          studyMaterials: 'AWS official training courses, practice exams'
        },
        relatedCertifications: [
          { name: 'AWS Developer Associate', status: 'Current', expires: '2026-03-15' },
          { name: 'AWS SysOps Associate', status: 'Current', expires: '2025-11-20' }
        ],
        careerImpact: {
          salaryIncrease: '€5,000 annual increase with certification',
          projectOpportunities: 'Cloud migration and architecture projects',
          industryRecognition: 'Top 5% of AWS certified professionals in Ireland'
        }
      }
    },
    {
      id: 'mortgage-review-1',
      title: 'Mortgage Rate Review',
      dueDate: '2025-08-01',
      urgency: 'amber',
      vault: 'legal',
      vaultName: 'Aldr Legal',
      description: 'Fixed rate period ending - review required',
      cost: '€1,620/month',
      fullDocument: {
        type: 'Portuguese Mortgage Agreement',
        lender: 'Banco Português de Investimento',
        accountNumber: 'BPI-MORT-567890',
        property: 'Villa with Sea View, Lagos, Algarve, Portugal',
        originalAmount: '€485,000',
        currentBalance: '€220,000',
        currentRate: '2.8% fixed until 2025-07-31',
        monthlyPayment: '€1,620',
        term: '18 years remaining',
        rateOptions: {
          variableRate: '3.9% (current)',
          fixedRates: [
            { term: '1 year', rate: '3.1%' },
            { term: '3 years', rate: '3.3%' },
            { term: '5 years', rate: '3.5%' }
          ]
        },
        paymentHistory: {
          totalPaid: '€265,000',
          onTimePayments: '100% (72/72 payments)',
          overpayments: '€0 additional principal'
        }
      }
    }
  ],

  crossVaultIntelligence: [
    {
      id: 'will-to-memoirs',
      sourceVault: 'legal',
      targetVault: 'memoirs',
      connection: 'Will amendments may need updates based on family tree changes',
      priority: 'medium',
      details: 'Recent family additions documented in Aldr Memoirs may affect inheritance wishes'
    },
    {
      id: 'passport-to-travel',
      sourceVault: 'identity',
      targetVault: 'travel',
      connection: 'Passport renewal affects upcoming travel plans',
      priority: 'high',
      details: 'Business travel booked for September 2025 requires valid passport'
    },
    {
      id: 'insurance-to-legal',
      sourceVault: 'legal',
      targetVault: 'legal',
      connection: 'Property insurance renewal may require policy review',
      priority: 'low',
      details: 'Updated property valuations may require coverage adjustments'
    },
    {
      id: 'certification-to-employment',
      sourceVault: 'learning',
      targetVault: 'legal',
      connection: 'Professional certification affects employment contract value',
      priority: 'medium',
      details: 'AWS certification renewal supports salary negotiation for contract renewal'
    }
  ],

  vaultSpecificReminders: {
    identity: [
      {
        id: 'passport-renewal-1',
        title: 'Passport Renewal Required',
        dueDate: '2025-08-30',
        urgency: 'amber'
      },
      {
        id: 'driving-license-1',
        title: 'Driving License Renewal',
        dueDate: '2026-03-15',
        urgency: 'green'
      },
      {
        id: 'pps-update-1',
        title: 'PPS Number Address Update',
        dueDate: '2025-07-01',
        urgency: 'green'
      }
    ],
    health: [
      {
        id: 'health-insurance-1',
        title: 'Health Insurance Review',
        dueDate: '2025-12-01',
        urgency: 'green'
      },
      {
        id: 'annual-checkup-1',
        title: 'Annual Health Checkup',
        dueDate: '2025-09-15',
        urgency: 'amber'
      },
      {
        id: 'dental-checkup-1',
        title: 'Dental Cleaning Appointment',
        dueDate: '2025-07-20',
        urgency: 'green'
      }
    ],
    legal: [
      {
        id: 'property-insurance-1',
        title: 'Property Insurance Renewal',
        dueDate: '2025-06-15',
        urgency: 'red'
      },
      {
        id: 'will-review-1',
        title: 'Will Review Recommended',
        dueDate: '2025-07-15',
        urgency: 'amber'
      },
      {
        id: 'employment-contract-1',
        title: 'Employment Contract Renewal',
        dueDate: '2025-11-01',
        urgency: 'green'
      }
    ],
    travel: [
      {
        id: 'visa-renewal-1',
        title: 'US Visa Renewal',
        dueDate: '2025-09-15',
        urgency: 'amber'
      },
      {
        id: 'travel-insurance-1',
        title: 'Annual Travel Insurance',
        dueDate: '2025-10-01',
        urgency: 'green'
      },
      {
        id: 'flight-booking-1',
        title: 'Business Trip to London',
        dueDate: '2025-09-05',
        urgency: 'green'
      }
    ],
    memoirs: [
      {
        id: 'family-tree-update-1',
        title: 'Family Tree Documentation',
        dueDate: '2025-12-25',
        urgency: 'green'
      },
      {
        id: 'photo-digitization-1',
        title: 'Photo Digitization Project',
        dueDate: '2025-08-01',
        urgency: 'green'
      },
      {
        id: 'oral-history-1',
        title: 'Grandparent Interview Recording',
        dueDate: '2025-09-01',
        urgency: 'amber'
      }
    ],
    learning: [
      {
        id: 'certification-renewal-1',
        title: 'AWS Certification Renewal',
        dueDate: '2025-06-30',
        urgency: 'red'
      },
      {
        id: 'continuing-education-1',
        title: 'Complete Cloud Architecture Course',
        dueDate: '2025-08-15',
        urgency: 'amber'
      },
      {
        id: 'conference-registration-1',
        title: 'AWS re:Invent Registration',
        dueDate: '2025-07-31',
        urgency: 'green'
      }
    ]
  }
};

export default smartSuggestionsData;