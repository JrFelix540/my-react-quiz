import React, { Fragment, useState } from "react";
import Choices from "../Choices/Choices";
import { categories } from "./categories";
import "./CategoryCard.css";

interface CategoryCardProps {
  nextStep: () => void;
  updateCategory: (e: React.MouseEvent<HTMLButtonElement>) => void;
  categoryClicked: boolean;
  userAnswer: string | number | undefined;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  nextStep,
  updateCategory,
  categoryClicked,
  userAnswer,
}) => {
  return (
    <Fragment>
      <div className="category-title">Pick a category</div>
      <Choices
        choices={categories}
        callback={updateCategory}
        userClicked={categoryClicked}
        userAnswer={userAnswer}
        correctAnswer={userAnswer}
      />
      <div className="category-next">
        <a onClick={nextStep} className="button-next">
          Next
        </a>
      </div>
    </Fragment>
  );
};

export default CategoryCard;
