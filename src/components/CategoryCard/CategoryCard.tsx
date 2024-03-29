import React, { Fragment } from "react";
import Choices from "../Choices/Choices";
import { categories } from "./categories";
import "./CategoryCard.css";

interface CategoryCardProps {
  nextStep: () => void;
  updateCategory: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | number | undefined;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  nextStep,
  updateCategory,
  userAnswer,
}) => {
  return (
    <Fragment>
      <h2 className="heading-secondary category-title">Pick a category</h2>
      <Choices
        choices={categories}
        callback={updateCategory}
        userAnswer={userAnswer}
        correctAnswer={userAnswer}
      />
      <div className="category-next">
        <button onClick={nextStep} className="button-next">
          Next
        </button>
      </div>
    </Fragment>
  );
};

export default CategoryCard;
