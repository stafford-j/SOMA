/**
 * Sample Health Records Data
 * 
 * This file contains demonstration data for the Aldr Health app,
 * with realistic health records spanning multiple specialties and record types.
 * Each record includes:
 * - Basic information (id, title, specialty, type, date, description)
 * - Provider information
 * - AI-generated insights with medical and holistic perspectives
 * 
 * The data is structured to demonstrate the Opinion/Data mode toggle functionality
 * and properly categorized for the dashboard's organizational features.
 * 
 * Note: This is mock data for demonstration purposes only.
 */
export const sampleRecords = [
  {
    "id": "derma-001",
    "title": "Dermatology Consultation",
    "specialty": "medical",
    "recordType": "consultation",
    "date": "2025-04-06",
    "description": "Full body skin examination at FACHARZTZENTRUM CARVOEIRO with Dr. Shirin Samimi-Fard",
    "provider": "Consultório Médico de Especialidades, Carvoeiro",
    "location": "Carvoeiro, Portugal",
    "findings": [
      "Two pigmented moles on the back (non-suspicious, to be monitored yearly)",
      "Rosacea stadium I on nose with telangiectasias and diffuse erythema",
      "Sunburn freckles on both shoulders",
      "Psoriatic plaques on knees (right more pronounced)",
      "Small wart on left leg (shaved under local anesthesia)"
    ],
    "treatments": [
      "Calcipotriol cream for psoriatic plaques (twice daily)",
      "IPL and Laser treatment for rosacea planned for winter",
      "Wart removal performed"
    ],
    "insights": {
      "medical": {
        "summary": "Multiple skin conditions identified requiring regular monitoring and targeted treatments.",
        "recommendations": [
          "Annual skin cancer screenings due to history of sunburns.",
          "Use broad-spectrum sunscreen daily.",
          "Continue Calcipotriol cream application as prescribed.",
          "Return for IPL/Laser treatment of rosacea in winter."
        ],
        "sources": ["Consultório Médico de Especialidades Carvoeiro", "Fotofinder System with AI scoring"]
      },
      "holistic": {
        "summary": "Skin conditions may be exacerbated by sun exposure and potentially linked to immune system regulation.",
        "recommendations": [
          "Maintain proper sun protection, especially for shoulders with existing sun damage.",
          "Consider anti-inflammatory diet which may help manage psoriasis symptoms.",
          "Stay adequately hydrated for overall skin health."
        ],
        "sources": ["Mayo Clinic", "European Academy of Dermatology"]
      }
    }
  },
  {
    "id": "rec-001",
    "title": "Annual Physical Exam",
    "specialty": "medical",
    "recordType": "annual_physical",
    "date": "2025-05-10",
    "description": "Routine annual checkup including vitals, physical examination, and health review.",
    "provider": "Dr. Jane Smith",
    "insights": {
      "medical": {
        "summary": "Normal exam, no acute issues. Blood pressure slightly elevated.",
        "recommendations": [
          "Monitor blood pressure at home.",
          "Increase physical activity."
        ],
        "sources": ["CDC Guidelines", "AHA Recommendations"]
      },
      "holistic": {
        "summary": "Overall good health, but stress management could be improved.",
        "recommendations": [
          "Incorporate mindfulness practices.",
          "Consider yoga or meditation."
        ],
        "sources": ["Mayo Clinic", "Harvard Health"]
      }
    }
  },
  {
    "id": "rec-002",
    "title": "Dental Cleaning",
    "specialty": "dentistry",
    "recordType": "dental_cleaning",
    "date": "2025-04-15",
    "description": "Routine dental cleaning and oral health assessment.",
    "provider": "Dr. Alan Lee",
    "insights": {
      "medical": {
        "summary": "Mild gingivitis noted, otherwise healthy dentition.",
        "recommendations": [
          "Brush and floss twice daily.",
          "Schedule next cleaning in 6 months."
        ],
        "sources": ["ADA Guidelines"]
      },
      "holistic": {
        "summary": "Oral health impacts overall wellness.",
        "recommendations": [
          "Reduce sugar intake.",
          "Use a natural mouthwash."
        ],
        "sources": ["WHO Oral Health", "Holistic Dental Association"]
      }
    }
  },
  {
    "id": "rec-003",
    "title": "Bloodwork Panel",
    "specialty": "medical",
    "recordType": "bloodwork",
    "date": "2025-05-12",
    "description": "Comprehensive metabolic panel and lipid profile.",
    "provider": "LabCorp",
    "insights": {
      "medical": {
        "summary": "Cholesterol slightly elevated, all other values within normal limits.",
        "recommendations": [
          "Adopt a heart-healthy diet.",
          "Recheck lipids in 6 months."
        ],
        "sources": ["NHLBI", "CDC"]
      },
      "holistic": {
        "summary": "Diet and lifestyle changes can improve lipid profile.",
        "recommendations": [
          "Increase fiber intake.",
          "Consider plant-based meals."
        ],
        "sources": ["Harvard T.H. Chan School of Public Health"]
      }
    }
  },
  {
    "id": "rec-004",
    "title": "Physiotherapy Assessment",
    "specialty": "physiotherapy",
    "recordType": "physio_assessment",
    "date": "2025-03-20",
    "description": "Initial assessment for lower back pain.",
    "provider": "John Doe, PT",
    "insights": {
      "medical": {
        "summary": "Mild lumbar strain, no neurological deficits.",
        "recommendations": [
          "Begin core strengthening exercises.",
          "Follow up in 2 weeks."
        ],
        "sources": ["APTA Guidelines"]
      },
      "holistic": {
        "summary": "Posture and stress may contribute to symptoms.",
        "recommendations": [
          "Practice ergonomic sitting.",
          "Incorporate stretching into daily routine."
        ],
        "sources": ["Cleveland Clinic"]
      }
    }
  },
  {
    "id": "rec-005",
    "title": "Deep Tissue Massage",
    "specialty": "massage",
    "recordType": "deep_tissue",
    "date": "2025-03-25",
    "description": "Therapeutic massage for muscle tension relief.",
    "provider": "Sarah Kim, RMT",
    "insights": {
      "medical": {
        "summary": "Reported decreased muscle tension post-session.",
        "recommendations": [
          "Continue regular massage therapy.",
          "Hydrate well after sessions."
        ],
        "sources": ["AMTA"]
      },
      "holistic": {
        "summary": "Massage supports relaxation and stress reduction.",
        "recommendations": [
          "Combine with mindfulness techniques.",
          "Schedule monthly sessions."
        ],
        "sources": ["NIH NCCIH"]
      }
    }
  },
  {
    "id": "rec-006",
    "title": "Therapy Session",
    "specialty": "mental_health",
    "recordType": "therapy_session",
    "date": "2025-04-05",
    "description": "Cognitive behavioral therapy for stress management.",
    "provider": "Dr. Emily Carter, Psychologist",
    "insights": {
      "medical": {
        "summary": "Patient reports improved coping skills.",
        "recommendations": [
          "Continue weekly sessions.",
          "Practice assigned CBT exercises."
        ],
        "sources": ["APA"]
      },
      "holistic": {
        "summary": "Mental health is integral to overall well-being.",
        "recommendations": [
          "Engage in regular physical activity.",
          "Maintain social connections."
        ],
        "sources": ["WHO Mental Health"]
      }
    }
  },
  {
    "id": "rec-007",
    "title": "Nutrition Assessment",
    "specialty": "nutrition",
    "recordType": "nutrition_assessment",
    "date": "2025-02-28",
    "description": "Dietary review and nutrition counseling.",
    "provider": "Laura Green, RD",
    "insights": {
      "medical": {
        "summary": "Diet high in processed foods, low in vegetables.",
        "recommendations": [
          "Increase intake of fruits and vegetables.",
          "Limit processed foods and sugars."
        ],
        "sources": ["USDA Dietary Guidelines"]
      },
      "holistic": {
        "summary": "Balanced nutrition supports energy and mood.",
        "recommendations": [
          "Try meal prepping.",
          "Explore Mediterranean diet."
        ],
        "sources": ["Harvard Health"]
      }
    }
  },
  {
    "id": "rec-008",
    "title": "Acupuncture Session",
    "specialty": "alternative",
    "recordType": "acupuncture",
    "date": "2025-03-10",
    "description": "Acupuncture for chronic shoulder pain.",
    "provider": "Dr. Ming Zhao, LAc",
    "insights": {
      "medical": {
        "summary": "Patient reports moderate pain relief post-session.",
        "recommendations": [
          "Continue weekly sessions for 4 weeks.",
          "Monitor pain levels."
        ],
        "sources": ["NIH Acupuncture"]
      },
      "holistic": {
        "summary": "Acupuncture may support energy flow and relaxation.",
        "recommendations": [
          "Combine with gentle stretching.",
          "Practice deep breathing exercises."
        ],
        "sources": ["NCCIH"]
      }
    }
  },
  {
    "id": "rec-009",
    "title": "Eye Exam",
    "specialty": "optometry",
    "recordType": "eye_exam",
    "date": "2025-01-18",
    "description": "Comprehensive vision and eye health assessment.",
    "provider": "Dr. Olivia Brown, OD",
    "insights": {
      "medical": {
        "summary": "Mild myopia, no signs of ocular disease.",
        "recommendations": [
          "Update prescription lenses.",
          "Annual follow-up recommended."
        ],
        "sources": ["AAO"]
      },
      "holistic": {
        "summary": "Eye health benefits from regular breaks from screens.",
        "recommendations": [
          "Practice 20-20-20 rule.",
          "Increase outdoor activities."
        ],
        "sources": ["Vision Council"]
      }
    }
  },
  {
    "id": "rec-010",
    "title": "Allergy Record",
    "specialty": "medical",
    "recordType": "allergy",
    "date": "2025-05-01",
    "description": "Documented allergy to penicillin.",
    "provider": "Dr. Jane Smith",
    "insights": {
      "medical": {
        "summary": "Penicillin allergy confirmed by history.",
        "recommendations": [
          "Avoid all penicillin-class antibiotics.",
          "Wear medical alert bracelet."
        ],
        "sources": ["AAAAI"]
      },
      "holistic": {
        "summary": "Awareness and communication of allergies is key.",
        "recommendations": [
          "Inform all healthcare providers.",
          "Consider alternative therapies if needed."
        ],
        "sources": ["Mayo Clinic"]
      }
    }
  },
  {
    "id": "rec-011",
    "title": "Chiropractic Adjustment",
    "specialty": "chiropractic",
    "recordType": "adjustment",
    "date": "2025-04-22",
    "description": "Spinal adjustment for lower back discomfort.",
    "provider": "Dr. Mark Evans, DC",
    "insights": {
      "medical": {
        "summary": "Improved range of motion post-adjustment.",
        "recommendations": [
          "Continue with recommended exercises.",
          "Schedule maintenance visits monthly."
        ],
        "sources": ["ACA"]
      },
      "holistic": {
        "summary": "Chiropractic care may support mobility and well-being.",
        "recommendations": [
          "Incorporate stretching and core work.",
          "Monitor posture during daily activities."
        ],
        "sources": ["NIH"]
      }
    }
  },
  {
    "id": "rec-012",
    "title": "Prescription: Atorvastatin",
    "specialty": "medical",
    "recordType": "prescription",
    "date": "2025-05-13",
    "description": "Prescribed atorvastatin for elevated cholesterol.",
    "provider": "Dr. Jane Smith",
    "insights": {
      "medical": {
        "summary": "Initiated statin therapy for hyperlipidemia.",
        "recommendations": [
          "Monitor for side effects.",
          "Repeat lipid panel in 3 months."
        ],
        "sources": ["AHA", "FDA"]
      },
      "holistic": {
        "summary": "Medication should be combined with lifestyle changes.",
        "recommendations": [
          "Maintain healthy diet and exercise.",
          "Track medication adherence."
        ],
        "sources": ["Harvard Health"]
      }
    }
  },
  {
    "id": "rec-013",
    "title": "Vaccination: Influenza",
    "specialty": "medical",
    "recordType": "vaccination",
    "date": "2024-10-15",
    "description": "Annual flu vaccine administered.",
    "provider": "Nurse Practitioner Lisa Wong",
    "insights": {
      "medical": {
        "summary": "Influenza vaccination up to date.",
        "recommendations": [
          "Annual vaccination recommended.",
          "Monitor for any adverse reactions."
        ],
        "sources": ["CDC"]
      },
      "holistic": {
        "summary": "Vaccination supports community immunity.",
        "recommendations": [
          "Encourage family vaccination.",
          "Support immune health with nutrition."
        ],
        "sources": ["WHO"]
      }
    }
  },
  {
    "id": "rec-014",
    "title": "Progress Review: Physiotherapy",
    "specialty": "physiotherapy",
    "recordType": "progress_review",
    "date": "2025-04-03",
    "description": "Follow-up to assess progress in back pain management.",
    "provider": "John Doe, PT",
    "insights": {
      "medical": {
        "summary": "Improved mobility, pain reduced by 50%.",
        "recommendations": [
          "Continue current exercise program.",
          "Gradually increase activity intensity."
        ],
        "sources": ["APTA"]
      },
      "holistic": {
        "summary": "Consistent movement supports recovery.",
        "recommendations": [
          "Incorporate walking into daily routine.",
          "Practice stress reduction techniques."
        ],
        "sources": ["Cleveland Clinic"]
      }
    }
  },
  {
    "id": "rec-015",
    "title": "Dental Procedure: Filling",
    "specialty": "dentistry",
    "recordType": "dental_procedure",
    "date": "2025-04-20",
    "description": "Composite filling for caries in lower molar.",
    "provider": "Dr. Alan Lee",
    "insights": {
      "medical": {
        "summary": "Cavity treated successfully, no complications.",
        "recommendations": [
          "Maintain oral hygiene.",
          "Avoid sugary snacks."
        ],
        "sources": ["ADA"]
      },
      "holistic": {
        "summary": "Dental health is linked to systemic health.",
        "recommendations": [
          "Consider xylitol gum for oral health.",
          "Regular dental checkups."
        ],
        "sources": ["Holistic Dental Association"]
      }
    }
  },
  {
    "id": "rec-016",
    "title": "Chiropractic Maintenance Visit",
    "specialty": "chiropractic",
    "recordType": "maintenance_visit",
    "date": "2025-05-15",
    "description": "Monthly maintenance adjustment for spinal health.",
    "provider": "Dr. Mark Evans, DC",
    "insights": {
      "medical": {
        "summary": "Spinal alignment maintained, no acute issues.",
        "recommendations": [
          "Continue monthly maintenance visits.",
          "Keep up with daily stretching routine."
        ],
        "sources": ["ACA"]
      },
      "holistic": {
        "summary": "Regular maintenance supports overall spinal health.",
        "recommendations": [
          "Focus on posture awareness.",
          "Consider ergonomic workplace setup."
        ],
        "sources": ["NIH"]
      }
    }
  },
  {
    "id": "rec-017",
    "title": "X-ray Assessment",
    "specialty": "chiropractic",
    "recordType": "xray_assessment",
    "date": "2025-03-08",
    "description": "Spinal X-rays to assess alignment and identify issues.",
    "provider": "Dr. Mark Evans, DC",
    "insights": {
      "medical": {
        "summary": "Mild cervical lordosis noted, lumbar spine normal.",
        "recommendations": [
          "Targeted neck exercises.",
          "Monitor cervical curve progression."
        ],
        "sources": ["ACA", "Radiology Guidelines"]
      },
      "holistic": {
        "summary": "Spinal health affects nervous system function.",
        "recommendations": [
          "Practice proper sleeping posture.",
          "Regular movement breaks during work."
        ],
        "sources": ["Spine Health Institute"]
      }
    }
  },
  {
    "id": "rec-018",
    "title": "Sports Massage",
    "specialty": "massage",
    "recordType": "sports_massage",
    "date": "2025-05-02",
    "description": "Pre-competition sports massage for muscle preparation.",
    "provider": "Sarah Kim, RMT",
    "insights": {
      "medical": {
        "summary": "Muscles prepared for athletic activity, no injuries noted.",
        "recommendations": [
          "Post-activity massage within 48 hours.",
          "Adequate hydration before and after."
        ],
        "sources": ["AMTA", "Sports Medicine Journal"]
      },
      "holistic": {
        "summary": "Sports massage enhances performance and recovery.",
        "recommendations": [
          "Combine with proper warm-up routine.",
          "Focus on recovery nutrition."
        ],
        "sources": ["NATA"]
      }
    }
  },
  {
    "id": "rec-019",
    "title": "Trigger Point Therapy",
    "specialty": "massage",
    "recordType": "trigger_point",
    "date": "2025-04-10",
    "description": "Targeted trigger point release for shoulder tension.",
    "provider": "Mike Johnson, RMT",
    "insights": {
      "medical": {
        "summary": "Multiple trigger points released, improved range of motion.",
        "recommendations": [
          "Follow-up in 2 weeks.",
          "Daily stretching routine."
        ],
        "sources": ["Trigger Point Therapy Association"]
      },
      "holistic": {
        "summary": "Trigger points often relate to stress and posture.",
        "recommendations": [
          "Address workplace ergonomics.",
          "Practice stress management techniques."
        ],
        "sources": ["Myofascial Pain Institute"]
      }
    }
  }
];

export default sampleRecords;