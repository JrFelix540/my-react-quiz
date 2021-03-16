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
    answers: [...question.incorrect_answers, question.correct_answer],
  }));
};
