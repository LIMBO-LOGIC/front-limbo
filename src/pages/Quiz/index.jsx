import React, { useState } from "react";
import styles from "./Quiz.module.css"; // Importa os estilos CSS específicos para o componente Quiz
import PageTitle from "../../components/PageTitle";
import Footer from "../../components/Footer";

const Quiz = () => {
  // Declaração dos estados do componente
  const [points, setPoints] = useState(0); // Guarda a pontuação do usuário
  const [actualQuestion, setActualQuestion] = useState(0); // Guarda o índice da pergunta atual
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Indica se o quiz foi concluído
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Guarda a resposta selecionada pelo usuário

  // Array com as perguntas e respostas do quiz
  const questions = [
    {
      question: "Qual é o maior fabricante de automóveis do mundo em 2020?",
      answers: [
        { answer: "Toyota", correct: true },
        { answer: "Volkswagen", correct: false },
        { answer: "General Motors", correct: false },
        { answer: "Ford", correct: false },
      ],
    },
    {
      question: "Qual destes é um motor rotativo famoso?",
      answers: [
        { answer: "V6", correct: false },
        { answer: "W12", correct: false },
        { answer: "V8", correct: false },
        { answer: "Wankel", correct: true },
      ],
    },
    // ... outras perguntas
  ];

  // Função chamada quando uma resposta é selecionada
  const checkAnswer = (answer) => {
    setSelectedAnswer(answer); // Armazena a resposta selecionada
    if (answer.correct) {
      setPoints((prev) => prev + 1); // Incrementa a pontuação se a resposta estiver correta
    }
    // Move para a próxima pergunta após um atraso de 1,2 segundos
    setTimeout(() => {
      nextQuestion();
    }, 1200);
  };

  // Função para avançar para a próxima pergunta
  const nextQuestion = () => {
    if (actualQuestion + 1 >= questions.length) {
      setIsQuizCompleted(true); // Marca o quiz como concluído se não houver mais perguntas
    } else {
      setActualQuestion((prev) => prev + 1); // Avança para a próxima pergunta
      setSelectedAnswer(null); // Reseta a resposta selecionada
    }
  };

  // Função para reiniciar o quiz
  const restartQuiz = () => {
    setPoints(0); // Reseta a pontuação
    setActualQuestion(0); // Volta para a primeira pergunta
    setIsQuizCompleted(false); // Marca o quiz como não concluído
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
                <span>{questions[actualQuestion]?.question}</span>
              </p>
            </div>
            <div className={styles.answersBox}>
              {questions[actualQuestion]?.answers.map((answer, i) => (
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
          <div id="score-container">
            <h2>Parabéns!</h2>
            <p>
              Você acertou {points} de {questions.length} perguntas
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
