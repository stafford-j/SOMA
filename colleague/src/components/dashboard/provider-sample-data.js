/**
 * Provider Sample Data
 * 
 * This file contains demonstration data for the SOMA Colleague app,
 * focused on provider-specific information and patient records from
 * the clinical perspective.
 * 
 * It includes patient lists, shared records, clinical notes, and
 * provider-specific views of health data.
 * 
 * Note: This is sample data for demonstration purposes only.
 */

// Provider information
export const providerInfo = {
  id: "prov-00123",
  name: "Dr. Olivia Brown",
  credentials: "OD",
  specialty: "Optometry",
  practiceName: "Vista Eye Care Center",
  practiceAddress: "123 Medical Plaza, Suite 204, San Francisco, CA 94115",
  phoneNumber: "(415) 555-7890",
  licenseNumber: "CA-OPT-23451",
  avatarInitials: "OB"
};

// Patients who have shared records with this provider
export const sharedPatients = [
  {
    id: "pat-00987",
    somaId: "1742961914546", // James Stafford's SOMA ID
    name: "James Stafford",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    lastVisit: "2025-01-18",
    nextAppointment: "2026-01-20",
    sharedRecordsCount: 3,
    lastUpdated: "2025-01-18",
    lastRecordType: "Eye Exam",
    status: "Active",
    avatarInitials: "JS"
  },
  {
    id: "pat-00854",
    somaId: "1724689512375",
    name: "Lisa Martinez",
    dateOfBirth: "1992-09-20",
    gender: "Female",
    lastVisit: "2025-03-01",
    nextAppointment: "2025-09-12",
    sharedRecordsCount: 2,
    lastUpdated: "2025-03-01",
    lastRecordType: "Comprehensive Eye Exam",
    status: "Active",
    avatarInitials: "LM"
  },
  {
    id: "pat-00653",
    somaId: "1736542981057",
    name: "Jamie Douglas",
    dateOfBirth: "1975-11-08",
    gender: "Non-binary",
    lastVisit: "2025-02-28",
    nextAppointment: null,
    sharedRecordsCount: 1,
    lastUpdated: "2025-02-28",
    lastRecordType: "Contact Lens Fitting",
    status: "Active",
    avatarInitials: "JD"
  }
];

// Detailed patient records
export const patientRecords = {
  // James Stafford's records
  "pat-00987": [
    {
      id: "rec-00456",
      title: "Comprehensive Eye Examination",
      date: "2025-01-18",
      recordType: "eye_exam",
      provider: "Dr. Olivia Brown, OD",
      location: "Vista Eye Care Center",
      clinicalData: {
        chiefComplaint: "Annual eye exam, minor eye strain with computer work",
        visualAcuityOD: "20/25",
        visualAcuityOS: "20/20",
        visualAcuityCorrected: "20/20 OU",
        iop: {
          right: "18 mmHg",
          left: "16 mmHg"
        },
        refraction: {
          right: {
            sphere: "-1.50",
            cylinder: "-0.50",
            axis: "180",
            add: "+1.00"
          },
          left: {
            sphere: "-1.25",
            cylinder: "-0.25",
            axis: "175",
            add: "+1.00"
          }
        },
        anteriorSegment: "Clear and quiet OU",
        posteriorSegment: "Healthy optic nerves with 0.3 C/D ratio OU. Maculae, vessels, and periphery WNL OU.",
        assessment: "1. Mild myopia with astigmatism, both eyes\n2. Early presbyopia\n3. Computer vision syndrome",
        plan: "1. Updated prescription for glasses\n2. Recommended blue light filtering lenses for computer work\n3. Discussed 20-20-20 rule for digital eye strain\n4. Annual follow-up examination recommended"
      },
      prescription: {
        type: "Glasses",
        expirationDate: "2026-01-18",
        details: {
          right: {
            sphere: "-1.50",
            cylinder: "-0.50",
            axis: "180",
            add: "+1.00"
          },
          left: {
            sphere: "-1.25",
            cylinder: "-0.25",
            axis: "175",
            add: "+1.00"
          },
          pdDistance: "64 mm",
          pdNear: "62 mm"
        },
        recommendations: "Blue light filtering recommended for computer use"
      },
      providerNotes: "Patient presents with minimal changes from previous prescription. Reported increased screen time with new work-from-home schedule. Discussed ergonomic considerations for workstation setup and strategies to minimize visual fatigue. Patient is interested in exploring contact lens options at next visit. Overall excellent ocular health with no signs of pathology. Follow-up in 12 months unless concerns arise sooner.",
      nextVisitDate: "2026-01-20",
      accessLevel: "Full clinical access",
      shareExpiration: "2026-01-18"
    },
    {
      id: "rec-00322",
      title: "Contact Lens Consultation",
      date: "2024-07-10",
      recordType: "contact_lens_exam",
      provider: "Dr. Olivia Brown, OD",
      location: "Vista Eye Care Center",
      clinicalData: {
        consultation: "Patient interested in daily contact lens options for occasional wear during sports and social activities",
        trialLenses: "Acuvue Oasys 1-Day, 8.5 BC, 14.3 DIA, -1.50 OD, -1.25 OS",
        evaluation: "Comfortable fit with good centration and movement. Vision 20/20 OU with contacts.",
        plan: "Dispensed trial pair with insertion and removal training completed. Patient to return in 1 week for follow-up assessment."
      },
      providerNotes: "First-time contact lens wearer. Patient demonstrated good insertion and removal technique after initial instruction. Discussed proper lens care, wearing schedule, and signs of complications to watch for. Patient plans to wear lenses 2-3 times per week for sports activities.",
      nextVisitDate: "2024-07-17",
      accessLevel: "Full clinical access",
      shareExpiration: "2025-07-10"
    }
  ],
  
  // Lisa Martinez's records
  "pat-00854": [
    {
      id: "rec-00789",
      title: "Comprehensive Eye Examination",
      date: "2025-03-01",
      recordType: "eye_exam",
      provider: "Dr. Olivia Brown, OD",
      location: "Vista Eye Care Center",
      clinicalData: {
        chiefComplaint: "Blurry vision for distance, difficulty driving at night",
        visualAcuityOD: "20/40",
        visualAcuityOS: "20/30",
        visualAcuityCorrected: "20/20 OU",
        iop: {
          right: "17 mmHg",
          left: "18 mmHg"
        },
        refraction: {
          right: {
            sphere: "-2.00",
            cylinder: "-0.75",
            axis: "90"
          },
          left: {
            sphere: "-1.75",
            cylinder: "-0.50",
            axis: "85"
          }
        },
        anteriorSegment: "Clear and quiet OU",
        posteriorSegment: "Healthy optic nerves with 0.4 C/D ratio OU. Maculae, vessels, and periphery WNL OU.",
        assessment: "1. Moderate myopia with astigmatism\n2. Nighttime glare sensitivity",
        plan: "1. Updated prescription for glasses\n2. Recommended anti-reflective coating\n3. Discussed potential for laser vision correction\n4. Follow-up in 12 months"
      },
      prescription: {
        type: "Glasses",
        expirationDate: "2026-03-01",
        details: {
          right: {
            sphere: "-2.00",
            cylinder: "-0.75",
            axis: "90"
          },
          left: {
            sphere: "-1.75",
            cylinder: "-0.50",
            axis: "85"
          },
          pdDistance: "62 mm"
        },
        recommendations: "Anti-reflective coating highly recommended for night driving"
      },
      providerNotes: "Patient has noticed increased difficulty with night driving over the past 6 months. Discussed the benefits of anti-reflective coating for reducing glare from headlights. Patient interested in learning more about LASIK options - provided information and referred to Dr. Liu for consultation if interested in pursuing. Good candidate based on refractive stability and ocular health.",
      nextVisitDate: "2026-03-05",
      accessLevel: "Full clinical access",
      shareExpiration: "2026-03-01"
    }
  ],
  
  // Jamie Douglas's records
  "pat-00653": [
    {
      id: "rec-00912",
      title: "Contact Lens Fitting",
      date: "2025-02-28",
      recordType: "contact_lens_exam",
      provider: "Dr. Olivia Brown, OD",
      location: "Vista Eye Care Center",
      clinicalData: {
        chiefComplaint: "Discomfort with current contact lenses after 4-5 hours of wear",
        currentLenses: "Biofinity Toric, 8.7 BC, 14.5 DIA, -3.25 -1.25x180 OD, -3.00 -1.00x175 OS",
        eyeAssessment: "Mild papillary reaction on upper tarsal plates OU. Corneal surface intact but reduced tear break-up time (TBUT = 7 seconds).",
        newLenses: "Dailies Total 1 for Astigmatism, 8.6 BC, 14.4 DIA, -3.25 -1.25x180 OD, -3.00 -1.00x175 OS",
        evaluation: "Improved comfort with new daily disposable silicone hydrogel lens. Good fit with appropriate movement and rotation stability."
      },
      prescription: {
        type: "Contact Lenses",
        expirationDate: "2026-02-28",
        details: "Dailies Total 1 for Astigmatism\nOD: -3.25 -1.25x180, 8.6 BC, 14.4 DIA\nOS: -3.00 -1.00x175, 8.6 BC, 14.4 DIA",
        recommendations: "Daily replacement schedule. Preservative-free artificial tears as needed for dryness."
      },
      providerNotes: "Patient experiencing contact lens discomfort with current monthly lenses. Signs of mild solution sensitivity and reduced tear film quality. Switched to daily disposable lenses to eliminate solution exposure and provide fresh lens daily. Discussed the importance of proper hydration and recommended occasional breaks from lens wear during screen-intensive activities. Patient reports immediate improvement in comfort with trial lenses.",
      nextVisitDate: "2025-03-14",
      accessLevel: "Full clinical access",
      shareExpiration: "2026-02-28"
    }
  ]
};

export default {
  providerInfo,
  sharedPatients,
  patientRecords
};