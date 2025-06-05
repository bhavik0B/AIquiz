import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, HelpCircle } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import Button from '../components/ui/Button';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizProgress from '../components/quiz/QuizProgress';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import DifficultyBadge from '../components/ui/DifficultyBadge';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentQuiz,
    currentQuestion,
    answers,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz
  } = useQuizStore();
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  
  // Start timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Redirect if no quiz
  useEffect(() => {
    if (!currentQuiz) {
      navigate('/create');
    }
  }, [currentQuiz, navigate]);
  
  if (!currentQuiz) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No Active Quiz
          </h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Please create a new quiz to get started.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => navigate('/create')}
              variant="primary"
            >
              Create Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const question = currentQuiz.questions[currentQuestion];
  const selectedAnswer = answers.find(a => a.questionId === question.id)?.selectedAnswer;
  const answeredCount = answers.length;
  const isLastQuestion = currentQuestion === currentQuiz.questions.length - 1;
  
  const handleAnswerSelect = (questionId: string, answer: string) => {
    answerQuestion(questionId, answer);
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      setShowConfirmation(true);
    } else {
      nextQuestion();
    }
  };
  
  const handleSubmit = () => {
    const result = submitQuiz();
    resetQuiz();
    navigate('/results', { state: { result } });
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentQuiz.title || `Quiz on ${currentQuiz.topic}`}
          </h1>
          <DifficultyBadge difficulty={currentQuiz.difficulty} />
        </div>
        
        <QuizProgress
          currentQuestion={currentQuestion}
          totalQuestions={currentQuiz.questions.length}
        />
      </div>
      
      {/* Question card */}
      <Card className="mb-6">
        <CardContent className="py-6">
          <QuizQuestion
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Time: {formatTime(timeSpent)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {answeredCount}/{currentQuiz.questions.length} answered
          </div>
        </CardFooter>
      </Card>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft size={16} className="mr-1" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
          variant="primary"
          className="flex items-center"
        >
          {isLastQuestion ? (
            <>
              <CheckCircle size={16} className="mr-1" />
              Finish Quiz
            </>
          ) : (
            <>
              Next
              <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </Button>
      </div>
      
      {/* Confirmation modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardContent className="py-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Submit Quiz?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                You've answered {answeredCount} out of {currentQuiz.questions.length} questions.
              </p>
              {answeredCount < currentQuiz.questions.length && (
                <p className="text-amber-600 dark:text-amber-400 text-sm mb-4">
                  Warning: You have {currentQuiz.questions.length - answeredCount} unanswered questions.
                </p>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
              >
                Review Answers
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
              >
                Submit Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuizPage;