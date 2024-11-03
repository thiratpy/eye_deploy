// src/components/UploadRetinalImage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://eggaokvibnheenenongc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ2Fva3ZpYm5oZWVuZW5vbmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MzIwNjEsImV4cCI6MjA0NTAwODA2MX0.FunJBC2X_9yxcyF7ZYMij7yphMhcBD9hjI6TjNRoGxk'
);

const UploadRetinalImage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const numid = searchParams.get('numid');
    const name = searchParams.get('name');
    const surname = searchParams.get('surname');
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate(); // For navigation to loading page

    // Handle the file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file); // Set the file in state

        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = new Image();
            imgElement.src = event.target.result;

            imgElement.onload = function() {
                setImageSrc(imgElement.src); // Set imageSrc as base64 URL
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Handle the click for upload
    const handleUploadClick = () => {
        if (imageSrc) {
            // Pass all patient information along with imageSrc
            navigate('/loading', { 
              state: { 
                imageSrc, 
                patient: { numid, name, surname } 
              } 
            });
          } else {
            alert('Please upload an image first.');
          }
        };

    return (
        <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center p-6 md:p-10">
            <div className="flex-grow flex flex-col justify-center items-center">
                <h1 className="text-blue-500 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
                    Upload Retinal Image
                </h1>
                <p className="text-gray-700 text-lg sm:text-xl mb-6 text-center">
                    Please upload a retinal image in .jpg or .png format.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
                    <div className="mb-4">
                        <input
                            type="file"
                            accept=".jpg,.png"
                            onChange={handleFileChange}
                            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {file && (
                        <div className="mb-4 text-center">
                            <p className="text-gray-700">Selected File: <span className="font-semibold">{file.name}</span></p>
                        </div>
                    )}

                    <button
                        onClick={handleUploadClick}
                        className="bg-blue-500 text-white px-4 py-3 w-full rounded-lg font-semibold hover:bg-blue-600 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Submit Image
                    </button>
                </div>

                <div className="mt-6">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Back to Main Menu
                    </Link>
                </div>
            </div>

            <footer className="text-gray-500 mt-6 text-center">
            </footer>
        </div>
    );
};

export default UploadRetinalImage;
