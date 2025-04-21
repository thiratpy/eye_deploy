import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../style/style.css";
import { motion } from 'framer-motion';

const WelcomeMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLogin = () => {
      const userRole = localStorage.getItem('user_role');
      if (userRole === 'doc') {
        navigate('/doctor');
        window.location.reload();
      }
      if (userRole === 'patient') {
        navigate('/patient');
        window.location.reload();
      }
    };

    checkUserLogin();
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className='bg-blue-500 min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-10'
    >
      <div className="">
        <div className="flex-grow flex flex-col justify-center items-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Welcome to Eyes On You
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white text-lg sm:text-xl mb-6 text-center"
          >
            A platform for predicting eye diseases and receiving advices from doctors.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <Link to="/login" className="tracking-wider bg-white text-blue-500 px-10 py-3 text-center rounded-lg font-semibold shadow-lg w-full sm:w-auto mar">
              เริ่มต้น
            </Link> 
          </motion.div>
        </div>
        <footer className="text-white mt-6">
        </footer>
      </div>
    </motion.div>
  );
};

export default WelcomeMenu;
