import React, { useEffect, useState } from "react";
import "./App.css";
import CategoryCard from "./components/CategoryCard/CategoryCard";
import DifficultyCard from "./components/DifficultyCard/DifficultyCard";
import QuestionsCard from "./components/QuestionsCard/QuestionsCard";
import "./reset.css";
export interface IEndpointVariables {
  category?: number;
  difficulty?: string;
}

function App() {
  const [step, setStep] = useState<number>(1);
  const [
    endpointVariables,
    setEndpointVariables,
  ] = useState<IEndpointVariables | null>(null);

  const [categoryClicked, setCategoryClicked] = useState<boolean>(false);
  const [difficultyClicked, setDifficultyClicked] = useState<boolean>(false);

  useEffect(() => {}, []);

  const updateStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const updateCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryNo = e.currentTarget.value;
    setEndpointVariables((endpointVars) => ({
      ...endpointVars,
      category: parseInt(categoryNo),
    }));
    setCategoryClicked(true);
  };

  const updateDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    const difficulty = e.currentTarget.value;
    setEndpointVariables((endpointVars) => ({
      ...endpointVars,
      difficulty: difficulty,
    }));
    setDifficultyClicked(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-text">Trivia Time</p>
      </header>
      {step === 1 && (
        <CategoryCard
          nextStep={updateStep}
          updateCategory={updateCategory}
          categoryClicked={categoryClicked}
          userAnswer={endpointVariables?.category}
        />
      )}
      {step === 2 && (
        <DifficultyCard
          nextStep={updateStep}
          updateDifficulty={updateDifficulty}
          difficultyClicked={difficultyClicked}
          userAnswer={endpointVariables?.difficulty}
        />
      )}
      {step === 3 && <QuestionsCard endpointVariables={endpointVariables} />}
    </div>
  );
}

export default App;
