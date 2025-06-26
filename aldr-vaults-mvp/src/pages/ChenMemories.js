/**
 * Chen Family Memories Vault
 * 
 * A digital memory and family heritage management dashboard for organizing:
 * - Family memories, photos, and personal documentation
 * - Life milestone tracking and documentation
 * - Personal journey and relationship memories
 * - Travel memories and experiences
 * - Family heritage and history preservation
 * 
 * Features:
 * - Family mode support (combine Sarah + David records)
 * - Individual mode support (show specific person)
 * - Cross-vault linking to Chen Legal for inheritance
 * - Memory preservation reminders
 * - Heritage documentation organization
 * 
 * @author Aldr Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import chenFamilyData from '../data/chen-family-data';
import '../styles/Dashboard.css';

const ChenMemories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [familyMode, setFamilyMode] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('sarah');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get mode and person from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    const person = params.get('person');
    
    if (mode === 'family') {
      setFamilyMode(true);
      setSelectedPerson('family');
    } else {
      setFamilyMode(false);
      setSelectedPerson(person || 'sarah');
    }
  }, [location]);

  // Helper functions defined before usage to avoid hoisting issues
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      personal_journey: 'fa-heart',
      career_achievements: 'fa-trophy',
      life_milestones: 'fa-star',
      travel_memories: 'fa-camera',
      family_history: 'fa-tree',
      photo_collections: 'fa-images',
      journal_entries: 'fa-book',
      creative_projects: 'fa-palette',
      relationship_memories: 'fa-heart',
      lifestyle_documentation: 'fa-home',
      personal_growth: 'fa-seedling',
      other: 'fa-folder'
    };
    return iconMap[category] || 'fa-folder';
  };

  const formatCategoryName = (category) => {
    return category
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getStatusColor = (status) => {
    const colorMap = {
      completed: 'bg-green-100 text-green-800',
      ongoing: 'bg-yellow-100 text-yellow-800',
      planned: 'bg-purple-100 text-purple-800',
      active: 'bg-blue-100 text-blue-800',
      documented: 'bg-green-100 text-green-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const getPersonDisplayName = () => {
    if (familyMode) return 'Chen Family';
    return selectedPerson === 'sarah' ? 'Sarah Chen' : 'David Chen';
  };

  const navigateToChenfamily = () => {
    // Preserve current mode and person context when going back
    const params = familyMode 
      ? '?mode=family'
      : `?mode=individual&person=${selectedPerson}`;
    navigate(`/chen-family${params}`);
  };

  const getRecords = () => {
    if (familyMode) {
      // Family mode: combine both person's records with owner field
      const sarahRecords = chenFamilyData.sarah.memories.map(record => ({ 
        ...record, 
        owner: 'Sarah Chen',
        status: record.status || 'documented',
        date: record.date || record.startDate || '2024-01-01'
      }));
      const davidRecords = chenFamilyData.david.memories.map(record => ({ 
        ...record, 
        owner: 'David Chen',
        status: record.status || 'documented',
        date: record.date || record.startDate || '2024-01-01'
      }));
      
      return [...sarahRecords, ...davidRecords]
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      // Individual mode: show selected person's records
      const personRecords = selectedPerson === 'sarah' 
        ? chenFamilyData.sarah.memories 
        : chenFamilyData.david.memories;
      
      return personRecords.map(record => ({
        ...record,
        status: record.status || 'documented',
        date: record.date || record.startDate || '2024-01-01'
      }));
    }
  };

  // Use Chen Family memories data
  const actualRecords = getRecords();

  // Memory preservation reminders
  const memoryReminders = [
    {
      id: 'reminder-1',
      title: 'Complete Family Heritage Project',
      dueDate: '2025-07-01',
      lastDate: '2025-03-15',
      priority: 'medium',
      icon: 'fa-tree',
      type: 'heritage'
    },
    {
      id: 'reminder-2',
      title: 'Document Fertility Journey Milestone',
      dueDate: '2025-08-15',
      lastDate: '2024-06-20',
      priority: 'medium',
      icon: 'fa-heart',
      type: 'personal'
    },
    {
      id: 'reminder-3',
      title: 'Update Digital Memory Legacy Plan',
      dueDate: '2025-12-31',
      lastDate: '2025-02-15',
      priority: 'high',
      icon: 'fa-cloud',
      type: 'digital'
    },
  ];

  const processRecords = () => {
    // Sort by date (newest first)
    const recordsCopy = [...actualRecords].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get top 3 most recent records
    const recentRecords = recordsCopy.slice(0, 3);

    // Get active preservation projects
    const activeProjects = recordsCopy
      .filter(record => 
        record.status === 'ongoing' || 
        record.status === 'active' ||
        record.category === 'family_history' ||
        record.category === 'personal_journey'
      )
      .slice(0, 3);

    // Group records by category
    const categories = {};
    recordsCopy.forEach(record => {
      const category = record.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(record);
    });

    return {
      recentRecords,
      activeProjects,
      categories
    };
  };

  const { recentRecords, activeProjects, categories } = processRecords();

  return (
    <div className="dashboard-container">
      {/* Header matching homepage style */}
      <header className="dashboard-header">
        <div className="header-left">
          <button 
            onClick={navigateToChenfamily}
            className="hover:opacity-80 transition-opacity"
            title="Back to Chen Family"
          >
            <img 
              src="https://static.wixstatic.com/media/afc39f_0893f0ab1268414aa42e4126925267ff~mv2.png"
              alt="Chen Family" 
              className="h-16 w-16 object-contain"
              style={{ 
                imageRendering: 'high-quality'
              }}
            />
          </button>
        </div>
        <div className="header-center flex flex-col items-center justify-center">
          <div className="flex items-center">
            <i className="fas fa-heart text-white text-2xl mr-3"></i>
            <h1 className="text-white text-4xl" style={{ fontFamily: 'Lora, serif', fontWeight: '500' }}>
              {getPersonDisplayName()} Memories
            </h1>
          </div>
          <div className="text-base text-white italic mt-1">
            Preserving family heritage and life stories
          </div>
        </div>
        <div className="header-actions">
          <button className="dashboard-button white" onClick={() => alert('Add new memory entry coming soon!')}>
            <i className="fas fa-plus"></i>
            <span className="hidden sm:inline">Add Memory</span>
          </button>
          <button className="dashboard-button white" onClick={() => alert('Memory upload features coming soon!')}>
            <i className="fas fa-upload"></i>
            <span className="hidden sm:inline">Upload Photos</span>
          </button>
          <a 
            href="mailto:james@ruleyproduction.com" 
            className="dashboard-button white"
          >
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">Contact</span>
          </a>
          <button 
            onClick={navigateToChenfamily}
            className="dashboard-button white"
          >
            <i className="fas fa-arrow-left"></i>
            <span className="hidden sm:inline">Back to Chen Family</span>
          </button>
        </div>
      </header>

      <div className="w-full animate-fade-in">
        <div className="w-full px-8 py-8">
              {/* Cross-Vault Legal Link */}
              <section className="mb-8">
                <div className="card bg-purple-50 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-link"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-aldr-dark">Digital Heritage Planning</h3>
                        <p className="text-sm text-aldr-gray">Your inheritance and legacy documents are managed in Chen Legal</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/chen-legal${familyMode ? '?mode=family' : `?mode=individual&person=${selectedPerson}`}`)}
                      className="dashboard-button outline"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Manage in Chen Legal
                    </button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="font-medium text-aldr-gray">Will Status:</span>
                        <div className="text-aldr-dark">Current and Updated</div>
                      </div>
                      <div>
                        <span className="font-medium text-aldr-gray">Digital Assets:</span>
                        <div className="text-aldr-dark">Included in Estate Plan</div>
                      </div>
                      <div>
                        <span className="font-medium text-aldr-gray">Family Access:</span>
                        <div className="text-green-600 font-medium">Properly Configured</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Memory Stats Summary */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-heart text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{actualRecords.length}</h3>
                      <p className="text-white text-opacity-80">Memory Collections</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-camera text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {actualRecords.reduce((total, record) => total + (record.photos || 0), 0)}
                      </h3>
                      <p className="text-white text-opacity-80">Photos Preserved</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="card bg-aldr-gradient text-white">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                      <i className="fas fa-calendar text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {actualRecords.filter(record => record.category === 'life_milestones').length}
                      </h3>
                      <p className="text-white text-opacity-80">Life Milestones</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white bg-opacity-20 rounded-full mb-3">
                    <div className="h-1 bg-white rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </section>

              {/* Memory Preservation Reminders */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Memory Reminders</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-bell"></i>
                    Manage Reminders
                  </button>
                </div>

                <div className="card">
                  <div className="divide-y">
                    {memoryReminders.map(reminder => (
                      <div key={reminder.id} className="py-4 flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white ${
                          reminder.priority === 'high' ? 'bg-red-500' : 'bg-aldr-teal'
                        }`}>
                          <i className={`fas ${reminder.icon}`}></i>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-aldr-dark">
                            {reminder.title}
                            {reminder.priority === 'high' && (
                              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-pill text-xs">
                                Important
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-aldr-gray">Due: {formatDate(reminder.dueDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Recent Memoir Activity */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Active Memory Projects</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-project-diagram"></i>
                    View All Projects
                  </button>
                </div>

                {activeProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeProjects.map(project => (
                      <div key={project.id} className="card hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                            <i className={`fas ${getCategoryIcon(project.category)}`}></i>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-aldr-dark">{project.title}</h3>
                            <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-aldr-gray mb-2">{formatCategoryName(project.category)}</p>
                        <p className="text-sm text-aldr-gray mb-4">
                          {project.description && project.description.length > 100
                            ? project.description.substring(0, 100) + '...'
                            : project.description || 'Memory project documentation'}
                        </p>

                        {familyMode && project.owner && (
                          <p className="text-xs text-aldr-gray mb-2">
                            <i className="fas fa-user mr-1"></i>
                            {project.owner}
                          </p>
                        )}

                        <button className="btn-secondary w-full text-sm" onClick={() => alert('Demo Mode: Full memory project details coming in production version')}>
                          View Project Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-aldr-gray">No active memory projects found</p>
                )}
              </section>

              {/* Memory Collections by Category */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-aldr-dark mb-6">Memory Collections</h2>

                {Object.keys(categories).length > 0 ? (
                  Object.entries(categories).map(([category, records]) => (
                    <div key={category} className="card mb-6">
                      <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold text-aldr-dark">
                          <i className={`fas ${getCategoryIcon(category)} mr-2 text-aldr-teal`}></i>
                          {formatCategoryName(category)}
                          <span className="ml-2 text-sm text-aldr-gray font-normal">
                            ({records.length} items)
                          </span>
                        </h3>
                        <button className="text-aldr-teal hover:text-aldr-purple font-medium text-sm">
                          View All
                        </button>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {records.slice(0, 2).map(record => (
                            <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-aldr-dark">{record.title}</h4>
                                <span className={`px-2 py-1 rounded-pill text-xs ${getStatusColor(record.status)}`}>
                                  {record.status}
                                </span>
                              </div>
                              <p className="text-sm text-aldr-gray mb-2">{formatDate(record.date)}</p>
                              {record.location && (
                                <p className="text-sm text-aldr-gray mb-2">
                                  <i className="fas fa-map-marker-alt mr-1"></i>
                                  {record.location}
                                </p>
                              )}
                              {familyMode && record.owner && (
                                <p className="text-sm text-aldr-gray mb-2">
                                  <i className="fas fa-user mr-1"></i>
                                  {record.owner}
                                </p>
                              )}
                              <p className="text-sm text-aldr-gray mb-4">
                                {record.description && record.description.length > 80
                                  ? record.description.substring(0, 80) + '...'
                                  : record.description || 'Memory collection'}
                              </p>

                              {record.photos && (
                                <p className="text-xs text-aldr-gray mb-2">
                                  <i className="fas fa-camera mr-1"></i>
                                  {record.photos} photos
                                </p>
                              )}

                              <button className="btn-secondary text-sm w-full" onClick={() => alert('Demo Mode: Full memory details coming in production version')}>
                                View Memory
                              </button>
                            </div>
                          ))}
                        </div>

                        {records.length > 2 && (
                          <div className="text-center mt-4">
                            <button className="btn-secondary text-sm">
                              View All {formatCategoryName(category)} ({records.length})
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-aldr-gray">No memory collections found</p>
                )}
              </section>

              {/* Recent Memory Activity */}
              <section className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-aldr-dark">Recent Memory Activity</h2>
                  <button className="btn-secondary text-sm">
                    <i className="fas fa-eye"></i>
                    View All
                  </button>
                </div>

                <div className="card">
                  <div className="divide-y">
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aldr-teal flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-heart"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Updated fertility journey documentation</p>
                        <p className="text-sm text-aldr-gray">Today, 3:15 PM</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-aldr-purple flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-camera"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Added new travel photography collection</p>
                        <p className="text-sm text-aldr-gray">February 15, 2025</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                    <div className="py-3 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 text-white">
                        <i className="fas fa-tree"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-aldr-dark">Updated family heritage project</p>
                        <p className="text-sm text-aldr-gray">January 20, 2025</p>
                      </div>
                      <button className="bg-aldr-teal hover:bg-aldr-purple text-white py-1 px-3 rounded-pill transition-colors text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer with User ID */}
              <footer className="text-center mt-12 py-6 border-t border-gray-200">
                <p className="text-aldr-gray">Chen Family ID: 2025-CF-789456</p>
                <p className="text-sm text-aldr-gray mt-2">
                  © 2025 Aldr. All rights reserved.
                </p>
              </footer>
        </div>
      </div>
    </div>
  );
};

export default ChenMemories;