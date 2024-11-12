import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {
    const [emotions, setEmotions] = useState([]);
    const [lastEmotion, setLastEmotion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isTokenValid = (token) => {
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp > now;
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            return false;
        }
    };

    const fetchData = async (url, setData, errorMsg) => {
        const token = localStorage.getItem('token');
        if (!token || !isTokenValid(token)) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            setData(response.data);
        } catch (error) {
            console.error(`${errorMsg}:`, error);
            setError(`${errorMsg}. Tente novamente mais tarde.`);
            if (error.response && error.response.status === 401) {
                alert('Sessão expirada. Por favor, faça login novamente.');
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            setIsLoggedIn(true);
            fetchEmotions();
            fetchLastEmotion();
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const fetchEmotions = () => fetchData('http://localhost:5000/api/checkin', setEmotions, 'Erro ao buscar emoções');
    const fetchLastEmotion = () => fetchData('http://localhost:5000/api/emotion/latest', setLastEmotion, 'Erro ao buscar última emoção');

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', credentials);
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            setLoginError(null);
            fetchEmotions();
            fetchLastEmotion();
        } catch (error) {
            setLoginError('Erro no login. Verifique suas credenciais.');
        }
    };

    const addEmotion = async (emotion) => {
        const token = localStorage.getItem('token');
        if (!token || !isTokenValid(token)) {
            alert('Você precisa estar logado para adicionar uma emoção.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/checkin', { emotion }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmotions((prevEmotions) => [...prevEmotions, emotion]);
            setLastEmotion(emotion);
            alert('Emoção adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar emoção:', error);
            setError('Erro ao adicionar emoção. Tente novamente mais tarde.');
        }
    };

    return (
        <EmotionContext.Provider value={{ emotions, lastEmotion, addEmotion, loading, error, loginError, handleLogin, isLoggedIn }}>
            {children}
        </EmotionContext.Provider>
    );
};

export const useEmotion = () => React.useContext(EmotionContext);
