import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/Homepage';
import HabitManagement from './pages/HabitManagement';
import SignupForm from './pages/SignUpForm';
import LoginForm from './pages/LoginForm';
import AboutMe from './pages/AboutMe';
import Resources from './pages/Resources';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/habit-management" element={<HabitManagement />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />  
        <Route path="/about" element={<AboutMe />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
      </Layout>
    </Router>

  );
};

export default App;
