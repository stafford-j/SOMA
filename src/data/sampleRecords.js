/**
 * Sample Health Records for Opinion Mode Alpha Demo
 * 
 * Each record includes:
 * - Basic medical information
 * - Multi-perspective AI insights (medical, holistic, mental health, nutritional, physical therapy)
 * - Source citations for transparency
 */

export const sampleRecords = [
  {
    "id": "derma-001",
    "title": "Dermatology Consultation",
    "specialty": "medical",
    "recordType": "consultation",
    "date": "2025-04-06",
    "description": "Full body skin examination with Dr. Shirin Samimi-Fard",
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
  }
];

export default sampleRecords;