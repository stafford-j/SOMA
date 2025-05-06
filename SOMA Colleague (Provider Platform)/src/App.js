/**
 * SOMA Colleague - Provider Dashboard
 * 
 * Main application component that sets up routing between the
 * provider dashboard, patient record views, and documentation interfaces.
 * 
 * This provider-focused interface maintains strict clinical standards
 * with data-only views of patient information.
 * 
 * @author SOMA Colleague Team
 * @version 1.0.0
 */
import { Routes, Route } from 'react-router-dom';
import ProviderDashboard from './pages/ProviderDashboard';
import PatientRecordView from './pages/PatientRecordView';
import RecordCreationForm from './pages/RecordCreationForm';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ProviderDashboard />} />
        <Route path="/patient/:patientId" element={<PatientRecordView />} />
        <Route path="/patient/:patientId/record/:recordId" element={<PatientRecordView />} />
        <Route path="/patient/:patientId/new-record" element={<RecordCreationForm />} />
      </Routes>
    </div>
  );
}

export default App;