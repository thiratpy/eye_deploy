// src/components/WelcomeMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../style/style.css"

const WelcomeMenu = () => {
  return (
    <div class='bg-blue-500 min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-10'>
        <div className="">
        <div className="flex-grow flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
            Welcome to Eyes On You
            </h1>
            <p className="text-white text-lg sm:text-xl mb-6 text-center">
            A platform for predicting eye diseases and receiving recommendations from doctors.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
            <Link to="/upload" className="bg-white text-blue-500 px-4 py-3 text-center rounded-lg font-semibold shadow-lg w-full sm:w-auto">
                Upload Retinal Image
            </Link>
            <Link to="/login" className="bg-white text-blue-500 px-4 py-3 text-center rounded-lg font-semibold shadow-lg w-full sm:w-auto">
                Doctor Login
            </Link>
            <Link to="/register" className="bg-white text-blue-500 px-4 py-3 text-center rounded-lg font-semibold shadow-lg w-full sm:w-auto">
                Patient Register
            </Link>
            </div>
        </div>
        <footer className="text-white mt-6">
        </footer>
        </div>
    </div>
  );
};

export default WelcomeMenu;
