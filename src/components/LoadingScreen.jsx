import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // To get passed data and navigate

const LoadingScreen = () => {
    const location = useLocation(); // Get the state from navigation (imageSrc)
    const { imageSrc } = location.state || {}; // Destructure imageSrc passed from UploadRetinalImages
    const [model, setModel] = useState(null);
    const [loadingText, setLoadingText] = useState('Loading...');
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const loadingIntervalRef = useRef(null);
    const navigate = useNavigate(); // For navigation after prediction

    const URL = "https://teachablemachine.withgoogle.com/models/OCZV44JVY/";

    useEffect(() => {
        const loadModel = async () => {
            try {
                setLoadingText('Loading model...');
                const tmImage = await import('@teachablemachine/image');
                const modelURL = URL + "model.json";
                const metadataURL = URL + "metadata.json";

                const loadedModel = await tmImage.load(modelURL, metadataURL);
                setModel(loadedModel);
                simulateLoading(loadedModel); // Start the loading simulation once the model is loaded
            } catch (error) {
                console.error("Failed to load the model", error);
                setLoadingText('Error loading model');
            }
        };

        // Start the model loading process
        loadModel();
    }, []);

    const simulateLoading = (loadedModel) => {
        setLoadingPercentage(0);
        setLoadingText('Starting...');

        loadingIntervalRef.current = setInterval(() => {
            setLoadingPercentage(prev => {
                let nextValue = prev + 1;

                if (nextValue === 30) {
                    setLoadingText('Processing image...');
                } else if (nextValue === 60) {
                    setLoadingText('Loading prediction from model...');
                } else if (nextValue === 90) {
                    setLoadingText('Almost done...');
                }

                // Stop incrementing once we hit 100
                if (nextValue >= 100) {
                    clearInterval(loadingIntervalRef.current);
                    setLoadingText('Prediction complete!');
                    handlePrediction(loadedModel); // Process the prediction after loading finishes
                    return 100; // Ensure the percentage doesn't exceed 100
                }

                return nextValue;
            });
        }, 40); // Speed of loading (adjust as needed)
    };

    const handlePrediction = async (loadedModel) => {
        if (loadedModel && imageSrc) {
            const imgElement = new Image();
            imgElement.src = imageSrc;
            imgElement.onload = async () => {
                const prediction = await loadedModel.predict(imgElement);

                // Format prediction data for the results page
                const formattedPredictions = prediction.map((p) => ({
                    className: p.className, // Name of the syndrome
                    probability: p.probability // Probability value
                }));

                // Navigate to ResultsPage with the prediction data
                navigate('/results', { state: { predictions: formattedPredictions } });
            };
        }
    };

    return (
        <div className="bg-gray-900 flex flex-col items-center justify-center h-screen">
            <div className="text-center text-2xl mb-5">{loadingText}</div>
            <progress className="progress w-64" value={loadingPercentage} max="100"></progress>
            <div className="text-center mt-2">{loadingPercentage}%</div>
        </div>
    );
};

export default LoadingScreen;
