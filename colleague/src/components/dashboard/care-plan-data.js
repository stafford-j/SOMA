/**
 * Care Plan Sample Data
 * 
 * This file contains demonstration data for the Synchronized Care Plans feature,
 * showcasing the connection between SOMA Colleague (provider app) and 
 * SOMA Companion (patient app).
 * 
 * The data represents a diabetes management plan for an international patient,
 * highlighting cross-border care coordination capabilities.
 */

// Sample patient for the use case
export const diabetesPatient = {
  id: "pat-00456",
  somaId: "1742961914546", // James Stafford's SOMA ID
  name: "James Stafford",
  dateOfBirth: "1984-08-15",
  gender: "Male",
  primaryLanguage: "English",
  secondaryLanguages: [],
  occupation: "Software Engineer",
  homeCountry: "United Kingdom",
  currentLocation: {
    country: "United Kingdom",
    city: "London",
    timeZone: "Europe/London"
  },
  travelSchedule: [
    {
      destination: "France, Paris",
      dates: "2025-06-10 to 2025-06-17",
      timeZone: "Europe/Paris"
    }
  ],
  primaryProvider: "Dr. Olivia Brown",
  providerLocation: "London Medical Center",
  condition: "Type 2 Diabetes (recently diagnosed)",
  secondaryConditions: ["Psoriasis", "Rosacea Stadium I"],
  lastVisit: "2025-05-03",
  avatar: "JS"
};

// James's care team
export const careTeam = [
  {
    id: "prov-00125",
    name: "Dr. Olivia Brown",
    credentials: "OD",
    specialty: "Optometry",
    organization: "London Medical Center",
    location: "London, UK",
    role: "Primary Care Provider",
    contactInfo: {
      email: "dr.brown@londonmedical.example",
      phone: "+44 20 5555 0134"
    }
  },
  {
    id: "prov-00224",
    name: "Dr. Raj Patel",
    credentials: "MD, FACE",
    specialty: "Endocrinology",
    organization: "Global Diabetes Care",
    location: "Telemedicine",
    role: "Diabetes Specialist",
    contactInfo: {
      email: "dr.patel@globaldiabetes.example",
      phone: "+1 415 555 0125"
    }
  },
  {
    id: "prov-00387",
    name: "Emma Thompson",
    credentials: "RD, CDE",
    specialty: "Nutrition",
    organization: "London Wellness Center",
    location: "London, UK",
    role: "Dietitian",
    contactInfo: {
      email: "e.thompson@londonwellness.example",
      phone: "+44 20 5555 0187"
    }
  },
  {
    id: "prov-00456",
    name: "Dr. Shirin Samimi-Fard",
    credentials: "MD",
    specialty: "Dermatology",
    organization: "FACHARZTZENTRUM CARVOEIRO",
    location: "Carvoeiro, Portugal",
    role: "Dermatologist",
    contactInfo: {
      email: "dr.samimi-fard@carvoeiro-med.example",
      phone: "+351 282 000 000"
    }
  }
];

// Diabetes care plan
export const diabetesCarePlan = {
  id: "plan-00123",
  patientId: "pat-00456",
  title: "Type 2 Diabetes Management Plan",
  condition: "Type 2 Diabetes Mellitus (E11.9)",
  createdDate: "2025-05-03",
  modifiedDate: "2025-05-12",
  createdBy: "prov-00224", // Dr. Raj Patel
  status: "active",
  baseTimeZone: "Asia/Singapore",
  adjustAutomatically: true,
  goals: [
    {
      id: "goal-001",
      title: "Blood Glucose Control",
      description: "Maintain fasting blood glucose below 7.0 mmol/L",
      targetDate: "2025-08-01",
      progress: 65,
      metrics: [
        {
          name: "Fasting Blood Glucose",
          target: "5.0-7.0 mmol/L",
          unit: "mmol/L",
          frequency: "daily"
        },
        {
          name: "HbA1c",
          target: "< 7.0%",
          unit: "%",
          frequency: "quarterly"
        }
      ]
    },
    {
      id: "goal-002",
      title: "Weight Management",
      description: "Reduce weight by 5kg through diet and exercise",
      targetDate: "2025-08-15",
      progress: 30,
      metrics: [
        {
          name: "Weight",
          target: "75 kg (from 80 kg)",
          unit: "kg",
          frequency: "weekly"
        },
        {
          name: "BMI",
          target: "< 25",
          unit: "kg/m²",
          frequency: "monthly"
        }
      ]
    },
    {
      id: "goal-003",
      title: "Physical Activity",
      description: "Establish regular exercise routine",
      targetDate: "2025-06-01",
      progress: 50,
      metrics: [
        {
          name: "Steps",
          target: "8,000+ daily",
          unit: "steps",
          frequency: "daily"
        },
        {
          name: "Active Minutes",
          target: "150+ minutes weekly",
          unit: "minutes",
          frequency: "weekly"
        }
      ]
    }
  ],
  medications: [
    {
      id: "med-001",
      name: "Metformin",
      dosage: "500 mg",
      frequency: "Twice daily with meals",
      prescribedBy: "Dr. Raj Patel",
      startDate: "2025-05-03",
      instructions: "Take one tablet with breakfast and one with dinner",
      sideEffectsToMonitor: "Digestive discomfort, notify if persistent",
      substitutionInfo: {
        US: "Glucophage (same dosage)",
        UK: "Metformin Hydrochloride (same dosage)",
        France: "Glucophage or Stagid (same dosage)"
      }
    },
    {
      id: "med-002",
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "Once daily",
      prescribedBy: "Dr. Olivia Brown",
      startDate: "2025-05-05",
      instructions: "Take one capsule daily with food",
      sideEffectsToMonitor: "None expected",
      substitutionInfo: {
        generic: "Any Vitamin D3 1000 IU supplement"
      }
    },
    {
      id: "med-003",
      name: "Calcipotriol",
      dosage: "Cream",
      frequency: "Twice daily",
      prescribedBy: "Dr. Shirin Samimi-Fard",
      startDate: "2025-04-06",
      instructions: "Apply a thin layer to psoriatic plaques on knees twice daily",
      sideEffectsToMonitor: "Skin irritation or burning, notify if persistent",
      condition: "Psoriasis",
      substitutionInfo: {
        US: "Dovonex (same dosage)",
        UK: "Calcipotriol Hydrate",
        Portugal: "Daivonex",
        France: "Daivonex or Psorcutan"
      }
    }
  ],
  measurements: [
    {
      id: "measure-001",
      name: "Blood Glucose",
      type: "glucose",
      frequency: "Daily, morning (fasting)",
      target: "5.0-7.0 mmol/L",
      instructions: "Measure upon waking, before breakfast",
      alertThresholds: {
        high: "> 10.0 mmol/L for 2 consecutive days",
        low: "< 4.0 mmol/L any time"
      },
      unit: "mmol/L",
      conversionInfo: {
        US: "Divide by 18 to convert from mg/dL to mmol/L",
        mmolToMgdl: "Multiply by 18 to convert from mmol/L to mg/dL"
      }
    },
    {
      id: "measure-002",
      name: "Weight",
      type: "weight",
      frequency: "Weekly, same day and time",
      target: "Gradual reduction to 75 kg",
      instructions: "Measure in the morning after using the bathroom, before breakfast",
      unit: "kg",
      conversionInfo: {
        US: "Multiply by 2.2 to convert from kg to lbs"
      }
    },
    {
      id: "measure-003",
      name: "Blood Pressure",
      type: "bloodPressure",
      frequency: "Twice weekly",
      target: "< 140/90 mmHg",
      instructions: "Measure after sitting quietly for 5 minutes",
      alertThresholds: {
        high: "> 160/100 mmHg",
        low: "< 90/60 mmHg"
      },
      unit: "mmHg"
    }
  ],
  tasks: [
    {
      id: "task-001",
      title: "Log Blood Glucose",
      description: "Measure and record fasting blood glucose",
      frequency: "daily",
      category: "measurement",
      assignedBy: "prov-00224", // Dr. Raj Patel
      completionStatus: false
    },
    {
      id: "task-002",
      title: "Medication: Metformin",
      description: "Take 500mg with breakfast and dinner",
      frequency: "twice-daily",
      category: "medication",
      assignedBy: "prov-00224", // Dr. Raj Patel
      completionStatus: false
    },
    {
      id: "task-003",
      title: "30-Minute Walk",
      description: "Moderate pace walking for at least 30 minutes",
      frequency: "daily",
      category: "lifestyle",
      assignedBy: "prov-00125", // Dr. Sarah Williams
      completionStatus: false
    },
    {
      id: "task-004",
      title: "Log Weight",
      description: "Weigh yourself and record measurement",
      frequency: "weekly",
      category: "measurement",
      assignedBy: "prov-00125", // Dr. Sarah Williams
      completionStatus: false
    },
    {
      id: "task-005",
      title: "Nutrition Consultation",
      description: "Virtual appointment with Emma Thompson",
      frequency: "one-time",
      dueDate: "2025-05-20T14:00:00",
      category: "appointment",
      assignedBy: "prov-00387", // Emma Thompson
      completionStatus: false,
      meetingLink: "https://londonwellness.example/virtual-visit/28734"
    },
    {
      id: "task-006",
      title: "Complete Food Journal",
      description: "Record all meals and snacks for 3 days before nutrition consultation",
      frequency: "daily",
      startDate: "2025-05-17",
      endDate: "2025-05-19",
      category: "lifestyle",
      assignedBy: "prov-00387", // Emma Thompson
      completionStatus: false
    },
    {
      id: "task-007",
      title: "Apply Calcipotriol Cream",
      description: "Apply to psoriatic plaques on knees twice daily",
      frequency: "twice-daily",
      category: "medication",
      assignedBy: "prov-00456", // Dr. Shirin Samimi-Fard
      completionStatus: false
    }
  ],
  dietPlan: {
    createdBy: "prov-00387", // Emma Thompson
    generalGuidelines: [
      "Focus on low glycemic index foods",
      "Consistent carbohydrate intake at meals",
      "Adequate protein with each meal",
      "Limit added sugars and refined carbohydrates",
      "Stay well hydrated with water"
    ],
    mealStructure: "3 main meals and 2 small snacks",
    carbGuidelines: "45-60g carbohydrates per main meal, 15-20g per snack",
    regionalAdaptations: {
      UK: "Recommended restaurant options in London: Pret A Manger (nutrition info available online), Wagamama (steamed dishes), Leon (superfood salads)",
      France: "Look for 'sans sucre' options, focus on protein and vegetables at brasseries",
      Singapore: "Hawker center options: Thunder Tea Rice, Yong Tau Foo, Sliced Fish Soup"
    }
  },
  notes: {
    provider: [
      {
        date: "2025-05-03",
        author: "Dr. Raj Patel",
        text: "Initial diagnosis. Patient very motivated. Emphasized importance of consistent monitoring during upcoming travel to Paris."
      },
      {
        date: "2025-05-10",
        author: "Dr. Olivia Brown",
        text: "Patient expresses concern about managing diet while traveling. Referred to dietitian Emma Thompson who can provide guidance for different cuisines."
      },
      {
        date: "2025-04-08",
        author: "Dr. Shirin Samimi-Fard",
        text: "Patient seen for dermatology consultation during vacation in Portugal. Diagnosed with psoriasis on knees and rosacea stadium I. Prescribed Calcipotriol cream for psoriasis. IPL/laser for rosacea to be scheduled during winter. Important to note that some diabetes medications can exacerbate psoriasis - recommend informing Dr. Patel about these conditions."
      }
    ],
    shared: [
      {
        date: "2025-05-03",
        author: "Dr. Raj Patel",
        text: "Your blood tests confirm Type 2 Diabetes. We're starting with Metformin and lifestyle changes. Your motivated approach will be a significant advantage."
      },
      {
        date: "2025-05-10",
        author: "Dr. Olivia Brown",
        text: "Your diabetes management while traveling will require planning, but is definitely achievable. The dietitian will provide specific guidance for different countries."
      },
      {
        date: "2025-04-10",
        author: "Dr. Shirin Samimi-Fard",
        text: "Follow-up on your dermatology consultation: The Calcipotriol cream should help reduce the psoriatic plaques on your knees. For your rosacea, continue with gentle skincare and we'll plan the IPL/laser treatment for this winter when sun exposure is minimal. Please inform Dr. Patel about these new skin conditions as some diabetes medications can affect your skin."
      }
    ]
  },
  insights: {
    // Only visible in Opinion Mode
    medical: {
      summary: "Recently diagnosed Type 2 Diabetes with comorbid psoriasis and rosacea. Upcoming international travel requires coordinated care across conditions.",
      recommendations: [
        "Regular monitoring is critical during the initial adjustment period",
        "Virtual follow-ups recommended during international travel",
        "Consider time zone adjustments for medication scheduling",
        "Monitor for interactions between diabetes and psoriasis, as some diabetes medications can exacerbate psoriasis symptoms"
      ],
      sources: ["American Diabetes Association", "International Diabetes Federation", "National Psoriasis Foundation"]
    },
    lifestyle: {
      summary: "International travel can complicate management of multiple conditions but planning strategies can help maintain control.",
      recommendations: [
        "Pack extra medication (including both Metformin and Calcipotriol) when traveling",
        "Maintain regular meal timing despite time zone changes",
        "Research food options at destinations in advance",
        "Wear medical identification while traveling",
        "Consider anti-inflammatory diet which may benefit both diabetes and psoriasis"
      ],
      sources: ["CDC Travel Health", "Diabetes UK Travel Guidelines", "European Academy of Dermatology"]
    },
    skinConditions: {
      summary: "Patient's psoriasis and rosacea require careful management alongside diabetes care.",
      recommendations: [
        "Monitor for flares in psoriasis which could be triggered by stress from travel",
        "Advise on sun protection, especially important for both skin conditions",
        "Consider monitoring potential psoriasis triggers in relation to diet changes that may occur due to diabetes management",
        "Schedule IPL/laser treatment for rosacea during winter months"
      ],
      sources: ["European Academy of Dermatology", "National Rosacea Society", "FACHARZTZENTRUM CARVOEIRO treatment notes"]
    }
  }
};

// Historical data (for displaying in charts)
export const glucoseReadings = [
  { date: "2025-05-04", value: 9.2, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-05", value: 8.7, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-06", value: 8.9, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-07", value: 8.4, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-08", value: 8.6, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-09", value: 8.3, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-10", value: 8.1, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-11", value: 7.9, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-12", value: 7.6, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-13", value: 7.8, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-14", value: 7.5, unit: "mmol/L", notes: "Morning fasting" }
];

export const weightReadings = [
  { date: "2025-05-03", value: 80.2, unit: "kg" },
  { date: "2025-05-10", value: 79.8, unit: "kg" }
];

export const medicationAdherence = [
  {
    medicationId: "med-001",
    medicationName: "Metformin",
    adherenceData: [
      { date: "2025-05-03", morning: true, evening: true },
      { date: "2025-05-04", morning: true, evening: true },
      { date: "2025-05-05", morning: true, evening: true },
      { date: "2025-05-06", morning: true, evening: true },
      { date: "2025-05-07", morning: true, evening: true },
      { date: "2025-05-08", morning: true, evening: false },
      { date: "2025-05-09", morning: true, evening: true },
      { date: "2025-05-10", morning: true, evening: true },
      { date: "2025-05-11", morning: false, evening: true },
      { date: "2025-05-12", morning: true, evening: true },
      { date: "2025-05-13", morning: true, evening: true },
      { date: "2025-05-14", morning: true, evening: true }
    ]
  }
];

// Patient-provider communication log
export const communicationHistory = [
  {
    id: "msg-001",
    date: "2025-05-05T14:23:00",
    from: {
      id: "pat-00456",
      name: "Maria Chen",
      type: "patient"
    },
    to: {
      id: "prov-00224",
      name: "Dr. Raj Patel",
      type: "provider"
    },
    subject: "Medication Side Effects",
    message: "I've been experiencing some stomach discomfort after taking the Metformin. Is this normal?",
    status: "read",
    priority: "normal"
  },
  {
    id: "msg-002",
    date: "2025-05-05T16:45:00",
    from: {
      id: "prov-00224",
      name: "Dr. Raj Patel",
      type: "provider"
    },
    to: {
      id: "pat-00456",
      name: "Maria Chen",
      type: "patient"
    },
    subject: "Re: Medication Side Effects",
    message: "Yes, stomach discomfort is common when starting Metformin. Try taking it in the middle of your meal rather than at the beginning. If symptoms persist beyond a week or become severe, please let me know.",
    status: "read",
    priority: "normal"
  },
  {
    id: "msg-003",
    date: "2025-05-12T09:10:00",
    from: {
      id: "prov-00387",
      name: "Emma Thompson",
      type: "provider"
    },
    to: {
      id: "pat-00456",
      name: "Maria Chen",
      type: "patient"
    },
    subject: "Nutrition Consultation Preparation",
    message: "Looking forward to our consultation on May 20th. Please complete the food journal for the three days prior so we can discuss your typical eating patterns. I've added this as a task to your care plan.",
    status: "read",
    priority: "normal"
  }
];

export default {
  diabetesPatient,
  careTeam,
  diabetesCarePlan,
  glucoseReadings,
  weightReadings,
  medicationAdherence,
  communicationHistory
};