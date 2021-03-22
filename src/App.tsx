import React, { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard/CategoryCard";
import DifficultyCard from "./components/DifficultyCard/DifficultyCard";
import QuestionsCard from "./components/QuestionsCard/QuestionsCard";
import "./reset.css";
import "./App.css";
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
  };

  const updateDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    const difficulty = e.currentTarget.value;
    setEndpointVariables((endpointVars) => ({
      ...endpointVars,
      difficulty: difficulty,
    }));
  };
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="heading-primary">Trivia Time</h1>
      </header>
      {step === 1 && (
        <CategoryCard
          nextStep={updateStep}
          updateCategory={updateCategory}
          userAnswer={endpointVariables?.category}
        />
      )}
      {step === 2 && (
        <DifficultyCard
          nextStep={updateStep}
          updateDifficulty={updateDifficulty}
          userAnswer={endpointVariables?.difficulty}
        />
      )}
      {step === 3 && <QuestionsCard endpointVariables={endpointVariables} />}
    </div>
  );
}

export default App;
