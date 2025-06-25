/**
 * Sample Legal Records Data
 * 
 * This file contains demonstration data for the Aldr Legal Companion,
 * with realistic legal documents spanning multiple categories.
 * Each record includes:
 * - Basic information (id, title, category, type, date, description)
 * - Document details
 * - Expiration tracking where applicable
 * 
 * Note: This is mock data for demonstration purposes only.
 */

export const sampleLegalRecords = [
  {
    "id": "legal-001",
    "title": "Last Will and Testament",
    "category": "estate_planning",
    "recordType": "will",
    "date": "2022-03-15",
    "description": "Complete will and testament document with executor designation and asset distribution",
    "provider": "Murphy & Associates Solicitors",
    "location": "Dublin, Ireland",
    "expirationDate": null,
    "status": "current",
    "details": {
      "executor": "Peter Murphy",
      "coExecutor": "Claire Murphy", 
      "witnesses": ["Michael O'Sullivan", "Sarah O'Brien"],
      "notarized": true,
      "lastUpdated": "2024-07-15",
      "beneficiaries": [
        {"name": "Claire Murphy", "relationship": "Spouse", "allocation": "60%"},
        {"name": "Ruby Murphy", "relationship": "Daughter", "allocation": "20%"},
        {"name": "Riley Murphy", "relationship": "Child", "allocation": "20%"}
      ]
    },
    "insights": {
      "legal": {
        "summary": "Will is current and properly executed with valid witnesses. Recent amendment updated investment portfolio allocation.",
        "recommendations": [
          "Annual review due July 2025",
          "Consider impact of recent family additions documented in Aldr Memoirs",
          "Digital legacy planning may need updates based on memoir documentation"
        ],
        "sources": ["Irish Law Society Estate Planning Guidelines"]
      }
    }
  },
  {
    "id": "legal-002",
    "title": "Property Deed - Primary Residence",
    "category": "property",
    "recordType": "property_deed",
    "date": "2019-08-10",
    "description": "Property deed for residence in Lagos, Portugal",
    "provider": "Banco Português de Investimento",
    "location": "Lagos, Algarve, Portugal",
    "expirationDate": null,
    "status": "current",
    "details": {
      "propertyType": "Villa with Sea View",
      "purchasePrice": "€485,000",
      "currentValue": "€520,000",
      "mortgageNumber": "BPI-MORT-567890",
      "currentBalance": "€220,000",
      "predialUrbano": "LGS-2019-4456",
      "imt": "€19,400"
    },
    "insights": {
      "legal": {
        "summary": "Property deed is current and mortgage is in good standing. Portuguese tax obligations up to date.",
        "recommendations": [
          "Fixed rate period ending - review mortgage options by August 2025",
          "Property insurance renewal due June 2025 (Fidelidade Seguros)",
          "Annual IMI property tax due December 2025 (€892)",
          "Consider overpayment opportunities with current €1,620 monthly payment"
        ],
        "sources": ["Instituto dos Registos e do Notariado", "Autoridade Tributária"]
      }
    }
  },
  {
    "id": "legal-003",
    "title": "Life Insurance Policy",
    "category": "personal_legal",
    "recordType": "insurance_policy",
    "date": "2023-01-15",
    "description": "Term life insurance policy - €500,000 coverage",
    "provider": "Irish Life",
    "location": "Policy #: IL-2023-4429847",
    "expirationDate": "2033-01-15",
    "status": "active",
    "details": {
      "coverage": "€500,000",
      "beneficiary": "Claire Murphy",
      "premium": "€55/month",
      "termLength": "10 years",
      "medicalExam": "Completed 2023-01-10"
    },
    "insights": {
      "legal": {
        "summary": "Policy is active with adequate coverage for current needs. Premium reflects Irish life expectancy rates.",
        "recommendations": [
          "Review coverage after major life events",
          "Consider term renewal vs conversion options before 2033 expiry",
          "Coordinate with VHI health insurance for potential premium discounts"
        ],
        "sources": ["Insurance Ireland", "Central Bank of Ireland"]
      }
    }
  },
  {
    "id": "legal-004",
    "title": "Portuguese Residence Permit",
    "category": "personal_legal",
    "recordType": "residence_permit",
    "date": "2023-06-15",
    "description": "Temporary residence permit for Portugal (5-year renewable)",
    "provider": "SEF - Serviço de Estrangeiros e Fronteiras",
    "location": "Lagos, Portugal",
    "expirationDate": "2028-06-15",
    "status": "current",
    "details": {
      "permitNumber": "PT-2023-445678",
      "permitType": "Temporary Residence - EU Citizen",
      "renewalRequired": "2028-06-15",
      "workAuthorization": "Unrestricted",
      "familyMembers": ["Claire Murphy", "Ruby Murphy", "Riley Murphy"]
    },
    "insights": {
      "legal": {
        "summary": "Residence permit valid for 5 years. Renewal process begins 3 months before expiry.",
        "recommendations": [
          "Begin renewal process by March 2028",
          "Maintain continuous residence for citizenship eligibility",
          "Keep Portuguese tax obligations current for renewal",
          "Consider permanent residence application after 5 years"
        ],
        "sources": ["SEF Portugal", "Portuguese Immigration Law"]
      }
    }
  },
  {
    "id": "legal-005",
    "title": "Portuguese Property Insurance",
    "category": "property",
    "recordType": "insurance_policy",
    "date": "2024-09-01",
    "description": "Home insurance policy for Lagos residence",
    "provider": "Fidelidade Seguros",
    "location": "Policy #: FID-2024-8834729",
    "expirationDate": "2025-09-01",
    "status": "active",
    "details": {
      "coverage": "€520,000 dwelling, €85,000 contents",
      "deductible": "€750",
      "premium": "€890/year",
      "specialRiders": ["Home Office Equipment", "Sea View Property Coverage"],
      "earthquakeRider": "€25,000 coverage"
    },
    "insights": {
      "legal": {
        "summary": "Insurance coverage matches current property value. Portuguese requirements met.",
        "recommendations": [
          "Review coverage annually before September renewal",
          "Consider increasing contents coverage for tech equipment",
          "Earthquake coverage adequate for Algarve region"
        ],
        "sources": ["Autoridade de Supervisão de Seguros", "Portuguese Insurance Law"]
      }
    }
  },
  {
    "id": "legal-006",
    "title": "Irish Birth Certificate",
    "category": "personal_legal",
    "recordType": "birth_certificate",
    "date": "1984-08-15",
    "description": "Official birth certificate - Republic of Ireland",
    "provider": "General Register Office",
    "location": "Dublin, Ireland",
    "expirationDate": null,
    "status": "current",
    "details": {
      "registrationNumber": "IE-1984-449832",
      "placeOfBirth": "National Maternity Hospital, Dublin",
      "certifiedCopy": true,
      "issueDate": "2022-03-10",
      "apostilleAvailable": true
    },
    "insights": {
      "legal": {
        "summary": "Irish birth certificate is valid for all international legal purposes. Apostille available for Portuguese documentation.",
        "recommendations": [
          "Keep certified copy in secure location",
          "Apostille copy useful for Portuguese legal matters",
          "Required for Portuguese permanent residence application"
        ],
        "sources": ["Department of Social Protection Ireland"]
      }
    }
  },
  {
    "id": "legal-007",
    "title": "Aldr Vaults - Company Formation",
    "category": "business",
    "recordType": "company_formation",
    "date": "2024-01-15",
    "description": "Portuguese company formation documents for Aldr Vaults, Lda",
    "provider": "Casa do Notário Lagos",
    "location": "Lagos, Portugal",
    "expirationDate": null,
    "status": "active",
    "details": {
      "companyName": "Aldr Vaults, Lda",
      "nipc": "PT-515-789-456",
      "registrationNumber": "PT-LGS-2024-1567",
      "authorizedCapital": "€50,000",
      "businessActivity": "Software Development and Data Management Services",
      "taxObligation": "Quarterly VAT and annual corporate tax"
    },
    "insights": {
      "legal": {
        "summary": "Company legally established in Portugal. All registration requirements complete.",
        "recommendations": [
          "Quarterly VAT filing due March 31, 2025",
          "Annual corporate tax return due May 31, 2025",
          "Consider Portuguese tax advisor for ongoing compliance",
          "Maintain proper accounting records for Portuguese authorities"
        ],
        "sources": ["Registo Nacional de Pessoas Coletivas", "Autoridade Tributária"]
      }
    }
  },
  {
    "id": "legal-008",
    "title": "Portuguese Tax Number (NIF)",
    "category": "personal_legal",
    "recordType": "tax_document",
    "date": "2023-05-20",
    "description": "Portuguese tax identification number for residents",
    "provider": "Finanças - Autoridade Tributária",
    "location": "Lagos, Portugal",
    "expirationDate": null,
    "status": "current",
    "details": {
      "nif": "245-789-456",
      "taxStatus": "Portuguese Tax Resident",
      "filingObligation": "Annual IRS return due May 31",
      "category": "Category A - Employment and Self-Employment"
    },
    "insights": {
      "legal": {
        "summary": "Portuguese tax residency established. Annual filing obligations current.",
        "recommendations": [
          "Annual IRS return due May 31, 2025",
          "Consider Portuguese tax advisor for complex international income",
          "Maintain records of all international income sources",
          "Review double taxation treaties for optimization"
        ],
        "sources": ["Autoridade Tributária e Aduaneira"]
      }
    }
  }
];

export default sampleLegalRecords;