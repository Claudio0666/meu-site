import React from 'react';
import Banner from './Banner'; // Importe o Banner
import './css/Sobre.css';

const Sobre = () => {
  return (
    <div className="sobre-container">
      <Banner /> {/* Adicione o Banner aqui */}
      <div className="sobre-card">
        <div className="sobre-conteudo">
          <br />
          <br />
          <p className="sobre-texto">
            Nosso projeto nasceu da necessidade urgente de oferecer suporte emocional e prático para mães de crianças autistas. 
            Sabemos que essas mães enfrentam desafios únicos, tanto na organização do dia a dia quanto no cuidado com sua saúde 
            mental, e muitas vezes não têm com quem contar. Com poucas políticas públicas e apoio específico, elas são frequentemente 
            deixadas à margem, enfrentando sozinhas a sobrecarga emocional e física de cuidar de seus filhos.
          </p>
          <p className="sobre-texto">
            Nosso objetivo é criar um espaço onde essas mães possam encontrar ajuda, seja na organização de suas rotinas ou no 
            autocuidado. Oferecemos ferramentas personalizadas para apoiar o bem-estar emocional, com dicas e lembretes, além de 
            uma rede de suporte que entende suas necessidades e oferece soluções práticas para o cotidiano.
          </p>
          <p className="sobre-texto">
            Acreditamos que, ao cuidar dessas mães, também estamos contribuindo para o desenvolvimento e bem-estar das crianças autistas, 
            já que o equilíbrio emocional da mãe é peça-chave no tratamento e acompanhamento dos filhos.
          </p>

          <div className="doacao-container">
            <p className="doacao-texto">
              Seu apoio é essencial para que possamos continuar oferecendo suporte a essas mães. Faça sua doação e ajude-nos a fazer a diferença!
            </p>
            <a href="mailto:teiatec2024.1@gmail.com?subject=Doação para o Projeto&body=Olá, gostaria de fazer uma doação para o projeto." className="doacao-button">
              Fazer Doação
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
