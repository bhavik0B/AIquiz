<<<<<<< HEAD
# AI Quiz Generator

An intelligent quiz generation application powered by AI that creates customized quizzes on any topic.

## Features

- 🧠 AI-powered quiz generation
- 📊 Multiple difficulty levels (Easy, Medium, Hard)
- 🎯 Various question types (Multiple Choice, True/False, Mixed)
- 📈 Track your quiz history and statistics
- 🎨 Dark/Light theme support
- 📱 Responsive design

## Setup Instructions

### 1. Install Dependencies

=======
# QuizGenius - AI-Powered Quiz Application

QuizGenius is a modern, AI-powered quiz application built with React that generates custom quizzes on any topic. Test your knowledge, track your progress, and learn with detailed explanations for each question.

![QuizGenius Screenshot](https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🤖 **AI-Powered Quiz Generation**: Create quizzes on any topic instantly
- 🎯 **Multiple Difficulty Levels**: Choose from Easy, Medium, or Hard
- 📝 **Flexible Question Types**: Multiple choice and true/false questions
- 🌗 **Dark/Light Mode**: Comfortable viewing in any lighting
- 📊 **Performance Analytics**: Track your progress with detailed statistics
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- React.js
- Tailwind CSS
- Zustand (State Management)
- React Router
- Recharts (Analytics)
- Lucide React (Icons)
- OpenRouter AI API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/bhavik0B/AIquiz.git
cd Aiquiz
```

2. Install dependencies:
>>>>>>> adbd4a0ac2b9a8de22f321603ec728cbd054353e
```bash
npm install
```

<<<<<<< HEAD
### 2. Configure API Key

The application uses OpenRouter API to generate quizzes. You need to set up your own API key:

1. Visit [OpenRouter](https://openrouter.ai/keys) and create an account
2. Generate a new API key
3. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Open `.env` and replace `your_api_key_here` with your actual API key:
   ```
   VITE_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   ```

### 3. Run the Application

=======
3. Create a `.env` file in the root directory and add your OpenRouter API key:
```env
VITE_OPENROUTER_API_KEY=your_api_key_here
```

4. Start the development server:
>>>>>>> adbd4a0ac2b9a8de22f321603ec728cbd054353e
```bash
npm run dev
```

<<<<<<< HEAD
The application will be available at `http://localhost:5173`

## Troubleshooting

### "Invalid or expired API key" Error

This error occurs when:
- The API key in `.env` is invalid or expired
- The `.env` file is not properly configured
- You haven't created a `.env` file from `.env.example`

**Solution:**
1. Check that your `.env` file exists in the root directory
2. Verify your API key is correct at [OpenRouter Keys](https://openrouter.ai/keys)
3. Make sure the key starts with `sk-or-v1-`
4. Restart the development server after changing `.env`

### Rate Limit Errors

If you see rate limit errors, you may have exceeded your API quota. Check your usage at [OpenRouter](https://openrouter.ai/).

## Technologies Used

- React + TypeScript
- Vite
- TailwindCSS
- Zustand (State Management)
- React Router
- Axios
- Recharts (Statistics Visualization)
- Lucide React (Icons)

## Project Structure

```
src/
├── components/        # React components
│   ├── layout/       # Layout components
│   ├── quiz/         # Quiz-related components
│   └── ui/           # Reusable UI components
├── pages/            # Page components
├── services/         # API and external services
├── store/            # State management (Zustand)
└── types/            # TypeScript type definitions
```

## License

MIT
=======
5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. **Create a Quiz**
   - Click "Create Quiz" on the homepage
   - Enter your desired topic
   - Select difficulty level and number of questions
   - Click "Generate Quiz"

2. **Take the Quiz**
   - Answer each question
   - Use Previous/Next buttons to navigate
   - Submit when finished

3. **Review Results**
   - See your score and correct answers
   - Read detailed explanations
   - Track your progress in Statistics



## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- AI powered by [OpenRouter](https://openrouter.ai/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
>>>>>>> adbd4a0ac2b9a8de22f321603ec728cbd054353e
