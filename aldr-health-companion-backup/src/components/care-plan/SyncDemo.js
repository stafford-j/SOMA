/**
 * SyncDemo Component
 * 
 * A demonstration component to showcase the synchronization between 
 * SOMA Companion (patient app) and SOMA Colleague (provider app).
 * 
 * This component splits the screen to show both apps side-by-side,
 * with real-time updates flowing between them.
 * 
 * @author SOMA Team
 * @version 1.0.0
 */
import React, { useState, useEffect } from 'react';
import './SyncDemo.css';

// Import placeholder images
import { patientAppPlaceholder, providerAppPlaceholder } from '../../assets/placeholder';

// In a real implementation, we would import the actual components
// import PatientCarePlan from './PatientCarePlan';
// import CarePlanManager from '../../../colleague/src/components/care-plan/CarePlanManager';

const SyncDemo = () => {
  // States for simulating sync
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [syncDirection, setSyncDirection] = useState(null); // 'to-patient', 'to-provider'
  const [syncEvents, setSyncEvents] = useState([]);
  const [syncCount, setSyncCount] = useState(0);
  
  // Demo data changes
  const [patientData, setPatientData] = useState({
    glucoseReading: 7.5,
    weight: 79.8,
    medicationTaken: { morning: true, evening: true },
    exerciseCompleted: false
  });
  
  const [providerData, setProviderData] = useState({
    newTask: "Schedule eye exam for next month",
    medicationChange: null,
    goalProgress: 65
  });
  
  // Simulate auto sync events
  useEffect(() => {
    const demoEvents = [
      {
        time: 3000,
        direction: 'to-provider',
        description: 'Patient logs morning glucose reading',
        action: () => {
          setPatientData(prev => ({
            ...prev,
            glucoseReading: 7.2
          }));
        }
      },
      {
        time: 8000,
        direction: 'to-provider',
        description: 'Patient completes exercise task',
        action: () => {
          setPatientData(prev => ({
            ...prev,
            exerciseCompleted: true
          }));
        }
      },
      {
        time: 15000,
        direction: 'to-patient',
        description: 'Provider adjusts target goal',
        action: () => {
          setProviderData(prev => ({
            ...prev,
            goalProgress: 70
          }));
        }
      },
      {
        time: 22000,
        direction: 'to-patient',
        description: 'Provider adds medication note',
        action: () => {
          setProviderData(prev => ({
            ...prev,
            medicationChange: 'Take Metformin with larger meals to reduce stomach discomfort'
          }));
        }
      }
    ];
    
    // Schedule the events
    demoEvents.forEach((event, index) => {
      setTimeout(() => {
        // Start sync animation
        setSyncDirection(event.direction);
        setSyncInProgress(true);
        
        // Log the event
        setSyncEvents(prev => [
          {
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            direction: event.direction,
            description: event.description
          },
          ...prev
        ]);
        
        // Execute the data change
        event.action();
        
        // End sync animation after 2 seconds
        setTimeout(() => {
          setSyncInProgress(false);
          setSyncDirection(null);
          setSyncCount(prev => prev + 1);
        }, 2000);
      }, event.time);
    });
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return (
    <div className="sync-demo-container">
      <header className="sync-demo-header">
        <h1>SOMA Synchronized Care Plans Demo</h1>
        <p>A demonstration of real-time health data synchronization between patient and provider</p>
      </header>
      
      <div className="sync-demo-content">
        <div className="app-container">
          <div className="app-window patient-app">
            <div className="app-header">
              <div className="app-title">SOMA Companion (Patient App)</div>
              <div className="app-status">
                <span className="sync-indicator">
                  <i className={`fas fa-sync-alt ${syncInProgress && syncDirection === 'to-patient' ? 'syncing' : ''}`}></i>
                </span>
                <span className="sync-count">Syncs: {syncCount}</span>
              </div>
            </div>
            
            <div className="app-body">
              {/* In a real implementation, we would render the actual component */}
              {/* <PatientCarePlan /> */}
              
              {/* For the demo, we'll show a simulated app interface */}
              <div className="patient-app-mock">
                <div className="patient-data-card">
                  <h3>Today's Measurements</h3>
                  <div className="patient-metric">
                    <span className="metric-label">Blood Glucose:</span>
                    <span className="metric-value">{patientData.glucoseReading} mmol/L</span>
                    <span className={`metric-indicator ${patientData.glucoseReading > 7.0 ? 'warning' : 'normal'}`}>
                      <i className={`fas ${patientData.glucoseReading > 7.0 ? 'fa-arrow-up' : 'fa-check'}`}></i>
                    </span>
                  </div>
                  <div className="patient-metric">
                    <span className="metric-label">Weight:</span>
                    <span className="metric-value">{patientData.weight} kg</span>
                  </div>
                </div>
                
                <div className="patient-tasks-card">
                  <h3>Today's Tasks</h3>
                  <div className="patient-task">
                    <input 
                      type="checkbox" 
                      checked={patientData.medicationTaken.morning} 
                      id="med-morning"
                      readOnly
                    />
                    <label htmlFor="med-morning">Take Metformin - Morning</label>
                  </div>
                  <div className="patient-task">
                    <input 
                      type="checkbox" 
                      checked={patientData.medicationTaken.evening} 
                      id="med-evening"
                      readOnly
                    />
                    <label htmlFor="med-evening">Take Metformin - Evening</label>
                  </div>
                  <div className="patient-task">
                    <input 
                      type="checkbox" 
                      checked={patientData.exerciseCompleted} 
                      id="exercise-task"
                      readOnly
                    />
                    <label htmlFor="exercise-task">30-Minute Walking</label>
                    {patientData.exerciseCompleted && <span className="sync-badge">Synced</span>}
                  </div>
                </div>
                
                {providerData.medicationChange && (
                  <div className="patient-alert-card">
                    <h3>New Provider Note</h3>
                    <div className="provider-note">
                      <i className="fas fa-comment-medical"></i>
                      <p>{providerData.medicationChange}</p>
                      <span className="sync-badge">Just Added</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="sync-visualization">
            <div className={`sync-path ${syncInProgress ? (syncDirection === 'to-patient' ? 'provider-to-patient' : 'patient-to-provider') : ''}`}>
              <div className="sync-particle"></div>
              <div className="sync-particle"></div>
              <div className="sync-particle"></div>
            </div>
          </div>
          
          <div className="app-window provider-app">
            <div className="app-header">
              <div className="app-title">SOMA Colleague (Provider App)</div>
              <div className="app-status">
                <span className="sync-indicator">
                  <i className={`fas fa-sync-alt ${syncInProgress && syncDirection === 'to-provider' ? 'syncing' : ''}`}></i>
                </span>
                <span className="sync-count">Syncs: {syncCount}</span>
              </div>
            </div>
            
            <div className="app-body">
              {/* In a real implementation, we would render the actual component */}
              {/* <CarePlanManager /> */}
              
              {/* For the demo, we'll show a simulated app interface */}
              <div className="provider-app-mock">
                <div className="provider-patient-card">
                  <div className="patient-avatar">JS</div>
                  <div className="patient-details">
                    <h3 className="patient-name">James Stafford</h3>
                    <p className="patient-info">45 years • Type 2 Diabetes Management</p>
                  </div>
                </div>
                
                <div className="provider-data-card">
                  <h3>Patient Readings</h3>
                  <div className="provider-metric">
                    <span className="metric-label">Latest Glucose:</span>
                    <span className="metric-value">{patientData.glucoseReading} mmol/L</span>
                    <span className={`metric-indicator ${patientData.glucoseReading > 7.0 ? 'warning' : 'normal'}`}>
                      <i className={`fas ${patientData.glucoseReading > 7.0 ? 'fa-arrow-up' : 'fa-check'}`}></i>
                    </span>
                    {patientData.glucoseReading !== 7.5 && <span className="sync-badge">Just Updated</span>}
                  </div>
                  <div className="provider-chart">
                    <div className="chart-label">Glucose Trend (7 days)</div>
                    <div className="chart-mock">
                      <div className="chart-point" style={{ height: '60%' }}></div>
                      <div className="chart-point" style={{ height: '55%' }}></div>
                      <div className="chart-point" style={{ height: '65%' }}></div>
                      <div className="chart-point" style={{ height: '50%' }}></div>
                      <div className="chart-point" style={{ height: '45%' }}></div>
                      <div className="chart-point" style={{ height: '40%' }}></div>
                      <div className="chart-point active" style={{ height: `${patientData.glucoseReading / 10 * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="provider-adherence-card">
                  <h3>Care Plan Adherence</h3>
                  <div className="adherence-stat">
                    <span className="adherence-label">Overall:</span>
                    <div className="adherence-progress">
                      <div className="progress-bar" style={{ width: `${providerData.goalProgress}%` }}></div>
                    </div>
                    <span className="adherence-value">{providerData.goalProgress}%</span>
                  </div>
                  <div className="adherence-item">
                    <span className="adherence-label">Medication:</span>
                    <span className="adherence-value">92%</span>
                  </div>
                  <div className="adherence-item">
                    <span className="adherence-label">Exercise:</span>
                    <span className="adherence-value">{patientData.exerciseCompleted ? '100%' : '85%'}</span>
                    {patientData.exerciseCompleted && <span className="sync-badge">Just Updated</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sync-events-panel">
          <h3>Synchronization Events</h3>
          <div className="events-list">
            {syncEvents.map(event => (
              <div key={event.id} className={`event-item ${event.direction}`}>
                <span className="event-time">{event.time}</span>
                <span className="event-direction">
                  {event.direction === 'to-provider' ? 
                    <><i className="fas fa-arrow-right"></i> Patient → Provider</> : 
                    <><i className="fas fa-arrow-left"></i> Provider → Patient</>
                  }
                </span>
                <span className="event-description">{event.description}</span>
              </div>
            ))}
            {syncEvents.length === 0 && (
              <div className="no-events">
                <i className="fas fa-hourglass-start"></i>
                <p>Waiting for synchronization events...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="sync-demo-features">
        <h2>Key Synchronization Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-wifi"></i></div>
            <h3>Real-Time Updates</h3>
            <p>Changes made by patients or providers are immediately synchronized across devices.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-globe-americas"></i></div>
            <h3>Cross-Border Care</h3>
            <p>Seamless coordination between healthcare providers in different countries.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-lock"></i></div>
            <h3>Secure Data Transfer</h3>
            <p>End-to-end encrypted communication protects sensitive health information.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-plane"></i></div>
            <h3>Travel Adaptations</h3>
            <p>Care plans automatically adjust for time zones and regional healthcare differences.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
            <h3>Care Progress Tracking</h3>
            <p>Providers receive real-time adherence and outcome data to optimize care.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="fas fa-user-md"></i></div>
            <h3>Multi-Provider Coordination</h3>
            <p>Facilitates collaboration between primary care, specialists, and allied health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncDemo;