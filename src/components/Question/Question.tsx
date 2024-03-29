import React, { Fragment } from "react";
import "../CategoryCard/CategoryCard.css";
import Choices from "../Choices/Choices";
import { IQuestion } from "../QuestionsCard/QuestionsCard";

interface QuestionProps {
  question: IQuestion;
  questionNumber: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  next: () => void;
  userAnswer: string;
  correctAnswer: string;
}

const Question: React.FC<QuestionProps> = ({
  question,
  callback,
  next,
  userAnswer,
  correctAnswer,
  questionNumber,
}) => {
  const answers = question?.answers.map((answer) => ({
    name: answer,
  }));
  return (
    <Fragment>
      <p
        className="question"
        dangerouslySetInnerHTML={{ __html: question?.question }}
      ></p>
      <Choices
        choices={answers}
        callback={callback}
        userAnswer={userAnswer}
        correctAnswer={correctAnswer}
      />
      {questionNumber + 1 < 10 && (
        <div className="category-next">
          <button onClick={next} className="button-next">
            Next
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Question;
