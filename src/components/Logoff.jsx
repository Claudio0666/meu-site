import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Logoff.css';

const Logoff = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do armazenamento local
    navigate('/'); // Redireciona para a página inicial após o logout
    window.location.reload(); // Opcional: recarregar a página para garantir que o estado atualize
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logoff
    </button>
  );
};

export default Logoff;


