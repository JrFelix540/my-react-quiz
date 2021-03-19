import React, { Fragment, useEffect, useState } from "react";
import { IUserAnswer } from "../QuestionsCard/QuestionsCard";
import "./ChoiceBox.css";

interface ChoiceBoxProps {
  value: number | string;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userClicked: boolean;
  userAnswer: string | number | undefined;
  correctAnswer: string | number | undefined;
  text: string;
}

const ChoiceBox: React.FC<ChoiceBoxProps> = ({
  children,
  value,
  callback,
  userClicked,
  userAnswer,
  correctAnswer,
  text,
}) => {
  const [buttonClasses, setButtonClasses] = useState<string>(`choice-button`);
  useEffect(() => {
    if (value === correctAnswer && value === userAnswer) {
      setButtonClasses((prev) => prev + ` correct`);
    }
    if (value !== correctAnswer && value === userAnswer) {
      setButtonClasses((prev) => prev + ` wrong`);
    }
    if (value === correctAnswer && userAnswer && userAnswer !== value) {
      setButtonClasses((prev) => prev + ` correct`);
    }
  }, [userAnswer]);

  return (
    <Fragment>
      <button
        className={buttonClasses}
        value={value}
        onClick={callback}
        disabled={userAnswer ? true : false}
        dangerouslySetInnerHTML={{ __html: text }}
      ></button>
    </Fragment>
  );
};

export default ChoiceBox;
