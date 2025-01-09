import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { useLocation, useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabase   = createClient(
  'https://ygpzdeebucsazhrmophs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncHpkZWVidWNzYXpocm1vcGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NDk3NTcsImV4cCI6MjA0MjAyNTc1N30.5fSKCllDGTBcWbVNItqYwcJy6l7Ra04GyZpc8rSgY9k'
);

function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [nationalID, setNationalID] = useState('');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');   

  const [confirmPassword, setConfirmPassword] = useState('');
  const   
 [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const   
 [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) {
      strength++;
    }
    if (password.match(/[a-z]/)) {
      strength++;
    }
    if (password.match(/[A-Z]/)) {
      strength++;
    }
    if (password.match(/[0-9]/)) {
      strength++;
    }
    if (password.match(/[^a-zA-Z0-9]/))   
 {
      strength++;
    }
    return strength;
  };

  const   
 handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (password.length < 8) {
      alert('Password  must be at least 8 characters long.');
      return;
    }

    try {
      // Insert data into Supabase
      const { error } = await supabase.from('user').insert([
        { 
          numid: nationalID,
          gen: title,
          name: firstName,
          surname: lastName,
          password: password, // In a real app, hash this!
          date: birthdate,
          email: email.toLowerCase(),
          tel: phoneNumber,
          roles: 'patient' 
        }
      ]);

      if (error) {
        console.error('Error registering user:', error);
        // Handle the error, e.g., show an error message to the user
      } else {
        console.log('User registered successfully!');
        const from = location.state?.from?.pathname || '/login'; // Get the 'from' value or default to '/login'
        navigate(from, { replace: true }); 
        // Optionally redirect the user to a login page or another page
      }

    } catch (error) {
      console.error('Error registering user:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-gray-900"
    >
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-5xl my-16">
        <h2 className="text-2xl font-bold text-white mb-4">สมัครเข้าใช้งาน (ผู้ป่วย)</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-2 gap-4"> {/* Added grid for 2 columns */}
            {/* National ID */}
            <div>
              <label htmlFor="nationalID" className="block text-white text-sm font-bold mb-2">
                เลขบัตรประชาชน 13 หลัก
              </label>
              <input
                type="text"
                id="nationalID"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your national ID"
                value={nationalID}
                onChange={(e) => setNationalID(e.target.value)}
              />
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
                คำนำหน้า
              </label>
              <select
                id="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"   

                value={title}
                onChange={(e) => setTitle(e.target.value)}   

              >
                <option value="">เลือกคำนำหน้า</option>
                <option value="เด็กชาย">เด็กชาย</option>
                <option value="เด็กหญิง">เด็กหญิง</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>   

                <option value="นางสาว">นางสาว</option>
              </select>
            </div>   


            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-white text-sm font-bold mb-2">
                ชื่อจริง
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}   

              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-white text-sm font-bold mb-2">
                นามสกุล
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}   

              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                รหัสผ่าน
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div   
 className="mt-2">
                <div
                  className="h-2 bg-gray-200 rounded"
                  style={{
                    width: `${passwordStrength * 20}%`,
                    backgroundColor: passwordStrength < 3 ? 'red' : passwordStrength < 4 ? 'orange' : 'green',
                  }}
                ></div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm font-bold mb-2">
                ยืนยันรหัสผ่าน
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight   
 focus:outline-none focus:shadow-outline"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordMatch && (
                <p className="text-red-500 text-sm mt-1">รหัสผ่านไม่ตรงกัน</p>
              )}
            </div>

            {/* Birthdate */}
            <div>
              <label htmlFor="birthdate" className="block text-white text-sm font-bold mb-2">
                วันเกิด
              </label>
              <input
                type="date"
                id="birthdate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"
                value={birthdate}   

                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                อีเมล
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>   


            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-white text-sm font-bold mb-2">
                เบอร์โทร
              </label>
              <input
                maxLength={10}
                type="tel"
                id="phoneNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none   
 focus:shadow-outline"
                placeholder="Enter your phone number"
                value={phoneNumber}   

                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div> {/* Close the grid container */}

          <div className="flex items-center justify-center mt-4"> {/* Added mt-4 for spacing */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"   

            >
              Register
            </button>
          </div>
        </form>
      </div>   

    </motion.div>
  );
}

export default RegisterPage;