import React from 'react';
import './Dashboard.css';

const DashboardTemplate = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img
            src="https://static.wixstatic.com/media/afc39f_da0a94021ba6434399c2fbd4fd0ee013~mv2.png"
            alt="SOMA Logo"
            className="dashboard-logo"
          />
          <h1 className="dashboard-title">Health Dashboard</h1>
        </div>
        <button className="dashboard-button">
          <i className="fas fa-plus"></i>
          Add New Record
        </button>
      </header>

      {/* Category filters */}
      <div className="category-filters">
        <div className="category-filter active">All</div>
        <div className="category-filter medical">Medical</div>
        <div className="category-filter holistic">Holistic</div>
        <div className="category-filter mental">Mental</div>
      </div>

      {/* Tab navigation */}
      <div className="tab-container">
        <div className="tab-list">
          <div className="tab-item active">Dashboard</div>
          <div className="tab-item">Health Records</div>
          <div className="tab-item">Appointments</div>
          <div className="tab-item">Medications</div>
        </div>
      </div>

      <section className="dashboard-cards">
        <div className="dashboard-card medical">
          <div className="card-header">
            <div className="card-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h2 className="card-title">Health Records</h2>
          </div>
          <div className="card-content">
            <p className="card-value">12</p>
            <p>Total health records in your account</p>
          </div>
        </div>

        <div className="dashboard-card holistic">
          <div className="card-header">
            <div className="card-icon">
              <i className="fas fa-sync-alt"></i>
            </div>
            <h2 className="card-title">Recent Updates</h2>
          </div>
          <div className="card-content">
            <p className="card-value">3</p>
            <p>Records updated in the last 30 days</p>
          </div>
        </div>

        <div className="dashboard-card mental">
          <div className="card-header">
            <div className="card-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h2 className="card-title">Shared Access</h2>
          </div>
          <div className="card-content">
            <p className="card-value">2</p>
            <p>People with access to your health data</p>
          </div>
        </div>
      </section>

      <section className="recent-activity">
        <div className="activity-header">
          <h2 className="activity-title">Recent Activity</h2>
          <button className="dashboard-button outline">
            <i className="fas fa-eye"></i>
            View All
          </button>
        </div>

        <ul className="activity-list">
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Added new blood pressure reading</p>
              <p className="activity-time">Today, 2:30 PM</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-sync-alt"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Updated medication information</p>
              <p className="activity-time">Yesterday, 10:15 AM</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-search"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Viewed lab results</p>
              <p className="activity-time">May 3, 2025, 4:45 PM</p>
            </div>
          </li>
          <li className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <div className="activity-info">
              <p className="activity-text">Shared access with Dr. Smith</p>
              <p className="activity-time">April 29, 2025, 11:20 AM</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Modal example (hidden by default) */}
      <div className="modal-overlay" style={{ display: 'none' }}>
        <div className="modal-container">
          <div className="modal-header">
            <h3 className="modal-title">Add New Record</h3>
            <button className="modal-close">×</button>
          </div>
          <div className="modal-content">
            <div className="form-group">
              <label className="form-label">Record Type</label>
              <select className="form-input">
                <option>Medical Visit</option>
                <option>Lab Result</option>
                <option>Medication</option>
                <option>Holistic Treatment</option>
                <option>Mental Health</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-input" rows="4"></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="dashboard-button outline">Cancel</button>
              <button className="dashboard-button">Save Record</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;