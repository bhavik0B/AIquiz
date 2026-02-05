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

```bash
npm install
```

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

```bash
npm run dev
```

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
