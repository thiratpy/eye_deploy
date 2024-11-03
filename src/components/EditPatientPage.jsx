import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://eggaokvibnheenenongc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ2Fva3ZpYm5oZWVuZW5vbmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MzIwNjEsImV4cCI6MjA0NTAwODA2MX0.FunJBC2X_9yxcyF7ZYMij7yphMhcBD9hjI6TjNRoGxk'
);

const EditPatientPage = () => {
    const navigate = useNavigate();
    const { numid } = useParams(); // Get numid from URL parameters

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [date, setDate] = useState('');
    const [gen, setGen] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                if (!numid) {
                    console.error('No numid found. Cannot fetch patient data.');
                    setError('An error occurred. Please try again later.');
                    return;
                }

                const { data, error } = await supabase
                    .from('user')
                    .select('name, surname, email, tel, date, gen') 
                    .eq('numid', numid)
                    .single();

                if (error) {
                    console.error('Error fetching patient data:', error);
                    setError('Error fetching patient data.');
                } else {
                    setName(data.name || '');
                    setSurname(data.surname || '');
                    setEmail(data.email || '');
                    setTel(data.tel || '');
                    setDate(data.date || '');
                    setGen(data.gen || ''); 
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setError('An error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [numid]);

    const handleUpdatePatient = async () => {
        try {
            const { error } = await supabase
                .from('user')
                .update({ name, surname, email, tel, date, gen }) 
                .eq('numid', numid);

            if (error) {
                console.error('Error updating patient data:', error);
                alert('Error updating patient data. Please try again.');
            } else {
                alert('Patient data updated successfully!');
                navigate('/doctor'); // Or wherever you want to redirect
            }
        } catch (error) {
            console.error('Error updating patient data:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    if (loading) {
        return <div>Loading patient data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">Edit Patient Information</h1>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                {/* Input fields for name, surname, email, tel, date */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="surname" className="block text-gray-700 font-bold mb-2">Surname:</label>
                    <input 
                        type="text" 
                        id="surname" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tel" className="block text-gray-700 font-bold mb-2">Telephone:</label>
                    <input 
                        type="tel" 
                        id="tel" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        value={tel} 
                        onChange={(e) => setTel(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
                    <input 
                        type="date" 
                        id="date" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                    />
                </div>

                {/* Input field for gen */}
                <div className="mb-4">
                    <label htmlFor="gen" className="block text-gray-700 font-bold mb-2">Gender:</label>
                    <select
                        id="gen"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={gen}
                        onChange={(e) => setGen(e.target.value)}
                    >
                        <option value="">Select Gender</option> 
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                <button 
                    onClick={handleUpdatePatient} 
                    className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Patient
                </button>
            </div>

            <button 
                onClick={() => navigate('/doctor')} 
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Back to Doctor's Page
            </button>
        </div>
    );
};

export default EditPatientPage;