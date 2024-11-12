import React from 'react';
import './css/InstrucoesDashboard.css'; // Opcional: crie um CSS para estilizar as instruções

const InstrucoesDashboard = ({ onDismiss }) => {
  return (
    <div className="instrucoes-dashboard">
      <div className="instrucoes-content">
        <h2>Bem-vindo à Área de Check-in Emocional!</h2>
        <p>
          Aqui você pode gerenciar suas informações e acessar diversos recursos para melhor atender às suas necessidades.
        </p>
        <ul>
          <li><strong>Check-in:</strong> Registre seu estado emocional e faça check-ins regulares.</li>
          <li><strong>Histórico de Check-in:</strong> Veja seu histórico de check-ins para monitorar seu progresso.</li>
          <li><strong>Gráficos Emocionais:</strong> Visualize gráficos que mostram suas emoções ao longo do tempo.</li>
          <li><strong>Dicas:</strong> Acesse dicas úteis para lidar com desafios emocionais.</li>
        </ul>
        <p>
          Utilize a barra de navegação à esquerda para acessar cada uma dessas seções.
        </p>
        <button onClick={onDismiss} className="btn-fechar">Fechar</button>
      </div>
    </div>
  );
};

export default InstrucoesDashboard;
