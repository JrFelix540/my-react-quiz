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
  difficultyClicked: boolean;
  userAnswer: string | number | undefined;
}

const DifficultyCard: React.FC<DifficultyCardProps> = ({
  nextStep,
  updateDifficulty,
  difficultyClicked,
  userAnswer,
}) => {
  return (
    <Fragment>
      <div className="category-title">Pick a difficulty level</div>
      <Choices
        choices={difficultyLevels}
        callback={updateDifficulty}
        userClicked={difficultyClicked}
        userAnswer={userAnswer}
        correctAnswer={userAnswer}
      />
      <div className="right">
        <a className="button-next" onClick={nextStep}>
          Next
        </a>
      </div>
    </Fragment>
  );
};

export default DifficultyCard;
