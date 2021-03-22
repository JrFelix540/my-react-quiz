import React, { Fragment } from "react";
import { Difficulty } from "../../utils";
import "../CategoryCard/CategoryCard.css";
import "./DifficultyCard.css";
import Choices, { Choice } from "../Choices/Choices";
const difficultyLevels: Choice[] = [
  {
    name: "Easy",
    value: Difficulty.EASY,
  },
  {
    name: "Medium",
    value: Difficulty.MEDIUM,
  },
  {
    name: "Hard",
    value: Difficulty.HARD,
  },
];
interface DifficultyCardProps {
  nextStep: () => void;
  updateDifficulty: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | number | undefined;
}

const DifficultyCard: React.FC<DifficultyCardProps> = ({
  nextStep,
  updateDifficulty,
  userAnswer,
}) => {
  return (
    <Fragment>
      <h2 className="heading-secondary">Pick a difficulty level</h2>
      <Choices
        choices={difficultyLevels}
        callback={updateDifficulty}
        userAnswer={userAnswer}
        correctAnswer={userAnswer}
      />
      <div className="right">
        <button className="button-next" onClick={nextStep}>
          Next
        </button>
      </div>
    </Fragment>
  );
};

export default DifficultyCard;
