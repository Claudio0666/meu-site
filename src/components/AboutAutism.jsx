import React, { useState } from 'react';
import './css/about.css';
import Banner from './aboutBanner';

const sections = [
  {
    key: 'characteristics',
    title: 'Características',
    content: (
      <>
        <p>
          O TEA afeta o comportamento do indivíduo, e os primeiros sinais podem ser notados em bebês de poucos meses. No geral, uma criança do espectro autista apresenta os seguintes sintomas:
        </p>
        <ul>
          <li>Dificuldade para interagir socialmente, como manter o contato visual, expressão facial, gestos, expressar as próprias emoções e fazer amigos;</li>
          <li>Dificuldade na comunicação, optando pelo uso repetitivo da linguagem e bloqueios para começar e manter um diálogo;</li>
          <li>Alterações comportamentais, como manias, apego excessivo a rotinas, ações repetitivas, interesse intenso em coisas específicas, dificuldade de imaginação e sensibilidade sensorial (hiper ou hipo).</li>
        </ul>
        <p>
          O Manual Diagnóstico e Estatístico de Transtornos Mentais (DSM-5) rotula estes distúrbios como um espectro, justamente por se manifestarem em diferentes níveis de intensidade.
        </p>
        <p>
          O diagnóstico de TEA pode ser acompanhado de habilidades impressionantes, como facilidade para aprender visualmente e grande atenção aos detalhes.
        </p>
      </>
    ),
  },
  {
    key: 'diagnosis',
    title: 'Diagnóstico',
    content: (
      <>
        <p>
          Os primeiros sinais do Transtorno do Espectro Autista são visíveis em bebês entre 1 e 2 anos, embora possam ser detectados antes ou depois disso, dependendo dos atrasos de desenvolvimento.
        </p>
        <p>
          A partir dos 12 meses, as crianças autistas não apontam com o dedinho e demonstram mais interesse nos objetos do que nas pessoas.
        </p>
        <p>
          O diagnóstico é feito por observação direta do comportamento e entrevista com pais e cuidadores, incluindo testes com a escala M-CHAT.
        </p>
        <p>
          A condição pode se apresentar em distintos graus, o que faz com que os sinais também variem.
        </p>
      </>
    ),
  },
  {
    key: 'treatments',
    title: 'Tratamentos',
    content: (
      <>
        <p>
          Até o momento, não há remédios específicos para tratar o autismo, embora esta seja uma prioridade das pesquisas.
        </p>
        <p>
          O acompanhamento médico multidisciplinar, composto por pediatra, psiquiatra, neurologista, psicólogo e fonoaudiólogo, é o tratamento mais recomendado para ajudar no desenvolvimento da criança autista.
        </p>
        <p>
          Frequentemente, as terapias são combinadas com remédios para tratar condições associadas, como insônia e agressividade.
        </p>
        <p>
          Outro elemento essencial no tratamento é o treinamento com os pais, que reforça o aprendizado de habilidades sociais.
        </p>
      </>
    ),
  },
];

const AboutAutism = () => {
  const [selectedSection, setSelectedSection] = useState(''); // Controle da seção selecionada

  const handleButtonClick = (sectionKey) => {
    setSelectedSection((prevSection) => (prevSection === sectionKey ? '' : sectionKey));
  };

  return (
    <div className="about-container">
      <Banner />
      <div className="about-section">
        <p className="intro-text">
          O Transtorno do Espectro do Autismo (TEA) reúne desordens do desenvolvimento neurológico presentes desde o nascimento ou início da infância. 
          São elas: Autismo Infantil Precoce, Autismo Infantil, Autismo de Kanner, Autismo de Alto Funcionamento, Autismo Atípico, 
          Transtorno Global do Desenvolvimento sem outra especificação, Transtorno Desintegrativo da Infância e a Síndrome de Asperger.
        </p>
        <p className="intro-text">
          Segundo o DSM-5, pessoas dentro do espectro podem apresentar déficit na comunicação social e padrões restritos e repetitivos de comportamento.
        </p>
        {sections.map((section) => (
          <Section 
            key={section.key} 
            section={section} 
            isSelected={selectedSection === section.key} 
            onButtonClick={handleButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

// Componente reutilizável para cada seção
const Section = ({ section, isSelected, onButtonClick }) => (
  <div className={`section ${isSelected ? 'active' : ''}`}>
    <button className="about-button" onClick={() => onButtonClick(section.key)}>
      {section.title}
    </button>
    {isSelected && <div className="content">{section.content}</div>}
  </div>
);


export default AboutAutism;
