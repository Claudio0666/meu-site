import React from 'react';
import './css/AjudeNosAMelhorar.css';

const AjudeNosAMelhorar = () => {
  return (
    <div className="ajude-nos-container">
      <div className="ajude-nos-card">
        <h2 className="ajude-nos-title">Ajude-nos a melhorar</h2>
        <p className="ajude-nos-description">
          Sua opinião é muito importante para nós! Por favor, preencha o formulário abaixo para nos ajudar a melhorar nossos serviços.
        </p>
        <div className="iframe-container">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdA_qXIiS4GGOMXo9jO23fgA1S8Nqu3PaESkf15dC7xV6MX6w/viewform?embedded=true"
            width="800"
            height="1200"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Formulário de feedback"
          >
            Carregando…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default AjudeNosAMelhorar;
