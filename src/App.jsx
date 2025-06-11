import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeMenu from './components/WelcomeMenu';
import Footer from './components/Footer'; 
import UploadRetinalImage from './components/UploadRetinalImage';
import LoadingScreen from './components/LoadingScreen';
import ResultsPage from './components/ResultsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DoctorManagementPage from './components/DoctorManagementPage';
import NavigationTab from './components/NavigationTab';
import AdvicePage from './components/AdvicePage';
import EditPatientPage from './components/EditPatientPage';
import PatientPage from './components/PatientPage';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavigationTab />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<WelcomeMenu />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/upload" element={<UploadRetinalImage />} />  
            <Route path="/loading" element={<LoadingScreen />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/doctor" element={<DoctorManagementPage />} />
            <Route path="/advice" element={<AdvicePage />} />
            <Route path="/edit-patient/:numid" element={<EditPatientPage />} />
            <Route path="/patient" element={<PatientPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
