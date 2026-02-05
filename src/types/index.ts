export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple' | 'boolean' | 'mixed';

export interface QuizOptions {
  topic: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  questionType: QuestionType;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  explanation: string;
  type: 'multiple' | 'boolean';
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  difficulty: QuizDifficulty;
  questions: Question[];
  createdAt: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  topic: string;
  difficulty: QuizDifficulty;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  date: string;
  questions: Question[]; // Added questions array to store the full questions
  answers: {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[];
}

export interface UserStats {
  totalQuizzes: number;
  averageScore: number;
  quizzesByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  topicsTaken: string[];
  quizHistory: QuizResult[];
}