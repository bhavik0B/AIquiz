import React from 'react';
import { useLocation } from 'react-router-dom';
import QuizGenerator from '../components/quiz/QuizGenerator';

const CreateQuizPage: React.FC = () => {
  const location = useLocation();
  const suggestedTopic = location.state?.suggestedTopic || '';
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create a New Quiz
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your quiz settings below and generate questions on any topic.
        </p>
      </div>
      
      <QuizGenerator suggestedTopic={suggestedTopic} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-3">
              1
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Choose a Topic
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter any subject you want to be quizzed on.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-3">
              2
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Customize Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Select difficulty, question type, and how many questions you want.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold mb-3">
              3
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Generate & Play
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our AI creates your quiz instantly and you can start playing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;