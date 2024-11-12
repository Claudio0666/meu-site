import React from 'react';
import './css/MaesQueInspiram.css'; 

const MaesQueInspiram = () => {
  return (
    <div className="maes-que-inspiram-page">
      {/* Primeiro Card */}
      <div className="maes-que-inspiram-card">
        <div className="maes-que-inspiram-container">
          <div className="texto-container">
            <h1>Mães que Inspiram</h1>
            <p>
              Andrea Bussade é uma mãe, ativista e referência no
              Brasil na defesa dos direitos das pessoas com autismo. Mãe
              de um filho autista, ela se tornou uma das fundadoras do
              Movimento Orgulho Autista Brasil (MOAB), uma
              organização dedicada a promover a inclusão, o respeito e os
              direitos das pessoas no espectro autista e de suas famílias.
              Com uma atuação firme e contínua, Andrea trabalha para
              ampliar a conscientização sobre o autismo e eliminar o
              estigma que ainda envolve essa condição. Andrea é
              conhecida por sua luta por políticas públicas que garantam
              educação inclusiva, atendimento em saúde e suporte
              especializado para autistas. Ela participa de eventos,
              debates e campanhas de sensibilização, usando sua voz
              para defender mudanças na legislação e serviços que
              impactam diretamente a qualidade de vida dos autistas e de
              suas famílias. Por meio do MOAB, Andrea Bussade contribui
              para fortalecer o movimento de inclusão e respeito no Brasil,
              apoiando milhares de famílias e incentivando a sociedade a
              compreender e acolher a diversidade.
            </p>
          </div>
          <div className="imagem-container">
            <img src="./src/imagem/mae1.1.png" alt="Mãe inspiradora" />
          </div>
        </div>
      </div>

      {/* Segundo Card */}
      <div className="maes-que-inspiram-card">
        <div className="maes-que-inspiram-container">
          <div className="texto-container">
            <h1>Outra Mãe Inspiradora</h1>
            <p>
                Berenice Piana é uma das maiores ativistas
                brasileiras pelos direitos das pessoas com autismo.
                Mãe de Dayan Piana, diagnosticado com autismo
                severo, ela dedicou sua vida a enfrentar as
                dificuldades e preconceitos que encontrou ao
                buscar tratamento adequado para seu filho. Graças
                à sua luta, foi sancionada em 2012 a "Lei Berenice
                Piana" (Lei 12.764/2012), que institui a Política
                Nacional de Proteção dos Direitos da Pessoa
                com Transtorno do Espectro Autista no Brasil. A
                lei é um marco, pois reconhece oficialmente o
                autismo como uma deficiência, garantindo direitos
                de inclusão, atendimento e educação a essa
                população. Berenice continua ativa na defesa de
                melhores condições e acessibilidade para autistas
                e suas famílias.
            </p>
          </div>
          <div className="imagem-container">
            <img src="./src/imagem/mae2.1.jpg" alt="Outra Mãe Inspiradora" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaesQueInspiram;
