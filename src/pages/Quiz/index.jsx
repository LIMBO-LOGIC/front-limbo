import React, { useState } from "react";
import styles from "./Quiz.module.css";
import Footer from "../../components/Footer";

const Quiz = () => {
  const [points, setPoints] = useState(0);
  const [actualQuestion, setActualQuestion] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Adicione o estado para resposta selecionada

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
    {
      question: "Qual desses carros é um modelo esportivo italiano?",
      answers: [
        { answer: "Porsche 911", correct: false },
        { answer: "Ferrari 488 GTB", correct: true },
        { answer: "BMW M5", correct: false },
        { answer: "Audi R8", correct: false },
      ],
    },
    {
      question: "Qual é o símbolo da marca de carros Ferrari?",
      answers: [
        { answer: "Cavalo", correct: true },
        { answer: "Touro", correct: false },
        { answer: "Leão", correct: false },
        { answer: "Águia", correct: false },
      ],
    },
    {
      question: "Quem inventou o primeiro automóvel movido a gasolina?",
      answers: [
        { answer: "Henry Ford", correct: false },
        { answer: "Nikolaus Otto", correct: false },
        { answer: "Karl Benz", correct: true },
        { answer: "Gottlieb Daimler", correct: false },
      ],
    },
    {
      question: "Qual é o modelo mais vendido da Ford?",
      answers: [
        { answer: "Ford Fiesta", correct: false },
        { answer: "Ford Focus", correct: false },
        { answer: "Ford Mustang", correct: false },
        { answer: "Ford F-Series", correct: true },
      ],
    },
    {
      question: "O que significa ABS em sistemas de freios de carro?",
      answers: [
        { answer: "Anti-Blocking System", correct: false },
        { answer: "Anti-Brake Skid", correct: false },
        { answer: "Anti-Brake System", correct: false },
        { answer: "Anti-Lock Braking System", correct: true },
      ],
    },
    {
      question: "Qual destes não é um fabricante de automóveis japonês?",
      answers: [
        { answer: "Honda", correct: false },
        { answer: "Toyota", correct: false },
        { answer: "Hyundai", correct: true },
        { answer: "Nissan", correct: false },
      ],
    },
    {
      question: "Qual é o país de origem da marca automotiva Audi?",
      answers: [
        { answer: "Alemanha", correct: true },
        { answer: "Itália", correct: false },
        { answer: "França", correct: false },
        { answer: "Japão", correct: false },
      ],
    },
    {
      question: "O que significa a sigla SUV em inglês?",
      answers: [
        { answer: "Sport Utility Vehicle", correct: true },
        { answer: "Super Urban Vehicle", correct: false },
        { answer: "Speed Utility Van", correct: false },
        { answer: "Sporty Urban Van", correct: false },
      ],
    },
  ];

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
    if (actualQuestion + 1 >= questions.length) {
      setIsQuizCompleted(true); // Marcar o quiz como concluído
    } else {
      setActualQuestion((prev) => prev + 1);
      setSelectedAnswer(null); // Resetar a resposta selecionada
    }
  };

  const restartQuiz = () => {
    setPoints(0);
    setActualQuestion(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Quizz Sobre Carros</h1>
      </header>
      <main className={styles.main}>
        {!isQuizCompleted ? (
          <div className={styles.quizzContainer}>
            <p className={styles.question}>
              <span>{actualQuestion + 1}</span> &#8212;
              <span>{questions[actualQuestion]?.question}</span>
            </p>
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
                  disabled={selectedAnswer !== null} // Desabilitar botão após seleção
                >
                  <span className={styles.btnLetter}>
                    {String.fromCharCode(97 + i)}
                  </span>
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
      <Footer/>
    </div>
  );
};

export default Quiz;
