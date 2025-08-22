/**
 * Sarah Chen - Aldr Health Companion Demo
 * 
 * Based on Chen Family demo data
 * Management consultant navigating fertility journey across international healthcare
 */

export const sarahChenProfile = {
  id: "sarah-chen",
  name: "Sarah Chen",
  age: 34,
  role: "Management Consultant", 
  currentLocation: "Lisbon, Portugal",
  bio: "High-achieving consultant with 60% travel schedule. Navigating fertility journey across international healthcare systems.",
  
  // Personal Health Profile
  healthProfile: {
    height: "5'6\" (168 cm)",
    weight: "135 lbs (61 kg)", 
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    medicalConditions: ["Chronic migraines", "Trying to conceive"],
    emergencyContact: {
      name: "David Chen",
      relationship: "Spouse",
      phone: "+351 912 345 678"
    },
    healthInsurance: {
      provider: "Multicare Seguros",
      coverage: "Premium International",
      includes: ["Fertility treatments", "International coverage", "Private hospitals"]
    }
  }
};

export const sarahHealthRecords = [
  {
    "id": "sarah-fertility-consultation",
    "title": "Fertility Consultation & Assessment",
    "specialty": "medical",
    "recordType": "consultation",
    "date": "2025-01-15",
    "description": "Comprehensive fertility evaluation at Hospital da Luz Lisboa with Dr. Ana Rodrigues",
    "provider": "Dr. Ana Rodrigues, Reproductive Endocrinologist",
    "location": "Hospital da Luz Lisboa, Portugal",
    "findings": [
      "Age-related fertility decline (AMH 2.1 ng/mL, normal for age)",
      "Regular ovulatory cycles (28-30 days)",
      "Normal pelvic ultrasound findings",
      "HSG shows patent fallopian tubes",
      "Partner's semen analysis within normal parameters"
    ],
    "treatments": [
      "Folic acid supplementation (400mcg daily)",
      "Fertility tracking with ovulation prediction kits",
      "Lifestyle optimization for conception",
      "Follow-up in 3 months if no conception"
    ],
    "insights": {
      "medical": {
        "summary": "Fertility assessment shows normal reproductive health with age-related considerations for a 34-year-old professional.",
        "recommendations": [
          "Continue current preconception care with folic acid supplementation",
          "Monitor ovulatory cycles with prediction kits for optimal timing",
          "Consider fertility preservation consultation if conception delays beyond 6 months",
          "Maintain regular gynecological follow-ups every 6 months"
        ],
        "sources": ["Hospital da Luz Lisboa", "European Society of Human Reproduction guidelines", "Portuguese Fertility Society recommendations"]
      },
      "holistic": {
        "summary": "Fertility is enhanced by whole-person wellness, addressing stress from high-travel career and supporting natural conception.",
        "recommendations": [
          "Implement stress reduction techniques like meditation or yoga to support hormonal balance",
          "Consider fertility massage and acupuncture to improve pelvic blood flow",
          "Prioritize consistent sleep schedule despite travel demands",
          "Create supportive environment for conception with partner"
        ],
        "sources": ["Integrative Fertility Institute", "Mind-Body Fertility Research", "International Yoga Federation"]
      },
      "nutritional": {
        "summary": "Optimal nutrition supports fertility, with specific needs for frequent travelers managing international cuisine and schedules.",
        "recommendations": [
          "Mediterranean diet rich in antioxidants, healthy fats, and folate-rich foods",
          "Travel nutrition strategy: pack fertility-supporting snacks and supplements",
          "Limit caffeine to <200mg daily (1-2 cups coffee) and avoid alcohol",
          "Consider CoQ10 and Vitamin D supplementation with physician approval"
        ],
        "sources": ["American College of Obstetricians and Gynecologists", "Journal of Nutritional Fertility", "European Food Safety Authority"]
      },
      "mental_health": {
        "summary": "Fertility journey creates unique psychological stress, especially for high-achieving professionals managing career and conception goals.",
        "recommendations": [
          "Consider fertility counseling to navigate emotional aspects of trying to conceive",
          "Develop coping strategies for travel-related stress that may impact fertility",
          "Join international fertility support groups for women with demanding careers",
          "Practice self-compassion during this uncertain journey"
        ],
        "sources": ["American Society for Reproductive Medicine Psychology Guidelines", "International Fertility Counseling Society", "Fertility Network Europe"]
      },
      "physical_therapy": {
        "summary": "Physical wellness and pelvic health support fertility, with specific considerations for frequent travelers.",
        "recommendations": [
          "Pelvic floor exercises to optimize pelvic health and circulation",
          "Travel movement routine to counteract long flights and hotel stays",
          "Gentle exercise like walking or swimming to support hormonal balance",
          "Ergonomic awareness for hotel workspaces to reduce physical stress"
        ],
        "sources": ["International Pelvic Pain Society", "Women's Health Physical Therapy", "Travel Health International"]
      }
    }
  },
  {
    "id": "sarah-migraine-management", 
    "title": "Chronic Migraine Management Review",
    "specialty": "medical",
    "recordType": "consultation",
    "date": "2024-12-20",
    "description": "Quarterly migraine review with neurologist, adjusting treatment for travel schedule",
    "provider": "Dr. João Silva, Neurologist",
    "location": "Hospital CUF Descobertas, Lisboa",
    "findings": [
      "Migraine frequency: 8-10 episodes per month",
      "Travel-related triggers: time zone changes, airplane cabin pressure",
      "Hormone-related patterns: increased frequency pre-menstrually", 
      "Current medication: Sumatriptan 50mg as needed",
      "No medication overuse headache identified"
    ],
    "treatments": [
      "Continue Sumatriptan 50mg for acute episodes (max 9 per month)",
      "Magnesium oxide 400mg daily for prevention",
      "Travel strategy: hydration protocol and pressure ear plugs",
      "Sleep hygiene optimization for irregular schedules"
    ],
    "insights": {
      "medical": {
        "summary": "Well-managed chronic migraines with travel-specific triggers requiring specialized prevention strategies.",
        "recommendations": [
          "Maintain current acute treatment with Sumatriptan within safe limits",
          "Consider preventive medication if frequency increases above 10/month",
          "Monitor for interaction between migraine treatments and fertility medications",
          "Track headache patterns with mobile app for better management"
        ],
        "sources": ["Portuguese Headache Society", "International Headache Society guidelines", "European Neurological Society"]
      },
      "holistic": {
        "summary": "Migraines respond well to integrative approaches addressing triggers, stress, and lifestyle factors.",
        "recommendations": [
          "Regular biofeedback or mindfulness meditation to reduce stress-triggered migraines",
          "Essential oil therapy: peppermint or lavender for natural relief during travel",
          "Consistent sleep-wake cycle as much as possible despite time zones",
          "Consider acupuncture for migraine prevention - proven effective for frequent travelers"
        ],
        "sources": ["American Migraine Foundation", "Integrative Medicine for Headache", "World Health Organization Acupuncture Guidelines"]
      },
      "nutritional": {
        "summary": "Dietary triggers and nutrition timing significantly impact migraine frequency and severity, especially with international travel.",
        "recommendations": [
          "Identify and avoid personal food triggers: aged cheese, processed meats, MSG",
          "Travel nutrition plan: consistent meal timing, avoid skipping meals during flights",
          "Increase riboflavin (B2) and CoQ10 for migraine prevention",
          "Stay consistently hydrated: 8-10 glasses water daily, more during air travel"
        ],
        "sources": ["American Headache Society Nutrition Guidelines", "Clinical Nutrition for Neurological Disorders", "Travel Medicine International"]
      },
      "mental_health": {
        "summary": "Chronic pain conditions like migraines can create anxiety and depression, especially when combined with fertility stress.",
        "recommendations": [
          "Cognitive behavioral therapy (CBT) specifically for chronic pain management",
          "Stress management techniques to prevent stress-induced migraine episodes",
          "Address any anxiety about migraine impact on fertility and pregnancy plans",
          "Build resilience strategies for managing unpredictable pain while traveling"
        ],
        "sources": ["International Association for the Study of Pain", "Psychology of Pain Research", "Headache Medicine Psychology"]
      },
      "physical_therapy": {
        "summary": "Physical factors including posture, muscle tension, and movement patterns contribute to migraine frequency.",
        "recommendations": [
          "Neck and shoulder stretching routine for travel days and hotel stays",
          "Ergonomic assessment of home and travel workspaces",
          "Regular gentle exercise to reduce overall tension and improve sleep",
          "Massage therapy focusing on neck, shoulders, and scalp trigger points"
        ],
        "sources": ["American Physical Therapy Association", "Manual Therapy for Headache", "Travel Ergonomics Research"]
      }
    }
  },
  {
    "id": "sarah-travel-health-assessment",
    "title": "Travel Health & Wellness Assessment",
    "specialty": "medical", 
    "recordType": "consultation",
    "date": "2024-11-30",
    "description": "Pre-travel health assessment for upcoming business trips to Madrid and Dubai",
    "provider": "Dr. Maria Santos, Travel Medicine Specialist",
    "location": "Clínica Internacional de Saúde, Lisboa",
    "findings": [
      "Excellent overall health for frequent international travel",
      "Up-to-date on routine vaccinations (COVID-19, flu, hepatitis A/B)",
      "No contraindications for travel during conception attempts",
      "Blood pressure: 118/76 mmHg (normal)",
      "BMI: 21.8 (normal weight)"
    ],
    "treatments": [
      "Melatonin 3mg for jet lag management",
      "Probiotics for digestive health during travel",
      "Travel health kit: hand sanitizer, electrolyte supplements",
      "Compression socks for long flights"
    ],
    "insights": {
      "medical": {
        "summary": "Excellent health status for frequent travel with specific recommendations for maintaining wellness while trying to conceive.",
        "recommendations": [
          "Maintain consistent medication schedule across time zones",
          "Monitor for any travel-related illness that could impact fertility",
          "Ensure access to medical care in travel destinations",
          "Consider travel insurance with fertility treatment coverage"
        ],
        "sources": ["International Society of Travel Medicine", "Centers for Disease Control Travel Health", "World Health Organization Travel Guidelines"]
      },
      "holistic": {
        "summary": "Travel wellness requires balancing career demands with body's natural rhythms and fertility optimization.",
        "recommendations": [
          "Adapt meditation and wellness practices to hotel rooms and airports",
          "Maintain connection to nature even in urban travel destinations",
          "Use travel as opportunity for mindfulness and stress reduction",
          "Create rituals that provide stability despite constant location changes"
        ],
        "sources": ["International Wellness Institute", "Mindful Travel Research", "Holistic Health for Business Travel"]
      },
      "nutritional": {
        "summary": "Frequent travel poses nutritional challenges requiring strategic planning to maintain optimal health for conception.",
        "recommendations": [
          "Research healthy dining options in advance for each destination",
          "Pack fertility-supporting snacks: nuts, seeds, dried fruits",
          "Stay hydrated with electrolyte balance during flights",
          "Avoid raw foods in certain destinations to prevent illness"
        ],
        "sources": ["Travel Nutrition Guidelines", "International Food Safety Authority", "Sports Nutrition for Travel"]
      },
      "mental_health": {
        "summary": "Constant travel can create isolation and stress that impacts both mental health and fertility.",
        "recommendations": [
          "Develop coping strategies for loneliness and isolation during travel",
          "Maintain regular communication with support system (spouse, friends, family)",
          "Set boundaries around work travel to protect personal time and energy",
          "Consider travel therapy apps or online counseling for consistent support"
        ],
        "sources": ["Business Travel Mental Health Research", "International Employee Assistance Programs", "Psychology of Frequent Travel"]
      },
      "physical_therapy": {
        "summary": "Frequent travel creates physical stress requiring active management to maintain optimal health.",
        "recommendations": [
          "Airport and airplane exercises to maintain circulation and prevent blood clots",
          "Hotel room workout routine requiring no equipment",
          "Stretching routine for neck, back, and hips after long flights",
          "Consider portable fitness equipment: resistance bands, yoga mat"
        ],
        "sources": ["Aviation Medicine Research", "Travel Physical Therapy", "International Business Travel Health"]
      }
    }
  }
];

export default { sarahChenProfile, sarahHealthRecords };