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
    "date": "2024-03-15",
    "description": "Complete will and testament document with executor designation and asset distribution",
    "provider": "Smith & Associates Law Firm",
    "location": "Toronto, ON",
    "expirationDate": null,
    "status": "current",
    "details": {
      "executor": "Catherine Conaghan",
      "witnesses": ["John Smith", "Mary Johnson"],
      "notarized": true,
      "lastUpdated": "2024-03-15"
    },
    "insights": {
      "legal": {
        "summary": "Will is current and properly executed with valid witnesses.",
        "recommendations": [
          "Review will every 3-5 years or after major life changes",
          "Ensure executor is still willing and able to serve",
          "Consider updating beneficiary designations on accounts"
        ],
        "sources": ["Ontario Estate Planning Guidelines"]
      }
    }
  },
  {
    "id": "legal-002",
    "title": "House Deed - Primary Residence",
    "category": "property",
    "recordType": "property_deed",
    "date": "2022-08-10",
    "description": "Property deed for primary residence at 123 Main Street",
    "provider": "Royal Bank of Canada",
    "location": "123 Main Street, Toronto, ON",
    "expirationDate": null,
    "status": "current",
    "details": {
      "propertyType": "Single Family Home",
      "purchasePrice": "$650,000",
      "mortgageNumber": "RBC-2022-8847392",
      "landTitleNumber": "LT449832"
    },
    "insights": {
      "legal": {
        "summary": "Property deed is current and mortgage is in good standing.",
        "recommendations": [
          "Keep deed in secure location",
          "Review property insurance annually",
          "Consider mortgage renewal options in 2027"
        ],
        "sources": ["Land Registry Office"]
      }
    }
  },
  {
    "id": "legal-003",
    "title": "Life Insurance Policy",
    "category": "personal_legal",
    "recordType": "insurance_policy",
    "date": "2023-01-15",
    "description": "Term life insurance policy - $500,000 coverage",
    "provider": "Sun Life Financial",
    "location": "Policy #: SL-2023-4429847",
    "expirationDate": "2033-01-15",
    "status": "active",
    "details": {
      "coverage": "$500,000",
      "beneficiary": "Catherine Conaghan",
      "premium": "$45/month",
      "termLength": "10 years"
    },
    "insights": {
      "legal": {
        "summary": "Policy is active with adequate coverage for current needs.",
        "recommendations": [
          "Review coverage after major life events",
          "Consider term renewal vs conversion options before expiry",
          "Update beneficiary information if needed"
        ],
        "sources": ["Insurance Bureau of Canada"]
      }
    }
  },
  {
    "id": "legal-004",
    "title": "Power of Attorney - Personal Care",
    "category": "estate_planning",
    "recordType": "power_of_attorney",
    "date": "2024-03-15",
    "description": "Power of attorney for personal care decisions",
    "provider": "Smith & Associates Law Firm",
    "location": "Toronto, ON",
    "expirationDate": null,
    "status": "current",
    "details": {
      "attorney": "Catherine Conaghan",
      "scope": "Personal Care Decisions",
      "witnesses": ["John Smith", "Mary Johnson"],
      "notarized": true
    },
    "insights": {
      "legal": {
        "summary": "POA is properly executed and current.",
        "recommendations": [
          "Ensure attorney understands your wishes",
          "Review document every few years",
          "Consider creating advance directives"
        ],
        "sources": ["Ontario Ministry of Health"]
      }
    }
  },
  {
    "id": "legal-005",
    "title": "Property Insurance Policy",
    "category": "property",
    "recordType": "insurance_policy",
    "date": "2024-09-01",
    "description": "Home insurance policy for primary residence",
    "provider": "Intact Insurance",
    "location": "Policy #: IN-2024-8834729",
    "expirationDate": "2025-09-01",
    "status": "active",
    "details": {
      "coverage": "$750,000 dwelling, $100,000 contents",
      "deductible": "$1,000",
      "premium": "$1,800/year",
      "specialRiders": ["Home Office Equipment"]
    },
    "insights": {
      "legal": {
        "summary": "Insurance coverage is adequate for current property value.",
        "recommendations": [
          "Review coverage annually",
          "Consider increasing contents coverage",
          "Shop for competitive rates at renewal"
        ],
        "sources": ["Insurance Bureau of Canada"]
      }
    }
  },
  {
    "id": "legal-006",
    "title": "Birth Certificate",
    "category": "personal_legal",
    "recordType": "birth_certificate",
    "date": "1984-08-15",
    "description": "Official birth certificate - Province of Ontario",
    "provider": "ServiceOntario",
    "location": "Toronto, ON",
    "expirationDate": null,
    "status": "current",
    "details": {
      "registrationNumber": "ON-1984-449832",
      "placeOfBirth": "Toronto General Hospital",
      "certifiedCopy": true,
      "issueDate": "2022-03-10"
    },
    "insights": {
      "legal": {
        "summary": "Birth certificate is a certified copy and valid for all legal purposes.",
        "recommendations": [
          "Keep in secure location",
          "Order additional certified copies if needed",
          "Use for passport applications and other official documents"
        ],
        "sources": ["ServiceOntario"]
      }
    }
  },
  {
    "id": "legal-007",
    "title": "Employment Contract - Conas Consulting",
    "category": "business",
    "recordType": "employment_contract",
    "date": "2023-06-01",
    "description": "Consulting agreement with Conas Consulting",
    "provider": "Conas Consulting Ltd.",
    "location": "Remote/Toronto, ON",
    "expirationDate": "2024-06-01",
    "status": "expired",
    "details": {
      "contractType": "Independent Contractor",
      "compensation": "$75/hour",
      "scope": "Digital Marketing and Event Management",
      "termNotice": "30 days"
    },
    "insights": {
      "legal": {
        "summary": "Contract has expired and may need renewal or new agreement.",
        "recommendations": [
          "Negotiate new contract terms if continuing work",
          "Review payment terms and scope of work",
          "Ensure proper tax documentation"
        ],
        "sources": ["Employment Standards Act"]
      }
    }
  }
];

export default sampleLegalRecords;