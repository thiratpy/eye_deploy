import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { predictions } = location.state || {};

    // List of possible syndromes and their labels
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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">Prediction Results</h1>

            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-xl text-gray-900 font-semibold mb-4">Your Retinal Image Results :</h2>
                <ul>
                    {predictions && predictions.length > 0 ? (
                        predictions.map((prediction, index) => (
                            <li key={index} className="mb-2">
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        {syndromeLabels[index]?.english} ({syndromeLabels[index]?.thai})
                                    </span>
                                    <span className="text-gray-700">{(prediction.probability * 100).toFixed(2)}%</span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No prediction data available.</p>
                    )}
                </ul>
            </div>

            <button
                onClick={() => navigate('/')}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Back
            </button>

            <footer className="mt-10 text-gray-500 text-center">
            </footer>
        </div>
    );
};

export default ResultsPage;
