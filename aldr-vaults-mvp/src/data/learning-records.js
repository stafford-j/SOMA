/**
 * Sample Learning Records for Aldr Learning Demo
 * Demonstrates education credentials and professional development
 */

const sampleLearningRecords = [
  {
    id: 'learning-1',
    title: 'Bachelor of Science in Computer Science',
    category: 'university_degree',
    type: 'degree_certificate',
    status: 'completed',
    date: '2006-05-15',
    institution: 'Trinity College Dublin',
    location: 'Dublin, Ireland',
    description: 'Bachelor\'s degree in Computer Science with focus on software engineering and artificial intelligence.',
    details: {
      degreeType: 'Bachelor of Science (B.Sc.)',
      major: 'Computer Science',
      gpa: '3.8/4.0',
      graduationDate: '2006-05-15',
      duration: '4 years',
      honors: 'Magna Cum Laude'
    },
    verification: {
      verified: true,
      verificationDate: '2006-05-20',
      verificationMethod: 'Official transcript'
    }
  },
  {
    id: 'learning-2',
    title: 'AWS Solutions Architect Professional',
    category: 'professional_certification',
    type: 'cloud_certification',
    status: 'active',
    date: '2024-03-15',
    expirationDate: '2027-03-15',
    provider: 'Amazon Web Services',
    description: 'Advanced AWS certification demonstrating expertise in designing distributed systems on the AWS platform.',
    details: {
      certificationId: 'AWS-SAP-2024-789456',
      level: 'Professional',
      validityPeriod: '3 years',
      examScore: '850/1000',
      passingScore: '750/1000'
    },
    skills: ['Cloud Architecture', 'AWS Services', 'System Design', 'Security Best Practices'],
    verification: {
      verified: true,
      verificationUrl: 'aws.amazon.com/verification',
      badgeUrl: 'credly.com/badges/aws-sap-james-stafford'
    }
  },
  {
    id: 'learning-3',
    title: 'Project Management Professional (PMP)',
    category: 'professional_certification',
    type: 'management_certification',
    status: 'active',
    date: '2023-09-20',
    expirationDate: '2026-09-20',
    provider: 'Project Management Institute (PMI)',
    description: 'Global standard for project management certification, demonstrating proven project leadership experience and skills.',
    details: {
      certificationId: 'PMP-2023-456789',
      pduRequired: 60,
      pduEarned: 25,
      examScore: 'Above Target in all domains',
      preparationHours: 180
    },
    skills: ['Project Management', 'Leadership', 'Risk Management', 'Stakeholder Engagement'],
    verification: {
      verified: true,
      pmiId: '12345678',
      verificationUrl: 'pmi.org/certifications/verify'
    }
  },
  {
    id: 'learning-4',
    title: 'Machine Learning Specialization',
    category: 'online_course',
    type: 'specialization_certificate',
    status: 'completed',
    date: '2024-01-30',
    provider: 'Stanford University (Coursera)',
    instructor: 'Andrew Ng',
    description: 'Comprehensive machine learning course covering supervised learning, unsupervised learning, and best practices.',
    details: {
      courseCount: 3,
      totalHours: 90,
      certificateId: 'COURSERA-ML-2024-123',
      grade: '96.5%',
      completionTime: '3 months'
    },
    courses: [
      'Supervised Machine Learning: Regression and Classification',
      'Advanced Learning Algorithms',
      'Unsupervised Learning, Recommenders, Reinforcement Learning'
    ],
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Neural Networks'],
    verification: {
      verified: true,
      verificationUrl: 'coursera.org/verify/specialization/ML2024123'
    }
  },
  {
    id: 'learning-5',
    title: 'Certified ScrumMaster (CSM)',
    category: 'professional_certification',
    type: 'agile_certification',
    status: 'active',
    date: '2022-11-10',
    expirationDate: '2024-11-10',
    provider: 'Scrum Alliance',
    description: 'Certification in Scrum framework and agile project management methodologies.',
    details: {
      certificationId: 'CSM-001234567',
      seuRequired: 20,
      seuEarned: 15,
      renewalStatus: 'Renewal Due Soon',
      trainerName: 'Mike Cohn'
    },
    skills: ['Scrum Framework', 'Agile Methodology', 'Team Facilitation', 'Sprint Planning'],
    verification: {
      verified: true,
      scrumAllianceId: 'SA-CSM-789456',
      verificationUrl: 'scrumalliance.org/community/profile'
    }
  },
  {
    id: 'learning-6',
    title: 'IELTS Academic - English Proficiency',
    category: 'language_certification',
    type: 'language_proficiency',
    status: 'completed',
    date: '2005-02-20',
    provider: 'British Council',
    description: 'International English Language Testing System certification for academic purposes.',
    details: {
      overallScore: '8.5/9.0',
      listening: '9.0/9.0',
      reading: '8.5/9.0',
      writing: '8.0/9.0',
      speaking: '8.5/9.0',
      testCenter: 'Dublin Test Center'
    },
    skills: ['English Proficiency', 'Academic Writing', 'Listening Comprehension', 'Speaking Fluency'],
    verification: {
      verified: true,
      testReportNumber: 'TRF-05-0220-123456'
    }
  },
  {
    id: 'learning-7',
    title: 'Professional Development Course - Leadership Excellence',
    category: 'professional_development',
    type: 'corporate_training',
    status: 'completed',
    date: '2024-06-15',
    provider: 'Corporate University',
    description: 'Intensive leadership development program focusing on team management and organizational leadership.',
    details: {
      duration: '2 weeks',
      format: 'In-person intensive',
      participantCount: 25,
      facilitator: 'Leadership Institute',
      assessmentScore: '92/100'
    },
    skills: ['Leadership', 'Team Management', 'Strategic Thinking', 'Communication'],
    verification: {
      verified: true,
      internalId: 'LED-EXC-2024-0615'
    }
  },
  {
    id: 'learning-8',
    title: 'Continuing Education - Data Privacy and GDPR',
    category: 'continuing_education',
    type: 'compliance_training',
    status: 'completed',
    date: '2024-05-20',
    expirationDate: '2025-05-20',
    provider: 'International Association of Privacy Professionals (IAPP)',
    description: 'Professional training on data privacy regulations and GDPR compliance requirements.',
    details: {
      hours: 16,
      cpeCredits: 16,
      modules: ['GDPR Fundamentals', 'Data Protection Impact Assessments', 'Cross-Border Data Transfers'],
      assessmentScore: '88%'
    },
    skills: ['Data Privacy', 'GDPR Compliance', 'Risk Assessment', 'Legal Frameworks'],
    verification: {
      verified: true,
      iappId: 'IAPP-GDPR-2024-789',
      certificateNumber: 'GDPR-CERT-052024'
    }
  }
];

export default sampleLearningRecords;