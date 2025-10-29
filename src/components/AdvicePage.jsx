import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
const supabase   
 = createClient(
    'https://hwetsveijlrdgswtqpxj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3ZXRzdmVpamxyZGdzd3RxcHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1ODgzMDcsImV4cCI6MjA3NzE2NDMwN30.hqn3VvJjIARp2ukfhwzMm-y18En_oSzDS-mf7rf3-7U'
);

const AdvicePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const numid = searchParams.get('numid');
    const name = searchParams.get('name');
    const surname = searchParams.get('surname');

    const [advice, setAdvice] = useState('');
    const [patientResults, setPatientResults] = useState([]);
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
        const fetchPatientResults = async () => {
            try {
                if (!numid) {
                    console.error('No numid found. Cannot fetch results.');
                    setError('An error occurred. Please try again later.');
                    return;
                }

                const { data, error } = await supabase
                    .from('user')
                    .select('results')
                    .eq('numid', numid)
                    .single();

                if (error) {
                    console.error('Error fetching patient results:', error);
                    setError('Error fetching patient results.');
                } else {
                    // Parse the JSON string
                    const resultsArray = data.results ? JSON.parse(data.results) : [];
                    setPatientResults(resultsArray);
                }
            } catch (error) {
                console.error('Error fetching patient results:', error);
                setError('An error occurred. Please try again later.');
            } finally {
                setLoading(false); 
            }
        };

        fetchPatientResults(); 
    }, [numid]); 

    const handleSaveAdvice = async () => {
        try {
            if (!numid) {
                console.error('No numid found. Cannot save advice.');
                alert('An error occurred. Please try again later.');
                return;
            }

            const { error } = await supabase
                .from('user')
                .update({ advice: advice })
                .eq('numid', numid);

            if (error) {
                console.error('Error saving advice:', error);
                alert('Error saving advice. Please try again.');
            } else {
                console.log('Advice saved successfully!');
                alert('Advice saved successfully!');
                navigate('/doctor'); 
            }
        } catch (error) {
            console.error('Error saving advice:', error);
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
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">Provide Advice</h1>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-xl text-gray-900 font-semibold mb-4">Patient Information:</h2>
                <p><strong>National ID:</strong> {numid}</p>
                <p><strong>Name:</strong> {name} {surname}</p>

                {patientResults.length > 0 ? ( 
                    <div>
                        <h2 className="text-xl text-gray-900 font-semibold mt-4 mb-2">Diagnosis Results:</h2>
                        <ul>
                            {patientResults.map((result, index) => (
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
                    <p className="mt-4">No diagnosis results available for this patient.</p>
                )}

                {/* <h2 className="text-xl text-gray-900 font-semibold mt-4 mb-2">Current Advice:</h2>
                <p className="mt-4">{advice}</p> */}
                <h2 className="text-xl text-gray-900 font-semibold mt-4 mb-2">Advice:</h2>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                />

                <button
                    onClick={handleSaveAdvice}
                    className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Save Advice
                </button>
            </div>

            <button
                onClick={() => navigate('/doctor')}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Back to Doctor's Page
            </button>
        </div>
    );
};

export default AdvicePage;
