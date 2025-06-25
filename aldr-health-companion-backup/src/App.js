import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import RecordDetails from './pages/RecordDetails';
import AddRecord from './pages/AddRecordNew';
import EditRecord from './pages/EditRecord';
import Profile from './pages/Profile';
// Import backup Dashboard if needed
// import Dashboard from './components/dashboard/Dashboard.backup';

// Import the new Care Plan components
import PatientCarePlan from './components/care-plan/PatientCarePlan';
import SyncDemo from './components/care-plan/SyncDemo';

// Force user authentication at startup
localStorage.setItem('userId', '1742961914546');
console.log('App.js - userId set to:', localStorage.getItem('userId'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/record/:recordId" element={<RecordDetails />} />
        <Route path="/edit-record/:recordId" element={<EditRecord />} />
        <Route path="/add-record" element={<AddRecord />} />
        <Route path="/profile" element={<Profile />} />
        {/* New Care Plan routes */}
        <Route path="/care-plan" element={<PatientCarePlan />} />
        <Route path="/sync-demo" element={<SyncDemo />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;