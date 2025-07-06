# 📘 TOEFL AI Assistant

An AI-powered web application to help you prepare for the TOEFL exam, featuring writing feedback, reading comprehension practice, and vocabulary training.

## ✨ Features

- **✍️ Writing Practice**: Get AI-powered feedback on your TOEFL essays with detailed scoring and improvement suggestions
- **📖 Reading Comprehension**: Practice with authentic passages and AI-generated questions
- **🧠 Vocabulary Trainer**: Learn and review TOEFL vocabulary with flashcards and progress tracking
- **📊 Progress Tracking**: Save your progress locally and track your improvement
- **🎨 Modern UI**: Beautiful, responsive design built with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone or download the project**
   ```bash
   git clone https://github.com/Ikromjon1998/toefl-ai-assistant.git
   cd toefl-ai-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Get your API key from: https://platform.openai.com/api-keys

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT API
- **Storage**: LocalStorage (for progress tracking)
- **Deployment**: Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
toefl-ai-assistant/
├── public/
├── src/
│   ├── components/
│   │   └── Header.jsx          # Navigation component
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Writing.jsx         # Essay writing practice
│   │   ├── Reading.jsx         # Reading comprehension
│   │   └── Vocabulary.jsx      # Vocabulary trainer
│   ├── api/
│   │   └── openai.js           # OpenAI API integration
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Tailwind styles
├── .env                        # Environment variables (create this)
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── package.json
```

## 🎯 How to Use

### Writing Practice
1. Navigate to the Writing section
2. Choose a sample prompt or write your own essay
3. Submit your essay for AI feedback
4. Review detailed scoring and improvement suggestions

### Reading Practice
1. Go to the Reading section
2. Use a sample passage or paste your own text
3. Generate AI-powered comprehension questions
4. Answer questions and check your results

### Vocabulary Training
1. Visit the Vocabulary section
2. Look up word definitions or use flashcards
3. Mark words as known or unknown
4. Track your progress over time

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard

### Manual Deployment
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🔧 Configuration

### OpenAI API Setup
1. Sign up at https://platform.openai.com
2. Generate an API key
3. Add it to your `.env` file:
   ```env
   VITE_OPENAI_API_KEY=sk-your-api-key-here
   ```

### Customization
- Modify `src/api/openai.js` to adjust AI prompts
- Update sample content in each page component
- Customize styling in `src/index.css`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working**
- Ensure your API key is correct and has sufficient credits
- Check that the `.env` file is in the root directory
- Restart the development server after adding the API key

**Build Errors**
- Make sure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check that `src/index.css` contains the Tailwind directives

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy TOEFL studying! 🎓**
