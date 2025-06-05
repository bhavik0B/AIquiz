import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, ChevronRight } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import Card, { CardContent } from '../components/ui/Card';
import DifficultyBadge from '../components/ui/DifficultyBadge';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizHistory } = useQuizStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter quizzes based on search term
  const filteredQuizzes = quizHistory.filter(quiz => 
    quiz.quizId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group quizzes by date
  const groupedQuizzes: Record<string, typeof quizHistory> = {};
  
  filteredQuizzes.forEach(quiz => {
    const date = new Date(quiz.date).toLocaleDateString(undefined, { 
      year: 'numeric', month: 'long', day: 'numeric'
    });
    
    if (!groupedQuizzes[date]) {
      groupedQuizzes[date] = [];
    }
    
    groupedQuizzes[date].push(quiz);
  });
  
  // Sort dates from newest to oldest
  const sortedDates = Object.keys(groupedQuizzes).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz History
        </h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search quizzes by topic..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {quizHistory.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No Quiz History Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't taken any quizzes yet. Start by creating your first quiz.
          </p>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => navigate('/create')}
          >
            Create Quiz
          </button>
        </div>
      ) : (
        <>
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No Results Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                No quizzes matched your search criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {sortedDates.map(date => (
                <div key={date}>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    {date}
                  </h2>
                  
                  <div className="space-y-3">
                    {groupedQuizzes[date].map(quiz => (
                      <Card
                        key={quiz.id}
                        className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        onClick={() => navigate(`/results`, { state: { result: quiz } })}
                      >
                        <CardContent className="py-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                                Quiz on {quiz.quizId.split('-')[0]}
                                <ChevronRight className="h-4 w-4 ml-1 text-gray-400" />
                              </h3>
                              
                              <div className="flex items-center mt-1">
                                <DifficultyBadge
                                  difficulty={
                                    quiz.quizId.includes('easy') ? 'easy' :
                                    quiz.quizId.includes('hard') ? 'hard' : 'medium'
                                  }
                                  className="mr-2"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {quiz.totalQuestions} questions
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className={`text-lg font-bold ${getScoreColorClass(quiz.score)}`}>
                                {Math.round(quiz.score)}%
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPage;