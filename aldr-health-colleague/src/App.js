/**
 * Aldr Health Colleague - Provider Platform
 * 
 * Main application component that sets up routing between the
 * provider dashboard, patient record views, care plan management,
 * and documentation interfaces.
 * 
 * This provider-focused interface maintains strict clinical standards
 * with comprehensive care plan management capabilities.
 * 
 * @author Aldr Health Team
 * @version 2.0.0
 */
import { Routes, Route } from 'react-router-dom';
import ProviderDashboard from './pages/ProviderDashboard';
import PatientRecordView from './pages/PatientRecordView';
import RecordCreationForm from './pages/RecordCreationForm';
import CarePlanManager from './components/care-plan/CarePlanManager';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ProviderDashboard />} />
        <Route path="/patient/:patientId" element={<PatientRecordView />} />
        <Route path="/patient/:patientId/record/:recordId" element={<PatientRecordView />} />
        <Route path="/patient/:patientId/new-record" element={<RecordCreationForm />} />
        <Route path="/patient/:patientId/care-plan" element={<CarePlanManager />} />
      </Routes>
    </div>
  );
}

export default App;