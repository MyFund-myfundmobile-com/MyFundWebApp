"use client";

// admin/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import HomePage from '../pages/home/page';
import NotFound from '@/app/not-found';
import SettingsPage from '../pages/settings/page';
import Emails from '../pages/emails/page';

const AdminApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/login" />} /> {/* Root path redirects to login */}
        <Route path="/admin/App" element={<Navigate to="/admin/App/home" />} /> {/* Redirect /App to /App/home */}
        <Route path="/admin/App/*" element={<Layout />}>
          <Route path="home" element={<HomePage />} /> {/* Home Page Route */}
          <Route path="settings" element={<SettingsPage />} /> {/* Settings Page Route */}
          <Route path="emails" element={<Emails />} /> {/* Emails Page Route */}
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Not Found Route */}
      </Routes>
    </Router>
  );
};

export default AdminApp;

