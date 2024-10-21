import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/Homepage';
import HabitManagement from './pages/HabitManagement';
import LoginForm from './pages/LoginForm';
import AboutMe from './pages/AboutMe';
import Resources from './pages/Resources';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/habit-management" element={<HabitManagement />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/resources" element={<Resources />} />

      </Routes>
    </Router>

  );
};

export default App;
