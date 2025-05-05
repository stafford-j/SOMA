// models/healthRecordModel.js

// Define the available knowledge sources that users can enable/disable
const knowledgeSources = {
  MEDICAL: 'medical',       // Traditional medical/GP-led perspectives
  PHYSIOTHERAPY: 'physiotherapy', // Physiotherapy approaches
  HOLISTIC: 'holistic',     // Holistic/complementary approaches
  NUTRITIONAL: 'nutritional', // Diet and nutrition-focused
  AYURVEDIC: 'ayurvedic',   // Ayurvedic medicine
  EASTERN: 'eastern',       // Traditional Eastern Medicine (including TCM)
  HERBAL: 'herbal'          // Herbal remedies
};

// Define supported health record specialties (first-tier)
const recordSpecialties = {
  MEDICAL: 'medical',           // Conventional medicine
  PHYSIOTHERAPY: 'physiotherapy',
  CHIROPRACTIC: 'chiropractic',
  MASSAGE: 'massage',           // Massage/Bodywork
  MENTAL_HEALTH: 'mental_health',
  NUTRITION: 'nutrition',
  ALTERNATIVE: 'alternative',   // Alternative/Complementary
  DENTISTRY: 'dentistry',
  OPTOMETRY: 'optometry',
  OTHER: 'other'
};

// Define supported health record types (second-tier)
const recordTypes = {
  // Medical
  CONSULTATION: 'consultation',
  LABORATORY: 'laboratory',     // bloodwork, urine tests
  IMAGING: 'imaging',
  PRESCRIPTION: 'prescription',
  VACCINATION: 'vaccination',
  SURGERY: 'surgery',
  EMERGENCY: 'emergency',
  ANNUAL_PHYSICAL: 'annual_physical',
  
  // Physiotherapy
  PHYSIO_ASSESSMENT: 'physio_assessment',
  PHYSIO_TREATMENT: 'physio_treatment',
  EXERCISE_PROGRAM: 'exercise_program',
  PROGRESS_REVIEW: 'progress_review',
  
  // Chiropractic
  ADJUSTMENT: 'adjustment',
  XRAY_ASSESSMENT: 'xray_assessment',
  MAINTENANCE_VISIT: 'maintenance_visit',
  
  // Massage/Bodywork
  DEEP_TISSUE: 'deep_tissue',
  TRIGGER_POINT: 'trigger_point',
  SPORTS_MASSAGE: 'sports_massage',
  THAI_MASSAGE: 'thai_massage',
  REFLEXOLOGY: 'reflexology',
  CRANIOSACRAL: 'craniosacral',
  MYOFASCIAL: 'myofascial',
  
  // Mental Health
  THERAPY_SESSION: 'therapy_session',
  MENTAL_ASSESSMENT: 'mental_assessment',
  MEDICATION_REVIEW: 'medication_review',
  
  // Nutrition
  NUTRITION_ASSESSMENT: 'nutrition_assessment',
  NUTRITION_FOLLOWUP: 'nutrition_followup',
  DIET_PLAN: 'diet_plan',
  
  // Alternative/Complementary
  ACUPUNCTURE: 'acupuncture',
  NATUROPATHY: 'naturopathy',
  HOMEOPATHY: 'homeopathy',
  AYURVEDA: 'ayurveda',
  TCM: 'tcm',                  // Traditional Chinese Medicine
  ENERGY_HEALING: 'energy_healing',
  
  // Dentistry
  DENTAL_CHECKUP: 'dental_checkup',
  DENTAL_CLEANING: 'dental_cleaning',
  DENTAL_PROCEDURE: 'dental_procedure',
  DENTAL_SURGERY: 'dental_surgery',
  
  // Optometry
  EYE_EXAM: 'eye_exam',
  EYE_PRESCRIPTION: 'eye_prescription',
  EYE_TREATMENT: 'eye_treatment',
  
  // Legacy types (for backward compatibility)
  BLOODWORK: 'laboratory',    // mapped to laboratory
  APPOINTMENT: 'consultation', // mapped to consultation
  MEDICATION: 'prescription',  // mapped to prescription
  ALLERGY: 'consultation',     // mapped to consultation
  VITALS: 'consultation',      // mapped to consultation
  SLEEP: 'consultation',       // mapped to consultation
  EXERCISE: 'exercise_program' // mapped to exercise_program
};

// For a proof of concept, we'll use a simple class instead of MongoDB
class HealthRecord {
  constructor(id, userId, recordType, title, content, specialty = 'medical') {
    this.id = id;
    this.userId = userId;
    this.recordType = recordType;
    this.specialty = specialty; // First-tier classification
    this.title = title;
    this.content = content;
    this.date = content.date || new Date().toISOString();
  }
  
  // Helper method to clone this record
  clone() {
    return new HealthRecord(
      this.id,
      this.userId,
      this.recordType,
      this.title,
      JSON.parse(JSON.stringify(this.content)),
      this.specialty
    );
  }

  // Generate insights based on user-selected knowledge sources
  generateInsights(enabledSources = []) {
    const insights = {};
    
    // Only generate insights for enabled knowledge sources
    if (this.recordType === 'bloodwork' || this.recordType === 'laboratory') {
      // Medical insights (Western medicine)
      if (enabledSources.includes(knowledgeSources.MEDICAL)) {
        insights.medical = {
          summary: "Your bloodwork results show normal ranges for most markers.",
          recommendations: [
            "Maintain your current healthy lifestyle habits.",
            "Consider discussing your cholesterol levels at your next check-up, as they are on the upper end of normal."
          ],
          sources: [
            "American Heart Association Guidelines 2024",
            "Journal of Clinical Medicine, Vol. 42, pp. 78-92"
          ]
        };
      }
      
      // Nutritional insights
      if (enabledSources.includes(knowledgeSources.NUTRITIONAL)) {
        insights.nutritional = {
          summary: "Your cholesterol and glucose levels indicate potential dietary adjustments could be beneficial.",
          recommendations: [
            "Consider increasing foods rich in omega-3 fatty acids (fatty fish, flaxseeds).",
            "Reduce refined carbohydrate intake to help maintain glucose stability.",
            "Increase fiber consumption through whole grains, vegetables, and legumes."
          ],
          sources: [
            "Journal of Nutrition, 2024;15(3):221-230",
            "Harvard School of Public Health Dietary Guidelines"
          ]
        };
      }
      
      // Holistic insights
      if (enabledSources.includes(knowledgeSources.HOLISTIC)) {
        insights.holistic = {
          summary: "Your test results indicate potential for improved wellness through lifestyle integration.",
          recommendations: [
            "Consider mind-body practices like meditation to reduce stress, which can impact both cholesterol and blood sugar.",
            "Regular moderate exercise (30 minutes daily) may help improve these values naturally."
          ],
          sources: [
            "International Journal of Holistic Health, 2023",
            "Mind-Body Medical Institute Research Review"
          ]
        };
      }
      
      // Eastern medicine insights
      if (enabledSources.includes(knowledgeSources.EASTERN)) {
        insights.eastern = {
          summary: "From a Traditional Chinese Medicine perspective, your results suggest potential liver qi stagnation.",
          recommendations: [
            "Consider herbs like dandelion root tea to support liver function.",
            "Acupuncture points related to liver meridian might help balance energy flow."
          ],
          sources: [
            "Journal of Traditional Chinese Medicine, 2023",
            "Eastern Medicine Comprehensive Guide, 3rd Edition"
          ]
        };
      }
    }
    
    if (this.recordType === 'vaccination') {
      // Medical insights
      if (enabledSources.includes(knowledgeSources.MEDICAL)) {
        insights.medical = {
          summary: "Your COVID-19 booster vaccination is up-to-date according to current guidelines.",
          recommendations: [
            "No additional COVID-19 boosters needed at this time.",
            "Continue following standard preventive measures."
          ],
          sources: [
            "CDC Vaccination Schedule 2024",
            "WHO Immunization Guidelines"
          ]
        };
      }
      
      // Holistic insights
      if (enabledSources.includes(knowledgeSources.HOLISTIC)) {
        insights.holistic = {
          summary: "Consider supporting your immune system post-vaccination.",
          recommendations: [
            "Ensure adequate rest for 24-48 hours after vaccination.",
            "Stay well-hydrated and maintain a nutrient-rich diet during this period."
          ],
          sources: [
            "Integrative Medicine Journal, 2024",
            "Holistic Immunology Research Institute"
          ]
        };
      }
      
      // Nutritional insights
      if (enabledSources.includes(knowledgeSources.NUTRITIONAL)) {
        insights.nutritional = {
          summary: "Nutrition can play a supportive role following vaccination.",
          recommendations: [
            "Foods rich in vitamin C, D, and zinc may support immune function.",
            "Consider anti-inflammatory foods like fatty fish, berries, and turmeric."
          ],
          sources: [
            "Nutrition and Immunology Handbook, 2023",
            "Journal of Nutritional Biochemistry"
          ]
        };
      }
    }
    
    if (this.recordType === 'appointment') {
      // Medical insights
      if (enabledSources.includes(knowledgeSources.MEDICAL)) {
        insights.medical = {
          summary: "Regular physical examinations are an important part of preventive healthcare.",
          recommendations: [
            "Prepare a list of any symptoms or concerns to discuss with your doctor.",
            "Bring a list of current medications and supplements.",
            "Consider asking about age-appropriate screenings."
          ],
          sources: [
            "Preventive Care Guidelines 2024",
            "American Academy of Family Physicians"
          ]
        };
      }
      
      // Physiotherapy insights
      if (enabledSources.includes(knowledgeSources.PHYSIOTHERAPY)) {
        insights.physiotherapy = {
          summary: "Annual check-ups can benefit from physiotherapy considerations.",
          recommendations: [
            "Discuss any joint pain, mobility issues, or physical limitations.",
            "Ask about posture assessment if you have desk-based work."
          ],
          sources: [
            "American Physical Therapy Association",
            "Journal of Physiotherapy Practice"
          ]
        };
      }
    }
    
    if (this.recordType === 'imaging') {
      // Medical insights
      if (enabledSources.includes(knowledgeSources.MEDICAL)) {
        insights.medical = {
          summary: "MRI findings are consistent with a left-sided S1 radiculopathy due to L5-S1 disc protrusion and annular rupture compressing the dural sac and S1 nerve root. Conservative treatment is typically first-line.",
          recommendations: [
            "Initiate conservative treatment with NSAIDs and neuropathic agents such as gabapentin.",
            "Refer to a spine specialist if no symptom improvement after 6–8 weeks.",
            "Consider epidural steroid injection or minimally invasive discectomy if conservative treatment fails."
          ],
          sources: [
            "Johns Hopkins Radiology Review, 2021 – Lumbar Disc Pathologies and Nerve Root Compression",
            "American Association of Neurological Surgeons (AANS) Guidelines for Lumbar Disc Herniation, 2020"
          ]
        };
      }
      
      // Physiotherapy insights
      if (enabledSources.includes(knowledgeSources.PHYSIOTHERAPY)) {
        insights.physiotherapy = {
          summary: "The disc herniation pattern suggests benefit from extension-based physiotherapy. Preserved lumbar lordosis is favorable for biomechanical recovery.",
          recommendations: [
            "Start McKenzie-based extension exercises under supervision.",
            "Limit sitting to <30 minutes at a time and avoid flexion-dominant movements.",
            "Add core stabilization and neural gliding exercises targeting the S1 nerve root."
          ],
          sources: [
            "McKenzie Institute International, 2022 – Mechanical Diagnosis and Therapy for Lumbar Radiculopathy",
            "Journal of Orthopaedic & Sports Physical Therapy (JOSPT), 2021 – Evidence-Based Treatment for Lumbar Disc Herniation"
          ]
        };
      }
      
      // Holistic insights
      if (enabledSources.includes(knowledgeSources.HOLISTIC)) {
        insights.holistic = {
          summary: "Chronic inflammation and nerve irritation may benefit from an integrative approach combining anti-inflammatory nutrition and energy flow therapies like acupuncture.",
          recommendations: [
            "Introduce turmeric (curcumin) and omega-3 supplements to reduce inflammation.",
            "Practice yin yoga or gentle somatic breathwork to reduce stress-induced tension.",
            "Explore acupuncture targeting BL25–BL40 and GB30 meridians."
          ],
          sources: [
            "Harvard Integrative Medicine Newsletter, April 2023 – Multimodal Support for Lumbar Disc Disorders",
            "Traditional Chinese Medicine Journal, 2022 – Acupuncture for Lumbar Radiculopathy"
          ]
        };
      }
      
      // Mental Health insights
      if (enabledSources.includes(knowledgeSources.HOLISTIC)) {
        insights.mentalHealth = {
          summary: "Radiculopathy-related pain can be worsened by psychological factors such as fear-avoidance and catastrophizing, which increase muscle guarding and pain perception.",
          recommendations: [
            "Engage in pain-focused cognitive behavioral therapy (CBT).",
            "Use mobile apps like Curable for neuroplastic pain retraining.",
            "Incorporate mindfulness-based stress reduction (MBSR) into daily routine."
          ],
          sources: [
            "Pain Psychology Center LA, 2021 – Neuroplastic Approaches to Sciatic Pain Management",
            "Journal of Pain Research, 2022 – Mindfulness-Based Interventions for Chronic Sciatica"
          ]
        };
      }
    }
    
    if (this.recordType === 'consultation' || this.recordType === 'trigger_point') {
      // Medical insights
      if (enabledSources.includes(knowledgeSources.MEDICAL)) {
        insights.medical = {
          summary: "The patient's symptoms align with referred pain patterns caused by psoas and thoracic trigger points. These can mimic disc-related radiculopathy. Conservative manual release is an appropriate first-line treatment.",
          recommendations: [
            "Continue monitoring for any recurring nerve-related symptoms.",
            "If pain persists or radiates, seek imaging to rule out structural causes.",
            "Initiate core strengthening post-recovery to reduce future strain on psoas."
          ],
          sources: [
            "American Academy of Pain Medicine, 2022 – Differentiating Myofascial Pain vs. Disc Herniation",
            "Mayo Clinic Proceedings, 2023 – Clinical Relevance of Trigger Point Diagnosis"
          ]
        };
      }
      
      // Physiotherapy insights
      if (enabledSources.includes(knowledgeSources.PHYSIOTHERAPY)) {
        insights.physiotherapy = {
          summary: "Psoas dysfunction contributes to altered pelvic tilt and lumbar mechanics. Release should be followed by controlled movement to prevent recurrence.",
          recommendations: [
            "Begin psoas-lengthening stretches after 7–10 days of rest.",
            "Use diaphragmatic breathing to relax hip flexors.",
            "Add thoracic mobility exercises to balance posterior tension."
          ],
          sources: [
            "Journal of Bodywork & Movement Therapies, 2021 – Psoas Muscle and Pelvic Stability",
            "PhysioNetwork, 2023 – Functional Rehab after Trigger Point Release"
          ]
        };
      }
      
      // Holistic insights
      if (enabledSources.includes(knowledgeSources.HOLISTIC)) {
        insights.holistic = {
          summary: "The emotional link to chronic pain can reinforce muscular guarding. Addressing the energetic and emotional components may improve long-term outcomes.",
          recommendations: [
            "Incorporate somatic movement therapy such as Feldenkrais or gentle qigong.",
            "Consider journaling or expressive therapy to process fear-based beliefs about pain.",
            "Use calming herbs like ashwagandha or valerian to support nervous system recovery."
          ],
          sources: [
            "Integrative Therapies Review, 2022 – Energetic Perspectives on Hip-Back Pain",
            "Harvard Mind-Body Medicine Updates, 2023 – Emotional Impact of Chronic Musculoskeletal Pain"
          ]
        };
      }
      
      // Mental Health insights
      if (enabledSources.includes(knowledgeSources.HOLISTIC)) {
        insights.mentalHealth = {
          summary: "Fear of structural damage (e.g., disc herniation) can create a fear-avoidance loop, worsening muscle guarding and pain. Addressing beliefs can support recovery.",
          recommendations: [
            "Engage in psychoeducation around the brain-pain connection (e.g., Sarno model).",
            "Use tools like the Curable app or Pain Reprocessing Therapy.",
            "Practice self-compassion techniques to reframe identity from 'the guy with a bad back'."
          ],
          sources: [
            "Journal of Pain Psychology, 2021 – Identity and Chronic Pain",
            "Pain Reprocessing Therapy Manual, 2023 – Fear Avoidance and Recovery"
          ]
        };
      }
    }
    
    return insights;
  }
}

// Mock database for health records (in-memory storage)
const healthRecordsDB = [
  // Add a sample imaging record that will always be available for testing
  new HealthRecord(
    'hr1234567890', // Fixed ID for testing
    '1742961914546', // userId
    'imaging',
    'MRI Scan Results',
    {
      details: 'MRI of the lumbar spine shows L5-S1 disc protrusion with slight nerve impingement.',
      date: '2024-03-28', // Updated to 2024 per requirements
      location: 'Central Radiology',
      doctor: 'Dr. Rodriguez',
      reason: 'Lower back pain with radiating symptoms',
      diagnosis: 'L5-S1 disc herniation with mild nerve compression'
    },
    'medical' // Specialty: medical
  ),
  // Add a sample appointment record
  new HealthRecord(
    'hr0987654321', // Fixed ID for testing
    '1742961914546', // userId
    'annual_physical',
    'Annual Check-up',
    {
      details: 'Regular annual checkup with primary care physician.',
      date: '2025-11-01', // Set to November 1, 2025 for upcoming appointments
      location: 'Community Health Center',
      doctor: 'Dr. Smith',
      duration: '45 minutes',
      reason: 'Annual wellness examination',
      followUp: {
        required: true,
        date: '2026-11-01',
        notes: 'Schedule next annual checkup'
      }
    },
    'medical' // Specialty: medical
  ),
  // Add trigger point therapy consultation record
  new HealthRecord(
    'hr2468013579', // Fixed ID for testing
    '1742961914546', // userId
    'trigger_point',
    'Trigger Point Therapy – Kasa Chakra',
    {
      details: "Client presented with 6 weeks of back, leg, and sciatic pain. Practitioner assessed for and identified trigger points, especially below the pelvis (psoas region) and behind the right shoulder blade. Diagnosis was Psoas Syndrome and upper back myofascial tension. Manual therapy was performed to release the trigger points.",
      original_language: "en",
      translated_details: "Client presented with 6 weeks of back, leg, and sciatic pain. Practitioner assessed for and identified trigger points, especially below the pelvis (psoas region) and behind the right shoulder blade. Diagnosis was Psoas Syndrome and upper back myofascial tension. Manual therapy was performed to release the trigger points.",
      date: "2025-03-01", // Updated to 2025 to be most recent
      location: "Kasa Chakra, Lagos, Portugal",
      doctor: "Unknown (Bodywork Specialist)",
      duration: "60 minutes",
      reason: "Back, leg, and sciatic pain with increasing mental stress from fear of disc injury",
      diagnosis: "Psoas Syndrome and myofascial trigger points",
      followUp: {
        required: false,
        date: null,
        notes: "Rest and rehabilitation for 2–3 weeks post-treatment"
      },
      insurance: {
        provider: null,
        policyNumber: null,
        coverage: null
      },
      payment: {
        amount: "80",
        currency: "EUR",
        paid: true
      },
      files: []
    },
    'massage' // Specialty: massage/bodywork
  )
];

// Mock database for user preferences (in-memory)
const userPreferencesDB = {
  // User ID -> their enabled knowledge sources
  "1742961914546": [
    knowledgeSources.MEDICAL,
    knowledgeSources.NUTRITIONAL,
    knowledgeSources.HOLISTIC
  ]
};

// Methods to interact with our mock database
module.exports = {
  // Get all health records for a user
  getRecordsByUserId: (userId, mode = 'data') => {
    console.log(`Fetching records for user ${userId} in ${mode} mode`);
    const records = healthRecordsDB.filter(record => record.userId === userId);
    
    // If data mode, return just the raw data
    if (mode === 'data') {
      return records;
    }
    
    // If opinion mode, include insights based on user's enabled sources
    if (mode === 'opinion') {
      const userSources = userPreferencesDB[userId] || [knowledgeSources.MEDICAL];
      
      return records.map(record => {
        // Create a copy of the record to avoid modifying the original
        const recordWithInsights = { ...record };
        // Generate insights based on user's enabled sources
        recordWithInsights.insights = record.generateInsights(userSources);
        return recordWithInsights;
      });
    }
    
    // Default to data mode
    return records;
  },
  
  // Get a specific health record by ID
  getRecordById: (recordId, mode = 'data') => {
    const record = healthRecordsDB.find(record => record.id === recordId);
    
    if (!record) {
      return null;
    }
    
    // If data mode, return just the raw data
    if (mode === 'data') {
      return record;
    }
    
    // If opinion mode, include insights based on user's enabled sources
    if (mode === 'opinion') {
      const userSources = userPreferencesDB[record.userId] || [knowledgeSources.MEDICAL];
      
      // Create a copy of the record to avoid modifying the original
      const recordWithInsights = { ...record };
      // Generate insights based on user's enabled sources
      recordWithInsights.insights = record.generateInsights(userSources);
      return recordWithInsights;
    }
    
    // Default to data mode
    return record;
  },
  
  // Add a new health record
  addRecord: (userId, recordType, title, content, specialty = 'medical') => {
    console.log("Adding new health record:", { userId, recordType, title, content, specialty });
    
    const newRecord = new HealthRecord(
      `hr${Date.now()}`, // Generate a unique ID
      userId,
      recordType,
      title,
      content,
      specialty
    );
    
    healthRecordsDB.push(newRecord);
    
    console.log(`Record added successfully with ID: ${newRecord.id}`);
    console.log(`Total records in database: ${healthRecordsDB.length}`);
    console.log(`Records for user ${userId}: ${healthRecordsDB.filter(r => r.userId === userId).length}`);
    
    return newRecord;
  },
  
  // Update an existing health record
  updateRecord: (recordId, userId, recordType, title, content, specialty) => {
    console.log(`Updating health record ${recordId}:`, { userId, recordType, title, content, specialty });
    
    // For demo/testing, if recordId is not provided, create a new one
    if (!recordId) {
      console.log("No record ID provided, creating new record");
      return module.exports.addRecord(userId, recordType, title, content, specialty);
    }
    
    // Find the record index in the array
    const recordIndex = healthRecordsDB.findIndex(record => record.id === recordId);
    
    // For demo purposes, if record doesn't exist, add it
    if (recordIndex === -1) {
      console.log(`Record with ID ${recordId} not found, creating new record`);
      
      const newRecord = new HealthRecord(
        recordId,
        userId,
        recordType,
        title,
        content,
        specialty
      );
      
      healthRecordsDB.push(newRecord);
      console.log(`Record created with ID: ${newRecord.id}`);
      console.log("Current records:", healthRecordsDB.map(r => r.id));
      return newRecord;
    }
    
    // If record exists, update its properties
    console.log(`Found record at index ${recordIndex}`);
    const existingRecord = healthRecordsDB[recordIndex];
    
    existingRecord.userId = userId;
    existingRecord.recordType = recordType;
    existingRecord.title = title;
    existingRecord.content = content;
    
    // Only update specialty if it's provided
    if (specialty) {
      existingRecord.specialty = specialty;
    }
    
    // Use date from content if available, otherwise use current date
    existingRecord.date = content.date || new Date().toISOString();
    
    console.log(`Record updated successfully with ID: ${existingRecord.id}`);
    console.log("Current records:", healthRecordsDB.map(r => r.id));
    
    return existingRecord;
  },
  
  // Get available knowledge sources
  getKnowledgeSources: () => {
    return Object.values(knowledgeSources);
  },
  
  // Get available record types
  getRecordTypes: () => {
    return Object.values(recordTypes);
  },
  
  // Get available record specialties
  getRecordSpecialties: () => {
    return Object.values(recordSpecialties);
  },
  
  // Get user preferences
  getUserPreferences: (userId) => {
    return userPreferencesDB[userId] || [knowledgeSources.MEDICAL];
  },
  
  // Update user preferences
  updateUserPreferences: (userId, enabledSources) => {
    userPreferencesDB[userId] = enabledSources;
    return userPreferencesDB[userId];
  },
  
  // Export constants for use in other modules
  constants: {
    knowledgeSources,
    recordTypes,
    recordSpecialties
  }
};