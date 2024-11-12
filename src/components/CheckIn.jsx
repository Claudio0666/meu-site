import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useEmotion } from '../context/EmotionContext';
import './css/CheckIn.css';

const CheckIn = () => {
    const [mood, setMood] = useState('');
    const [comment, setComment] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [lastCheckInDate, setLastCheckInDate] = useState(null);
    const { addEmotion } = useEmotion();

    const checkLastCheckIn = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:5000/api/checkin/today', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.data && response.data.timestamp) {
                setLastCheckInDate(new Date(response.data.timestamp));
            }
        } catch (error) {
            console.error('Erro ao verificar o último check-in:', error);
        }
    };

    useEffect(() => {
        checkLastCheckIn();
    }, []);

    const handleMoodChange = (event) => setMood(event.target.value);
    const handleCommentChange = (event) => setComment(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar logado para registrar um check-in.');
            return;
        }

        if (lastCheckInDate && lastCheckInDate.toDateString() === new Date().toDateString()) {
            alert('Você já fez um check-in hoje.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/checkin', {
                emotion: mood,
                comment,
            }, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            setMood('');
            setComment('');
            setSuccessMessage('Check-in enviado com sucesso!');
            setLastCheckInDate(new Date());
            addEmotion(mood);
        } catch (error) {
            console.error('Erro ao enviar check-in:', error);
            alert('Erro ao enviar check-in. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="check-in-container">
            <h2>Check-in Emocional</h2>
            <form className="check-in-form" onSubmit={handleSubmit}>
                <label className="check-in-label">
                    Como você está se sentindo?
                    <select
                        className="check-in-select"
                        value={mood}
                        onChange={handleMoodChange}
                        required
                    >
                        <option value="">Selecione um estado emocional</option>
                        <option value="Triste">Triste</option>
                        <option value="Feliz">Feliz</option>
                        <option value="Ansioso">Ansioso</option>
                        <option value="Cansaço">Cansaço</option>
                        <option value="Irritado(a)">Irritado</option>
                    </select>
                </label>

                <label className="check-in-label">
                    Comentários:
                    <textarea
                        className="check-in-textarea"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Compartilhe o que está sentindo..."
                        required
                    />
                </label>

                <button className="check-in-button" type="submit">Enviar Check-in</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default CheckIn;
