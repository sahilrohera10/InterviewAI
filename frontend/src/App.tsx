import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import RoleSetup from './pages/RoleSetup';
import Interview from './pages/Interview';
import Analysis from './pages/Analysis';
import AuthLayout from './components/layout/AuthLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup" element={<RoleSetup />} />
          <Route path="/interview/:id" element={<Interview />} />
          <Route path="/analysis/:id" element={<Analysis />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;