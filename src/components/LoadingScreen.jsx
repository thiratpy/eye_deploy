import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 

const LoadingScreen = () => {
    const location = useLocation(); 
    const { imageSrc, patient } = location.state || {};
    const [model, setModel] = useState(null);
    const [loadingText, setLoadingText] = useState('Loading...');
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const loadingIntervalRef = useRef(null);
    const navigate = useNavigate(); 

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
                simulateLoading(loadedModel); 
            } catch (error) {
                console.error("Failed to load the model", error);
                setLoadingText('Error loading model');
            }
        };

        
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

               
                if (nextValue >= 100) {
                    clearInterval(loadingIntervalRef.current);
                    setLoadingText('Prediction complete!');
                    handlePrediction(loadedModel); 
                    return 100; 
                }

                return nextValue;
            });
        }, 40); 
    };

    const handlePrediction = async (loadedModel) => {
        if (loadedModel && imageSrc) {
            const imgElement = new Image();
            imgElement.src = imageSrc;
            imgElement.onload = async () => {
                const prediction = await loadedModel.predict(imgElement);

                
                const formattedPredictions = prediction.map((p) => ({
                    className: p.className, 
                    probability: p.probability 
                }));

                
                navigate('/results', { 
                    state: { 
                        predictions: formattedPredictions, 
                        patient: patient // pass patient info to ResultsPage
                    } 
                });
            };
        }
    };

    return (
        <div className="bg-gray-900 flex flex-col items-center justify-center h-screen text-white">
            <div className="text-center text-2xl mb-5">{loadingText}</div>
            <progress className="progress w-64" value={loadingPercentage} max="100"></progress>
            <div className="text-center mt-2">{loadingPercentage}%</div>
        </div>
    );
};

export default LoadingScreen;
