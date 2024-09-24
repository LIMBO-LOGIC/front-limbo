import React, { useState } from "react";
import styles from "./Quiz.module.css";
import PageTitle from "../../components/PageTitle";
import Footer from "../../components/Footer";

const Quiz = () => {
  const [points, setPoints] = useState(0);
  const [actualQuestion, setActualQuestion] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Array com 50 perguntas sobre Fórmula E
  const questions = [
    {
      question: "Qual é o primeiro ano da Fórmula E?",
      answers: [
        { answer: "2014", correct: true },
        { answer: "2015", correct: false },
        { answer: "2016", correct: false },
        { answer: "2013", correct: false },
      ],
    },
    {
      question:
        "Qual é o fabricante do carro que venceu o primeiro campeonato de Fórmula E?",
      answers: [
        { answer: "Renault", correct: true },
        { answer: "Audi", correct: false },
        { answer: "Jaguar", correct: false },
        { answer: "BMW", correct: false },
      ],
    },
    {
      question: "Em que cidade ocorreu a primeira corrida de Fórmula E?",
      answers: [
        { answer: "Pequim", correct: true },
        { answer: "Nova York", correct: false },
        { answer: "Londres", correct: false },
        { answer: "Paris", correct: false },
      ],
    },
    {
      question: "Qual é a principal característica dos carros da Fórmula E?",
      answers: [
        { answer: "Eles são elétricos", correct: true },
        { answer: "Eles têm motores a combustão", correct: false },
        { answer: "Eles são híbridos", correct: false },
        { answer: "Eles são movidos a hidrogênio", correct: false },
      ],
    },
    {
      question: "Como os pilotos mudam de carro durante a corrida?",
      answers: [
        { answer: "Na troca de volta", correct: true },
        { answer: "Não há troca", correct: false },
        { answer: "Durante um pit stop", correct: false },
        { answer: "Em uma zona de DRS", correct: false },
      ],
    },
    {
      question: "Qual é o nome do campeonato de equipes na Fórmula E?",
      answers: [
        { answer: "ABB FIA Formula E World Championship", correct: true },
        { answer: "Formula E Teams Championship", correct: false },
        { answer: "FIA Electric Series", correct: false },
        { answer: "Formula E Cup", correct: false },
      ],
    },
    {
      question: "Quem foi o primeiro campeão da Fórmula E?",
      answers: [
        { answer: "Nelson Piquet Jr.", correct: true },
        { answer: "Lucas di Grassi", correct: false },
        { answer: "Sébastien Buemi", correct: false },
        { answer: "Jean-Éric Vergne", correct: false },
      ],
    },
    {
      question: "Quantas voltas geralmente tem uma corrida da Fórmula E?",
      answers: [
        { answer: "Entre 40 e 50", correct: true },
        { answer: "Entre 20 e 30", correct: false },
        { answer: "Entre 60 e 70", correct: false },
        { answer: "Entre 30 e 40", correct: false },
      ],
    },
    {
      question:
        "Qual é a velocidade máxima que os carros da Fórmula E podem atingir?",
      answers: [
        { answer: "280 km/h", correct: true },
        { answer: "250 km/h", correct: false },
        { answer: "300 km/h", correct: false },
        { answer: "320 km/h", correct: false },
      ],
    },
    {
      question:
        "Qual cidade é famosa por sediar uma corrida da Fórmula E em um circuito urbano?",
      answers: [
        { answer: "Nova York", correct: true },
        { answer: "Londres", correct: false },
        { answer: "Mônaco", correct: false },
        { answer: "Tóquio", correct: false },
      ],
    },
    {
      question:
        "Qual é o nome da equipe que venceu o campeonato de equipes em 2020?",
      answers: [
        { answer: "Mercedes-Benz EQ Formula E Team", correct: true },
        { answer: "DS Techeetah", correct: false },
        { answer: "Audi Sport ABT Schaeffler", correct: false },
        { answer: "Nissan e.dams", correct: false },
      ],
    },
    {
      question: "Qual piloto detém o recorde de mais vitórias na Fórmula E?",
      answers: [
        { answer: "Jean-Éric Vergne", correct: false },
        { answer: "Lucas di Grassi", correct: true },
        { answer: "Sébastien Buemi", correct: false },
        { answer: "Sam Bird", correct: false },
      ],
    },
    {
      question:
        "Qual é o nome do sistema que permite que os carros recarreguem durante a corrida?",
      answers: [
        { answer: "Fanboost", correct: false },
        { answer: "Attack Mode", correct: true },
        { answer: "Pit Stop", correct: false },
        { answer: "Recharge Zone", correct: false },
      ],
    },
    {
      question: "Qual é a principal diferença entre a Fórmula E e a Fórmula 1?",
      answers: [
        { answer: "Carros elétricos", correct: true },
        { answer: "Estratégias de pit stop", correct: false },
        { answer: "Circuitos permanentes", correct: false },
        { answer: "Número de voltas", correct: false },
      ],
    },
    {
      question:
        "Quantas equipes participaram da temporada inaugural da Fórmula E?",
      answers: [
        { answer: "10", correct: true },
        { answer: "8", correct: false },
        { answer: "12", correct: false },
        { answer: "6", correct: false },
      ],
    },
    {
      question: "Quem foi o primeiro piloto a vencer uma corrida da Fórmula E?",
      answers: [
        { answer: "Lucas di Grassi", correct: false },
        { answer: "Nelson Piquet Jr.", correct: true },
        { answer: "Sébastien Buemi", correct: false },
        { answer: "Jean-Éric Vergne", correct: false },
      ],
    },
    {
      question:
        "Em que cidade foi realizada a primeira corrida noturna da Fórmula E?",
      answers: [
        { answer: "Riad", correct: true },
        { answer: "Hong Kong", correct: false },
        { answer: "Nova York", correct: false },
        { answer: "Mônaco", correct: false },
      ],
    },
    {
      question: "Qual é a duração padrão das corridas na Fórmula E?",
      answers: [
        { answer: "1 hora", correct: true },
        { answer: "45 minutos", correct: false },
        { answer: "30 minutos", correct: false },
        { answer: "2 horas", correct: false },
      ],
    },
    {
      question: "Quem é o fundador da Fórmula E?",
      answers: [
        { answer: "Alejandro Agag", correct: true },
        { answer: "Jean Todt", correct: false },
        { answer: "Bernie Ecclestone", correct: false },
        { answer: "Ross Brawn", correct: false },
      ],
    },
    {
      question: "Qual é o objetivo principal da Fórmula E?",
      answers: [
        { answer: "Promover a mobilidade elétrica", correct: true },
        { answer: "Aumentar a velocidade dos carros", correct: false },
        { answer: "Promover o turismo", correct: false },
        { answer: "Reduzir os custos das corridas", correct: false },
      ],
    },
    {
      question: "Qual é a principal característica do 'Fanboost'?",
      answers: [
        { answer: "Aumentar a potência do carro", correct: true },
        { answer: "Reduzir o peso do carro", correct: false },
        { answer: "Melhorar a aerodinâmica", correct: false },
        { answer: "Aumentar a durabilidade dos pneus", correct: false },
      ],
    },
    {
      question: "Qual é o nome do troféu concedido ao campeão da Fórmula E?",
      answers: [
        { answer: "Troféu de Campeão", correct: false },
        { answer: "Troféu ABB", correct: true },
        { answer: "Troféu FIA", correct: false },
        { answer: "Troféu de Fórmula E", correct: false },
      ],
    },
    {
      question:
        "Qual é a primeira equipe a vencer o campeonato de equipes por duas vezes consecutivas?",
      answers: [
        { answer: "DS Techeetah", correct: true },
        { answer: "Audi Sport ABT Schaeffler", correct: false },
        { answer: "Mercedes-Benz EQ", correct: false },
        { answer: "Nissan e.dams", correct: false },
      ],
    },
    {
      question: "Qual é a importância do 'Attack Mode' na Fórmula E?",
      answers: [
        { answer: "Proporciona mais potência ao carro", correct: true },
        { answer: "Aumenta a duração da corrida", correct: false },
        { answer: "Reduz a velocidade", correct: false },
        { answer: "Muda o carro", correct: false },
      ],
    },
  ];

  const getRandomQuestions = (questions, numQuestions) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  };

  const [selectedQuestions, setSelectedQuestions] = useState(
    getRandomQuestions(questions, 10)
  );

  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer.correct) {
      setPoints((prev) => prev + 1);
    }
    setTimeout(() => {
      nextQuestion();
    }, 1200);
  };

  const nextQuestion = () => {
    if (actualQuestion + 1 >= selectedQuestions.length) {
      setIsQuizCompleted(true);
    } else {
      setActualQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const restartQuiz = () => {
    setPoints(0);
    setActualQuestion(0);
    setIsQuizCompleted(false);
    setSelectedAnswer(null);
    setSelectedQuestions(getRandomQuestions(questions, 10)); // Embaralha as perguntas ao reiniciar
  };

  return (
    <div className={styles.container}>
      <PageTitle text={`Quiz`} />
      <main className={styles.main}>
        {!isQuizCompleted ? (
          <div className={styles.quizzContainer}>
            <div className={styles.questionBox}>
              <p className={styles.question}>
                <span>{actualQuestion + 1}</span> &#8212;
                <span>{selectedQuestions[actualQuestion]?.question}</span>
              </p>
            </div>
            <div className={styles.answersBox}>
              {selectedQuestions[actualQuestion]?.answers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => checkAnswer(answer)}
                  className={`${styles.answerButton} ${
                    selectedAnswer && answer.correct
                      ? styles.correctAnswer
                      : selectedAnswer && !answer.correct
                      ? styles.wrongAnswer
                      : ""
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  <span className={styles.questionAnswer}>{answer.answer}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.scoreContainer}>
            <h2>Parabéns!</h2>
            <p>
              Você acertou {points} de {selectedQuestions.length} perguntas
            </p>
            <button onClick={restartQuiz}>Refazer quiz!</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
