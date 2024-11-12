import React from 'react';
import { Link } from 'react-router-dom';
import './css/Dashboard.css';

const DashboardNavbar = ({ onLinkClick, onToggleSidebar, isExpanded }) => {
  return (
    <nav className="dashboard-navbar">
      <button className="toggle-button" onClick={onToggleSidebar}>
        {isExpanded ? '⏴' : '⏵'} {/* Ícone de expandir/minimizar */}
      </button>
      {isExpanded && (
        <>
          <Link to="check-in" className="dashboard-button" onClick={onLinkClick}>Fazer Check-in</Link>
          <Link to="historico-checkin" className="dashboard-button" onClick={onLinkClick}>Histórico de Check-ins</Link>
          <Link to="graficos-emocionais" className="dashboard-button" onClick={onLinkClick}>Gráficos Emocionais</Link>
          <Link to="dicas" className="dashboard-button" onClick={onLinkClick}>Dicas</Link>
        </>
      )}
    </nav>
  );
};

export default DashboardNavbar;
