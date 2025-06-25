/**
 * Provider Sample Data
 * 
 * This file contains demonstration data for the Aldr Health Colleague app,
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
  name: "Dr. Sarah Chen",
  credentials: "MD, FACP",
  specialty: "Internal Medicine & Diabetes Care",
  practiceName: "Mission Bay Medical Group",
  practiceAddress: "1825 4th Street, Suite 400, San Francisco, CA 94158",
  phoneNumber: "(415) 555-2340",
  licenseNumber: "CA-MD-78912",
  avatarInitials: "SC"
};

// Patients who have shared records with this provider
export const sharedPatients = [
  {
    id: "pat-00987",
    aldrId: "1742961914546", // James Stafford's Aldr ID
    name: "James Stafford",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    lastVisit: "2025-01-18",
    nextAppointment: "2025-06-20",
    sharedRecordsCount: 12,
    lastUpdated: "2025-01-18",
    lastRecordType: "Diabetes Follow-up",
    status: "Active",
    avatarInitials: "JS",
    carePlan: "Type 2 Diabetes Management"
  },
  {
    id: "pat-00854",
    aldrId: "1724689512375",
    name: "Lisa Martinez",
    dateOfBirth: "1992-09-20",
    gender: "Female",
    lastVisit: "2025-03-01",
    nextAppointment: "2025-06-15",
    sharedRecordsCount: 8,
    lastUpdated: "2025-03-01",
    lastRecordType: "Lab Results Review",
    status: "Active",
    avatarInitials: "LM",
    carePlan: "Pre-diabetes Prevention"
  },
  {
    id: "pat-00653",
    aldrId: "1736542981057",
    name: "Robert Kim",
    dateOfBirth: "1975-11-08",
    gender: "Male",
    lastVisit: "2025-02-28",
    nextAppointment: "2025-05-30",
    sharedRecordsCount: 15,
    lastUpdated: "2025-02-28",
    lastRecordType: "Insulin Adjustment",
    status: "Active",
    avatarInitials: "RK",
    carePlan: "Type 1 Diabetes Management"
  },
  {
    id: "pat-00741",
    aldrId: "1729384756201",
    name: "Maria Rodriguez",
    dateOfBirth: "1968-03-22",
    gender: "Female",
    lastVisit: "2025-01-12",
    nextAppointment: "2025-07-10",
    sharedRecordsCount: 9,
    lastUpdated: "2025-01-12",
    lastRecordType: "Annual Physical",
    status: "Active",
    avatarInitials: "MR",
    carePlan: "Hypertension & Diabetes"
  },
  {
    id: "pat-00829",
    aldrId: "1731057492836",
    name: "David Thompson",
    dateOfBirth: "1985-07-14",
    gender: "Male",
    lastVisit: "2025-02-05",
    nextAppointment: "2025-08-05",
    sharedRecordsCount: 6,
    lastUpdated: "2025-02-05",
    lastRecordType: "Medication Review",
    status: "Active",
    avatarInitials: "DT",
    carePlan: "Type 2 Diabetes & Weight Management"
  },
  {
    id: "pat-00915",
    aldrId: "1733625871492",
    name: "Jennifer Park",
    dateOfBirth: "1990-12-03",
    gender: "Female",
    lastVisit: "2025-03-10",
    nextAppointment: "2025-06-10",
    sharedRecordsCount: 4,
    lastUpdated: "2025-03-10",
    lastRecordType: "Gestational Diabetes Screening",
    status: "Active",
    avatarInitials: "JP",
    carePlan: "Pregnancy & Diabetes Monitoring"
  },
  {
    id: "pat-01023",
    aldrId: "1735194285074",
    name: "Michael O'Brien",
    dateOfBirth: "1962-09-18",
    gender: "Male",
    lastVisit: "2025-01-25",
    nextAppointment: "2025-04-25",
    sharedRecordsCount: 18,
    lastUpdated: "2025-01-25",
    lastRecordType: "Diabetic Foot Care",
    status: "Active",
    avatarInitials: "MO",
    carePlan: "Advanced Diabetes Complications"
  },
  {
    id: "pat-01134",
    aldrId: "1737068419583",
    name: "Susan Williams",
    dateOfBirth: "1978-06-25",
    gender: "Female",
    lastVisit: "2025-02-14",
    nextAppointment: "2025-05-15",
    sharedRecordsCount: 7,
    lastUpdated: "2025-02-14",
    lastRecordType: "CGM Data Review",
    status: "Active",
    avatarInitials: "SW",
    carePlan: "Type 1 Diabetes with CGM"
  },
  {
    id: "pat-01245",
    aldrId: "1739471628059",
    name: "Ahmed Hassan",
    dateOfBirth: "1987-04-11",
    gender: "Male",
    lastVisit: "2025-03-08",
    nextAppointment: "2025-06-08",
    sharedRecordsCount: 5,
    lastUpdated: "2025-03-08",
    lastRecordType: "Lifestyle Counseling",
    status: "Active",
    avatarInitials: "AH",
    carePlan: "Newly Diagnosed Type 2 Diabetes"
  },
  {
    id: "pat-01356",
    aldrId: "1741283947205",
    name: "Rachel Green",
    dateOfBirth: "1973-10-30",
    gender: "Female",
    lastVisit: "2025-01-30",
    nextAppointment: "2025-07-30",
    sharedRecordsCount: 11,
    lastUpdated: "2025-01-30",
    lastRecordType: "Retinal Screening",
    status: "Active",
    avatarInitials: "RG",
    carePlan: "Type 2 Diabetes & Eye Health"
  },
  {
    id: "pat-01467",
    aldrId: "1743159284756",
    name: "Thomas Anderson",
    dateOfBirth: "1955-12-08",
    gender: "Male",
    lastVisit: "2025-02-20",
    nextAppointment: "2025-05-20",
    sharedRecordsCount: 22,
    lastUpdated: "2025-02-20",
    lastRecordType: "Kidney Function Assessment",
    status: "Active",
    avatarInitials: "TA",
    carePlan: "Long-term Diabetes with CKD"
  },
  {
    id: "pat-01578",
    aldrId: "1745027395814",
    name: "Emily Chen",
    dateOfBirth: "1995-08-17",
    gender: "Female",
    lastVisit: "2025-03-05",
    nextAppointment: "2025-09-05",
    sharedRecordsCount: 3,
    lastUpdated: "2025-03-05",
    lastRecordType: "Initial Consultation",
    status: "Active",
    avatarInitials: "EC",
    carePlan: "MODY Genetic Diabetes"
  }
];

// Detailed patient records (showing detailed records for first 4 patients)
export const patientRecords = {
  // James Stafford's records
  "pat-00987": [
    {
      id: "rec-00456",
      title: "Diabetes Management Follow-up",
      date: "2025-01-18",
      recordType: "diabetes_followup",
      provider: "Dr. Sarah Chen, MD",
      location: "Mission Bay Medical Group",
      clinicalData: {
        chiefComplaint: "Diabetes follow-up visit, blood sugar monitoring review",
        hba1c: "7.2%",
        fastingGlucose: "142 mg/dL",
        bloodPressure: "128/82 mmHg",
        weight: "185 lbs",
        bmi: "26.3",
        waistCircumference: "38 inches",
        footExam: "No ulcers or deformities noted, pulses palpable",
        eyeExam: "Scheduled for ophthalmology referral, no acute concerns",
        assessment: "1. Type 2 Diabetes Mellitus - good control\n2. Mild hypertension\n3. Overweight",
        plan: "1. Continue metformin 1000mg BID\n2. Add lisinopril 10mg daily for BP\n3. Nutrition counseling referral\n4. Home glucose monitoring logs review\n5. Follow-up in 3 months"
      },
      prescription: {
        type: "Medications",
        expirationDate: "2025-07-18",
        details: {
          metformin: "1000mg twice daily with meals",
          lisinopril: "10mg once daily in morning",
          glucometer: "Test strips - check fasting and 2hr post-meal 3x/week"
        },
        recommendations: "Follow Mediterranean diet, aim for 150 min/week moderate exercise"
      },
      providerNotes: "Patient demonstrates good understanding of diabetes management. Home glucose logs show mostly target ranges (80-130 fasting, <180 post-meal). Some occasional spikes noted after large meals - discussed portion control strategies. Blood pressure slightly elevated - starting ACE inhibitor. Patient motivated to lose 15-20 pounds this year. Referred to dietitian for meal planning support. Very compliant with medications and monitoring.",
      nextVisitDate: "2025-06-20",
      accessLevel: "Full clinical access",
      shareExpiration: "2025-07-18"
    },
    {
      id: "rec-00322",
      title: "Quarterly Lab Review",
      date: "2024-10-15",
      recordType: "lab_review",
      provider: "Dr. Sarah Chen, MD",
      location: "Mission Bay Medical Group",
      clinicalData: {
        labResults: "HbA1c: 7.4%, Lipid panel: TC 195, LDL 110, HDL 42, TG 215",
        kidneyFunction: "eGFR >90, microalbumin 15 mg/g (normal)",
        liverFunction: "ALT/AST normal",
        vitaminD: "28 ng/mL (low normal)",
        assessment: "Diabetes control improved since last visit. Lipids slightly elevated.",
        plan: "Continue current diabetes regimen. Consider statin therapy. Vitamin D supplementation."
      },
      providerNotes: "Steady improvement in diabetes control over past 6 months. Patient has been consistent with lifestyle modifications. Discussed lipid management - patient prefers lifestyle changes before starting statin. Will recheck in 3 months.",
      nextVisitDate: "2025-01-18",
      accessLevel: "Full clinical access",
      shareExpiration: "2025-04-15"
    }
  ],
  
  // Lisa Martinez's records
  "pat-00854": [
    {
      id: "rec-00789",
      title: "Pre-diabetes Management Visit",
      date: "2025-03-01",
      recordType: "prediabetes_followup",
      provider: "Dr. Sarah Chen, MD",
      location: "Mission Bay Medical Group",
      clinicalData: {
        chiefComplaint: "Follow-up for pre-diabetes, lifestyle modification review",
        hba1c: "6.2%",
        fastingGlucose: "108 mg/dL",
        oralGlucoseTolerance: "155 mg/dL (2-hour)",
        bloodPressure: "118/76 mmHg",
        weight: "152 lbs",
        bmi: "24.8",
        waistCircumference: "32 inches",
        assessment: "1. Pre-diabetes - improving\n2. Successful lifestyle modifications\n3. Normal blood pressure",
        plan: "1. Continue lifestyle modifications\n2. Nutrition follow-up in 3 months\n3. Repeat labs in 6 months\n4. Continue Mediterranean diet approach"
      },
      providerNotes: "Excellent progress with lifestyle modifications. Patient has lost 8 pounds since last visit and reports consistent exercise routine. Dietary changes well-tolerated. HbA1c improved from 6.5% to 6.2%. Encouraged to continue current approach.",
      nextVisitDate: "2025-06-15",
      accessLevel: "Full clinical access",
      shareExpiration: "2025-09-01"
    }
  ],
  
  // Robert Kim's records
  "pat-00653": [
    {
      id: "rec-00912",
      title: "Type 1 Diabetes & Insulin Adjustment",
      date: "2025-02-28",
      recordType: "insulin_adjustment",
      provider: "Dr. Sarah Chen, MD",
      location: "Mission Bay Medical Group",
      clinicalData: {
        chiefComplaint: "Insulin dose optimization, frequent hypoglycemic episodes",
        hba1c: "6.8%",
        currentInsulin: "Lantus 24 units bedtime, Humalog 8-10 units with meals",
        cgmData: "Average 142 mg/dL, 15% time below 70 mg/dL",
        bloodPressure: "125/78 mmHg",
        weight: "165 lbs",
        bmi: "23.1",
        assessment: "1. Type 1 Diabetes with good control but frequent lows\n2. Insulin adjustment needed\n3. Consider CGM optimization",
        plan: "1. Reduce Lantus to 22 units\n2. Adjust carb ratios to 1:12\n3. Review CGM patterns weekly\n4. Follow-up in 6 weeks"
      },
      providerNotes: "Patient experiencing 3-4 hypoglycemic episodes weekly, mostly overnight. CGM data shows good overall control but too much time in hypoglycemic range. Adjusted basal insulin and carbohydrate ratios. Patient demonstrates excellent self-management skills.",
      nextVisitDate: "2025-05-30",
      accessLevel: "Full clinical access",
      shareExpiration: "2025-08-28"
    }
  ],
  
  // Maria Rodriguez's records
  "pat-00741": [
    {
      id: "rec-01123",
      title: "Annual Physical - Diabetes & Hypertension",
      date: "2025-01-12",
      recordType: "annual_physical",
      provider: "Dr. Sarah Chen, MD",
      location: "Mission Bay Medical Group",
      clinicalData: {
        chiefComplaint: "Annual physical exam, diabetes and blood pressure management",
        hba1c: "7.8%",
        fastingGlucose: "165 mg/dL",
        bloodPressure: "142/88 mmHg",
        weight: "168 lbs",
        bmi: "28.9",
        medications: "Metformin 1000mg BID, Lisinopril 15mg daily, Amlodipine 5mg daily",
        footExam: "Minor callus formation, no ulcers",
        eyeExam: "Scheduled ophthalmology referral for diabetic retinal screening",
        assessment: "1. Type 2 Diabetes - suboptimal control\n2. Hypertension - good control\n3. Overweight\n4. Due for preventive screenings",
        plan: "1. Add Jardiance 10mg daily\n2. Dietitian referral\n3. Ophthalmology referral\n4. Mammography and colonoscopy scheduling\n5. Follow-up in 3 months"
      },
      providerNotes: "HbA1c has increased from 7.2% to 7.8% over past year. Patient reports stress eating and reduced exercise due to work demands. Discussed strategies for stress management and meal planning. Blood pressure well-controlled on current regimen. Due for age-appropriate cancer screenings.",
      nextVisitDate: "2025-07-10",
      accessLevel: "Full clinical access",
      shareExpiration: "2026-01-12"
    }
  ]
};

export default {
  providerInfo,
  sharedPatients,
  patientRecords
};