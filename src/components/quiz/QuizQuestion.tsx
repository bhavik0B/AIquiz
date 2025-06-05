import React, { useState } from 'react';
import { Question } from '../../types';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: string, answer: string) => void;
  showFeedback?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showFeedback = false,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  const handleAnswerClick = (answer: string) => {
    onAnswerSelect(question.id, answer);
  };
  
  const getAnswerClasses = (answer: string, index: number) => {
    const baseClasses = 'relative p-4 border rounded-lg transition-all duration-300 cursor-pointer';
    const hoverClasses = 'hover:bg-indigo-50 hover:border-indigo-300 dark:hover:bg-gray-700';
    
    // Selected state
    const isSelected = selectedAnswer === answer;
    const selectedClasses = 'border-indigo-500 bg-indigo-50 dark:bg-gray-700 dark:border-indigo-400';
    
    // Correct/incorrect states (only shown when showFeedback is true)
    const isCorrect = question.answers.find(a => a.text === answer)?.isCorrect;
    const correctClasses = 'border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-600';
    const incorrectClasses = 'border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-600';
    
    // Hover state
    const isHovered = hoverIndex === index;
    const hoveredClasses = 'border-indigo-300 shadow-md transform scale-[1.02]';
    
    if (showFeedback) {
      if (isCorrect) {
        return `${baseClasses} ${correctClasses}`;
      }
      if (isSelected && !isCorrect) {
        return `${baseClasses} ${incorrectClasses}`;
      }
      return `${baseClasses} opacity-60`;
    }
    
    return `${baseClasses} ${isSelected ? selectedClasses : ''} ${!isSelected ? hoverClasses : ''} ${isHovered ? hoveredClasses : ''}`;
  };
  
  return (
    <div className="w-full">
      <h3 className="text-lg md:text-xl font-medium text-gray-800 dark:text-white mb-4">
        {question.text}
      </h3>
      
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <div
            key={index}
            className={getAnswerClasses(answer.text, index)}
            onClick={() => !showFeedback && handleAnswerClick(answer.text)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 mr-2">
                {showFeedback ? (
                  answer.isCorrect ? (
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : selectedAnswer === answer.text ? (
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null
                ) : (
                  <div className={`h-4 w-4 border ${selectedAnswer === answer.text ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 dark:border-gray-600'} rounded-full`}></div>
                )}
              </div>
              <span className={`text-base ${selectedAnswer === answer.text ? 'font-medium' : ''}`}>
                {answer.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {showFeedback && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Explanation</h4>
          <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;