import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AldrId from './pages/AldrId';
import AldrLegal from './pages/AldrLegal';
import AldrHealth from './pages/AldrHealth';
import AddRecord from './pages/AddRecord';
import AllRecords from './pages/AllRecords';
import MedicalRecords from './pages/MedicalRecords';
import CategoryRecords from './pages/CategoryRecords';
import RecordDetails from './pages/RecordDetails';
import CarePlan from './pages/CarePlan';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AldrHealth />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;