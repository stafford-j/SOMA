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
      },
      "nutritional": {
        "summary": "Skin health is directly influenced by nutrition, with specific foods potentially triggering or improving conditions like psoriasis and rosacea.",
        "recommendations": [
          "Eliminate potential triggers: dairy, gluten, and high-glycemic foods may worsen psoriasis.",
          "Increase anti-inflammatory foods: fatty fish, leafy greens, and berries for skin repair.",
          "Consider probiotics to support gut-skin axis and reduce inflammatory skin conditions."
        ],
        "sources": ["Dermatology and Nutrition Research", "Journal of Investigative Dermatology"]
      },
      "mental_health": {
        "summary": "Visible skin conditions can significantly impact self-esteem and quality of life, creating psychological stress that may worsen symptoms.",
        "recommendations": [
          "Consider counseling support for body image concerns related to skin conditions.",
          "Practice stress management techniques as stress can trigger psoriasis flares.",
          "Join support groups for people with chronic skin conditions to reduce isolation."
        ],
        "sources": ["Psychological Dermatology Research", "British Journal of Dermatology"]
      },
      "physical_therapy": {
        "summary": "Movement and circulation support skin health, while proper posture can prevent skin irritation from clothing friction.",
        "recommendations": [
          "Regular exercise improves circulation which supports skin healing and repair.",
          "Gentle stretching can improve posture to reduce friction on psoriatic areas.",
          "Post-exercise skincare routine is important to prevent sweat-related skin irritation."
        ],
        "sources": ["Sports Dermatology Research", "Exercise and Skin Health Studies"]
      }
    }
  },
  {
    "id": "blood-001",
    "title": "Quarterly Blood Work",
    "specialty": "medical",
    "recordType": "laboratory",
    "date": "2025-03-15",
    "description": "Comprehensive metabolic panel and diabetes monitoring",
    "provider": "LifeLabs Medical Laboratory Services",
    "location": "Toronto, ON",
    "results": {
      "glucose": "6.8 mmol/L",
      "hba1c": "6.8%",
      "cholesterol": "4.2 mmol/L",
      "triglycerides": "1.8 mmol/L"
    },
    "insights": {
      "medical": {
        "summary": "Diabetes management showing good control with room for improvement in HbA1c levels.",
        "recommendations": [
          "Continue current medication regimen.",
          "Increase monitoring frequency to bi-weekly.",
          "Consider adjusting insulin dosage with physician consultation."
        ],
        "sources": ["Canadian Diabetes Association", "LifeLabs Reference Ranges"]
      },
      "nutritional": {
        "summary": "Blood sugar levels indicate need for continued dietary management focus.",
        "recommendations": [
          "Maintain low glycemic index diet.",
          "Consider Mediterranean diet principles.",
          "Regular meal timing to stabilize blood sugar."
        ],
        "sources": ["Diabetes Canada Nutrition Guidelines"]
      },
      "holistic": {
        "summary": "Blood sugar management benefits from whole-person approaches that address stress, sleep, and natural blood sugar support.",
        "recommendations": [
          "Prioritize 7-9 hours of quality sleep as poor sleep affects blood sugar control.",
          "Practice stress management since chronic stress elevates cortisol and blood sugar.",
          "Consider cinnamon and chromium supplements for natural blood sugar support (with physician approval)."
        ],
        "sources": ["Integrative Diabetes Management", "Journal of Alternative Medicine"]
      },
      "mental_health": {
        "summary": "Living with diabetes can create psychological stress and 'diabetes burnout' that affects blood sugar management.",
        "recommendations": [
          "Address any diabetes-related anxiety or depression with mental health support.",
          "Join diabetes support groups to connect with others managing similar challenges.",
          "Practice self-compassion when blood sugar numbers aren't perfect."
        ],
        "sources": ["Diabetes Psychology Research", "American Diabetes Association Mental Health Guidelines"]
      },
      "physical_therapy": {
        "summary": "Regular physical activity is crucial for blood sugar control and can be more effective than medication adjustments.",
        "recommendations": [
          "Aim for 150 minutes of moderate exercise weekly to improve insulin sensitivity.",
          "Include both aerobic exercise and resistance training for optimal blood sugar benefits.",
          "Monitor blood sugar before and after exercise to understand your body's response patterns."
        ],
        "sources": ["Exercise and Diabetes Research", "Canadian Diabetes Association Exercise Guidelines"]
      }
    }
  },
  {
    "id": "physio-001", 
    "title": "Lower Back Assessment",
    "specialty": "physiotherapy",
    "recordType": "physio_assessment",
    "date": "2025-02-28",
    "description": "Initial assessment for chronic lower back pain",
    "provider": "Peak Performance Physiotherapy",
    "location": "Vancouver, BC",
    "findings": [
      "Reduced lumbar flexion (40 degrees vs normal 60)",
      "Tight hip flexors and hamstrings",
      "Weak core stabilization muscles",
      "No neurological deficits"
    ],
    "treatmentPlan": [
      "Core strengthening exercises 3x/week",
      "Hip flexor stretching routine",
      "Manual therapy sessions bi-weekly",
      "Ergonomic workplace assessment"
    ],
    "insights": {
      "medical": {
        "summary": "Mechanical lower back pain with muscular imbalances requiring structured rehabilitation.",
        "recommendations": [
          "Follow prescribed exercise program consistently.",
          "Consider ergonomic improvements at workstation.",
          "Gradual return to full activity levels."
        ],
        "sources": ["Canadian Physiotherapy Association Guidelines"]
      },
      "holistic": {
        "summary": "Lower back issues often stem from lifestyle and postural habits that can be modified.",
        "recommendations": [
          "Incorporate daily movement breaks during work.",
          "Consider yoga or Pilates for flexibility and strength.",
          "Address stress management as muscle tension contributor."
        ],
        "sources": ["Integrative Medicine Research"]
      }
    }
  },
  {
    "id": "massage-001",
    "title": "Deep Tissue Massage Therapy",
    "specialty": "massage",
    "recordType": "treatment_session",
    "date": "2025-05-20",
    "description": "60-minute deep tissue massage focusing on shoulder and neck tension",
    "provider": "Healing Touch Massage Therapy",
    "location": "Vancouver, BC",
    "insights": {
      "holistic": {
        "summary": "Regular massage therapy showing positive effects on muscle tension and stress reduction.",
        "recommendations": [
          "Continue bi-weekly sessions for maintenance.",
          "Focus on posture improvement between sessions.",
          "Stay hydrated post-treatment for optimal results."
        ],
        "sources": ["Registered Massage Therapists Association"]
      },
      "medical": {
        "summary": "Massage therapy provides measurable benefits for muscle recovery, circulation, and pain management.",
        "recommendations": [
          "Document pain levels before and after sessions to track therapeutic benefits.",
          "Inform your primary care physician about massage frequency for comprehensive care coordination.",
          "Consider massage therapy as part of injury prevention strategy for repetitive strain."
        ],
        "sources": ["Journal of Clinical Medicine", "American Massage Therapy Association Research"]
      },
      "mental_health": {
        "summary": "Therapeutic touch and massage significantly reduce cortisol levels and promote parasympathetic nervous system activation.",
        "recommendations": [
          "Use massage sessions as dedicated time for mental relaxation and stress processing.",
          "Notice how reduced physical tension affects your mental state and mood.",
          "Consider massage therapy as part of anxiety and depression management plan."
        ],
        "sources": ["Psychology of Touch Research", "Stress and Massage Therapy Studies"]
      },
      "nutritional": {
        "summary": "Post-massage nutrition and hydration support the body's healing response and toxin elimination.",
        "recommendations": [
          "Increase water intake for 24 hours post-massage to support lymphatic drainage.",
          "Include anti-inflammatory foods (berries, leafy greens) to complement massage benefits.",
          "Avoid heavy meals immediately after massage to allow body to focus on recovery."
        ],
        "sources": ["Massage Therapy and Nutrition Research", "Hydration and Recovery Studies"]
      },
      "physical_therapy": {
        "summary": "Massage therapy complements active rehabilitation by improving tissue quality and movement patterns.",
        "recommendations": [
          "Coordinate massage sessions with your exercise routine for optimal recovery.",
          "Focus on gentle stretching 2-4 hours after massage when muscles are most receptive.",
          "Use massage insights about tight areas to inform your strengthening program."
        ],
        "sources": ["Physical Therapy and Massage Integration", "Sports Medicine Research"]
      }
    }
  },
  {
    "id": "massage-002",
    "title": "Relaxation Massage Session",
    "specialty": "massage",
    "recordType": "treatment_session",
    "date": "2025-04-15",
    "description": "90-minute full body relaxation massage for stress management",
    "provider": "Serenity Spa & Wellness",
    "location": "Toronto, ON",
    "insights": {
      "holistic": {
        "summary": "Stress reduction therapy supporting overall mental health and physical relaxation.",
        "recommendations": [
          "Incorporate regular massage into wellness routine.",
          "Practice breathing exercises between sessions.",
          "Consider complementary stress management techniques."
        ],
        "sources": ["International Association of Healthcare Practitioners"]
      }
    }
  },
  {
    "id": "mental-001",
    "title": "Cognitive Behavioral Therapy Session",
    "specialty": "mental_health",
    "recordType": "therapy_session",
    "date": "2025-05-25",
    "description": "CBT session focusing on anxiety management and coping strategies",
    "provider": "Dr. Sarah Martinez, Clinical Psychologist",
    "location": "Calgary, AB",
    "insights": {
      "mental_health": {
        "summary": "Progress shown in developing healthy coping mechanisms for anxiety management.",
        "recommendations": [
          "Continue weekly CBT sessions for 8 more weeks.",
          "Practice mindfulness exercises daily.",
          "Implement learned breathing techniques during stressful situations."
        ],
        "sources": ["Canadian Psychological Association", "CBT Research Institute"]
      },
      "medical": {
        "summary": "Anxiety disorders often have physical manifestations that require medical monitoring alongside psychological treatment.",
        "recommendations": [
          "Monitor blood pressure and heart rate during anxiety episodes.",
          "Consider discussing sleep quality with primary care physician.",
          "Regular physical exams to rule out underlying medical causes of anxiety."
        ],
        "sources": ["Canadian Medical Association", "Journal of Psychosomatic Medicine"]
      },
      "nutritional": {
        "summary": "Diet plays a significant role in anxiety management through gut-brain axis and blood sugar regulation.",
        "recommendations": [
          "Reduce caffeine intake which can exacerbate anxiety symptoms.",
          "Include omega-3 rich foods (fish, walnuts) for brain health.",
          "Maintain stable blood sugar with regular balanced meals."
        ],
        "sources": ["Nutritional Psychiatry Research", "American Journal of Clinical Nutrition"]
      },
      "holistic": {
        "summary": "Anxiety affects the whole person - mind, body, and spirit - requiring integrated wellness approaches.",
        "recommendations": [
          "Incorporate daily meditation or yoga practice for nervous system regulation.",
          "Spend time in nature to reduce cortisol levels naturally.",
          "Consider aromatherapy with lavender or chamomile for relaxation."
        ],
        "sources": ["Integrative Medicine Research", "Mind-Body Medicine Institute"]
      },
      "physical_therapy": {
        "summary": "Anxiety often manifests as muscle tension and poor breathing patterns that can be addressed through movement therapy.",
        "recommendations": [
          "Practice diaphragmatic breathing exercises to activate parasympathetic nervous system.",
          "Include gentle stretching for neck and shoulder tension from anxiety.",
          "Consider progressive muscle relaxation techniques as homework between sessions."
        ],
        "sources": ["Journal of Physical Therapy Science", "Anxiety and Movement Therapy Research"]
      }
    }
  },
  {
    "id": "mental-002",
    "title": "Mental Health Assessment",
    "specialty": "mental_health",
    "recordType": "consultation",
    "date": "2025-03-10",
    "description": "Initial mental health assessment and treatment plan development",
    "provider": "Community Mental Health Services",
    "location": "Halifax, NS",
    "insights": {
      "mental_health": {
        "summary": "Comprehensive assessment identifying areas for therapeutic intervention.",
        "recommendations": [
          "Begin regular therapy sessions.",
          "Consider medication consultation if symptoms persist.",
          "Develop personalized wellness plan."
        ],
        "sources": ["Mental Health Commission of Canada"]
      }
    }
  },
  {
    "id": "nutrition-001",
    "title": "Nutritional Consultation",
    "specialty": "nutrition",
    "recordType": "consultation",
    "date": "2025-04-22",
    "description": "Comprehensive dietary assessment and meal planning for diabetes management",
    "provider": "Registered Dietitian - Wellness Nutrition Centre",
    "location": "Edmonton, AB",
    "insights": {
      "nutritional": {
        "summary": "Personalized nutrition plan developed to support diabetes management goals.",
        "recommendations": [
          "Follow Mediterranean-style eating pattern.",
          "Monitor carbohydrate intake and timing.",
          "Increase fiber-rich foods and healthy fats."
        ],
        "sources": ["Dietitians of Canada", "Diabetes Canada"]
      }
    }
  },
  {
    "id": "nutrition-002",
    "title": "Follow-up Nutrition Assessment",
    "specialty": "nutrition",
    "recordType": "consultation",
    "date": "2025-06-01",
    "description": "3-month follow-up to assess progress on nutritional goals",
    "practitioner": "Dr. Sarah Thompson, RD",
    "practice": "Wellness Nutrition Centre",
    "location": "Edmonton, AB",
    "insights": {
      "nutritional": {
        "summary": "Positive progress in dietary adherence with improved blood sugar stability.",
        "recommendations": [
          "Continue current meal planning approach.",
          "Gradually increase physical activity level.",
          "Schedule next follow-up in 3 months."
        ],
        "sources": ["Dietitians of Canada"]
      },
      "medical": {
        "summary": "Nutritional improvements are showing measurable impact on diabetes management and overall metabolic health.",
        "recommendations": [
          "Request updated HbA1c levels to quantify blood sugar improvements.",
          "Monitor blood pressure as weight changes may affect cardiovascular health.",
          "Consider adjusting diabetes medications with physician if blood sugars continue improving."
        ],
        "sources": ["Canadian Diabetes Association", "Journal of Clinical Endocrinology"]
      },
      "mental_health": {
        "summary": "Successful nutrition changes can boost confidence and motivation, while food relationships affect psychological well-being.",
        "recommendations": [
          "Celebrate nutrition wins to reinforce positive behavior changes.",
          "Address any lingering food guilt or restrictive thinking patterns.",
          "Use nutrition success as motivation for other lifestyle improvements."
        ],
        "sources": ["Psychology of Eating Research", "Behavioral Nutrition Studies"]
      },
      "holistic": {
        "summary": "Nutrition improvements support whole-body healing and energy balance beyond just blood sugar management.",
        "recommendations": [
          "Notice improvements in energy, sleep quality, and mood alongside blood sugar gains.",
          "Consider seasonal eating patterns to maintain variety and enjoyment.",
          "Mindful eating practices can help maintain awareness of hunger and fullness cues."
        ],
        "sources": ["Integrative Nutrition Research", "Mindful Eating Institute"]
      },
      "physical_therapy": {
        "summary": "Improved nutrition supports exercise capacity and recovery, creating a positive cycle for metabolic health.",
        "recommendations": [
          "Coordinate meal timing with planned physical activities for optimal energy.",
          "Proper post-exercise nutrition helps with muscle recovery and blood sugar stability.",
          "Hydration improvements from better eating habits support joint health and mobility."
        ],
        "sources": ["Sports Nutrition Research", "Exercise and Diabetes Management Studies"]
      }
    }
  },
  {
    "id": "dentistry-001",
    "title": "Dental Cleaning & Checkup",
    "specialty": "dentistry",
    "recordType": "dental_cleaning",
    "date": "2025-05-10",
    "description": "Routine dental cleaning and oral health examination",
    "provider": "Dr. Jennifer Park, DDS",
    "location": "Mississauga, ON",
    "insights": {
      "medical": {
        "summary": "Oral health is strongly connected to cardiovascular health and overall systemic inflammation.",
        "recommendations": [
          "Maintain regular dental cleanings to prevent heart disease risk.",
          "Monitor for signs of gum disease which may indicate diabetes risk.",
          "Consider oral health impact when prescribing medications that affect saliva production."
        ],
        "sources": ["American Heart Association", "Journal of Periodontology"]
      },
      "nutritional": {
        "summary": "Diet directly impacts oral health through sugar exposure, acid production, and nutrient availability for gum health.",
        "recommendations": [
          "Limit sugary snacks and drinks between meals to prevent tooth decay.",
          "Include calcium-rich foods and vitamin C for strong teeth and healthy gums.",
          "Rinse with water after consuming acidic foods to protect tooth enamel."
        ],
        "sources": ["Academy of Nutrition and Dietetics", "International Journal of Dental Hygiene"]
      },
      "holistic": {
        "summary": "Oral health reflects overall body wellness and can be improved through natural preventive approaches.",
        "recommendations": [
          "Oil pulling with coconut oil may reduce harmful bacteria in the mouth.",
          "Green tea consumption provides natural antibacterial benefits for oral health.",
          "Stress management important as stress can lead to teeth grinding and gum problems."
        ],
        "sources": ["Journal of Traditional Medicine", "Holistic Dental Research"]
      },
      "mental_health": {
        "summary": "Oral health significantly impacts self-confidence and social interactions, while dental anxiety affects care compliance.",
        "recommendations": [
          "Address dental anxiety through relaxation techniques before appointments.",
          "Good oral health supports self-esteem and social confidence.",
          "Consider counseling support if dental problems are causing social withdrawal."
        ],
        "sources": ["Dental Psychology Research", "Journal of Dental Anxiety"]
      },
      "physical_therapy": {
        "summary": "Jaw alignment and neck posture directly affect oral health and dental treatment outcomes.",
        "recommendations": [
          "Address forward head posture which can contribute to TMJ problems.",
          "Include neck and jaw stretches if experiencing dental-related tension.",
          "Proper ergonomics during the day reduces teeth grinding at night."
        ],
        "sources": ["Journal of Orofacial Pain", "Physical Therapy and Dentistry Research"]
      }
    }
  },
  {
    "id": "dentistry-002",
    "title": "Dental Restoration",
    "specialty": "dentistry",
    "recordType": "dental_procedure",
    "date": "2025-02-18",
    "description": "Composite filling replacement on upper left molar",
    "provider": "Dr. Jennifer Park, DDS",
    "location": "Mississauga, ON",
    "insights": {
      "medical": {
        "summary": "Successful restoration of damaged tooth structure with proper post-operative care.",
        "recommendations": [
          "Avoid hard foods for 24 hours post-procedure.",
          "Continue regular brushing and flossing.",
          "Monitor for any sensitivity or discomfort."
        ],
        "sources": ["Canadian Dental Association"]
      },
      "nutritional": {
        "summary": "Post-dental procedure nutrition supports healing and prevents complications.",
        "recommendations": [
          "Stick to soft foods for 24-48 hours to protect the new filling.",
          "Avoid very hot or cold foods that may cause sensitivity.",
          "Include vitamin C rich foods to support gum healing around the restoration."
        ],
        "sources": ["Dental Nutrition Guidelines", "Academy of Nutrition and Dietetics"]
      },
      "holistic": {
        "summary": "Natural healing approaches can support recovery and prevent future dental issues.",
        "recommendations": [
          "Salt water rinses can help with healing and prevent infection.",
          "Avoid alcohol-based mouthwashes immediately after dental work.",
          "Gentle jaw massage may help with any post-procedure tension."
        ],
        "sources": ["Holistic Dental Care Research", "Natural Healing and Dentistry"]
      },
      "mental_health": {
        "summary": "Dental procedures can cause anxiety and managing post-procedure care affects confidence.",
        "recommendations": [
          "Practice relaxation techniques if experiencing post-procedure anxiety.",
          "Maintain good oral hygiene to build confidence in your dental health.",
          "Address any dental anxiety with your provider for future treatments."
        ],
        "sources": ["Dental Anxiety Research", "Psychological Aspects of Dental Care"]
      },
      "physical_therapy": {
        "summary": "Jaw mechanics and posture affect healing and long-term success of dental restorations.",
        "recommendations": [
          "Avoid clenching or grinding teeth which can damage new fillings.",
          "Good posture supports proper jaw alignment during healing.",
          "Gentle jaw stretches may help if experiencing tightness after the procedure."
        ],
        "sources": ["TMJ and Dental Health Research", "Postural Effects on Oral Health"]
      }
    }
  },
  {
    "id": "alternative-001",
    "title": "Acupuncture Treatment",
    "specialty": "alternative",
    "recordType": "treatment_session",
    "date": "2025-05-28",
    "description": "Acupuncture session for chronic pain management and stress relief",
    "provider": "Traditional Chinese Medicine Clinic",
    "location": "Vancouver, BC",
    "insights": {
      "holistic": {
        "summary": "Traditional therapy supporting pain management and overall wellness.",
        "recommendations": [
          "Continue weekly sessions for 6 weeks.",
          "Maintain regular sleep schedule.",
          "Consider herbal consultation for complementary support."
        ],
        "sources": ["College of Traditional Chinese Medicine Practitioners"]
      },
      "medical": {
        "summary": "Acupuncture has evidence-based benefits for chronic pain management and can complement conventional medical treatments.",
        "recommendations": [
          "Document pain levels before and after each session to track effectiveness.",
          "Inform your primary care physician about acupuncture treatments for comprehensive care coordination.",
          "Consider acupuncture as part of a multimodal pain management approach."
        ],
        "sources": ["World Health Organization", "National Institutes of Health Acupuncture Research"]
      },
      "mental_health": {
        "summary": "Acupuncture can significantly reduce stress, anxiety, and depression while promoting relaxation and emotional balance.",
        "recommendations": [
          "Use acupuncture sessions as dedicated time for mental relaxation and stress processing.",
          "Notice how reduced physical tension affects your mental state and sleep quality.",
          "Consider discussing acupuncture benefits with your mental health provider."
        ],
        "sources": ["Journal of Alternative and Complementary Medicine", "Acupuncture and Mental Health Research"]
      },
      "nutritional": {
        "summary": "Traditional Chinese Medicine views nutrition and acupuncture as complementary therapies for optimal energy flow and healing.",
        "recommendations": [
          "Avoid heavy meals 2 hours before acupuncture sessions for better energy flow.",
          "Stay well hydrated after treatments to support the body's natural healing response.",
          "Consider incorporating foods that support your specific TCM constitution as recommended by your practitioner."
        ],
        "sources": ["Traditional Chinese Medicine Nutrition Research", "Integrative Medicine and Diet Studies"]
      },
      "physical_therapy": {
        "summary": "Acupuncture complements physical therapy by reducing muscle tension, improving circulation, and enhancing movement patterns.",
        "recommendations": [
          "Schedule acupuncture sessions to complement your exercise routine for optimal pain relief.",
          "Gentle movement after acupuncture can help integrate the treatment benefits.",
          "Communicate with your physical therapist about acupuncture effects on your movement and pain levels."
        ],
        "sources": ["Acupuncture and Rehabilitation Research", "Sports Medicine and TCM Integration Studies"]
      }
    }
  },
  {
    "id": "alternative-002",
    "title": "Naturopathic Consultation",
    "specialty": "alternative",
    "recordType": "consultation",
    "date": "2025-04-30",
    "description": "Comprehensive naturopathic assessment and natural treatment planning",
    "provider": "Dr. Michael Chen, ND",
    "location": "Victoria, BC",
    "insights": {
      "holistic": {
        "summary": "Integrative approach to health focusing on natural healing and prevention.",
        "recommendations": [
          "Begin targeted supplement protocol.",
          "Implement lifestyle modifications gradually.",
          "Follow up in 6 weeks to assess progress."
        ],
        "sources": ["Canadian Association of Naturopathic Doctors"]
      },
      "medical": {
        "summary": "Naturopathic medicine can complement conventional medical care through evidence-based natural therapies and lifestyle interventions.",
        "recommendations": [
          "Share your naturopathic treatment plan with your primary care physician for coordinated care.",
          "Monitor any supplement interactions with prescribed medications.",
          "Track health markers and symptoms to measure treatment effectiveness."
        ],
        "sources": ["Integrative Medicine Research", "Canadian Association of Naturopathic Doctors Clinical Guidelines"]
      },
      "mental_health": {
        "summary": "Naturopathic approaches often address mental health through stress reduction, nutritional support, and mind-body connections.",
        "recommendations": [
          "Consider how recommended lifestyle changes may improve mood and stress levels.",
          "Discuss any herbal supplements for anxiety or depression with your mental health provider.",
          "Use naturopathic stress management techniques as part of comprehensive mental health care."
        ],
        "sources": ["Naturopathic Medicine and Mental Health Research", "Journal of Alternative Medicine Psychology"]
      },
      "nutritional": {
        "summary": "Naturopathic medicine places strong emphasis on nutrition as medicine and individualized dietary approaches.",
        "recommendations": [
          "Follow the personalized nutrition plan developed during your consultation.",
          "Track how dietary changes affect your energy levels and overall wellbeing.",
          "Consider food sensitivity testing if recommended to optimize your diet."
        ],
        "sources": ["Naturopathic Nutrition Research", "Functional Medicine and Diet Studies"]
      },
      "physical_therapy": {
        "summary": "Naturopathic treatments often include movement therapy, postural assessments, and physical wellness strategies.",
        "recommendations": [
          "Incorporate recommended movement practices into your daily routine.",
          "Consider how postural improvements suggested may reduce physical pain.",
          "Discuss naturopathic physical recommendations with your movement therapists."
        ],
        "sources": ["Naturopathic Physical Medicine", "Movement and Natural Health Research"]
      }
    }
  }
];

export default sampleRecords;