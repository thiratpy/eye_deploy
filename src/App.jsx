// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeMenu from './components/WelcomeMenu';
import Footer from './components/Footer'; // Assuming you already have this component
import UploadRetinalImage from './components/UploadRetinalImage';
import LoadingScreen from './components/LoadingScreen';
import ResultsPage from './components/ResultsPage';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<WelcomeMenu />} />
            <Route path="/login" element={<div>Doctor Login Page</div>} />
            <Route path="/register" element={<div>Patient Register Page</div>} />
            <Route path="/upload" element={<UploadRetinalImage />} />  
            <Route path="/loading" element={<LoadingScreen />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
