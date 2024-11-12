import React, { useState } from 'react';
import './css/ContactProfessionals.css';

const ContactProfessionals = () => {
  const [professionals] = useState([
    {
      name: 'Grupo Mundo Azul',
      specialty: 'Atuação em Projetos de Inclusão e Conscientização sobre Autismo',
      contactLink: 'https://www.instagram.com/grupomundoazul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    {
      name: 'Grupo Conduzir',
      specialty: 'Auxiliamos Indivíduos que Necessitam de Intervenção Comportamental',
      contactLink: 'https://grupoconduzir.com.br',
    },
  ]);

  return (
    <div className="contact-professionals-container">
      <h1>Entre em Contato com Grupos de Apoio</h1>
      <div className="cards-container">
        {professionals.map((professional, index) => (
          <div className="card" key={index}>
            <h2>{professional.name}</h2>
            <p>Especialidade: {professional.specialty}</p>
            <a href={professional.contactLink} className="contact-button" target="_blank" rel="noopener noreferrer">
              Entrar em Contato
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactProfessionals;
