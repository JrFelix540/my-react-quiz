import { useState, useEffect } from "react";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
interface Question {
  category: string;
  type: string;
  question: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: string[];
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuestions = async (
  difficulty?: Difficulty | string | null,
  categoryId?: number | null
) => {
  const endpoint =
    process.env.REACT_APP_TRIVIA_API +
    `&category=${categoryId}&difficulty=${difficulty}`;
  const data = await (await fetch(endpoint)).json();

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export interface IWindowSize {
  width: undefined | number;
  height: undefined | number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

export const shuffleArray = (array: any) =>
  [...array].sort(() => Math.random() - 0.5);
