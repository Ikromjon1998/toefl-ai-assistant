import React, { useState } from 'react';
import { getEssayFeedback } from '../api/openai';
import MarkdownRenderer from '../components/MarkdownRenderer';

// Constants
const SAMPLE_PROMPTS = [
  "Do you agree or disagree with the following statement? It is better to have a few close friends than many acquaintances. Use specific reasons and examples to support your answer.",
  "Some people believe that technology has made life easier and more convenient, while others think it has made life more complicated. Which view do you agree with? Use specific reasons and examples to support your answer.",
  "Do you agree or disagree with the following statement? Students should be required to take physical education classes in school. Use specific reasons and examples to support your answer.",
  "Some people prefer to live in a small town, while others prefer to live in a big city. Which place would you prefer to live in? Use specific reasons and examples to support your answer."
];

const MIN_WORD_COUNT = 100;
const MIN_ESSAY_LENGTH = 100;

const WRITING_TIPS = {
  structure: [
    'Introduction with clear thesis statement',
    '2-3 body paragraphs with examples',
    'Conclusion that restates your position',
    'Aim for 300-400 words'
  ],
  content: [
    'Use specific examples and details',
    'Include transition words',
    'Vary sentence structure',
    'Check grammar and spelling'
  ]
};

// Utility functions
const calculateWordCount = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const validateEssay = (essay) => {
  if (!essay.trim()) {
    return 'Please write an essay before submitting.';
  }
  
  if (essay.length < MIN_ESSAY_LENGTH) {
    return 'Your essay should be at least 100 words long.';
  }
  
  return null;
};

// Sub-components
const PageHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">
      ✍️ TOEFL Writing Practice
    </h1>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Write an essay and get AI-powered feedback with detailed scoring, grammar suggestions, and improvement tips.
    </p>
  </div>
);

const SamplePromptCard = ({ prompt, index, onSelect }) => (
  <div
    className="p-3 bg-gray-50 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
    onClick={() => onSelect(prompt, index)}
  >
    <strong>Prompt {index + 1}:</strong> {prompt.substring(0, 100)}...
  </div>
);

const SamplePromptsSection = ({ prompts, onPromptSelect }) => (
  <div className="mb-6">
    <h3 className="font-medium text-gray-900 mb-3">Sample Prompts:</h3>
    <div className="space-y-2">
      {prompts.map((prompt, index) => (
        <SamplePromptCard
          key={index}
          prompt={prompt}
          index={index}
          onSelect={onPromptSelect}
        />
      ))}
    </div>
  </div>
);

const EssayTextarea = ({ essay, onEssayChange, wordCount, isLoading }) => (
  <div className="mb-4">
    <label htmlFor="essay" className="block text-sm font-medium text-gray-700 mb-2">
      Your Essay (Minimum 100 words)
    </label>
    <textarea
      id="essay"
      value={essay}
      onChange={onEssayChange}
      className="input-field h-64 resize-none"
      placeholder="Write your TOEFL essay here... You can start with one of the sample prompts above."
      disabled={isLoading}
    />
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm text-gray-500">
        Word count: {wordCount}
      </span>
      <span className="text-sm text-gray-500">
        {essay.length} characters
      </span>
    </div>
  </div>
);

const ErrorMessage = ({ error }) => (
  error && (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <p className="text-red-700 text-sm">{error}</p>
    </div>
  )
);

const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SubmitButton = ({ isLoading, isDisabled, onSubmit }) => (
  <button
    type="submit"
    disabled={isDisabled}
    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
    onClick={onSubmit}
  >
    {isLoading ? (
      <span className="flex items-center justify-center">
        <LoadingSpinner />
        Analyzing...
      </span>
    ) : (
      'Get AI Feedback'
    )}
  </button>
);

const ActionButtons = ({ onSubmit, onClear, isLoading, isDisabled }) => (
  <div className="flex gap-4">
    <SubmitButton
      isLoading={isLoading}
      isDisabled={isDisabled}
      onSubmit={onSubmit}
    />
    <button
      type="button"
      onClick={onClear}
      className="btn-secondary"
      disabled={isLoading}
    >
      Clear
    </button>
  </div>
);

const EssayForm = ({ 
  essay, 
  onEssayChange, 
  onSubmit, 
  onClear, 
  onPromptSelect, 
  isLoading, 
  error, 
  wordCount 
}) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Write Your Essay
    </h2>
    
    <SamplePromptsSection prompts={SAMPLE_PROMPTS} onPromptSelect={onPromptSelect} />

    <form onSubmit={onSubmit}>
      <EssayTextarea
        essay={essay}
        onEssayChange={onEssayChange}
        wordCount={wordCount}
        isLoading={isLoading}
      />

      <ErrorMessage error={error} />

      <ActionButtons
        onSubmit={onSubmit}
        onClear={onClear}
        isLoading={isLoading}
        isDisabled={isLoading || !essay.trim()}
      />
    </form>
  </div>
);

const FeedbackLoadingState = () => (
  <div className="text-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
    <p className="text-gray-600 mb-2">Analyzing your essay...</p>
    <p className="text-sm text-gray-500">Generating detailed feedback with AI</p>
  </div>
);

const FeedbackContent = ({ feedback }) => (
  <div className="prose prose-sm max-w-none">
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">📊 Feedback Summary</h3>
      <div className="text-blue-800">
        <MarkdownRenderer content={feedback} />
      </div>
    </div>
  </div>
);

const EmptyFeedbackState = () => (
  <div className="text-center py-8 text-gray-500">
    <div className="text-4xl mb-4">📝</div>
    <p>Write an essay and submit it to get AI-powered feedback.</p>
  </div>
);

const FeedbackDisplay = ({ feedback, isLoading }) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      AI Feedback & Analysis
    </h2>
    
    {isLoading && <FeedbackLoadingState />}
    {feedback && !isLoading && <FeedbackContent feedback={feedback} />}
    {!feedback && !isLoading && <EmptyFeedbackState />}
  </div>
);

const WritingTipsSection = () => (
  <div className="mt-12 bg-gray-50 rounded-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      💡 TOEFL Writing Tips
    </h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Structure</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {WRITING_TIPS.structure.map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Content</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {WRITING_TIPS.content.map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Writing = () => {
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEssayChange = (e) => {
    setEssay(e.target.value);
    setError(''); // Clear error when user starts typing
  };

  const handlePromptSelect = (prompt, index) => {
    const promptText = `Prompt ${index + 1}: ${prompt}`;
    setEssay(prev => prev + (prev ? '\n\n' : '') + promptText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateEssay(essay);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setFeedback('');

    try {
      const result = await getEssayFeedback(essay);
      setFeedback(result);
    } catch (err) {
      setError('Failed to get feedback. Please check your API key and try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setEssay('');
    setFeedback('');
    setError('');
  };

  const wordCount = calculateWordCount(essay);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader />

      <div className="grid lg:grid-cols-2 gap-8">
        <EssayForm
          essay={essay}
          onEssayChange={handleEssayChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
          onPromptSelect={handlePromptSelect}
          isLoading={isLoading}
          error={error}
          wordCount={wordCount}
        />

        <FeedbackDisplay feedback={feedback} isLoading={isLoading} />
      </div>

      <WritingTipsSection />
    </div>
  );
};

export default Writing; 