import React, { Fragment, useEffect, useState } from "react";
import { IEndpointVariables } from "../../App";
import { fetchQuestions } from "../../utils";
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
  const [questionClicked, setQuestionClicked] = useState<boolean[]>([]);
  const getQuestions = async () => {
    console.log(`object start`);
    setLoading(true);
    if (endpointVariables) {
      const data = await fetchQuestions(
        endpointVariables.difficulty,
        endpointVariables.category
      );
      console.log(data);
      setQuestions(data);
      setLoading(false);
      setFetchState(true);
    }
  };

  const nextQuestion = () => {
    const nextNumber = questionNumber + 1;
    if (questionNumber <= 10) {
      setQuestionNumber(nextNumber);
    }
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
    setQuestionClicked((prev) => [...prev, true]);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  console.log(`endpoint`, endpointVariables);
  console.log(`object`, questions);
  return (
    <Fragment>
      <div className="score">Score: {score}</div>
      <div className="question-number">Question: {questionNumber + 1}/10</div>
      {fetchState && (
        <Question
          questionNumber={questionNumber}
          question={questions[questionNumber]}
          callback={checkCorrectAnswer}
          next={nextQuestion}
          questionClicked={questionClicked[questionNumber]}
          userAnswer={userAnswers[questionNumber]?.userAnswer}
          correctAnswer={userAnswers[questionNumber]?.correctAnswer}
        />
      )}

      <a onClick={nextQuestion} className=""></a>
    </Fragment>
  );
};

export default QuestionsCard;
