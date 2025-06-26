import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// BETA components
import Login from './pages/Login';
import BetaDashboard from './pages/BetaDashboard';
import BetaVault from './pages/BetaVault';
import BetaIdentity from './pages/BetaIdentity';
import BetaLegal from './pages/BetaLegal';
import BetaTravel from './pages/BetaTravel';
import BetaMemories from './pages/BetaMemories';
import BetaLearning from './pages/BetaLearning';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import VaultSelection from './pages/VaultSelection';
import ChenFamilyDemo from './pages/ChenFamilyDemo';
import ChenIdentity from './pages/ChenIdentity';
import ChenLegal from './pages/ChenLegal';
import ChenTravel from './pages/ChenTravel';
import ChenMemories from './pages/ChenMemories';
import ChenLearning from './pages/ChenLearning';
import HomePage from './pages/HomePage';
import AldrId from './pages/AldrId';
import AldrLegal from './pages/AldrLegal';
import AldrHealth from './pages/AldrHealth';
import AldrTravel from './pages/AldrTravel';
import AldrMemoirs from './pages/AldrMemoirs';
import AldrLearning from './pages/AldrLearning';
import SmartIngestion from './pages/SmartIngestion';
import AddRecord from './pages/AddRecord';
import AllRecords from './pages/AllRecords';
import MedicalRecords from './pages/MedicalRecords';
import CategoryRecords from './pages/CategoryRecords';
import RecordDetails from './pages/RecordDetails';
import CarePlan from './pages/CarePlan';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* BETA Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/beta" element={<BetaDashboard />} />
          <Route path="/beta/vault/identity" element={<BetaIdentity />} />
          <Route path="/beta/vault/legal" element={<BetaLegal />} />
          <Route path="/beta/vault/travel" element={<BetaTravel />} />
          <Route path="/beta/vault/memories" element={<BetaMemories />} />
          <Route path="/beta/vault/learning" element={<BetaLearning />} />
          <Route path="/beta/vault/:type" element={<BetaVault />} />
        {/* Vault Selection Landing Page */}
        <Route path="/" element={<VaultSelection />} />
        
        {/* Demo Pages */}
        <Route path="/chen-family" element={<ChenFamilyDemo />} />
        <Route path="/chen-identity" element={<ChenIdentity />} />
        <Route path="/chen-legal" element={<ChenLegal />} />
        <Route path="/chen-travel" element={<ChenTravel />} />
        <Route path="/chen-memories" element={<ChenMemories />} />
        <Route path="/chen-learning" element={<ChenLearning />} />
        
        {/* Smart Ingestion Hub */}
        <Route path="/smart-ingestion" element={<SmartIngestion />} />
        
        {/* Vault-specific routes with MainLayout */}
        <Route path="/vault" element={<MainLayout />}>
          <Route path="aldr-id" element={<AldrId />} />
          <Route path="aldr-legal" element={<AldrLegal />} />
          <Route path="aldr-health" element={<AldrHealth />} />
          <Route path="aldr-travel" element={<AldrTravel />} />
          <Route path="aldr-memoirs" element={<AldrMemoirs />} />
          <Route path="aldr-learning" element={<AldrLearning />} />
          <Route path="aldr-health/add-record" element={<AddRecord />} />
          <Route path="aldr-health/all-records" element={<AllRecords />} />
          <Route path="aldr-health/medical-records" element={<MedicalRecords />} />
          <Route path="aldr-health/category/:category" element={<CategoryRecords />} />
          <Route path="aldr-health/record/:id" element={<RecordDetails />} />
          <Route path="aldr-health/care-plan" element={<CarePlan />} />
        </Route>
        
        {/* Legacy routes for backward compatibility */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/aldr-id" element={<AldrId />} />
        <Route path="/aldr-legal" element={<AldrLegal />} />
        <Route path="/aldr-health" element={<AldrHealth />} />
        <Route path="/add-record" element={<AddRecord />} />
        <Route path="/all-records" element={<AllRecords />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/category/:category" element={<CategoryRecords />} />
        <Route path="/record/:id" element={<RecordDetails />} />
        <Route path="/care-plan" element={<CarePlan />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;