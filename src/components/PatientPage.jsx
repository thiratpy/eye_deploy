import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://eggaokvibnheenenongc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ2Fva3ZpYm5oZWVuZW5vbmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MzIwNjEsImV4cCI6MjA0NTAwODA2MX0.FunJBC2X_9yxcyF7ZYMij7yphMhcBD9hjI6TjNRoGxk'
);

const PatientPage = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const syndromeLabels = [
    { english: "Age related Macular Degeneration", thai: "จอเสื่อมตามอายุ" },
    { english: "Cataract", thai: "ต้อกระจก" },
    { english: "Diabetes", thai: "เบาหวาน" },  
    { english: "Glaucoma", thai: "ต้อหิน" },
    { english: "Hypertension", thai: "ความดันสูง" },
    { english: "Pathological Myopia", thai: "สายตาสั้นผิดปกติ" },
    { english: "Normal", thai: "ทั่วไป" },
    { english: "Other", thai: "อื่นๆ " }
  ];

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const userEmail = localStorage.getItem("user_email"); 

        if (!userEmail) {
          console.error('User email not found in localStorage.');
          setError('An error occurred. Please try again later.');
          return;
        }

        const { data, error } = await supabase
          .from('user')
          .select('*') // Fetch all columns
          .eq('email', userEmail)
          .single();

        if (error) {
          console.error('Error fetching patient data:', error);
          setError('Error fetching patient data.');
        } else {
          setPatientData(data);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patientData) {
    return <div>Patient data not found.</div>;
  }

  // Parse the results JSON string
  const resultsArray = patientData.results ? JSON.parse(patientData.results) : [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">Patient Information</h1>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl text-gray-900 font-semibold mb-4">Patient Details:</h2>
        <p><strong>National ID:</strong> {patientData.numid}</p>
        <p><strong>Name:</strong> {patientData.name} {patientData.surname}</p>
        <p><strong>Email:</strong> {patientData.email}</p>
        <p><strong>Telephone:</strong> {patientData.tel}</p>
        <p><strong>Gender:</strong> {patientData.gen}</p>
        <p><strong>Date:</strong> {patientData.date}</p> {/* Assuming date is in YYYY-MM-DD format */}

        {resultsArray.length > 0 ? (
          <div>
            <h2 className="text-xl text-gray-900 font-semibold mt-4 mb-2">Diagnosis Results:</h2>
            <ul>
              {resultsArray.map((result, index) => (
                <li key={index} className="mb-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-black">
                      {syndromeLabels[index]?.english} ({syndromeLabels[index]?.thai})
                    </span>
                    <span className="text-gray-700">{(result.probability * 100).toFixed(2)}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4">No diagnosis results available yet.</p>
        )}

        {patientData.advice && (
          <div className="mt-4">
            <h2 className="text-xl text-gray-900 font-semibold mb-2">Doctor's Advice:</h2>
            <p>{patientData.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPage;