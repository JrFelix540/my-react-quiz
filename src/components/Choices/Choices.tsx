import React, { Fragment } from "react";
import ChoiceBox from "../ChoiceBox/ChoiceBox";
import "./Choices.css";
export interface Choice {
  name: string;
  value?: number | string;
}

interface ChoicesProps {
  choices: Choice[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userClicked: boolean;
  userAnswer: string | number | undefined;
}
const Choices: React.FC<ChoicesProps> = ({
  choices,
  callback,
  userClicked,
  userAnswer,
}) => {
  return (
    <Fragment>
      <div className="center">
        <div className="choices-container">
          {choices.map((choice) => (
            <ChoiceBox
              key={choice.name}
              value={choice.value ? choice.value : choice.name}
              callback={callback}
              userClicked={userAnswer ? userAnswer === choice.value : false}
              userAnswer={userAnswer}
            >
              {choice.name}
            </ChoiceBox>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Choices;
