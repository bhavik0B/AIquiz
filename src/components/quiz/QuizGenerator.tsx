import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, BookOpen, Timer } from 'lucide-react';
import { QuizOptions, QuizDifficulty, QuestionType } from '../../types';
import { useQuizStore } from '../../store/quizStore';
import Button from '../ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Select from '../ui/Select';

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const questionCountOptions = [
  { value: '5', label: '5 Questions' },
  { value: '10', label: '10 Questions' },
  { value: '15', label: '15 Questions' },
  { value: '20', label: '20 Questions' },
];

const questionTypeOptions = [
  { value: 'multiple', label: 'Multiple Choice' },
  { value: 'boolean', label: 'True/False' },
  { value: 'mixed', label: 'Mixed' },
];

const topicSuggestions = [
  'World History',
  'Science and Nature',
  'Technology',
  'Geography',
  'Mathematics',
  'Art and Literature',
  'Sports',
  'Music',
  'Movies and TV Shows',
  'Food and Cooking',
];

interface QuizGeneratorProps {
  suggestedTopic?: string;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ suggestedTopic = '' }) => {
  const navigate = useNavigate();
  const { createQuiz, isLoading, error } = useQuizStore();
  
  const [quizOptions, setQuizOptions] = useState<QuizOptions>({
    topic: suggestedTopic,
    difficulty: 'medium',
    questionCount: 5,
    questionType: 'multiple',
  });
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizOptions({ ...quizOptions, topic: e.target.value });
  };
  
  const handleDifficultyChange = (value: string) => {
    setQuizOptions({ ...quizOptions, difficulty: value as QuizDifficulty });
  };
  
  const handleQuestionCountChange = (value: string) => {
    setQuizOptions({ ...quizOptions, questionCount: parseInt(value) });
  };
  
  const handleQuestionTypeChange = (value: string) => {
    setQuizOptions({ ...quizOptions, questionType: value as QuestionType });
  };
  
  const handleTopicSuggestionClick = (topic: string) => {
    setQuizOptions({ ...quizOptions, topic });
    setShowSuggestions(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quizOptions.topic.trim()) {
      alert('Please enter a topic for your quiz');
      return;
    }
    
    await createQuiz(quizOptions);
    navigate('/quiz');
  };
  
  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="transition-all duration-500 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center">
            <BrainCircuit className="text-indigo-600 dark:text-indigo-400 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Generate New Quiz
            </h2>
          </div>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quiz Topic
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="topic"
                    placeholder="Enter a topic (e.g., World History, Science)"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3"
                    value={quizOptions.topic}
                    onChange={handleTopicChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  
                  {showSuggestions && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                      <div className="p-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        Suggested Topics
                      </div>
                      <ul>
                        {topicSuggestions.map((topic) => (
                          <li
                            key={topic}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                            onClick={() => handleTopicSuggestionClick(topic)}
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Difficulty"
                  options={difficultyOptions}
                  value={quizOptions.difficulty}
                  onChange={handleDifficultyChange}
                />
                
                <Select
                  label="Number of Questions"
                  options={questionCountOptions}
                  value={quizOptions.questionCount.toString()}
                  onChange={handleQuestionCountChange}
                />
                
                <Select
                  label="Question Type"
                  options={questionTypeOptions}
                  value={quizOptions.questionType}
                  onChange={handleQuestionTypeChange}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? 'Generating Quiz...' : 'Generate Quiz'}
              </Button>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <BookOpen size={16} className="mr-1" />
            <span>Powered by AI</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Timer size={16} className="mr-1" />
            <span>Average generation time: ~10 seconds</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizGenerator;