import React, { Fragment, useEffect, useState } from "react";
import "./ChoiceBox.css";

interface ChoiceBoxProps {
  value: number | string;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | number | undefined;
  correctAnswer: string | number | undefined;
  text: string;
}

const ChoiceBox: React.FC<ChoiceBoxProps> = ({
  value,
  callback,
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
  }, [userAnswer, correctAnswer, value]);

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
