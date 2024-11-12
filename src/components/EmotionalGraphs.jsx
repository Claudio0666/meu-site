import React, { useState, useMemo, useEffect } from 'react';
import { Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Tooltip, Legend, LineElement, PointElement, Filler, ArcElement, RadialLinearScale } from 'chart.js';
import { useEmotion } from '../context/EmotionContext';
import './css/EmotionalGraphs.css';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Tooltip, 
  Legend, 
  Filler, 
  ArcElement,
  RadialLinearScale  // Necessário para o gráfico polar
);

const MOOD_COLORS = {
  'Feliz': '#90EE90', // Verde claro (relacionado à felicidade e calma)
  'Triste': '#1E90FF', // Azul (associado à tristeza e serenidade)
  'Irritado(a)': '#FF6347', // Vermelho (relacionado à raiva e intensidade)
  'Ansioso': '#FFA500', // Laranja (relacionado à energia e nervosismo)
  'Cansaço': '#A9A9A9', // Cinza (associado à exaustão e neutralidade)
};

const allEmotions = Object.keys(MOOD_COLORS);

const calculateUserEmotionCounts = (emotions) => {
  return emotions.reduce((acc, { emotion, user_id }) => {
    acc[user_id] = acc[user_id] || allEmotions.reduce((obj, emo) => ({ ...obj, [emo]: 0 }), {});
    acc[user_id][emotion] += 1;
    return acc;
  }, {});
};

const EmotionalGraphs = () => {
  const { emotions } = useEmotion();
  const [activeGraph, setActiveGraph] = useState('bar');
  const [key, setKey] = useState(0);

  // Calculate user emotion counts whenever emotions change
  const userEmotionCounts = useMemo(() => calculateUserEmotionCounts(emotions || []), [emotions]);

  const loadingMessage = emotions.length === 0 ? (
    <div className="loading-container">
      <p>Carregando dados de emoções...</p>
    </div>
  ) : null;

  if (emotions.length === 0) {
    return <p className="no-data">Nenhuma emoção registrada para exibir.</p>;
  }

  const options = {
    responsive: true,
    scales: {
      x: { 
        title: { display: true, text: 'Emoções' }, 
        stacked: true, 
        ticks: { display: false }, // Esconde os números no eixo X
      },
      y: {
        title: { display: true, text: '' },
        beginAtZero: true,
        stacked: true,
        ticks: { display: false, stepSize: 1 }, // Esconde os números no eixo Y
      },
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
  };

  const toggleGraph = () => {
    setActiveGraph(activeGraph === 'bar' ? 'line' : activeGraph === 'line' ? 'doughnut' : activeGraph === 'doughnut' ? 'polar' : 'bar');
    setKey((prevKey) => prevKey + 1); // Atualiza a chave para forçar o re-render
  };

  return (
    <div className="graph-container">
      <h1>Gráfico das Emoções</h1>
      <button onClick={toggleGraph}>Alternar Gráfico</button>
      {loadingMessage}
      {Object.keys(userEmotionCounts).map(user_id => {
        const userData = userEmotionCounts[user_id];
        if (Object.values(userData).every(count => count === 0)) return null;

        const graphData = {
          labels: allEmotions,
          datasets: [{
            label: 'Emoções',
            data: allEmotions.map(emotion => userData[emotion] || 0),
            backgroundColor: allEmotions.map(emotion => MOOD_COLORS[emotion]),
            borderColor: activeGraph === 'line' ? 'green' : 'transparent', // Cor verde para o gráfico de linha
            fill: activeGraph === 'line',
            borderWidth: 2, // Adiciona uma borda para a linha
          }],
        };

        return (
          <div key={user_id} className="user-graph">
            {activeGraph === 'bar' ? (
              <Bar key={key} data={graphData} options={options} />
            ) : activeGraph === 'line' ? (
              <Line key={key} data={graphData} options={options} />
            ) : activeGraph === 'doughnut' ? (
              <Doughnut 
                key={key} 
                data={graphData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                  },
                  cutout: '50%', // Ajusta o tamanho do buraco no centro do gráfico
                  radius: '80%',  // Ajusta o tamanho geral do gráfico (diminui)
                }} 
              />
            ) : (
              <PolarArea 
                key={key} 
                data={graphData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                  },
                  scales: {
                    r: {
                      ticks: { display: false }, // Esconde os números no gráfico polar
                    },
                  },
                }} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EmotionalGraphs;
