import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import sampleRecords from '../data/sample-records';
import UniformHeader from '../components/layout/UniformHeader';

const RecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data Mode vs Opinion Mode state management
  const [isOpinionMode, setIsOpinionMode] = useState(false);
  
  // Perspective selection state management (all start unchecked)
  const [selectedPerspectives, setSelectedPerspectives] = useState({
    medical: false,
    holistic: false,
    mental_health: false,
    nutritional: false,
    physical_therapy: false
  });
  
  // Sources modal state
  const [showSources, setShowSources] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Toggle functions
  const setDataMode = () => {
    if (isOpinionMode) {
      console.log('Switching to Data Mode');
      setIsOpinionMode(false);
    }
  };

  const setOpinionMode = () => {
    if (!isOpinionMode) {
      console.log('Switching to Opinion Mode');
      setIsOpinionMode(true);
    }
  };

  // Handle perspective checkbox changes
  const togglePerspective = (perspectiveType) => {
    setSelectedPerspectives(prev => ({
      ...prev,
      [perspectiveType]: !prev[perspectiveType]
    }));
  };

  // Handle sources modal toggle
  const toggleSources = (perspectiveType) => {
    setShowSources(prev => ({
      ...prev,
      [perspectiveType]: !prev[perspectiveType]
    }));
  };
  
  // Find the record by ID
  const record = sampleRecords.find(r => r.id === id) || {
    id: id,
    title: `Health Record (ID: ${id})`,
    specialty: 'medical',
    recordType: 'consultation',
    date: '2025-06-10',
    description: 'This record could not be found in the database.',
    provider: 'Unknown Provider',
    location: 'Unknown Location'
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSpecialtyName = (specialty) => {
    return specialty
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatRecordType = (type) => {
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getSpecialtyColor = (specialty) => {
    const colorMap = {
      medical: 'bg-blue-100 text-blue-800',
      physiotherapy: 'bg-green-100 text-green-800',
      chiropractic: 'bg-emerald-100 text-emerald-800',
      massage: 'bg-purple-100 text-purple-800',
      mental_health: 'bg-violet-100 text-violet-800',
      nutrition: 'bg-amber-100 text-amber-800',
      alternative: 'bg-indigo-100 text-indigo-800',
      dentistry: 'bg-cyan-100 text-cyan-800',
      optometry: 'bg-sky-100 text-sky-800',
      other: 'bg-gray-100 text-gray-800'
    };
    
    return colorMap[specialty] || 'bg-gray-100 text-gray-800';
  };

  const getSpecialtyIcon = (specialty) => {
    const iconMap = {
      medical: 'fa-stethoscope',
      physiotherapy: 'fa-walking',
      chiropractic: 'fa-bone',
      massage: 'fa-hands',
      mental_health: 'fa-brain',
      nutrition: 'fa-apple-alt',
      alternative: 'fa-leaf',
      dentistry: 'fa-tooth',
      optometry: 'fa-eye',
      other: 'fa-notes-medical'
    };

    return iconMap[specialty] || 'fa-file-medical';
  };

  return (
    <div className="dashboard-container">
      <UniformHeader />
      <div className="max-w-4xl mx-auto animate-fade-in">
      <header className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white bg-aldr-teal`}>
              <i className={`fas ${getSpecialtyIcon(record.specialty)} text-xl`}></i>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold heading-gradient mb-3">{record.title}</h1>
              <div className="flex items-center space-x-3">
                <span className={`text-xs px-3 py-1 rounded-pill ${getSpecialtyColor(record.specialty)}`}>
                  {formatSpecialtyName(record.specialty)}
                </span>
                <span className="text-aldr-gray">•</span>
                <span className="text-aldr-gray">{formatRecordType(record.recordType)}</span>
                <span className="text-aldr-gray">•</span>
                <span className="text-aldr-gray">{formatDate(record.date)}</span>
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

      {/* Section 1: Quick Actions Strip */}
      <div className="mb-8">
        <div className="card">
          <h2 className="text-lg font-bold text-aldr-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            <button className="dashboard-button placeholder text-sm">
              <i className="fas fa-edit mr-2"></i>
              Edit Record
            </button>
            <button className="dashboard-button placeholder text-sm">
              <i className="fas fa-share-alt mr-2"></i>
              Share Record
            </button>
            <button className="dashboard-button placeholder text-sm">
              <i className="fas fa-download mr-2"></i>
              Export PDF
            </button>
            <button className="dashboard-button placeholder text-sm">
              <i className="fas fa-trash mr-2"></i>
              Delete Record
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: View Mode */}
      <div className="mb-8">
        <div className="card">
          <h2 className="text-lg font-bold text-aldr-dark mb-2">View Mode</h2>
          <p className={`text-sm mb-4 ${isOpinionMode ? 'text-aldr-purple' : 'text-aldr-teal'}`}>
            {isOpinionMode 
              ? 'Currently in Opinion Mode – exploring AI-generated opinions and personalized recommendations. For educational purposes only—always consult your healthcare provider for medical advice.'
              : 'Currently in Data Mode – displaying only verified medical records. Switch to Opinion Mode for personalized opinions.'
            }
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={setDataMode}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                !isOpinionMode 
                  ? 'bg-aldr-teal text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-database mr-2"></i>
              Data Mode
            </button>
            <button 
              onClick={setOpinionMode}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isOpinionMode 
                  ? 'bg-aldr-purple text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className="fas fa-brain mr-2"></i>
              Opinion Mode
            </button>
          </div>
        </div>
      </div>

      {/* Opinion Mode Knowledge Sources - Only show when Opinion Mode is active */}
      {isOpinionMode && (
        <div className="mb-8">
          <div className="card">
            <h2 className="text-lg font-bold text-aldr-dark mb-3">Opinion Mode Knowledge Sources</h2>
            <p className="text-sm text-aldr-gray mb-4">
              Choose which medical perspectives you'd like to see AI opinions from. You control your knowledge sources.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'medical', label: 'Medical Perspective', icon: 'fa-stethoscope' },
                { key: 'holistic', label: 'Holistic Perspective', icon: 'fa-leaf' },
                { key: 'mental_health', label: 'Mental Health Perspective', icon: 'fa-brain' },
                { key: 'nutritional', label: 'Nutritional Perspective', icon: 'fa-apple-alt' },
                { key: 'physical_therapy', label: 'Physical Therapy Perspective', icon: 'fa-dumbbell' }
              ].map(perspective => (
                <div key={perspective.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPerspectives[perspective.key]}
                      onChange={() => togglePerspective(perspective.key)}
                      className="w-4 h-4 text-aldr-purple border-gray-300 rounded focus:ring-aldr-purple mr-3"
                    />
                    <i className={`fas ${perspective.icon} text-aldr-purple mr-2`}></i>
                    <span className="text-sm font-medium text-aldr-dark">{perspective.label}</span>
                  </label>
                  <button
                    onClick={() => toggleSources(perspective.key)}
                    className="text-xs text-aldr-teal hover:text-aldr-purple transition-colors px-2 py-1 border border-aldr-teal rounded hover:border-aldr-purple"
                  >
                    See Sources
                  </button>
                </div>
              ))}
            </div>
            
            {/* Sources Modal/Dropdown */}
            {Object.entries(showSources).map(([perspectiveType, isVisible]) => 
              isVisible && (
                <div key={perspectiveType} className="mt-4 p-4 bg-aldr-light border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-aldr-dark capitalize">
                      {perspectiveType.replace('_', ' ')} Sources
                    </h4>
                    <button 
                      onClick={() => toggleSources(perspectiveType)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="text-sm text-aldr-gray">
                    <p className="mb-2"><strong>Research Sources:</strong></p>
                    <ul className="space-y-1 text-xs">
                      {perspectiveType === 'medical' && (
                        <>
                          <li>• Mayo Clinic Proceedings, 2023 – Clinical Guidelines</li>
                          <li>• New England Journal of Medicine, 2024</li>
                          <li>• Canadian Medical Association Guidelines</li>
                        </>
                      )}
                      {perspectiveType === 'holistic' && (
                        <>
                          <li>• Integrative Medicine Research, 2023</li>
                          <li>• Journal of Alternative Medicine, 2024</li>
                          <li>• Harvard Mind-Body Medicine Updates</li>
                        </>
                      )}
                      {perspectiveType === 'mental_health' && (
                        <>
                          <li>• Journal of Pain Psychology, 2023</li>
                          <li>• Canadian Psychological Association Guidelines</li>
                          <li>• Mental Health Commission of Canada</li>
                        </>
                      )}
                      {perspectiveType === 'nutritional' && (
                        <>
                          <li>• Dietitians of Canada Guidelines, 2024</li>
                          <li>• American Journal of Clinical Nutrition</li>
                          <li>• Diabetes Canada Nutrition Standards</li>
                        </>
                      )}
                      {perspectiveType === 'physical_therapy' && (
                        <>
                          <li>• Canadian Physiotherapy Association, 2024</li>
                          <li>• Journal of Physical Therapy Science</li>
                          <li>• Sports Medicine Research Guidelines</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Main Content - Full Width */}
      <div className="space-y-6">
          
          {!isOpinionMode ? (
            // DATA MODE - Show factual record information
            <>
              {/* Basic Information */}
              <div className="card">
            <h2 className="text-xl font-bold text-aldr-dark mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-aldr-gray mb-1">Date</h3>
                <p className="text-aldr-dark">{formatDate(record.date)}</p>
              </div>
              {record.practitioner && (
                <div>
                  <h3 className="text-sm font-medium text-aldr-gray mb-1">Practitioner</h3>
                  <p className="text-aldr-dark">{record.practitioner}</p>
                </div>
              )}
              {record.practice && (
                <div>
                  <h3 className="text-sm font-medium text-aldr-gray mb-1">Practice</h3>
                  <p className="text-aldr-dark">{record.practice}</p>
                </div>
              )}
              {record.provider && !record.practitioner && !record.practice && (
                <div>
                  <h3 className="text-sm font-medium text-aldr-gray mb-1">Healthcare Provider</h3>
                  <p className="text-aldr-dark">{record.provider}</p>
                </div>
              )}
              {record.location && (
                <div>
                  <h3 className="text-sm font-medium text-aldr-gray mb-1">Location</h3>
                  <p className="text-aldr-dark">{record.location}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-aldr-gray mb-1">Record Type</h3>
                <p className="text-aldr-dark">{formatRecordType(record.recordType)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {record.description && (
            <div className="card">
              <h2 className="text-xl font-bold text-aldr-dark mb-4">Clinical Summary</h2>
              <p className="text-aldr-gray leading-relaxed mb-4">{record.description}</p>
              
              {/* Additional clinical details based on record type */}
              <div className="bg-aldr-light p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-aldr-dark mb-2">Practitioner Report:</h3>
                <div className="text-sm text-aldr-gray space-y-2">
                  {record.specialty === 'medical' && (
                    <>
                      <p>• Patient presented for comprehensive examination and assessment</p>
                      <p>• Complete medical history reviewed and updated</p>
                      <p>• Physical examination conducted with detailed findings documented</p>
                      <p>• Treatment plan developed based on clinical presentation</p>
                    </>
                  )}
                  {record.specialty === 'physiotherapy' && (
                    <>
                      <p>• Comprehensive musculoskeletal assessment completed</p>
                      <p>• Range of motion and strength testing performed</p>
                      <p>• Functional movement patterns evaluated</p>
                      <p>• Evidence-based treatment protocol established</p>
                    </>
                  )}
                  {record.specialty === 'massage' && (
                    <>
                      <p>• Postural analysis and muscle tension assessment conducted</p>
                      <p>• Therapeutic massage techniques applied to target areas</p>
                      <p>• Client comfort and pressure tolerance monitored throughout session</p>
                      <p>• Home care recommendations provided for continued benefit</p>
                    </>
                  )}
                  {record.specialty === 'mental_health' && (
                    <>
                      <p>• Clinical interview and psychological assessment conducted</p>
                      <p>• Mental status examination completed</p>
                      <p>• Evidence-based therapeutic interventions discussed</p>
                      <p>• Progress monitoring and outcome measures established</p>
                    </>
                  )}
                  {record.specialty === 'nutrition' && (
                    <>
                      <p>• Comprehensive dietary assessment and analysis completed</p>
                      <p>• Nutritional goals established based on medical history</p>
                      <p>• Personalized meal planning and education provided</p>
                      <p>• Follow-up monitoring schedule established</p>
                    </>
                  )}
                  {record.specialty === 'dentistry' && (
                    <>
                      <p>• Comprehensive oral examination and dental charting completed</p>
                      <p>• Radiographic assessment reviewed where applicable</p>
                      <p>• Oral hygiene status evaluated and documented</p>
                      <p>• Preventive care recommendations provided</p>
                    </>
                  )}
                  {record.specialty === 'alternative' && (
                    <>
                      <p>• Holistic health assessment and consultation completed</p>
                      <p>• Traditional and complementary approaches evaluated</p>
                      <p>• Treatment protocol based on individual constitution</p>
                      <p>• Lifestyle and wellness recommendations provided</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Findings */}
          {record.findings && record.findings.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold text-aldr-dark mb-4">Findings</h2>
              <ul className="space-y-2">
                {record.findings.map((finding, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-aldr-teal mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-aldr-gray">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Treatments */}
          {record.treatments && record.treatments.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold text-aldr-dark mb-4">Treatments & Recommendations</h2>
              <ul className="space-y-2">
                {record.treatments.map((treatment, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-aldr-purple mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-aldr-gray">{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {record.results && (
            <div className="card">
              <h2 className="text-xl font-bold text-aldr-dark mb-4">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(record.results).map(([key, value]) => (
                  <div key={key} className="bg-aldr-light p-3 rounded-lg">
                    <h3 className="text-sm font-medium text-aldr-gray mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </h3>
                    <p className="text-aldr-dark font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

            </>
          ) : (
            // OPINION MODE - Show AI Insights and Multi-Perspective Analysis
            record.insights && Object.keys(record.insights).length > 0 ? (
              <div className="card">
                <h2 className="text-xl font-bold text-aldr-dark mb-4">
                  <i className="fas fa-brain mr-2 text-aldr-purple"></i>
                  Multi-Perspective Analysis
                </h2>
                <p className="text-aldr-gray mb-6">
                  Based on your health record from {formatDate(record.date)}, here are insights from multiple healthcare perspectives:
                </p>
                
                {Object.keys(selectedPerspectives).filter(key => selectedPerspectives[key]).length === 0 ? (
                  <div className="text-center py-12">
                    <i className="fas fa-brain text-4xl text-gray-300 mb-4"></i>
                    <h3 className="text-lg font-semibold text-aldr-dark mb-2">No Perspectives Selected</h3>
                    <p className="text-aldr-gray">
                      Choose medical perspectives above to see AI-generated insights and recommendations for this record.
                    </p>
                  </div>
                ) : (
                  Object.keys(selectedPerspectives)
                    .filter(perspectiveType => selectedPerspectives[perspectiveType])
                    .map((perspectiveType) => {
                      const insight = record.insights ? record.insights[perspectiveType] : null;
                  const perspectiveConfig = {
                    medical: {
                      icon: 'fa-stethoscope',
                      title: 'Medical Perspective'
                    },
                    holistic: {
                      icon: 'fa-leaf',
                      title: 'Holistic Perspective'
                    },
                    mental_health: {
                      icon: 'fa-brain',
                      title: 'Mental Health Perspective'
                    },
                    nutritional: {
                      icon: 'fa-apple-alt',
                      title: 'Nutritional Perspective'
                    },
                    physical_therapy: {
                      icon: 'fa-dumbbell',
                      title: 'Physical Therapy Perspective'
                    },
                    dental: {
                      icon: 'fa-tooth',
                      title: 'Dental Perspective'
                    }
                  };
                  
                  const config = perspectiveConfig[perspectiveType] || perspectiveConfig.medical;
                  
                  return (
                    <div key={perspectiveType} className="border border-gray-200 rounded-lg p-6 mb-6 bg-white">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-aldr-purple bg-opacity-10 flex items-center justify-center mr-3">
                          <i className={`fas ${config.icon} text-lg text-aldr-purple`}></i>
                        </div>
                        <h3 className="text-xl font-semibold text-aldr-dark">{config.title}</h3>
                      </div>
                      
                      {insight ? (
                        <>
                          <div className="bg-aldr-light p-4 rounded-lg mb-4">
                            <p className="text-aldr-gray leading-relaxed">{insight.summary}</p>
                          </div>
                          
                          {insight.recommendations && insight.recommendations.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-aldr-dark mb-3">Recommendations:</h4>
                              <ul className="space-y-2">
                                {insight.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 rounded-full bg-aldr-purple mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-aldr-gray text-sm leading-relaxed">{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {insight.sources && insight.sources.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-lg border-t border-gray-200">
                              <p className="text-xs text-aldr-gray">
                                <span className="font-semibold">Sources:</span> {insight.sources.join(', ')}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-aldr-gray italic">
                            Not relevant to this health record type. This perspective doesn't apply to this specific medical consultation.
                          </p>
                        </div>
                      )}
                    </div>
                      );
                    })
                  )}
              </div>
            ) : (
              <div className="card">
                <div className="text-center py-12">
                  <i className="fas fa-brain text-4xl text-gray-300 mb-4"></i>
                  <h3 className="text-lg font-semibold text-aldr-dark mb-2">No AI Insights Available</h3>
                  <p className="text-aldr-gray">
                    This record doesn't have AI-generated insights yet. Opinion Mode showcases our research into 
                    user-controlled AI health insights - a longer-term development goal.
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Bottom Section: Record Details & Related Records */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Record Metadata */}
          <div className="card">
            <h2 className="text-lg font-bold text-aldr-dark mb-4">Record Details</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-aldr-gray">Record ID:</span>
                <span className="block text-aldr-dark font-mono text-xs">{record.id}</span>
              </div>
              <div>
                <span className="text-aldr-gray">Added to Aldr:</span>
                <span className="block text-aldr-dark">Today</span>
              </div>
              <div>
                <span className="text-aldr-gray">Last Modified:</span>
                <span className="block text-aldr-dark">Today</span>
              </div>
              <div>
                <span className="text-aldr-gray">Access Level:</span>
                <span className="block text-aldr-dark">Private</span>
              </div>
            </div>
          </div>

          {/* Related Records */}
          <div className="card">
            <h2 className="text-lg font-bold text-aldr-dark mb-4">Related Records</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Get 3 most recent records by date */}
              {sampleRecords
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3)
                .map(relatedRecord => (
                  <div key={relatedRecord.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white bg-aldr-teal`}>
                          <i className={`fas ${getSpecialtyIcon(relatedRecord.specialty)} text-sm`}></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-aldr-dark">{relatedRecord.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-pill ${getSpecialtyColor(relatedRecord.specialty)}`}>
                            {formatSpecialtyName(relatedRecord.specialty)}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-aldr-gray">{formatDate(relatedRecord.date)}</span>
                    </div>
                    <p className="text-sm text-aldr-gray mb-3">
                      {relatedRecord.description && relatedRecord.description.length > 100
                        ? relatedRecord.description.substring(0, 100) + '...'
                        : relatedRecord.description || "No description available"}
                    </p>
                    <button 
                      onClick={() => navigate(`/record/${relatedRecord.id}`)}
                      className="btn-secondary text-sm"
                    >
                      View Details
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;