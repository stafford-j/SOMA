/**
 * Sample Travel Records for Aldr Travel Demo
 * Demonstrates travel logistics and cross-vault passport linking
 */

const sampleTravelRecords = [
  {
    id: 'travel-1',
    title: 'Trip to Dublin - June 2025',
    category: 'trip_planning',
    type: 'travel_itinerary',
    status: 'upcoming',
    date: '2025-06-28',
    departureDate: '2025-06-28',
    returnDate: '2025-07-05',
    destination: 'Dublin, Ireland',
    description: 'Business trip to Dublin for client meetings and conference attendance. Includes flights, accommodation, and ground transportation.',
    documents: {
      flights: {
        airline: 'Aer Lingus',
        flightNumber: 'EI 242',
        departure: 'Toronto YYZ - 21:30',
        arrival: 'Dublin DUB - 08:25+1'
      },
      accommodation: {
        hotel: 'The Fitzwilliam Hotel',
        checkIn: '2025-06-28',
        checkOut: '2025-07-05',
        confirmationNumber: 'FTZ-789456'
      }
    },
    requirements: {
      passport: 'Required - Links to Aldr ID',
      visa: 'Not required (Irish citizen)',
      vaccinations: 'None required'
    }
  },
  {
    id: 'travel-2',
    title: 'New York Business Conference',
    category: 'business_travel',
    type: 'travel_itinerary',
    status: 'completed',
    date: '2025-03-15',
    departureDate: '2025-03-15',
    returnDate: '2025-03-18',
    destination: 'New York, USA',
    description: 'Tech conference in Manhattan. Included networking events and client presentations.',
    documents: {
      flights: {
        airline: 'Air Canada',
        flightNumber: 'AC 893',
        departure: 'Toronto YYZ - 14:20',
        arrival: 'New York LGA - 16:05'
      },
      accommodation: {
        hotel: 'Marriott Times Square',
        checkIn: '2025-03-15',
        checkOut: '2025-03-18',
        confirmationNumber: 'MAR-123789'
      }
    },
    requirements: {
      passport: 'Used - Canadian Passport',
      visa: 'Not required (Canadian citizen)',
      vaccinations: 'None required'
    }
  },
  {
    id: 'travel-3',
    title: 'London Family Visit',
    category: 'personal_travel',
    type: 'travel_itinerary',
    status: 'planned',
    date: '2025-08-10',
    departureDate: '2025-08-10',
    returnDate: '2025-08-20',
    destination: 'London, UK',
    description: 'Family visit to London for cousin\'s wedding and tourism.',
    documents: {
      flights: {
        airline: 'British Airways',
        flightNumber: 'BA 93',
        departure: 'Toronto YYZ - 22:00',
        arrival: 'London LHR - 09:25+1'
      },
      accommodation: {
        type: 'Family Home',
        location: 'Hampstead, London',
        contact: 'Sarah Murphy +44 20 7435 1234'
      }
    },
    requirements: {
      passport: 'Required - Irish Passport valid until 2029',
      visa: 'Not required (Irish citizen)',
      vaccinations: 'None required'
    }
  },
  {
    id: 'travel-4',
    title: 'Travel Insurance Policy',
    category: 'travel_insurance',
    type: 'insurance_document',
    status: 'active',
    date: '2025-01-01',
    expirationDate: '2025-12-31',
    provider: 'World Nomads Travel Insurance',
    description: 'Annual comprehensive travel insurance covering medical, trip cancellation, and baggage protection.',
    coverage: {
      medical: '$2,000,000 CAD',
      evacuation: '$1,000,000 CAD',
      tripCancellation: '$10,000 CAD',
      baggage: '$3,000 CAD'
    },
    policyNumber: 'WN-2025-789456123'
  },
  {
    id: 'travel-5',
    title: 'Global Entry Application',
    category: 'travel_documents',
    type: 'travel_authorization',
    status: 'pending',
    date: '2025-02-20',
    applicationNumber: 'GE-2025-456789',
    description: 'Global Entry application for expedited US customs and immigration processing.',
    interviewDate: '2025-07-15',
    interviewLocation: 'Toronto Pearson Airport (YYZ)',
    benefits: [
      'Expedited entry to United States',
      'TSA PreCheck included',
      'Shorter wait times at customs',
      'Valid for 5 years'
    ]
  },
  {
    id: 'travel-6',
    title: 'Emergency Travel Contact List',
    category: 'emergency_contacts',
    type: 'reference_document',
    status: 'current',
    date: '2025-01-15',
    description: 'Emergency contacts and important numbers for international travel.',
    contacts: {
      family: {
        name: 'Catherine Conaghan',
        relationship: 'Emergency Contact',
        phone: '+353 87 123 4567',
        location: 'Dublin, Ireland'
      },
      medical: {
        name: 'Dr. Sarah Chen',
        relationship: 'Family Doctor',
        phone: '+1 416 555 0123',
        location: 'Toronto, Canada'
      },
      embassy: {
        ireland: {
          name: 'Embassy of Ireland to Canada',
          phone: '+1 613 233 6281',
          address: '130 Albert Street, Ottawa'
        },
        canada: {
          name: 'Canadian Embassy Dublin',
          phone: '+353 1 234 4000',
          address: '7-8 Wilton Terrace, Dublin 2'
        }
      }
    }
  }
];

export default sampleTravelRecords;