import React, { useMemo } from 'react';
import { Award, Brain, Clock, TrendingUp } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import Card, { CardContent } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const StatsPage: React.FC = () => {
  const { quizHistory } = useQuizStore();
  
  // Calculate statistics
  const stats = useMemo(() => {
    if (quizHistory.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalQuestions: 0,
        quizzesByDifficulty: { easy: 0, medium: 0, hard: 0 },
        scoreDistribution: [] as Array<{ range: string; count: number }>
      };
    }
    
    const totalQuizzes = quizHistory.length;
    const averageScore = Math.round(
      quizHistory.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes
    );
    const bestScore = Math.round(
      Math.max(...quizHistory.map(quiz => quiz.score))
    );
    const totalQuestions = quizHistory.reduce(
      (sum, quiz) => sum + quiz.totalQuestions, 0
    );
    
    // Count quizzes by difficulty
    const quizzesByDifficulty = quizHistory.reduce(
      (acc, quiz) => {
        const difficulty = quiz.difficulty || 'medium';
        acc[difficulty] = (acc[difficulty] || 0) + 1;
        return acc;
      },
      { easy: 0, medium: 0, hard: 0 } as Record<string, number>
    );
    
    // Create score distribution
    const scoreRanges = [
      { range: '0-20%', count: 0 },
      { range: '21-40%', count: 0 },
      { range: '41-60%', count: 0 },
      { range: '61-80%', count: 0 },
      { range: '81-100%', count: 0 },
    ];
    
    quizHistory.forEach(quiz => {
      const score = Math.round(quiz.score);
      if (score <= 20) scoreRanges[0].count++;
      else if (score <= 40) scoreRanges[1].count++;
      else if (score <= 60) scoreRanges[2].count++;
      else if (score <= 80) scoreRanges[3].count++;
      else scoreRanges[4].count++;
    });
    
    return {
      totalQuizzes,
      averageScore,
      bestScore,
      totalQuestions,
      quizzesByDifficulty,
      scoreDistribution: scoreRanges
    };
  }, [quizHistory]);
  
  // Prepare data for difficulty chart
  const difficultyChartData = [
    { name: 'Easy', value: stats.quizzesByDifficulty.easy },
    { name: 'Medium', value: stats.quizzesByDifficulty.medium },
    { name: 'Hard', value: stats.quizzesByDifficulty.hard },
  ];
  
  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your performance and quiz history analytics.
        </p>
      </div>
      
      {quizHistory.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No Statistics Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Take a few quizzes to see your performance statistics.
          </p>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => window.location.href = '/create'}
          >
            Create Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalQuizzes}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Total Quizzes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageScore}%
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Average Score</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.bestScore}%
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Best Score</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Clock className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalQuestions}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Total Questions</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Score Distribution
                </h3>
                <div className="h-64">
                  {stats.totalQuizzes > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.scoreDistribution}>
                        <XAxis 
                          dataKey="range" 
                          tick={{ fill: 'currentColor' }}
                          className="text-gray-600 dark:text-gray-400"
                        />
                        <YAxis 
                          tick={{ fill: 'currentColor' }}
                          className="text-gray-600 dark:text-gray-400"
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.375rem'
                          }}
                        />
                        <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                      No data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Quizzes by Difficulty
                </h3>
                <div className="h-64">
                  {stats.totalQuizzes > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={difficultyChartData.filter(d => d.value > 0)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ percent }) => percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {difficultyChartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.375rem'
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          iconType="circle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                      No data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage;