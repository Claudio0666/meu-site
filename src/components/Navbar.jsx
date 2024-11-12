import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logoff from './Logoff'; 
import './css/navbar.css'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null); // Estado único para controlar submenus abertos

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = (menu) => setHoveredMenu(menu);
  const handleMouseLeave = () => setHoveredMenu(null);

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>Teia</h1>
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✖️' : '☰'}
      </button>
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" className="nav-link">Início</Link>
        </li>
        <li
          onMouseEnter={() => handleMouseEnter("sobre")}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/sobre" className="nav-link">Sobre</Link>
          {hoveredMenu === "sobre" && (
            <ul className="submenu">
              <li><Link to="/about-autism" className="nav-link">Sobre o Autismo</Link></li>
              <li><Link to="/maes-que-inspiram" className="nav-link">Mães Que Inspiram</Link></li> {/* Corrigido para o caminho correto */}
            </ul>
          )}
        </li>
        <li>
          <Link to="/contato" className="nav-link">Contato</Link>
        </li>
        <li>
          <Link to="/dashboard" className="nav-link">Emoções</Link>
        </li>
        <li>
          <Link to="/profissionais" className="nav-link">Profissionais</Link>
        </li>
        <li>
          <Link to="/AjudeNosAMelhorar" className="nav-link">Ajude Nos A Melhorar</Link>
        </li>
        <li
          onMouseEnter={() => handleMouseEnter("login")}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/login" className="nav-link">Login</Link>
          {hoveredMenu === "login" && (
            <ul className="submenu">
              <li><Link to="/forgot-password" className="nav-link">Esqueci minha senha</Link></li>
              <li><Link to="/signup" className="nav-link">Criar conta</Link></li>
            </ul>
          )}
        </li>
      </ul>
      <div>
        <Logoff />
      </div>
    </nav>
  );
};

export default Navbar;
