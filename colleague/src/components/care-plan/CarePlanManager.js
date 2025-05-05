/**
 * CarePlanManager Component
 * 
 * A comprehensive interface for healthcare providers to create, view, and manage
 * care plans that synchronize with the patient's SOMA Companion app.
 * 
 * Features:
 * - Care plan creation and editing
 * - Task and goal management
 * - Patient adherence tracking
 * - Synchronization indicators
 * - Multi-provider collaboration
 * 
 * @author SOMA Colleague Team
 * @version 1.0.0
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  diabetesPatient, 
  careTeam, 
  diabetesCarePlan, 
  glucoseReadings, 
  weightReadings,
  medicationAdherence
} from '../dashboard/care-plan-data';
import './CarePlan.css';

const CarePlanManager = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  // State for the selected patient and care plan
  const [patient, setPatient] = useState(diabetesPatient);
  const [carePlan, setCarePlan] = useState(diabetesCarePlan);
  const [activeTab, setActiveTab] = useState('overview');
  const [syncStatus, setSyncStatus] = useState('synced'); // synced, syncing, error
  const [lastSync, setLastSync] = useState(new Date().toISOString());
  
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
    const updatedTasks = carePlan.tasks.map(task => 
      task.id === taskId ? { ...task, completionStatus: newStatus } : task
    );
    
    setCarePlan({
      ...carePlan,
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
  
  // Calculate adherence percentage
  const calculateAdherence = () => {
    const tasks = carePlan.tasks;
    if (!tasks || tasks.length === 0) return 0;
    
    // For medication adherence, we'll use the sample data
    const metforminAdherence = medicationAdherence[0].adherenceData;
    const totalDoses = metforminAdherence.length * 2; // morning and evening
    const takenDoses = metforminAdherence.reduce((sum, day) => {
      return sum + (day.morning ? 1 : 0) + (day.evening ? 1 : 0);
    }, 0);
    
    return Math.round((takenDoses / totalDoses) * 100);
  };
  
  // Render the sync status indicator
  const renderSyncStatus = () => {
    switch(syncStatus) {
      case 'synced':
        return (
          <div className="sync-status synced">
            <i className="fas fa-check-circle"></i>
            Synced with patient app
            <span className="sync-time">Last updated: {new Date(lastSync).toLocaleTimeString()}</span>
          </div>
        );
      case 'syncing':
        return (
          <div className="sync-status syncing">
            <i className="fas fa-sync fa-spin"></i>
            Syncing with patient app...
          </div>
        );
      case 'error':
        return (
          <div className="sync-status error">
            <i className="fas fa-exclamation-triangle"></i>
            Sync error
            <button onClick={handleSyncClick} className="sync-retry-btn">Retry</button>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render care plan overview
  const renderOverview = () => {
    return (
      <div className="care-plan-overview">
        <div className="care-plan-header">
          <h3 className="care-plan-title">{carePlan.title}</h3>
          <div className="care-plan-meta">
            <span>Created: {formatDate(carePlan.createdDate)}</span>
            <span>Last modified: {formatDate(carePlan.modifiedDate)}</span>
            <span>Condition: {carePlan.condition}</span>
          </div>
        </div>
        
        <div className="provider-panel">
          <h4>Care Team</h4>
          <div className="care-team-list">
            {careTeam.map(provider => (
              <div key={provider.id} className="care-team-member">
                <div className="provider-avatar">
                  {provider.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="provider-info">
                  <div className="provider-name">{provider.name}, {provider.credentials}</div>
                  <div className="provider-role">{provider.role}</div>
                  <div className="provider-location">{provider.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="care-plan-summary">
          <div className="summary-panel adherence">
            <h4>Patient Adherence</h4>
            <div className="adherence-stat">
              <div className="adherence-chart">
                <div 
                  className="adherence-fill" 
                  style={{width: `${calculateAdherence()}%`}}
                ></div>
              </div>
              <div className="adherence-value">{calculateAdherence()}%</div>
            </div>
            <div className="adherence-breakdown">
              <div className="adherence-item">
                <span>Medication: Metformin</span>
                <span>{medicationAdherence[0].adherenceData.filter(d => d.morning && d.evening).length} / {medicationAdherence[0].adherenceData.length} days</span>
              </div>
              <div className="adherence-item">
                <span>Glucose Monitoring</span>
                <span>{glucoseReadings.length} / {14} days</span>
              </div>
              <div className="adherence-item">
                <span>Weight Monitoring</span>
                <span>{weightReadings.length} / {2} weeks</span>
              </div>
            </div>
          </div>
          
          <div className="summary-panel progress">
            <h4>Goals Progress</h4>
            <div className="goals-list">
              {carePlan.goals.map(goal => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-info">
                    <div className="goal-title">{goal.title}</div>
                    <div className="goal-desc">{goal.description}</div>
                    <div className="goal-target">Target: {formatDate(goal.targetDate)}</div>
                  </div>
                  <div className="goal-progress">
                    <div className="progress-chart">
                      <div 
                        className="progress-fill" 
                        style={{width: `${goal.progress}%`}}
                      ></div>
                    </div>
                    <div className="progress-value">{goal.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="care-plan-metrics">
          <h4>Recent Metrics</h4>
          <div className="metrics-panels">
            <div className="metric-panel">
              <h5>Blood Glucose (mmol/L)</h5>
              <div className="chart-placeholder">
                <div className="chart-line">
                  {glucoseReadings.map((reading, index) => (
                    <div 
                      key={index} 
                      className="chart-point" 
                      style={{
                        bottom: `${(reading.value - 5) * 10}%`,
                        left: `${index * (100 / (glucoseReadings.length - 1))}%`
                      }}
                      title={`${reading.date}: ${reading.value} ${reading.unit}`}
                    ></div>
                  ))}
                </div>
                <div className="chart-baseline" style={{bottom: '20%'}}>
                  <span>Target 7.0</span>
                </div>
              </div>
              <div className="chart-legend">
                <div>Latest: {glucoseReadings[glucoseReadings.length-1].value} mmol/L</div>
                <div>Trend: Improving</div>
              </div>
            </div>
            
            <div className="metric-panel">
              <h5>Weight (kg)</h5>
              <div className="weight-readings">
                {weightReadings.map((reading, index) => (
                  <div key={index} className="weight-reading">
                    <div className="reading-date">{formatDate(reading.date)}</div>
                    <div className="reading-value">{reading.value} {reading.unit}</div>
                  </div>
                ))}
              </div>
              <div className="add-reading-prompt">+ Record new measurement</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render tasks list
  const renderTasks = () => {
    return (
      <div className="care-plan-tasks">
        <div className="tasks-header">
          <h3>Care Plan Tasks</h3>
          <button className="add-task-btn">
            <i className="fas fa-plus"></i> Add Task
          </button>
        </div>
        
        <div className="tasks-list">
          {carePlan.tasks.map(task => {
            // Find the provider who assigned this task
            const assignedBy = careTeam.find(provider => provider.id === task.assignedBy);
            
            return (
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
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                  {task.dueDate && (
                    <div className="task-due-date">
                      Due: {formatDateTime(task.dueDate)}
                    </div>
                  )}
                  <div className="task-meta">
                    <span className={`task-category ${task.category}`}>
                      {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </span>
                    <span className="task-frequency">{task.frequency}</span>
                    <span className="task-assigned-by">
                      <i className="fas fa-user-md"></i> {assignedBy ? assignedBy.name : 'Unknown'}
                    </span>
                  </div>
                </div>
                
                <div className="task-actions">
                  <button className="edit-task-btn">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <div className="task-sync-status">
                    <i className="fas fa-check-circle"></i>
                    <span className="tooltip">Synced with patient app</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render measurements tab
  const renderMeasurements = () => {
    return (
      <div className="care-plan-measurements">
        <div className="measurements-header">
          <h3>Tracking Measurements</h3>
          <button className="add-measurement-btn">
            <i className="fas fa-plus"></i> Add Measurement Type
          </button>
        </div>
        
        <div className="measurements-list">
          {carePlan.measurements.map(measurement => (
            <div key={measurement.id} className="measurement-item">
              <div className="measurement-header">
                <div className="measurement-name">{measurement.name}</div>
                <div className="measurement-actions">
                  <button className="edit-measurement-btn">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </div>
              </div>
              
              <div className="measurement-details">
                <div className="measurement-params">
                  <div className="param-item">
                    <span className="param-label">Target:</span>
                    <span className="param-value">{measurement.target}</span>
                  </div>
                  <div className="param-item">
                    <span className="param-label">Frequency:</span>
                    <span className="param-value">{measurement.frequency}</span>
                  </div>
                  <div className="param-item">
                    <span className="param-label">Unit:</span>
                    <span className="param-value">{measurement.unit}</span>
                  </div>
                </div>
                
                <div className="measurement-instructions">
                  <div className="instructions-label">Instructions for patient:</div>
                  <div className="instructions-text">{measurement.instructions}</div>
                </div>
                
                {measurement.alertThresholds && (
                  <div className="measurement-alerts">
                    <div className="alerts-label">Alert Thresholds:</div>
                    <div className="alerts-thresholds">
                      {measurement.alertThresholds.high && (
                        <div className="threshold high">
                          <i className="fas fa-arrow-up"></i> High: {measurement.alertThresholds.high}
                        </div>
                      )}
                      {measurement.alertThresholds.low && (
                        <div className="threshold low">
                          <i className="fas fa-arrow-down"></i> Low: {measurement.alertThresholds.low}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {measurement.conversionInfo && (
                  <div className="measurement-conversions">
                    <div className="conversions-label">International Conversions:</div>
                    <div className="conversions-list">
                      {Object.entries(measurement.conversionInfo).map(([region, info]) => (
                        <div key={region} className="conversion-item">
                          <span className="conversion-region">{region}:</span>
                          <span className="conversion-info">{info}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="patient-readings">
                <div className="readings-header">
                  <h4>Patient Data</h4>
                  {measurement.type === 'glucose' && (
                    <div className="readings-meta">
                      {glucoseReadings.length} readings recorded
                    </div>
                  )}
                  {measurement.type === 'weight' && (
                    <div className="readings-meta">
                      {weightReadings.length} readings recorded
                    </div>
                  )}
                </div>
                
                {measurement.type === 'glucose' && (
                  <div className="readings-list">
                    {glucoseReadings.slice(-5).map((reading, index) => (
                      <div key={index} className="reading-item">
                        <div className="reading-date">{formatDate(reading.date)}</div>
                        <div className="reading-value">
                          {reading.value} {reading.unit}
                          {reading.value > 7.0 ? (
                            <span className="reading-indicator high">
                              <i className="fas fa-arrow-up"></i>
                            </span>
                          ) : (
                            <span className="reading-indicator normal">
                              <i className="fas fa-check"></i>
                            </span>
                          )}
                        </div>
                        {reading.notes && (
                          <div className="reading-notes">{reading.notes}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {measurement.type === 'weight' && (
                  <div className="readings-list">
                    {weightReadings.map((reading, index) => (
                      <div key={index} className="reading-item">
                        <div className="reading-date">{formatDate(reading.date)}</div>
                        <div className="reading-value">
                          {reading.value} {reading.unit}
                          {index > 0 && weightReadings[index].value < weightReadings[index-1].value ? (
                            <span className="reading-indicator good">
                              <i className="fas fa-arrow-down"></i>
                            </span>
                          ) : index > 0 ? (
                            <span className="reading-indicator caution">
                              <i className="fas fa-arrow-up"></i>
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {measurement.type === 'bloodPressure' && (
                  <div className="no-readings">
                    No readings recorded yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render medications tab
  const renderMedications = () => {
    return (
      <div className="care-plan-medications">
        <div className="medications-header">
          <h3>Medications</h3>
          <button className="add-medication-btn">
            <i className="fas fa-plus"></i> Add Medication
          </button>
        </div>
        
        <div className="medications-list">
          {carePlan.medications.map(medication => {
            // Find the provider who prescribed this medication
            const prescribedBy = careTeam.find(provider => 
              provider.name === medication.prescribedBy.replace("Dr. ", "")
            );
            
            // Get adherence data if available
            const adherenceData = medicationAdherence.find(med => med.medicationId === medication.id);
            
            return (
              <div key={medication.id} className="medication-item">
                <div className="medication-header">
                  <div className="medication-name">{medication.name} {medication.dosage}</div>
                  <div className="medication-actions">
                    <button className="edit-medication-btn">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </div>
                </div>
                
                <div className="medication-details">
                  <div className="medication-params">
                    <div className="param-item">
                      <span className="param-label">Dosage:</span>
                      <span className="param-value">{medication.dosage}</span>
                    </div>
                    <div className="param-item">
                      <span className="param-label">Frequency:</span>
                      <span className="param-value">{medication.frequency}</span>
                    </div>
                    <div className="param-item">
                      <span className="param-label">Start Date:</span>
                      <span className="param-value">{formatDate(medication.startDate)}</span>
                    </div>
                  </div>
                  
                  <div className="medication-instructions">
                    <div className="instructions-label">Instructions for patient:</div>
                    <div className="instructions-text">{medication.instructions}</div>
                  </div>
                  
                  {medication.sideEffectsToMonitor && (
                    <div className="medication-side-effects">
                      <div className="side-effects-label">Side Effects to Monitor:</div>
                      <div className="side-effects-text">{medication.sideEffectsToMonitor}</div>
                    </div>
                  )}
                  
                  {medication.substitutionInfo && (
                    <div className="medication-substitutions">
                      <div className="substitutions-label">Regional Equivalents:</div>
                      <div className="substitutions-list">
                        {Object.entries(medication.substitutionInfo).map(([region, info]) => (
                          <div key={region} className="substitution-item">
                            <span className="substitution-region">{region}:</span>
                            <span className="substitution-info">{info}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="medication-provider">
                    <div className="provider-label">Prescribed by:</div>
                    <div className="provider-info">
                      {medication.prescribedBy}
                      {prescribedBy && (
                        <span className="provider-specialty">, {prescribedBy.specialty}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {adherenceData && (
                  <div className="medication-adherence">
                    <div className="adherence-header">
                      <h4>Adherence Data</h4>
                      <div className="adherence-summary">
                        Last 7 days: 
                        {adherenceData.adherenceData.slice(-7).reduce((count, day) => {
                          const takenBothDoses = day.morning && day.evening;
                          return count + (takenBothDoses ? 1 : 0);
                        }, 0)}
                        /7 days with full adherence
                      </div>
                    </div>
                    
                    <div className="adherence-calendar">
                      {adherenceData.adherenceData.slice(-7).map((day, index) => {
                        const date = new Date(day.date);
                        return (
                          <div key={index} className="calendar-day">
                            <div className="calendar-date">
                              {date.getDate()}/{date.getMonth() + 1}
                            </div>
                            <div className={`dose-indicator morning ${day.morning ? 'taken' : 'missed'}`}>
                              <span className="dose-label">AM</span>
                              <i className={`fas ${day.morning ? 'fa-check' : 'fa-times'}`}></i>
                            </div>
                            <div className={`dose-indicator evening ${day.evening ? 'taken' : 'missed'}`}>
                              <span className="dose-label">PM</span>
                              <i className={`fas ${day.evening ? 'fa-check' : 'fa-times'}`}></i>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render notes tab
  const renderNotes = () => {
    return (
      <div className="care-plan-notes">
        <div className="notes-container">
          <div className="notes-column provider">
            <div className="notes-header">
              <h3>Provider Notes</h3>
              <div className="notes-subtitle">Private notes (only visible to care team)</div>
              <button className="add-note-btn">
                <i className="fas fa-plus"></i> Add Note
              </button>
            </div>
            
            <div className="notes-list">
              {carePlan.notes.provider.map((note, index) => (
                <div key={index} className="note-item">
                  <div className="note-meta">
                    <span className="note-author">{note.author}</span>
                    <span className="note-date">{formatDate(note.date)}</span>
                  </div>
                  <div className="note-text">{note.text}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="notes-column shared">
            <div className="notes-header">
              <h3>Shared Notes</h3>
              <div className="notes-subtitle">Visible to patient and care team</div>
              <button className="add-note-btn">
                <i className="fas fa-plus"></i> Add Note
              </button>
            </div>
            
            <div className="notes-list">
              {carePlan.notes.shared.map((note, index) => (
                <div key={index} className="note-item">
                  <div className="note-meta">
                    <span className="note-author">{note.author}</span>
                    <span className="note-date">{formatDate(note.date)}</span>
                  </div>
                  <div className="note-text">{note.text}</div>
                  <div className="note-sync">
                    <i className="fas fa-check-circle"></i> Synced with patient app
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render current active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'tasks':
        return renderTasks();
      case 'measurements':
        return renderMeasurements();
      case 'medications':
        return renderMedications();
      case 'notes':
        return renderNotes();
      default:
        return renderOverview();
    }
  };
  
  return (
    <div className="care-plan-container">
      <div className="care-plan-header-panel">
        <div className="patient-info">
          <button className="back-button" onClick={() => navigate(`/patient/${patientId}`)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          
          <div className="patient-avatar">
            {patient.avatar}
          </div>
          
          <div className="patient-details">
            <h2 className="patient-name">{patient.name}</h2>
            <div className="patient-meta">
              <span className="patient-age">
                {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
              </span>
              <span className="patient-location">
                <i className="fas fa-map-marker-alt"></i> {patient.currentLocation.city}, {patient.currentLocation.country}
              </span>
              <span className="patient-id">
                SOMA ID: {patient.somaId}
              </span>
            </div>
          </div>
        </div>
        
        <div className="plan-actions">
          {renderSyncStatus()}
          
          <button className="sync-button" onClick={handleSyncClick}>
            <i className="fas fa-sync-alt"></i> Sync Now
          </button>
          
          <div className="more-actions">
            <button className="more-button">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="care-plan-travel-alert">
        <i className="fas fa-plane"></i>
        <div className="travel-info">
          <div className="travel-title">Travel Scheduled</div>
          <div className="travel-details">
            Patient will be in Paris, France from {patient.travelSchedule[0].dates}
          </div>
        </div>
        <button className="travel-action">
          Adjust Care Plan
        </button>
      </div>
      
      <div className="care-plan-tabs">
        <div className={`tab-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <i className="fas fa-th-large"></i> Overview
        </div>
        <div className={`tab-item ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
          <i className="fas fa-tasks"></i> Tasks
          <span className="item-count">{carePlan.tasks.length}</span>
        </div>
        <div className={`tab-item ${activeTab === 'measurements' ? 'active' : ''}`} onClick={() => setActiveTab('measurements')}>
          <i className="fas fa-chart-line"></i> Measurements
          <span className="item-count">{carePlan.measurements.length}</span>
        </div>
        <div className={`tab-item ${activeTab === 'medications' ? 'active' : ''}`} onClick={() => setActiveTab('medications')}>
          <i className="fas fa-pills"></i> Medications
          <span className="item-count">{carePlan.medications.length}</span>
        </div>
        <div className={`tab-item ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>
          <i className="fas fa-sticky-note"></i> Notes
          <span className="item-count">{carePlan.notes.provider.length + carePlan.notes.shared.length}</span>
        </div>
      </div>
      
      <div className="care-plan-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CarePlanManager;