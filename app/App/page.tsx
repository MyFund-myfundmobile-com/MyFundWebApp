"use client";
// Routing setup (App.tsx or wherever your routing is defined)
import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import SavePage from '../pages/save/page';
import InvestPage from '../pages/invest/page'; // Import the InvestPage component
import NotFound from '../not-found';
import LoginPage from '../login/page';
import { Login } from '@mui/icons-material';

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/App/*" element={<Layout />} /> {/* Render Layout for all routes under /App */}
        <Route path="/save" element={<SavePage />} /> {/* Save Page Route */}
        <Route path="/home" element={<Layout />} /> {/* Home Page Route */}
        <Route path="/invest" element={<InvestPage />} /> {/* Invest Page Route */}
        <Route path="*" element={<LoginPage />} /> {/* Not Found Route */}
      </Routes>
    </Router>
  );
};

export default App;

