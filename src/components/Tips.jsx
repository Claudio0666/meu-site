import React, { useEffect, useState } from 'react';
import './css/Tips.css';

const Tips = () => {
  const [lastEmotion, setLastEmotion] = useState("");
  const [tips, setTips] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLastEmotion = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Erro de autenticação. Token não encontrado.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/emotion/latest', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 401) {
        setError("Erro de autenticação. Token inválido.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao buscar emoção.");
      }

      const data = await response.json();
      setLastEmotion(data.emotion);
      setError(null);
    } catch (error) {
      setError("Erro ao buscar emoção.");
    } finally {
      setLoading(false);
    }
  };

  const getRandomTip = (tipsArray) => tipsArray[Math.floor(Math.random() * tipsArray.length)];

  const emotionTips = {
    "Triste": [
      "Tente praticar a gratidão listando três coisas boas do seu dia.",
      "Conecte-se com alguém em quem confie para conversar sobre o que está sentindo.",
      "Faça uma pausa e cuide de si mesmo com algo que te relaxe.",
      "Ouça uma música que te acalme e traga boas lembranças.",
      "Escreva sobre o que está te incomodando; isso pode ajudar a processar as emoções.",
      "Faça um exercício físico leve para liberar endorfinas.",
      "Assista a um filme ou série que traga conforto.",
      "Lembre-se de que todos os sentimentos passam eventualmente.",
      "Faça uma lista de realizações e momentos felizes.",
      "Saia para um passeio ao ar livre e aprecie a natureza.",
      "Desenhe ou escreva para expressar o que está sentindo.",
      "Permita-se descansar e cuidar de você mesmo.",
      "Mantenha uma rotina de sono regular.",
      "Procure ajuda profissional se precisar.",
      "Evite se isolar – esteja perto de quem ama.",
      "Cuide de uma planta ou animal de estimação para acalmar a mente.",
      "Leia um livro inspirador para mudar o foco.",
      "Faça algo novo para distrair a mente.",
      "Experimente uma técnica de respiração profunda.",
      "Pratique um hobby que traga satisfação."
    ],
    "Feliz": [
      "Compartilhe essa felicidade com alguém próximo a você.",
      "Faça algo que você gosta para aproveitar ainda mais o seu humor.",
      "Mantenha uma lista de momentos felizes para revisar em dias difíceis.",
      "Aproveite esse estado para planejar algo positivo para o futuro.",
      "Use essa energia para concluir tarefas importantes do seu dia.",
      "Tire fotos para guardar esse momento.",
      "Comemore essa felicidade com uma refeição especial.",
      "Faça uma boa ação para estender a alegria.",
      "Aproveite para escrever sobre o que te faz feliz.",
      "Pratique um hobby que você ama.",
      "Crie um ambiente aconchegante ao seu redor.",
      "Planeje um passeio ou viagem futura.",
      "Ouça suas músicas favoritas e cante junto.",
      "Dance ou mova-se para liberar energia.",
      "Distribua sorrisos para as pessoas ao seu redor.",
      "Faça uma lista de gratidão.",
      "Envie uma mensagem positiva a um amigo.",
      "Comece um novo projeto empolgante.",
      "Descanse e aproveite o momento.",
      "Leve essa felicidade para atividades em grupo."
    ],
    "Ansioso": [
      "Tente respirações profundas para acalmar seu sistema nervoso.",
      "Liste as preocupações e tente encontrar uma solução prática para cada uma.",
      "Pratique mindfulness para focar no presente.",
      "Evite cafeína, pois pode aumentar a sensação de ansiedade.",
      "Dê um passeio ao ar livre para clarear a mente.",
      "Experimente alongamentos ou yoga para relaxar.",
      "Tente focar em tarefas simples e concretas.",
      "Escreva suas preocupações e, depois, guarde-as.",
      "Evite redes sociais temporariamente para reduzir estímulos.",
      "Crie uma rotina que traga conforto e segurança.",
      "Fale com alguém de confiança sobre o que te aflige.",
      "Use técnicas de respiração profunda.",
      "Desafie seus pensamentos ansiosos com lógica.",
      "Faça uma caminhada tranquila para se distrair.",
      "Ouça músicas relaxantes ou podcasts.",
      "Pratique gratidão e foque no que é positivo.",
      "Desligue-se de tarefas estressantes temporariamente.",
      "Envolva-se em atividades artísticas para relaxar.",
      "Mantenha um diário das emoções para acompanhar.",
      "Lembre-se de que a ansiedade é temporária."
    ],
    "Cansaço": [
      "Faça pausas regulares para descansar a mente e o corpo.",
      "Tente dormir mais cedo para recuperar energia.",
      "Pratique exercícios leves para aumentar a disposição.",
      "Beba água para manter-se hidratado.",
      "Desconecte-se dos dispositivos eletrônicos por alguns minutos.",
      "Reserve um tempo para relaxar com uma atividade calma.",
      "Evite refeições pesadas e prefira alimentos leves.",
      "Pratique técnicas de respiração para revitalizar.",
      "Tire uma soneca curta se possível.",
      "Limite o consumo de cafeína no fim do dia.",
      "Encontre um lugar calmo e respire fundo.",
      "Faça uma automassagem para aliviar tensão.",
      "Ouça uma música relaxante.",
      "Diminua o ritmo de atividades intensas.",
      "Tire um momento para alongar o corpo.",
      "Leia ou ouça algo inspirador e tranquilo.",
      "Estabeleça limites para descansar o suficiente.",
      "Organize suas tarefas para evitar sobrecarga.",
      "Tome um banho relaxante para descansar.",
      "Tire um tempo para cuidar de você."
    ],
    "Irritado(a)": [
      "Respire fundo e conte até dez antes de reagir.",
      "Tente identificar o que está causando essa irritação.",
      "Dê uma caminhada curta para acalmar os ânimos.",
      "Evite tomar decisões importantes nesse estado.",
      "Ouça uma música calma ou faça um alongamento para relaxar.",
      "Tente entender as raízes da sua frustração.",
      "Dê um tempo antes de responder ou agir.",
      "Escreva sobre sua irritação para liberá-la.",
      "Pratique técnicas de relaxamento muscular.",
      "Concentre-se em uma atividade física leve.",
      "Afaste-se da situação momentaneamente.",
      "Respire profundamente e conte até 20.",
      "Faça algo que normalmente traz paz.",
      "Use uma técnica de mindfulness para focar no presente.",
      "Reconheça que a irritação é temporária.",
      "Aprecie momentos de silêncio para se acalmar.",
      "Lembre-se do que você gosta.",
      "Movimente-se para liberar energia acumulada.",
      "Faça uma lista de coisas boas no dia.",
      "Evite redes sociais e conversas intensas."
    ],
  };
  const familyWellbeingTips = [
    "Pratique a comunicação aberta com todos os membros da família para fortalecer os laços.",
    "Estabeleça uma rotina familiar que equilibre tempo juntos e atividades individuais.",
    "Promova atividades que envolvam toda a família, como refeições em conjunto e passeios.",
    "Reserve um tempo para cuidar de si mesmo; a saúde mental dos pais e cuidadores também é essencial.",
    "Encoraje todos a compartilhar seus sentimentos e experiências diárias para manter o apoio mútuo.",
    "Faça atividades de lazer, como jogos ou filmes, em família.",
    "Comemore pequenas vitórias e conquistas de cada membro.",
    "Estabeleça uma noite da semana para atividades familiares.",
    "Promova o respeito e a empatia entre os membros.",
    "Crie memórias juntos, como fotos e diários familiares.",
    "Incentive o respeito às opiniões individuais.",
    "Pratique o perdão e a aceitação mútua.",
    "Estabeleça metas familiares de curto e longo prazo.",
    "Planeje viagens e experiências novas juntos.",
    "Tenha momentos de reflexão e gratidão em família."
  ];

  const autismInformation = [
    "Crianças autistas podem ter dificuldades em interpretar sinais sociais, mas cada uma possui suas próprias habilidades e interesses únicos.",
    "O espectro autista é amplo, e o suporte necessário varia muito de uma criança para outra.",
    "A terapia ocupacional pode ajudar com habilidades motoras finas e coordenação, auxiliando no desenvolvimento geral.",
    "Compreender as preferências sensoriais da criança é fundamental; algumas podem ser sensíveis a ruídos altos ou luzes brilhantes.",
    "O envolvimento em atividades que a criança gosta pode melhorar a interação social e o bem-estar emocional.",
    "A intervenção precoce é essencial para ajudar a criança a desenvolver habilidades.",
    "Cada criança autista tem um perfil único de habilidades e desafios.",
    "Estratégias de comunicação visual, como cartões e imagens, podem ser eficazes.",
    "Oferecer um ambiente organizado e previsível ajuda na rotina.",
    "Crianças autistas podem demonstrar afeto de formas distintas, mas são capazes de criar laços afetivos.",
    "Algumas crianças autistas têm talentos e interesses extraordinários.",
    "Compreender as necessidades sensoriais é essencial para o conforto da criança.",
    "A inclusão e aceitação na escola e comunidade são fundamentais.",
    "Evitar sobrecarga de estímulos pode prevenir crises.",
    "O respeito ao tempo de resposta da criança é fundamental para a comunicação."
  ];

  const autismParentingChallenges = [
    "Desafios sensoriais podem fazer com que situações comuns se tornem estressantes; é útil planejar antecipadamente atividades e ambientes.",
    "A criação de uma criança autista pode exigir mais estrutura e consistência na rotina para reduzir ansiedade.",
    "Comunicar-se de maneira eficaz e clara é essencial, e aprender sobre estratégias de comunicação alternativa pode ajudar.",
    "Buscar apoio em grupos de pais ou profissionais especializados ajuda a lidar com as demandas emocionais e práticas do dia a dia.",
    "Celebrar pequenas conquistas é importante e ajuda a manter uma perspectiva positiva.",
    "Manter a calma durante crises pode ajudar a acalmar a criança.",
    "Conheça os gatilhos de ansiedade e evite-os quando possível.",
    "Estabeleça rotinas claras para criar segurança.",
    "Crie um sistema de recompensas para incentivar comportamentos positivos.",
    "Envolva-se na comunidade para apoio e inclusão.",
    "Lide com a frustração através de técnicas de relaxamento.",
    "Apoie a comunicação de sua criança da forma que for mais confortável para ela.",
    "Ensine habilidades sociais em pequenos passos.",
    "Busque alternativas de terapia adequadas às necessidades da criança.",
    "Tenha paciência com o progresso, pois cada criança tem seu ritmo."
  ];

  useEffect(() => {
    fetchLastEmotion();
  }, []);

  useEffect(() => {
    if (lastEmotion && emotionTips[lastEmotion]) {
      setTips({
        emotionTip: getRandomTip(emotionTips[lastEmotion]),
        randomFamilyTip: getRandomTip(familyWellbeingTips),
        randomAutismInfo: getRandomTip(autismInformation),
        randomParentingChallengeTip: getRandomTip(autismParentingChallenges),
      });
    }
  }, [lastEmotion]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tips-container">
      <h2>Dicas para você</h2>
      {tips.emotionTip && <TipCard title={`Baseado na sua última emoção (${lastEmotion}):`} content={tips.emotionTip} />}
      {tips.randomFamilyTip && <TipCard title="Dica para o bem-estar familiar:" content={tips.randomFamilyTip} />}
      {tips.randomAutismInfo && <TipCard title="Informação sobre autismo:" content={tips.randomAutismInfo} />}
      {tips.randomParentingChallengeTip && <TipCard title="Desafio de criação de filhos:" content={tips.randomParentingChallengeTip} />}
    </div>
  );
};

const TipCard = ({ title, content }) => (
  <div className="tip-card">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

export default Tips;