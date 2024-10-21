import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Homepage';
import HabitManagement from './pages/HabitManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/habit-management" element={<HabitManagement />} />
      </Routes>
    </Router>

  );
};

export default App;
