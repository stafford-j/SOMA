import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CarePlan = () => {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const carePlanData = {
    condition: 'Type 2 Diabetes',
    overallProgress: 65,
    lastUpdated: '2025-06-10',
    nextReview: '2025-09-10',
    goals: [
      {
        id: 1,
        title: 'Blood Sugar Management',
        target: 'HbA1c < 7.0%',
        current: '6.8%',
        progress: 85,
        status: 'on-track'
      },
      {
        id: 2,
        title: 'Weight Management',
        target: 'Lose 10kg',
        current: 'Lost 6kg',
        progress: 60,
        status: 'on-track'
      },
      {
        id: 3,
        title: 'Exercise Goals',
        target: '150 min/week',
        current: '120 min/week',
        progress: 80,
        status: 'on-track'
      },
      {
        id: 4,
        title: 'Medication Adherence',
        target: '100% compliance',
        current: '95% compliance',
        progress: 95,
        status: 'excellent'
      }
    ],
    medications: [
      {
        name: 'Metformin',
        dosage: '500mg twice daily',
        adherence: 98,
        nextRefill: '2025-06-25'
      },
      {
        name: 'Insulin Lantus',
        dosage: '20 units before bed',
        adherence: 92,
        nextRefill: '2025-06-30'
      }
    ],
    recentActivities: [
      {
        date: '2025-06-09',
        activity: 'Blood glucose recorded: 6.2 mmol/L',
        type: 'measurement'
      },
      {
        date: '2025-06-08',
        activity: 'Exercise: 45 min walk',
        type: 'exercise'
      },
      {
        date: '2025-06-07',
        activity: 'Medication taken: Metformin',
        type: 'medication'
      },
      {
        date: '2025-06-06',
        activity: 'Nutrition log: 1800 calories',
        type: 'nutrition'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'excellent': 'bg-green-100 text-green-800',
      'on-track': 'bg-blue-100 text-blue-800',
      'needs-attention': 'bg-yellow-100 text-yellow-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'measurement': 'fa-chart-line',
      'exercise': 'fa-running',
      'medication': 'fa-pills',
      'nutrition': 'fa-utensils'
    };
    return iconMap[type] || 'fa-circle';
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mr-4 text-white">
                <i className="fas fa-clipboard-list text-xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold heading-gradient">Care Plan</h1>
                <p className="text-aldr-gray">{carePlanData.condition} Management</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/aldr-health')}
            className="btn-secondary"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Health
          </button>
        </div>
      </header>

      {/* Overall Progress */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-aldr-dark">Overall Progress</h2>
          <span className={`px-3 py-1 rounded-pill text-sm font-medium ${getStatusColor('on-track')}`}>
            On Track
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeDasharray={`${carePlanData.overallProgress}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-600">{carePlanData.overallProgress}%</span>
              </div>
            </div>
            <h3 className="font-semibold text-aldr-dark">Overall Progress</h3>
          </div>
          
          <div>
            <h3 className="font-semibold text-aldr-dark mb-3">Key Metrics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-aldr-gray">Last Updated:</span>
                <span className="text-aldr-dark">{carePlanData.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-aldr-gray">Next Review:</span>
                <span className="text-aldr-dark">{carePlanData.nextReview}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-aldr-gray">Active Goals:</span>
                <span className="text-aldr-dark">{carePlanData.goals.length}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-aldr-dark mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary text-sm">
                <i className="fas fa-plus mr-2"></i>
                Log Measurement
              </button>
              <button className="w-full btn-secondary text-sm">
                <i className="fas fa-edit mr-2"></i>
                Update Goals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold text-aldr-dark mb-6">Treatment Goals</h2>
          <div className="space-y-6">
            {carePlanData.goals.map(goal => (
              <div key={goal.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-aldr-dark">{goal.title}</h3>
                  <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="text-sm text-aldr-gray mb-2">
                  <span className="font-medium">Target:</span> {goal.target}
                </div>
                <div className="text-sm text-aldr-gray mb-3">
                  <span className="font-medium">Current:</span> {goal.current}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-aldr-teal h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-aldr-gray mt-1 text-right">
                  {goal.progress}% complete
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="card">
          <h2 className="text-xl font-bold text-aldr-dark mb-6">Current Medications</h2>
          <div className="space-y-4">
            {carePlanData.medications.map((med, index) => (
              <div key={index} className="bg-aldr-light p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-aldr-dark">{med.name}</h3>
                  <span className="text-sm font-medium text-green-600">{med.adherence}%</span>
                </div>
                <p className="text-sm text-aldr-gray mb-2">{med.dosage}</p>
                <div className="flex items-center justify-between text-xs text-aldr-gray">
                  <span>Next refill: {med.nextRefill}</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full"
                      style={{ width: `${med.adherence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h2 className="text-xl font-bold text-aldr-dark mb-6">Recent Care Plan Activities</h2>
        <div className="space-y-4">
          {carePlanData.recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white flex-shrink-0">
                <i className={`fas ${getActivityIcon(activity.type)}`}></i>
              </div>
              <div className="flex-grow">
                <p className="text-aldr-dark font-medium">{activity.activity}</p>
                <p className="text-sm text-aldr-gray">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="btn-secondary">
            <i className="fas fa-history mr-2"></i>
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarePlan;