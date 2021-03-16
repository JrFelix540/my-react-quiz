import React, { Fragment } from "react";
import "../CategoryCard/CategoryCard.css";
import Choices, { Choice } from "../Choices/Choices";
import { IQuestion } from "../QuestionsCard/QuestionsCard";

interface QuestionProps {
  question: IQuestion;
  questionNumber: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  next: () => void;
  questionClicked: boolean;
  userAnswer: string;
}

const Question: React.FC<QuestionProps> = ({
  question,
  callback,
  next,
  questionClicked,
  userAnswer,
}) => {
  const answers = question.answers.map((answer) => ({
    name: answer,
  }));
  console.log(`userClicked`, questionClicked);
  console.log(`userAnswer`, userAnswer);
  return (
    <Fragment>
      <p
        className="category-title"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></p>
      <Choices
        choices={answers}
        callback={callback}
        userClicked={questionClicked}
        userAnswer={userAnswer}
      />
      <div className="category-next">
        <a onClick={next} className="button-next">
          Next
        </a>
      </div>
    </Fragment>
  );
};

export default Question;
