import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AldrId from './components/AldrId';
import RecordDetails from './components/RecordDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aldr-id" element={<AldrId />} />
        <Route path="/record/:id" element={<RecordDetails />} />
      </Routes>
    </div>
  );
}

export default App;