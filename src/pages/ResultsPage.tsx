import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, BarChart } from 'lucide-react';
import { QuizResult } from '../types';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import QuizQuestion from '../components/quiz/QuizQuestion';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as QuizResult;
  
  // Redirect if no result
  if (!result) {
    navigate('/');
    return null;
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! You're a master of this topic!";
    if (score >= 80) return "Great job! You know this subject well!";
    if (score >= 70) return "Good work! You have a solid understanding.";
    if (score >= 60) return "Not bad! You're on the right track.";
    if (score >= 50) return "You passed, but there's room for improvement.";
    return "Keep studying! You'll do better next time.";
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
          <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Quiz Results
        </h1>
        
        <div className="flex justify-center items-center mb-4">
          <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
            {Math.round(result.score)}%
          </div>
          <div className="text-gray-600 dark:text-gray-400 ml-2">
            ({result.correctAnswers} of {result.totalQuestions} correct)
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
          {getScoreMessage(result.score)}
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Your Answers
        </h2>
        
        <div className="space-y-6">
          {result.answers.map((answer, index) => {
            const question = result.questions[index];
            if (!question) return null;
            
            return (
              <Card key={answer.questionId} className="overflow-hidden">
                <div className={`h-2 ${answer.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <CardContent className="py-6">
                  <QuizQuestion
                    question={question}
                    selectedAnswer={answer.selectedAnswer}
                    onAnswerSelect={() => {}}
                    showFeedback={true}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
        <Button
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>
        
        <Button
          variant="primary"
          className="flex items-center justify-center"
          onClick={() => navigate('/create')}
        >
          <Brain size={16} className="mr-2" />
          Create New Quiz
        </Button>
        
        <Button
          variant="secondary"
          className="flex items-center justify-center"
          onClick={() => navigate('/stats')}
        >
          <BarChart size={16} className="mr-2" />
          View Statistics
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;