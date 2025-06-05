import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Quiz, QuizOptions, QuizResult, Question } from '../types';
import { generateQuiz } from '../services/apiService';

interface QuizState {
  // Current quiz state
  currentQuiz: Quiz | null;
  currentQuestion: number;
  answers: { questionId: string; selectedAnswer: string }[];
  isLoading: boolean;
  error: string | null;
  
  // Quiz history
  quizHistory: QuizResult[];
  
  // Actions
  createQuiz: (options: QuizOptions) => Promise<void>;
  answerQuestion: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => QuizResult;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentQuiz: null,
      currentQuestion: 0,
      answers: [],
      isLoading: false,
      error: null,
      quizHistory: [],
      
      createQuiz: async (options: QuizOptions) => {
        set({ isLoading: true, error: null });
        try {
          const quiz = await generateQuiz(options);
          if (quiz) {
            set({ 
              currentQuiz: quiz,
              currentQuestion: 0,
              answers: [],
              isLoading: false
            });
          } else {
            set({ 
              error: 'Failed to generate quiz. Please try again.',
              isLoading: false
            });
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'An error occurred while creating the quiz',
            isLoading: false
          });
        }
      },
      
      answerQuestion: (questionId: string, answer: string) => {
        const { answers } = get();
        const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
        
        if (existingAnswerIndex >= 0) {
          // Update existing answer
          const updatedAnswers = [...answers];
          updatedAnswers[existingAnswerIndex] = { questionId, selectedAnswer: answer };
          set({ answers: updatedAnswers });
        } else {
          // Add new answer
          set({ answers: [...answers, { questionId, selectedAnswer: answer }] });
        }
      },
      
      nextQuestion: () => {
        const { currentQuestion, currentQuiz } = get();
        if (currentQuiz && currentQuestion < currentQuiz.questions.length - 1) {
          set({ currentQuestion: currentQuestion + 1 });
        }
      },
      
      previousQuestion: () => {
        const { currentQuestion } = get();
        if (currentQuestion > 0) {
          set({ currentQuestion: currentQuestion - 1 });
        }
      },
      
      submitQuiz: () => {
        const { currentQuiz, answers } = get();
        
        if (!currentQuiz) {
          throw new Error('No active quiz to submit');
        }
        
        // Calculate score
        let correctAnswers = 0;
        
        const detailedAnswers = answers.map(answer => {
          const question = currentQuiz.questions.find(q => q.id === answer.questionId);
          const isCorrect = question?.answers.some(
            a => a.text === answer.selectedAnswer && a.isCorrect
          ) || false;
          
          if (isCorrect) correctAnswers++;
          
          return {
            questionId: answer.questionId,
            selectedAnswer: answer.selectedAnswer,
            isCorrect
          };
        });
        
        const score = (correctAnswers / currentQuiz.questions.length) * 100;
        
        // Create result object
        const result: QuizResult = {
          id: Math.random().toString(36).substring(2, 11),
          quizId: currentQuiz.id,
          score,
          totalQuestions: currentQuiz.questions.length,
          correctAnswers,
          timeTaken: 0, // In a real app, we'd calculate this
          date: new Date().toISOString(),
          questions: currentQuiz.questions, // Store the questions in the result
          answers: detailedAnswers
        };
        
        // Update quiz history
        set(state => ({
          quizHistory: [result, ...state.quizHistory].slice(0, 50) // Keep last 50 quizzes
        }));
        
        return result;
      },
      
      resetQuiz: () => {
        set({
          currentQuiz: null,
          currentQuestion: 0,
          answers: []
        });
      }
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        quizHistory: state.quizHistory
      })
    }
  )
);