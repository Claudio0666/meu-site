import React from 'react';
import './css/telaini.css';

const TelaInicial = () => {
  return (
    <div className="tela-inicial-container">
      <div className="semi-transparent-card">
        {/* Seção de Boas-Vindas */}
        <section className="welcome-section">
          <h1>Bem-vindo ao Nosso Projeto</h1>
          <p>
            Descubra como podemos ajudar você a se conectar emocionalmente através de check-ins e gráficos emocionais.
          </p>
        </section>

        {/* Seção de Botões de Ação */}
        <div className="buttons-container">
          <a href="./Sobre" className="main-button">Saiba Mais</a>
          <a href="./Dashboard" className="main-button">Começar</a>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;
