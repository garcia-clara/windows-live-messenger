import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import PrivateRoute from './components/PrivateRoute';
import { EmoticonProvider } from './contexts/EmoticonContext';
import Notification from './components/Notification';

const Main = () => {

  return (
    <React.StrictMode>
      <EmoticonProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute element={HomePage} />} />
            <Route path="/chat/:id" element={<PrivateRoute element={ChatPage} />} />
          </Routes>
        </Router>
      </EmoticonProvider>
    </React.StrictMode>
  );
};

// Use createRoot to render the app
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
