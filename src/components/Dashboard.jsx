import React, { useState, useEffect } from 'react'; 
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import HistoricoCheckin from './CheckInHistory';
import GraficosEmocionais from './EmotionalGraphs';
import Dicas from './Tips';
import ContatoProfissionais from './ContactProfessionals';
import TelaCheckin from './CheckIn';
import InstrucoesDashboard from './InstrucoesDashboard'; // Importe o componente
import './css/Dashboard.css';

const Dashboard = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true); // Estado para controlar a exibição das instruções
  const location = useLocation(); // Hook para obter a localização atual

  const handleToggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  const handleLinkClick = () => {
    setSidebarExpanded(false);
    setShowInstructions(false); // Oculta as instruções ao clicar em um link
  };

  const handleDismissInstructions = () => {
    setShowInstructions(false); // Oculta as instruções quando o usuário interage
  };

  // useEffect para reiniciar as instruções quando o Dashboard é acessado pela primeira vez
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setShowInstructions(true); // Exibe as instruções quando acessa o Dashboard
    }
  }, [location.pathname]);

  return (
    <div className={`dashboard-container ${isSidebarExpanded ? 'expanded' : 'minimized'}`}>
      <DashboardNavbar onLinkClick={handleLinkClick} onToggleSidebar={handleToggleSidebar} isExpanded={isSidebarExpanded} />
      <main className="dashboard-content">
        {showInstructions && <InstrucoesDashboard onDismiss={handleDismissInstructions} />} {/* Condicionalmente renderiza as instruções */}
        <Routes>
          <Route path="check-in" element={<TelaCheckin />} />
          <Route path="historico-checkin" element={<HistoricoCheckin />} />
          <Route path="graficos-emocionais" element={<GraficosEmocionais />} />
          <Route path="dicas" element={<Dicas />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
