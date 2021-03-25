import React, { Fragment, useEffect, useState } from "react";
import { IEndpointVariables } from "../../App";
import { fetchQuestions, shuffleArray } from "../../utils";
import ParticlesContainer from "../ParticlesContainer/ParticlesContainer";
import Question from "../Question/Question";
import "./QuestionsCard.css";

interface QuestionsCardProps {
  endpointVariables: IEndpointVariables | null;
}

export interface IQuestion {
  answers: string[];
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string;
  question: string;
  type: string;
}

export interface IUserAnswer {
  id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

const QuestionsCard: React.FC<QuestionsCardProps> = ({ endpointVariables }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [fetchState, setFetchState] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const nextQuestion = () => {
    const nextNumber = questionNumber + 1;
    if (questionNumber < 10) {
      setQuestionNumber(nextNumber);
    }
  };

  const getResults = () => {
    setGameOver(true);
  };

  const checkCorrectAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    if (questions[questionNumber].correct_answer === answer) {
      setScore((prev) => prev + 1);
    }

    const answerObject: IUserAnswer = {
      id: questionNumber,
      correctAnswer: questions[questionNumber].correct_answer,
      userAnswer: answer,
      question: questions[questionNumber].question,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };
  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      if (endpointVariables) {
        const data = await fetchQuestions(
          endpointVariables.difficulty,
          endpointVariables.category
        );
        const fetchedQuestions = shuffleArray(data.splice(0, 10));
        setQuestions(fetchedQuestions);
        setLoading(false);
        setFetchState(true);
      }
    };

    getQuestions();
  }, [endpointVariables]);
  return (
    <Fragment>
      {fetchState && !loading && !gameOver && (
        <>
          <p className="score">Score: {score}</p>
          <p className="question-number">Question: {questionNumber + 1}/10</p>
          <Question
            questionNumber={questionNumber}
            question={questions[questionNumber]}
            callback={checkCorrectAnswer}
            next={nextQuestion}
            userAnswer={userAnswers[questionNumber]?.userAnswer}
            correctAnswer={userAnswers[questionNumber]?.correctAnswer}
          />
          {questionNumber + 1 === 10 && (
            <div className="category-next">
              <button onClick={getResults} className="button-next">
                Next
              </button>
            </div>
          )}
        </>
      )}
      {loading && <p>Loading questions</p>}
      {gameOver && <ParticlesContainer score={score} />}
    </Fragment>
  );
};

export default QuestionsCard;
