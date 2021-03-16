import React, { Fragment, useEffect, useState } from "react";
import "./ChoiceBox.css";

interface ChoiceBoxProps {
  value: number | string;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userClicked: boolean;
  userAnswer: string | number | undefined;
}

const ChoiceBox: React.FC<ChoiceBoxProps> = ({
  children,
  value,
  callback,
  userClicked,
  userAnswer,
}) => {
  const [buttonClasses, setButtonClasses] = useState<string>(`choice-button`);
  useEffect(() => {
    if (value === userAnswer && userAnswer) {
      setButtonClasses((prev) => prev + ` correct`);
    }
    if (value !== userAnswer && userAnswer) {
      setButtonClasses((prev) => prev + ` wrong`);
    }
  }, [userAnswer]);

  return (
    <Fragment>
      <button
        className={buttonClasses}
        value={value}
        onClick={callback}
        disabled={userClicked ? true : false}
      >
        {children}
      </button>
    </Fragment>
  );
};

export default ChoiceBox;
