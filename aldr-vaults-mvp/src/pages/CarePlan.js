/**
 * CarePlan Component - Aldr Health Companion
 * 
 * A patient-focused interface for viewing and interacting with care plans
 * that have been created by healthcare providers and synchronized between
 * Aldr Health Colleague and Aldr Health Companion.
 * 
 * Features:
 * - Care plan progress and goals visualization
 * - Task tracking and completion
 * - Measurement logging
 * - Data/Opinion mode toggle
 * - Cross-border care adaptation
 * 
 * @author Aldr Health Team
 * @version 1.0.0
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './CarePlan.css';
import UniformHeader from '../components/layout/UniformHeader';

// Importing the care plan data (in a real app, this would be fetched from an API)
const patientData = {
  id: "1742961914546", 
  name: "James Stafford",
  avatarInitials: "JS",
  dateOfBirth: "1984-08-15"
};

// For demo, we're creating a simplified version of the care plan data from colleague app
const carePlan = {
  id: "plan-00123",
  title: "Type 2 Diabetes Management Plan",
  condition: "Type 2 Diabetes Mellitus",
  secondaryConditions: ["Psoriasis", "Rosacea Stadium I"],
  createdDate: "2025-05-03",
  modifiedDate: "2025-05-12",
  status: "active",
  createdBy: {
    name: "Dr. Olivia Brown",
    specialty: "Optometry" 
  },
  goals: [
    {
      id: "goal-001",
      title: "Blood Glucose Control",
      description: "Maintain fasting blood glucose below 7.0 mmol/L",
      targetDate: "2025-08-01",
      progress: 65
    },
    {
      id: "goal-002",
      title: "Weight Management",
      description: "Reduce weight by 5kg through diet and exercise",
      targetDate: "2025-08-15",
      progress: 30
    },
    {
      id: "goal-003",
      title: "Physical Activity",
      description: "Establish regular exercise routine",
      targetDate: "2025-06-01",
      progress: 50
    }
  ],
  careTeam: [
    {
      id: "prov-00123",
      name: "Dr. Olivia Brown",
      credentials: "OD",
      specialty: "Optometry",
      role: "Primary Care Provider",
      location: "Vista Eye Care Center"
    },
    {
      id: "prov-00224",
      name: "Dr. Raj Patel",
      credentials: "MD, FACE",
      specialty: "Endocrinology",
      role: "Diabetes Specialist",
      location: "Telemedicine"
    },
    {
      id: "prov-00387",
      name: "Emma Thompson",
      credentials: "RD, CDE",
      specialty: "Nutrition",
      role: "Dietitian",
      location: "London, UK"
    }
  ],
  tasks: [
    {
      id: "task-001",
      title: "Log Blood Glucose",
      description: "Measure and record fasting blood glucose",
      frequency: "daily",
      category: "measurement",
      dueDate: new Date().toISOString(),
      assignedBy: "Dr. Raj Patel",
      completionStatus: false
    },
    {
      id: "task-002",
      title: "Medication: Metformin",
      description: "Take 500mg with breakfast and dinner",
      frequency: "twice-daily",
      category: "medication",
      dueDate: new Date().toISOString(),
      assignedBy: "Dr. Raj Patel",
      completionStatus: false
    },
    {
      id: "task-003",
      title: "30-Minute Walk",
      description: "Moderate pace walking for at least 30 minutes",
      frequency: "daily",
      category: "lifestyle",
      dueDate: new Date().toISOString(),
      assignedBy: "Dr. Olivia Brown",
      completionStatus: false
    },
    {
      id: "task-004",
      title: "Log Weight",
      description: "Weigh yourself and record measurement",
      frequency: "weekly",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
      category: "measurement",
      assignedBy: "Dr. Olivia Brown",
      completionStatus: false
    },
    {
      id: "task-005",
      title: "Nutrition Consultation",
      description: "Virtual appointment with Emma Thompson",
      frequency: "one-time",
      dueDate: "2025-05-20T14:00:00",
      category: "appointment",
      assignedBy: "Emma Thompson",
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
      assignedBy: "Emma Thompson",
      completionStatus: false
    },
    {
      id: "task-007",
      title: "Apply Calcipotriol Cream",
      description: "Apply to psoriatic plaques on knees twice daily",
      frequency: "twice-daily",
      category: "medication",
      dueDate: new Date().toISOString(),
      assignedBy: "Dr. Shirin Samimi-Fard",
      completionStatus: false
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
        Singapore: "Glucare (same dosage)"
      }
    },
    {
      id: "med-002",
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Williams",
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
        Portugal: "Daivonex"
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
      unit: "mmol/L"
    },
    {
      id: "measure-002",
      name: "Weight",
      type: "weight",
      frequency: "Weekly, same day and time",
      target: "Gradual reduction to 75 kg",
      instructions: "Measure in the morning after using the bathroom, before breakfast",
      unit: "kg"
    },
    {
      id: "measure-003",
      name: "Blood Pressure",
      type: "bloodPressure",
      frequency: "Twice weekly",
      target: "< 140/90 mmHg",
      instructions: "Measure after sitting quietly for 5 minutes",
      unit: "mmHg"
    }
  ],
  travelInfo: {
    upcomingDestination: "Paris, France",
    dates: "2025-06-10 to 2025-06-17",
    timeZone: "Europe/Paris",
    localAdaptations: {
      medications: "Remember that Metformin may be called 'Glucophage' or 'Stagid' in France, and Calcipotriol may be labeled as 'Daivonex' or 'Psorcutan'",
      skinCare: "Pack sun protection for your psoriasis and rosacea - both conditions can be exacerbated by sun exposure",
      dietTips: "French meals tend to be later in the day. Consider adjusting medication timing to match local meal schedule.",
      emergencyInfo: "European emergency number: 112, Closest hospital to your hotel: Hôpital Saint-Antoine, Dermatology department available"
    }
  },
  // This section only visible in Opinion Mode
  insights: {
    goals: {
      bloodGlucose: {
        summary: "Your blood glucose readings show improvement. The most recent readings are closer to target range.",
        recommendations: [
          "Stay consistent with medication timing",
          "Consider checking glucose after larger meals to understand food impact"
        ],
        sources: ["American Diabetes Association", "International Diabetes Federation"]
      },
      weight: {
        summary: "Weight loss of 0.4kg is a good start. Gradual, sustainable weight loss is more effective long-term.",
        recommendations: [
          "Focus on portion control rather than restricting food groups",
          "Continue with regular physical activity"
        ],
        sources: ["CDC Healthy Weight Guidelines", "Diabetes UK"]
      }
    },
    travel: {
      summary: "Traveling with diabetes requires planning, but your upcoming trip to Paris is manageable with preparation.",
      recommendations: [
        "Pack twice as much medication as you think you'll need",
        "Carry a doctor's note explaining your medical supplies",
        "Research diabetes-friendly restaurant options near your hotel",
        "Remember the time zone difference when scheduling medication"
      ],
      sources: ["CDC Travel Health", "European Association for the Study of Diabetes"]
    },
    wellbeing: {
      summary: "Managing multiple health conditions while traveling requires careful planning. Your diabetes, psoriasis, and rosacea may all benefit from stress reduction strategies.",
      recommendations: [
        "Consider adding stress-reduction techniques to your routine",
        "Ensure adequate sleep, especially when adjusting to new time zones",
        "Stay hydrated during flights and travel days",
        "Use gentle, fragrance-free skincare products for sensitive skin",
        "Consider dietary changes - some research suggests anti-inflammatory foods may help with both diabetes and psoriasis"
      ],
      sources: ["American Psychological Association", "Journal of Diabetes Research", "National Psoriasis Foundation", "American Academy of Dermatology"]
    },
    skinConditions: {
      summary: "Your recently diagnosed skin conditions require careful management alongside your diabetes care.",
      recommendations: [
        "Apply prescribed Calcipotriol cream consistently for psoriasis",
        "Avoid triggering rosacea flares by limiting alcohol, spicy foods, and extreme temperatures",
        "Regularly moisturize affected areas, especially after bathing",
        "Use broad-spectrum, mineral-based sunscreen daily (minimum SPF 30)",
        "Consider tracking psoriasis flares in relation to stress or diet"
      ],
      sources: ["European Academy of Dermatology", "National Rosacea Society", "FACHARZTZENTRUM CARVOEIRO treatment notes"]
    }
  },
  notes: [
    {
      date: "2025-05-10",
      author: "Dr. Olivia Brown",
      text: "Your initial adjustment to Metformin is going well. Remember to stay hydrated, especially during your upcoming travel."
    },
    {
      date: "2025-05-03",
      author: "Dr. Raj Patel",
      text: "We're starting with Metformin and lifestyle changes. Your motivated approach will be a significant advantage."
    },
    {
      date: "2025-04-10",
      author: "Dr. Shirin Samimi-Fard",
      text: "Follow-up on your dermatology consultation: The Calcipotriol cream should help reduce the psoriatic plaques on your knees. For your rosacea, continue with gentle skincare and we'll plan the IPL/laser treatment for this winter when sun exposure is minimal. Please inform Dr. Patel about these new skin conditions as some diabetes medications can affect your skin."
    }
  ]
};

// Sample data for readings (in a real app, this would be from the user's own logged data)
const glucoseReadings = [
  { date: "2025-05-14", value: 7.5, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-13", value: 7.8, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-12", value: 7.6, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-11", value: 7.9, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-10", value: 8.1, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-09", value: 8.3, unit: "mmol/L", notes: "Morning fasting" },
  { date: "2025-05-08", value: 8.6, unit: "mmol/L", notes: "Morning fasting" }
];

const weightReadings = [
  { date: "2025-05-10", value: 79.8, unit: "kg" },
  { date: "2025-05-03", value: 80.2, unit: "kg" }
];

const CarePlan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [viewMode, setViewMode] = useState('data'); // 'data' or 'opinion'
  const [activePerspective, setActivePerspective] = useState('medical');
  const [syncStatus, setSyncStatus] = useState('synced'); // synced, syncing, error
  const [lastSync, setLastSync] = useState(new Date().toISOString());
  const [localPlan, setLocalPlan] = useState(carePlan);

  // Available perspectives for Opinion Mode
  const perspectives = [
    { key: 'medical', label: 'Medical', icon: 'fa-stethoscope', color: '#0066CC' },
    { key: 'holistic', label: 'Holistic', icon: 'fa-leaf', color: '#10B981' },
    { key: 'mental_health', label: 'Mental Health', icon: 'fa-brain', color: '#8B5CF6' },
    { key: 'nutritional', label: 'Nutritional', icon: 'fa-apple-alt', color: '#F59E0B' },
    { key: 'physical_therapy', label: 'Physical Therapy', icon: 'fa-dumbbell', color: '#EF4444' }
  ];
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Format date in a readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format date with time
  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };
  
  // Handle task status change
  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = localPlan.tasks.map(task => 
      task.id === taskId ? { ...task, completionStatus: newStatus } : task
    );
    
    setLocalPlan({
      ...localPlan,
      tasks: updatedTasks
    });
    
    // Simulate syncing
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setLastSync(new Date().toISOString());
    }, 1500);
  };
  
  // Handle manual sync button
  const handleSyncClick = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setLastSync(new Date().toISOString());
    }, 2000);
  };
  
  // Toggle between data and opinion mode
  const toggleViewMode = (mode) => {
    setViewMode(mode);
    if (mode === 'opinion' && !activePerspective) {
      setActivePerspective('medical');
    }
  };

  // Handle perspective change
  const handlePerspectiveChange = (perspectiveKey) => {
    setActivePerspective(perspectiveKey);
  };

  // Get task insight based on perspective
  const getTaskInsight = (taskId, perspective) => {
    const insights = {
      'task-001': {
        medical: 'Consistent morning glucose checks help identify patterns. Try to measure at the same time each day.',
        holistic: 'Morning glucose readings reflect your body\'s overnight healing. Consider meditation before testing.',
        mental_health: 'Daily glucose tracking can reduce anxiety about diabetes management and build confidence.',
        nutritional: 'Fasting glucose reflects your previous day\'s food choices. Note patterns with meal timing.',
        physical_therapy: 'Physical activity within 24 hours can significantly impact your fasting glucose readings.'
      }
    };
    return insights[taskId]?.[perspective] || insights[taskId]?.medical || 'No specific insight available for this perspective.';
  };

  // Get measurement insight based on perspective
  const getMeasurementInsight = (measurementType, perspective) => {
    const insights = {
      bloodGlucose: {
        medical: localPlan.insights.goals.bloodGlucose.summary,
        holistic: 'Your glucose levels reflect your body\'s overall balance. Consider stress reduction and sleep quality.',
        mental_health: 'Stable glucose helps maintain emotional balance. Celebrate your progress in managing diabetes.',
        nutritional: 'Your improving glucose levels show that dietary changes are working. Keep focusing on whole foods.',
        physical_therapy: 'Regular movement helps your muscles use glucose effectively. Your readings show this is working.'
      },
      weight: {
        medical: localPlan.insights.goals.weight.summary,
        holistic: 'Gradual weight loss supports your body\'s natural healing processes and improves overall vitality.',
        mental_health: 'Healthy weight loss builds confidence and reduces stress. Focus on progress, not perfection.',
        nutritional: 'Your weight loss reflects improved eating patterns. Small consistent changes create lasting results.',
        physical_therapy: 'Weight loss reduces joint stress and improves mobility. Your progress supports better movement patterns.'
      }
    };
    return insights[measurementType]?.[perspective] || insights[measurementType]?.medical || 'No specific insight available for this perspective.';
  };

  // Get wellbeing insights based on perspective
  const getWellbeingTitle = (perspective) => {
    const titles = {
      medical: 'Managing Diabetes with Evidence-Based Care',
      holistic: 'Whole-Body Wellness for Diabetes',
      mental_health: 'Emotional Balance with Chronic Conditions',
      nutritional: 'Nutritional Foundation for Health',
      physical_therapy: 'Movement as Medicine for Diabetes'
    };
    return titles[perspective] || titles.medical;
  };

  const getWellbeingInsight = (perspective) => {
    const insights = {
      medical: localPlan.insights.wellbeing.summary,
      holistic: 'Your diabetes management is part of your overall wellness journey. Integrating mindfulness, stress reduction, and quality sleep supports your body\'s natural healing processes.',
      mental_health: 'Managing multiple health conditions can feel overwhelming, but you\'re building resilience. Focus on one day at a time and celebrate small victories in your health journey.',
      nutritional: 'Your food choices are powerful medicine for diabetes, psoriasis, and rosacea. Anti-inflammatory foods like omega-3 rich fish, leafy greens, and berries support all three conditions.',
      physical_therapy: 'Regular movement improves insulin sensitivity, reduces inflammation for psoriasis, and boosts circulation for healthier skin. Even 10-minute walks make a difference.'
    };
    return insights[perspective] || insights.medical;
  };

  const getWellbeingRecommendations = (perspective) => {
    const recommendations = {
      medical: localPlan.insights.wellbeing.recommendations,
      holistic: [
        'Practice 5-10 minutes of meditation daily to reduce stress hormones',
        'Consider adaptogenic herbs like ashwagandha for stress management',
        'Prioritize 7-9 hours of quality sleep for optimal healing',
        'Use gentle, natural skincare products for sensitive skin conditions',
        'Connect with nature through outdoor activities when possible'
      ],
      mental_health: [
        'Join a diabetes support group or online community for connection',
        'Practice self-compassion when managing multiple health conditions',
        'Consider working with a diabetes educator or counselor',
        'Use positive self-talk when facing health challenges',
        'Set realistic, achievable goals to build confidence'
      ],
      nutritional: [
        'Follow a Mediterranean-style anti-inflammatory diet',
        'Include omega-3 rich foods 2-3 times per week (salmon, walnuts)',
        'Eat a rainbow of colorful vegetables daily for antioxidants',
        'Choose whole grains over refined carbohydrates',
        'Stay hydrated with water and herbal teas, limit alcohol'
      ],
      physical_therapy: [
        'Start with 10-15 minute walks after meals to improve glucose control',
        'Include resistance training 2-3 times per week for muscle health',
        'Practice gentle stretching or yoga for flexibility and stress relief',
        'Take movement breaks every hour if you have a sedentary job',
        'Listen to your body and adjust intensity based on energy levels'
      ]
    };
    return recommendations[perspective] || recommendations.medical;
  };

  const getWellbeingSources = (perspective) => {
    const sources = {
      medical: localPlan.insights.wellbeing.sources,
      holistic: ['American Journal of Lifestyle Medicine', 'Integrative Medicine Research', 'Journal of Alternative and Complementary Medicine'],
      mental_health: ['American Psychological Association', 'Diabetes Care Journal', 'Journal of Health Psychology'],
      nutritional: ['American Journal of Clinical Nutrition', 'Nutrients Journal', 'Journal of Nutritional Science'],
      physical_therapy: ['Journal of Physical Therapy', 'Sports Medicine', 'American College of Sports Medicine']
    };
    return sources[perspective] || sources.medical;
  };

  // Get travel insights based on perspective
  const getTravelInsight = (perspective) => {
    const insights = {
      medical: localPlan.insights.travel.summary,
      holistic: 'Travel offers opportunities for healing and growth. Paris has wonderful parks and walkable neighborhoods that support your wellness journey while managing your health conditions.',
      mental_health: 'Traveling with chronic conditions requires self-compassion and flexibility. Focus on enjoying the experience rather than perfect health management.',
      nutritional: 'French cuisine can be diabetes-friendly with smart choices. Fresh markets, quality ingredients, and mindful eating align with good nutrition principles.',
      physical_therapy: 'Paris is a walking city! Use this as an opportunity to increase daily movement while exploring. Metro stairs and cobblestones provide natural movement challenges.'
    };
    return insights[perspective] || insights.medical;
  };

  const getTravelRecommendations = (perspective) => {
    const recommendations = {
      medical: localPlan.insights.travel.recommendations,
      holistic: [
        'Use flight time for meditation and stress reduction',
        'Pack calming essential oils (lavender) for relaxation',
        'Stay hydrated with quality water and herbal teas',
        'Adjust gradually to new time zones to support natural rhythms',
        'Practice gratitude journaling about your travel experiences'
      ],
      mental_health: [
        'Plan rest days between activities to avoid overwhelm',
        'Create a flexible itinerary that accommodates health needs',
        'Connect with local diabetes communities or support groups',
        'Practice mindfulness while exploring new places',
        'Give yourself permission to modify plans based on how you feel'
      ],
      nutritional: [
        'Visit local markets for fresh, seasonal produce',
        'Try Mediterranean-style meals common in European cuisine',
        'Choose restaurants that offer whole foods and fresh ingredients',
        'Pack healthy snacks for stable blood sugar during travel days',
        'Enjoy French wine in moderation with meals, not on empty stomach'
      ],
      physical_therapy: [
        'Use walking tours to explore while staying active',
        'Take advantage of bike sharing programs for low-impact exercise',
        'Use hotel stairs instead of elevators when possible',
        'Do gentle stretches in your room after long walking days',
        'Plan active recovery with yoga in Paris parks'
      ]
    };
    return recommendations[perspective] || recommendations.medical;
  };

  const getTravelSources = (perspective) => {
    const sources = {
      medical: localPlan.insights.travel.sources,
      holistic: ['Integrative Travel Medicine', 'Journal of Travel and Tourism Medicine', 'Holistic Health International'],
      mental_health: ['Travel Psychology Research', 'International Journal of Mental Health', 'Psychology of Travel and Tourism'],
      nutritional: ['International Journal of Food Sciences', 'Travel Nutrition Guidelines', 'Mediterranean Diet Foundation'],
      physical_therapy: ['Active Travel Research', 'International Journal of Travel Medicine', 'European Movement Science']
    };
    return sources[perspective] || sources.medical;
  };
  
  // Calculate overall plan progress
  const calculateOverallProgress = () => {
    const totalGoals = localPlan.goals.length;
    if (totalGoals === 0) return 0;
    
    const totalProgress = localPlan.goals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / totalGoals);
  };
  
  // Get today's tasks
  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return localPlan.tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  };
  
  // Get upcoming tasks (not today, but within the next 7 days)
  const getUpcomingTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    oneWeekFromNow.setHours(0, 0, 0, 0);
    
    return localPlan.tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate > today && taskDate <= oneWeekFromNow;
    });
  };
  
  // Render sync status indicator
  const renderSyncStatus = () => {
    switch(syncStatus) {
      case 'synced':
        return (
          <div className="sync-status synced">
            <i className="fas fa-check-circle"></i>
            <span className="sync-text">Synced with your care team</span>
            <span className="sync-time">{new Date(lastSync).toLocaleTimeString()}</span>
          </div>
        );
      case 'syncing':
        return (
          <div className="sync-status syncing">
            <i className="fas fa-sync fa-spin"></i>
            <span className="sync-text">Syncing with your care team...</span>
          </div>
        );
      case 'error':
        return (
          <div className="sync-status error">
            <i className="fas fa-exclamation-triangle"></i>
            <span className="sync-text">Sync error</span>
            <button onClick={handleSyncClick} className="sync-retry-btn">Retry</button>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render today's tasks
  const renderTodayView = () => {
    const todayTasks = getTodayTasks();
    
    return (
      <div className="care-plan-view">
        <div className="today-summary">
          <div className="plan-progress">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="progress-ring">
                <path className="progress-ring-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="progress-ring-fill"
                  strokeDasharray={`${calculateOverallProgress()}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="progress-text" textAnchor="middle">{calculateOverallProgress()}%</text>
              </svg>
              <div className="progress-label">Overall Progress</div>
            </div>
            <div className="progress-info">
              <h3>Care Plan Status</h3>
              <p>{localPlan.title}</p>
              <div className="progress-details">
                <span className="progress-summary">{calculateOverallProgress()}% Complete</span>
                <span className="goals-count">{localPlan.goals.length} Active Goals</span>
              </div>
            </div>
          </div>
          
          {localPlan.travelInfo && (
            <div className="travel-notification">
              <div className="travel-icon">
                <i className="fas fa-plane"></i>
              </div>
              <div className="travel-info">
                <h4>Upcoming Travel</h4>
                <p>{localPlan.travelInfo.upcomingDestination}: {localPlan.travelInfo.dates}</p>
                {viewMode === 'opinion' && (
                  <div className="travel-insights">
                    <p className="insight-text">{localPlan.insights.travel.summary}</p>
                    <button className="show-more-btn">View Travel Tips</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="tasks-section">
          <h3 className="section-title">Today's Tasks</h3>
          {todayTasks.length > 0 ? (
            <div className="tasks-list">
              {todayTasks.map(task => (
                <div key={task.id} className={`task-item ${task.completionStatus ? 'completed' : ''}`}>
                  <div className="task-status">
                    <input 
                      type="checkbox" 
                      checked={task.completionStatus} 
                      onChange={(e) => handleTaskStatusChange(task.id, e.target.checked)}
                      id={`task-${task.id}`}
                    />
                    <label htmlFor={`task-${task.id}`} className="status-label"></label>
                  </div>
                  
                  <div className="task-content">
                    <div className="task-title">
                      {task.title}
                      <span className={`task-badge ${task.category}`}>
                        {task.category}
                      </span>
                    </div>
                    <div className="task-description">{task.description}</div>
                    <div className="task-meta">
                      <span className="task-assigned-by">
                        <i className="fas fa-user-md"></i> From: {task.assignedBy}
                      </span>
                    </div>
                    
                    {viewMode === 'opinion' && task.id === 'task-001' && (
                      <div className="task-insight">
                        <i className="fas fa-lightbulb"></i>
                        <p>{getTaskInsight(task.id, activePerspective)}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="task-actions">
                    {task.category === 'measurement' && (
                      <button className="log-data-btn">
                        <i className="fas fa-chart-line"></i>
                        Log Data
                      </button>
                    )}
                    {task.category === 'appointment' && task.meetingLink && (
                      <a href={task.meetingLink} className="join-meeting-btn" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-video"></i>
                        Join Meeting
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-tasks">
              <i className="fas fa-check-circle"></i>
              <p>You have no tasks scheduled for today!</p>
            </div>
          )}
        </div>
        
        <div className="measurements-section">
          <h3 className="section-title">Recent Measurements</h3>
          <div className="measurements-grid">
            <div className="measurement-card">
              <div className="measurement-header">
                <h4>Blood Glucose</h4>
                <span className="measurement-date">
                  Last recorded: {formatDate(glucoseReadings[0].date)}
                </span>
              </div>
              <div className="measurement-value">
                {glucoseReadings[0].value}
                <span className="measurement-unit">{glucoseReadings[0].unit}</span>
                {glucoseReadings[0].value > 7.0 ? (
                  <span className="value-indicator high">
                    <i className="fas fa-arrow-up"></i>
                  </span>
                ) : (
                  <span className="value-indicator normal">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </div>
              <div className="measurement-trend">
                <div className="trend-chart">
                  {glucoseReadings.map((reading, index) => (
                    <div 
                      key={index} 
                      className={`trend-point ${reading.value > 7.0 ? 'high' : 'normal'}`}
                      style={{
                        bottom: `${(reading.value - 5) * 10}%`,
                        left: `${index * (100 / (glucoseReadings.length - 1))}%`
                      }}
                      title={`${formatDate(reading.date)}: ${reading.value} ${reading.unit}`}
                    ></div>
                  ))}
                  <div className="trend-target" style={{bottom: '20%'}}>
                    Target: 7.0
                  </div>
                </div>
              </div>
              {viewMode === 'opinion' && (
                <div className="measurement-insight">
                  <i className="fas fa-lightbulb"></i>
                  <p>{getMeasurementInsight('bloodGlucose', activePerspective)}</p>
                </div>
              )}
              <button className="log-new-btn">
                <i className="fas fa-plus"></i> Log New Reading
              </button>
            </div>
            
            <div className="measurement-card">
              <div className="measurement-header">
                <h4>Weight</h4>
                <span className="measurement-date">
                  Last recorded: {formatDate(weightReadings[0].date)}
                </span>
              </div>
              <div className="measurement-value">
                {weightReadings[0].value}
                <span className="measurement-unit">{weightReadings[0].unit}</span>
                {weightReadings.length > 1 && weightReadings[0].value < weightReadings[1].value ? (
                  <span className="value-indicator good">
                    <i className="fas fa-arrow-down"></i>
                  </span>
                ) : weightReadings.length > 1 ? (
                  <span className="value-indicator caution">
                    <i className="fas fa-arrow-up"></i>
                  </span>
                ) : null}
              </div>
              <div className="weight-change">
                {weightReadings.length > 1 && (
                  <span className={weightReadings[0].value < weightReadings[1].value ? 'decrease' : 'increase'}>
                    {Math.abs(weightReadings[0].value - weightReadings[1].value).toFixed(1)} kg
                    {weightReadings[0].value < weightReadings[1].value ? ' lost' : ' gained'}
                    since {formatDate(weightReadings[1].date)}
                  </span>
                )}
              </div>
              {viewMode === 'opinion' && (
                <div className="measurement-insight">
                  <i className="fas fa-lightbulb"></i>
                  <p>{getMeasurementInsight('weight', activePerspective)}</p>
                </div>
              )}
              <button className="log-new-btn">
                <i className="fas fa-plus"></i> Log New Reading
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render tasks view
  const renderTasksView = () => {
    const upcomingTasks = getUpcomingTasks();
    
    return (
      <div className="care-plan-view">
        <div className="tasks-section">
          <h3 className="section-title">Upcoming Tasks</h3>
          {upcomingTasks.length > 0 ? (
            <div className="tasks-list">
              {upcomingTasks.map(task => (
                <div key={task.id} className={`task-item ${task.completionStatus ? 'completed' : ''}`}>
                  <div className="task-status">
                    <input 
                      type="checkbox" 
                      checked={task.completionStatus} 
                      onChange={(e) => handleTaskStatusChange(task.id, e.target.checked)}
                      id={`task-${task.id}`}
                    />
                    <label htmlFor={`task-${task.id}`} className="status-label"></label>
                  </div>
                  
                  <div className="task-content">
                    <div className="task-title">
                      {task.title}
                      <span className={`task-badge ${task.category}`}>
                        {task.category}
                      </span>
                    </div>
                    <div className="task-description">{task.description}</div>
                    <div className="task-due-date">
                      Due: {formatDate(task.dueDate)}
                    </div>
                    <div className="task-meta">
                      <span className="task-assigned-by">
                        <i className="fas fa-user-md"></i> From: {task.assignedBy}
                      </span>
                    </div>
                  </div>
                  
                  <div className="task-actions">
                    {task.category === 'appointment' && task.meetingLink && (
                      <a href={task.meetingLink} className="join-meeting-btn" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-calendar-alt"></i>
                        Add to Calendar
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-tasks">
              <i className="fas fa-check-circle"></i>
              <p>You have no upcoming tasks in the next 7 days!</p>
            </div>
          )}
        </div>
        
        <div className="goals-section">
          <h3 className="section-title">Care Plan Goals</h3>
          <div className="goals-list">
            {localPlan.goals.map(goal => (
              <div key={goal.id} className="goal-card">
                <div className="goal-info">
                  <h4 className="goal-title">{goal.title}</h4>
                  <p className="goal-description">{goal.description}</p>
                  <div className="goal-target">Target: {formatDate(goal.targetDate)}</div>
                </div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{width: `${goal.progress}%`}}
                    ></div>
                  </div>
                  <div className="progress-percent">{goal.progress}%</div>
                </div>
                {viewMode === 'opinion' && goal.id === 'goal-001' && (
                  <div className="goal-insight">
                    <i className="fas fa-lightbulb"></i>
                    <p>{getMeasurementInsight('bloodGlucose', activePerspective)}</p>
                  </div>
                )}
                {viewMode === 'opinion' && goal.id === 'goal-002' && (
                  <div className="goal-insight">
                    <i className="fas fa-lightbulb"></i>
                    <p>{getMeasurementInsight('weight', activePerspective)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Render care team view
  const renderCareTeamView = () => {
    return (
      <div className="care-plan-view">
        <div className="care-team-section">
          <h3 className="section-title">Your Care Team</h3>
          <div className="care-team-list">
            {localPlan.careTeam.map(provider => (
              <div key={provider.id} className="provider-card">
                <div className="provider-avatar">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="provider-info">
                  <h4 className="provider-name">{provider.name}, {provider.credentials}</h4>
                  <div className="provider-role">{provider.role}</div>
                  <div className="provider-location">
                    <i className="fas fa-map-marker-alt"></i> {provider.location}
                  </div>
                </div>
                <div className="provider-actions">
                  <button className="message-provider-btn">
                    <i className="fas fa-envelope"></i>
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="provider-notes-section">
          <h3 className="section-title">Notes from your Care Team</h3>
          <div className="notes-list">
            {localPlan.notes.map((note, index) => (
              <div key={index} className="note-card">
                <div className="note-header">
                  <div className="note-provider">{note.author}</div>
                  <div className="note-date">{formatDate(note.date)}</div>
                </div>
                <div className="note-text">{note.text}</div>
              </div>
            ))}
          </div>
        </div>
        
        {viewMode === 'opinion' && (
          <div className="wellbeing-section">
            <h3 className="section-title">Wellbeing Insights</h3>
            <div className="wellbeing-card">
              <div className="wellbeing-header">
                <i className="fas fa-heart"></i>
                <h4>{getWellbeingTitle(activePerspective)}</h4>
              </div>
              <p className="wellbeing-text">{getWellbeingInsight(activePerspective)}</p>
              <ul className="wellbeing-recommendations">
                {getWellbeingRecommendations(activePerspective).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
              <div className="insight-sources">
                <p className="sources-label">Sources:</p>
                <p className="sources-text">{getWellbeingSources(activePerspective).join(', ')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Render travel view
  const renderTravelView = () => {
    if (!localPlan.travelInfo) {
      return (
        <div className="care-plan-view">
          <div className="no-travel">
            <i className="fas fa-plane-slash"></i>
            <p>No upcoming travel information in your care plan.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="care-plan-view">
        <div className="travel-section">
          <h3 className="section-title">Travel Adaptations</h3>
          <div className="travel-card">
            <div className="travel-header">
              <i className="fas fa-plane"></i>
              <div className="travel-details">
                <h4>{localPlan.travelInfo.upcomingDestination}</h4>
                <p>{localPlan.travelInfo.dates}</p>
              </div>
            </div>
            
            <div className="travel-adaptations">
              <div className="adaptation-item">
                <div className="adaptation-icon">
                  <i className="fas fa-pills"></i>
                </div>
                <div className="adaptation-content">
                  <h5>Medication Information</h5>
                  <p>{localPlan.travelInfo.localAdaptations.medications}</p>
                </div>
              </div>
              
              <div className="adaptation-item">
                <div className="adaptation-icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <div className="adaptation-content">
                  <h5>Diet Tips</h5>
                  <p>{localPlan.travelInfo.localAdaptations.dietTips}</p>
                </div>
              </div>
              
              <div className="adaptation-item">
                <div className="adaptation-icon">
                  <i className="fas fa-ambulance"></i>
                </div>
                <div className="adaptation-content">
                  <h5>Emergency Information</h5>
                  <p>{localPlan.travelInfo.localAdaptations.emergencyInfo}</p>
                </div>
              </div>
            </div>
            
            {viewMode === 'opinion' && (
              <div className="travel-insights">
                <div className="insight-header">
                  <i className="fas fa-lightbulb"></i>
                  <h5>Travel Tips - {perspectives.find(p => p.key === activePerspective)?.label}</h5>
                </div>
                <p>{getTravelInsight(activePerspective)}</p>
                <ul className="insight-recommendations">
                  {getTravelRecommendations(activePerspective).map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
                <div className="insight-sources">
                  <p className="sources-label">Sources:</p>
                  <p className="sources-text">{getTravelSources(activePerspective).join(', ')}</p>
                </div>
              </div>
            )}
            
            <button className="download-info-btn">
              <i className="fas fa-download"></i>
              Download Travel Info Sheet
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the appropriate tab content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'today':
        return renderTodayView();
      case 'tasks':
        return renderTasksView();
      case 'careTeam':
        return renderCareTeamView();
      case 'travel':
        return renderTravelView();
      default:
        return renderTodayView();
    }
  };
  
  return (
    <div className={`patient-care-plan ${viewMode === 'opinion' ? 'opinion-mode' : 'data-mode'}`}>
      <UniformHeader />
      <div className="care-plan-header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate('/aldr-health')}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="care-plan-title">{localPlan.title}</h1>
        </div>
        
        <div className="header-right">
          <div className="mode-toggle-container">
            <button 
              className={`mode-toggle ${viewMode === 'data' ? 'active' : ''}`}
              onClick={() => toggleViewMode('data')}
            >
              <i className="fas fa-chart-bar"></i>
              <span className="toggle-text">Data</span>
            </button>
            <button 
              className={`mode-toggle ${viewMode === 'opinion' ? 'active' : ''}`}
              onClick={() => toggleViewMode('opinion')}
            >
              <i className="fas fa-lightbulb"></i>
              <span className="toggle-text">Opinion</span>
            </button>
          </div>
          
          {viewMode === 'opinion' && (
            <div className="perspective-selector">
              {perspectives.map(perspective => (
                <button
                  key={perspective.key}
                  className={`perspective-btn ${activePerspective === perspective.key ? 'active' : ''}`}
                  onClick={() => handlePerspectiveChange(perspective.key)}
                  style={{ '--perspective-color': perspective.color }}
                  title={perspective.label}
                >
                  <i className={`fas ${perspective.icon}`}></i>
                </button>
              ))}
            </div>
          )}
          
          {renderSyncStatus()}
          
          <button className="sync-button" onClick={handleSyncClick}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      
      <div className="care-plan-tabs">
        <button 
          className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          <i className="fas fa-calendar-day"></i>
          <span className="tab-text">Today</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <i className="fas fa-tasks"></i>
          <span className="tab-text">Tasks & Goals</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'careTeam' ? 'active' : ''}`}
          onClick={() => setActiveTab('careTeam')}
        >
          <i className="fas fa-user-md"></i>
          <span className="tab-text">Care Team</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'travel' ? 'active' : ''}`}
          onClick={() => setActiveTab('travel')}
        >
          <i className="fas fa-plane"></i>
          <span className="tab-text">Travel</span>
        </button>
      </div>
      
      <div className="care-plan-content">
        {renderActiveTabContent()}
      </div>
    </div>
  );
};

export default CarePlan;