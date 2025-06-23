/**
 * Smart Ingestion Demo Data
 * Simulates incoming emails with attachments and AI analysis results
 */

export const incomingEmails = [
  {
    id: 'email-1',
    from: 'noreply@labcorp.com',
    subject: 'Your Lab Results are Ready - Reference #LAB789456',
    receivedTime: '2025-06-23T10:30:00Z',
    status: 'processing',
    attachments: [
      {
        filename: 'Blood_Work_Results_June_2025.pdf',
        size: '245 KB',
        type: 'application/pdf'
      }
    ],
    aiAnalysis: {
      confidence: 92,
      suggestedVault: 'Aldr Health',
      documentType: 'Lab Results',
      extractedInfo: {
        patientName: 'James Stafford',
        testDate: '2025-06-20',
        labName: 'LabCorp',
        testTypes: ['Complete Blood Count', 'Lipid Panel', 'Thyroid Function'],
        urgency: 'routine'
      },
      suggestedTags: ['blood work', 'lab results', 'routine checkup', '2025'],
      suggestedCategory: 'diagnostic_tests',
      reasoning: 'Email from LabCorp with PDF attachment containing lab results. Patient name matches profile. Suggests Health vault with diagnostic tests category.'
    }
  },
  {
    id: 'email-2',
    from: 'travel@airlingual.com',
    subject: 'Flight Confirmation - EI 242 Toronto to Dublin',
    receivedTime: '2025-06-23T09:15:00Z',
    status: 'pending_approval',
    attachments: [
      {
        filename: 'E_Ticket_EI242_YYZ_DUB.pdf',
        size: '156 KB',
        type: 'application/pdf'
      },
      {
        filename: 'Travel_Insurance_Certificate.pdf',
        size: '89 KB',
        type: 'application/pdf'
      }
    ],
    aiAnalysis: {
      confidence: 88,
      suggestedVault: 'Aldr Travel',
      documentType: 'Flight Booking',
      extractedInfo: {
        passengerName: 'James Stafford',
        flightNumber: 'EI 242',
        departure: 'Toronto YYZ - June 28, 2025 21:30',
        arrival: 'Dublin DUB - June 29, 2025 08:25',
        bookingReference: 'AERL789KLP'
      },
      suggestedTags: ['flight booking', 'dublin', 'business trip', 'aer lingus'],
      suggestedCategory: 'trip_planning',
      reasoning: 'Flight confirmation email with e-ticket. Passenger name matches profile. Links to existing Dublin trip in Travel vault.',
      crossVaultLinks: [
        {
          vault: 'Aldr ID',
          reason: 'Passport required for international travel',
          action: 'Verify passport validity'
        }
      ]
    }
  },
  {
    id: 'email-3',
    from: 'noreply@notary-services.ie',
    subject: 'Will Amendment - Document Ready for Collection',
    receivedTime: '2025-06-23T08:45:00Z',
    status: 'awaiting_review',
    attachments: [
      {
        filename: 'Will_Amendment_2025_DRAFT.pdf',
        size: '312 KB',
        type: 'application/pdf'
      }
    ],
    aiAnalysis: {
      confidence: 95,
      suggestedVault: 'Aldr Legal',
      documentType: 'Legal Document - Will Amendment',
      extractedInfo: {
        clientName: 'James Stafford',
        documentType: 'Last Will and Testament Amendment',
        notaryService: 'Dublin Legal Services',
        draftDate: '2025-06-22',
        status: 'Draft for Review'
      },
      suggestedTags: ['will', 'estate planning', 'legal document', 'amendment'],
      suggestedCategory: 'estate_planning',
      reasoning: 'Legal document from notary service regarding will amendment. High confidence legal document for Legal vault.',
      crossVaultLinks: [
        {
          vault: 'Aldr Memoirs',
          reason: 'Digital legacy planning may need updates',
          action: 'Review digital inheritance plan'
        }
      ]
    }
  },
  {
    id: 'email-4',
    from: 'certificates@coursera.org',
    subject: 'Congratulations! Your Machine Learning Certificate is Ready',
    receivedTime: '2025-06-22T16:20:00Z',
    status: 'auto_filed',
    attachments: [
      {
        filename: 'ML_Specialization_Certificate.pdf',
        size: '198 KB',
        type: 'application/pdf'
      }
    ],
    aiAnalysis: {
      confidence: 98,
      suggestedVault: 'Aldr Learning',
      documentType: 'Course Certificate',
      extractedInfo: {
        studentName: 'James Stafford',
        courseName: 'Machine Learning Specialization',
        provider: 'Stanford University via Coursera',
        completionDate: '2025-06-20',
        instructor: 'Andrew Ng',
        certificateId: 'COURSERA-ML-2025-789'
      },
      suggestedTags: ['machine learning', 'coursera', 'stanford', 'artificial intelligence'],
      suggestedCategory: 'online_course',
      reasoning: 'High confidence course completion certificate. Auto-filed to Learning vault based on clear educational content.',
      autoFiledReason: 'Exact match with existing Coursera learning pattern. 98% confidence threshold met.'
    }
  },
  {
    id: 'email-5',
    from: 'family.photos@googlemail.com',
    subject: 'Christmas Photos from Mum - 47 photos shared',
    receivedTime: '2025-06-22T14:30:00Z',
    status: 'needs_review',
    attachments: [
      {
        filename: 'Christmas_2024_Family_Photos.zip',
        size: '15.2 MB',
        type: 'application/zip'
      }
    ],
    aiAnalysis: {
      confidence: 75,
      suggestedVault: 'Aldr Memoirs',
      documentType: 'Family Photos',
      extractedInfo: {
        sender: 'Catherine Conaghan (Mother)',
        photoCount: 47,
        event: 'Christmas 2024',
        location: 'Dublin, Ireland',
        subjects: ['Family gathering', 'Christmas dinner', 'Gift exchange']
      },
      suggestedTags: ['christmas', 'family photos', 'dublin', '2024', 'holiday'],
      suggestedCategory: 'family_photos',
      reasoning: 'Personal email from family member with photo collection. Lower confidence due to personal nature - requires manual review.',
      reviewRequired: 'Personal family content requires privacy review before auto-filing.'
    }
  },
  {
    id: 'email-6',
    from: 'aws-training@amazon.com',
    subject: 'Action Required: AWS Certification Renewal Notice',
    receivedTime: '2025-06-22T11:15:00Z',
    status: 'processing',
    attachments: [
      {
        filename: 'AWS_Certification_Renewal_Requirements.pdf',
        size: '234 KB',
        type: 'application/pdf'
      }
    ],
    aiAnalysis: {
      confidence: 90,
      suggestedVault: 'Aldr Learning',
      documentType: 'Certification Renewal Notice',
      extractedInfo: {
        holderName: 'James Stafford',
        certification: 'AWS Solutions Architect Professional',
        expirationDate: '2027-03-15',
        renewalRequirements: 'Continuing Education Credits',
        actionRequired: 'Schedule renewal activities'
      },
      suggestedTags: ['aws certification', 'renewal', 'continuing education', 'cloud'],
      suggestedCategory: 'professional_certification',
      reasoning: 'Certification renewal notice from AWS. Links to existing AWS certification in Learning vault.',
      linkedDocuments: [
        {
          vault: 'Aldr Learning',
          document: 'AWS Solutions Architect Professional Certificate',
          relationship: 'renewal_notice'
        }
      ]
    }
  }
];

export const processingQueue = [
  {
    id: 'queue-1',
    emailId: 'email-1',
    status: 'analyzing_content',
    progress: 65,
    currentStep: 'Extracting patient information and test results',
    estimatedTimeRemaining: '2 minutes'
  },
  {
    id: 'queue-2',
    emailId: 'email-6',
    status: 'matching_existing_records',
    progress: 40,
    currentStep: 'Linking to existing AWS certification records',
    estimatedTimeRemaining: '3 minutes'
  }
];

export const recentlyProcessed = [
  {
    id: 'processed-1',
    emailSubject: 'Property Insurance Renewal - Policy Updated',
    processedTime: '2025-06-22T10:30:00Z',
    vault: 'Aldr Legal',
    category: 'property',
    confidence: 94,
    userAction: 'approved',
    documentsCreated: 1
  },
  {
    id: 'processed-2',
    emailSubject: 'Hotel Booking Confirmation - Dublin Trip',
    processedTime: '2025-06-22T09:15:00Z',
    vault: 'Aldr Travel',
    category: 'trip_planning',
    confidence: 89,
    userAction: 'approved_with_edits',
    documentsCreated: 1
  },
  {
    id: 'processed-3',
    emailSubject: 'Medical Appointment Reminder - Dr. Chen',
    processedTime: '2025-06-21T16:45:00Z',
    vault: 'Aldr Health',
    category: 'appointments',
    confidence: 91,
    userAction: 'approved',
    documentsCreated: 1
  }
];

export const smartIngestionStats = {
  totalProcessed: 47,
  thisWeek: 8,
  averageAccuracy: 94,
  timeSaved: '3.2 hours',
  autoApprovalRate: 76,
  vaultDistribution: {
    'Aldr Health': 18,
    'Aldr Legal': 12,
    'Aldr Travel': 8,
    'Aldr Learning': 6,
    'Aldr Memoirs': 3
  }
};