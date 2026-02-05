import axios from 'axios';
import { Quiz, QuizOptions } from '../types';

<<<<<<< HEAD
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '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';
=======
const API_KEY = 'YOUR_API_KEY';
>>>>>>> adbd4a0ac2b9a8de22f321603ec728cbd054353e

export const fetchAIResponse = async (userInput: string) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: userInput }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'AI Quiz Generator',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error('Invalid or expired API key. Please update your OpenRouter API key.');
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.response?.status >= 500) {
      throw new Error('OpenRouter service is currently unavailable. Please try again later.');
    } else if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    } else {
      throw new Error('Failed to connect to AI service. Please check your internet connection.');
    }
  }
};

export const generateQuiz = async (options: QuizOptions): Promise<Quiz> => {
  const { topic, difficulty, questionCount, questionType } = options;
  
  const prompt = `Generate a quiz about "${topic}" with ${questionCount} ${questionType} questions at ${difficulty} difficulty level. 
  Return the result as a JSON object with the following format:
  {
    "title": "Quiz title",
    "topic": "${topic}",
    "difficulty": "${difficulty}",
    "questions": [
      {
        "id": "1",
        "text": "Question text",
        "type": "multiple" or "boolean",
        "answers": [
          {"text": "Answer 1", "isCorrect": true/false},
          {"text": "Answer 2", "isCorrect": true/false},
          {"text": "Answer 3", "isCorrect": true/false},
          {"text": "Answer 4", "isCorrect": true/false}
        ],
        "explanation": "Explanation of the correct answer"
      }
    ]
  }
  For boolean questions, provide only two answers: true and false.
  For multiple choice questions, provide 4 options with only 1 correct answer.
  Make sure the questions are challenging and educational.
  Ensure the "isCorrect" field is accurate.`;

  try {
    const aiResponse = await fetchAIResponse(prompt);
    
    // Check if the response starts with an error message
    if (aiResponse.startsWith('❌')) {
      throw new Error(aiResponse);
    }
    
    let parsedResponse: Quiz;
    
    try {
      // Try to parse the response as JSON
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      // If it's not valid JSON, try to extract JSON from the text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          throw new Error('AI returned invalid JSON format. Please try again.');
        }
      } else {
        throw new Error('AI did not return a valid quiz format. Please try again.');
      }
    }
    
    // Validate that the response has required fields
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions) || parsedResponse.questions.length === 0) {
      throw new Error('AI did not generate any questions. Please try again.');
    }
    
    // Add missing fields
    const quiz: Quiz = {
      ...parsedResponse,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    
    return quiz;
  } catch (error: any) {
    console.error('Failed to generate quiz:', error);
    throw error; // Propagate the error instead of returning null
  }
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
