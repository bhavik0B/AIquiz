import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, Award, Clock } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import DifficultyBadge from '../components/ui/DifficultyBadge';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { quizHistory } = useQuizStore();
  
  // Get recent quizzes (up to 3)
  const recentQuizzes = quizHistory.slice(0, 3);
  
  // Calculate some basic stats
  const totalQuizzes = quizHistory.length;
  const averageScore = quizHistory.length > 0
    ? Math.round(quizHistory.reduce((sum, quiz) => sum + quiz.score, 0) / quizHistory.length)
    : 0;
  
  const calculateQuizzesByDifficulty = () => {
    return quizHistory.reduce((acc, quiz) => {
      const difficulty = quiz.quizId.includes('easy') ? 'easy' : quiz.quizId.includes('hard') ? 'hard' : 'medium';
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, { easy: 0, medium: 0, hard: 0 } as Record<string, number>);
  };
  
  const quizzesByDifficulty = calculateQuizzesByDifficulty();
  
  const handleCreateQuiz = () => {
    navigate('/create');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <Brain className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Welcome to QuizGenius
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Generate AI-powered quizzes on any topic, test your knowledge, and track your progress over time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <CardContent className="py-8">
            <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>
            <p className="mb-6">
              Generate a custom quiz on any topic, with your preferred difficulty level and question type.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/20 border-white text-white hover:bg-white/30"
              onClick={handleCreateQuiz}
            >
              Start Creating
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {totalQuizzes}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Quizzes Taken</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {averageScore}%
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Average Score</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-2">
            <CardContent className="py-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Quizzes by Difficulty
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <DifficultyBadge difficulty="easy" />
                  <DifficultyBadge difficulty="medium" />
                  <DifficultyBadge difficulty="hard" />
                </div>
                <div className="flex space-x-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{quizzesByDifficulty.easy}</span>
                  <span className="text-gray-600 dark:text-gray-400">{quizzesByDifficulty.medium}</span>
                  <span className="text-gray-600 dark:text-gray-400">{quizzesByDifficulty.hard}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {recentQuizzes.length > 0 && (
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Quizzes
            </h2>
            {quizHistory.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/history')}
              >
                View All
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Quiz on {quiz.quizId.split('-')[0]}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {new Date(quiz.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`
                        text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center
                        ${quiz.score >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          quiz.score >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
                      `}>
                        {quiz.score}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['History', 'Science', 'Geography'].map((topic) => (
          <Card key={topic} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="py-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {topic} Quiz
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Test your knowledge of {topic.toLowerCase()} with our curated questions.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigate('/create', { state: { suggestedTopic: topic } });
                }}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;