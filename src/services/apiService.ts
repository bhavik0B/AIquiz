import axios from 'axios';
import { Question, Quiz, QuizOptions } from '../types';

const API_KEY = 'YOUR_API_KEY';

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
    return '❌ Failed to fetch response from AI. Please check your API key or try again later.';
  }
};

export const generateQuiz = async (options: QuizOptions): Promise<Quiz | null> => {
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
    let parsedResponse: Quiz;
    
    try {
      // Try to parse the response as JSON
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      // If it's not valid JSON, try to extract JSON from the text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse AI response as JSON');
      }
    }
    
    // Add missing fields
    const quiz: Quiz = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      ...parsedResponse
    };
    
    return quiz;
  } catch (error: any) {
    console.error('Failed to generate quiz:', error);
    return null;
  }
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
