import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase   = createClient(
    'https://ygpzdeebucsazhrmophs.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncHpkZWVidWNzYXpocm1vcGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NDk3NTcsImV4cCI6MjA0MjAyNTc1N30.5fSKCllDGTBcWbVNItqYwcJy6l7Ra04GyZpc8rSgY9k'
);

function DoctorManagementPage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleAdviceClick = (patient) => {
    navigate(`/advice?numid=${patient.numid}&name=${patient.name}&surname=${patient.surname}`);
};

const handleEditClick = (patient) => {
    navigate(`/edit-patient/${patient.numid}`); 
};

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const userRole = localStorage.getItem("user_role");
        const userEmail = localStorage.getItem("user_email"); 

        if (userRole !== 'doc') {
          navigate('/');
          console.log(`Not authenticated yet.`);
          return;
        }

        const { data: roleData, error: roleError } = await supabase
          .from('user')
          .select('roles')
          .eq('email', userEmail)
          .single(); 

        if (roleError) {
          console.error('Error fetching user role:', roleError);
          navigate('/');
          return;
        }

        if (userRole !== 'doc') {
          navigate('/');
          console.log(`You are not a doctor so stop trying!`);
          return;
        }

        const { data, error } = await supabase
          .from('user')
          .select('numid, name, surname')
          .eq('roles', 'patient');

        if (error) {
          console.error('Error fetching patients:', error);
        } else {
          setPatients(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [navigate]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Doctor's Management Page</h1>

      <h2 className="text-2xl font-bold mb-4 pt-10">Patient Scoreboard</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">National ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Surname</th>
            <th className="px-4 py-2">Diagnose</th>
            <th className="px-4 py-2">Advice</th>
            <th className="px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
      {patients.map((patient) => (
        <tr key={patient.numid}>
          <td className="border px-4 py-2">{patient.numid}</td>
          <td className="border px-4 py-2">{patient.name}</td>
          <td className="border px-4 py-2">{patient.surname}</td>
          <td className="border px-4 py-2 items-center text-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"   

              onClick={() =>
                navigate(`/upload?numid=${patient.numid}&name=${patient.name}&surname=${patient.surname}`)
              }
            >
              Diagnose
            </button>
          </td>
          <td className="border px-4 py-2 items-center text-center">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"   

              onClick={() => handleAdviceClick(patient)} 
            >
              Advice
            </button>
          </td>
          <td className="border px-4 py-2 items-center text-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleEditClick(patient)}
                                >
                                    Edit
                                </button>
                            </td>
        </tr>
      ))}
    </tbody>
      </table>
    </div>
  );
}

export default DoctorManagementPage;
