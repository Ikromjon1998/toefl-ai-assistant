import React, { useState } from 'react';
import { getEssayFeedback } from '../api/openai';

const Writing = () => {
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const samplePrompts = [
    "Do you agree or disagree with the following statement? It is better to have a few close friends than many acquaintances. Use specific reasons and examples to support your answer.",
    "Some people believe that technology has made life easier and more convenient, while others think it has made life more complicated. Which view do you agree with? Use specific reasons and examples to support your answer.",
    "Do you agree or disagree with the following statement? Students should be required to take physical education classes in school. Use specific reasons and examples to support your answer.",
    "Some people prefer to live in a small town, while others prefer to live in a big city. Which place would you prefer to live in? Use specific reasons and examples to support your answer."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!essay.trim()) {
      setError('Please write an essay before submitting.');
      return;
    }

    if (essay.length < 100) {
      setError('Your essay should be at least 100 words long.');
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

  const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ✍️ TOEFL Writing Practice
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Write an essay and get AI-powered feedback with detailed scoring, grammar suggestions, and improvement tips.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Essay Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Write Your Essay
          </h2>
          
          {/* Sample Prompts */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Sample Prompts:</h3>
            <div className="space-y-2">
              {samplePrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setEssay(prev => prev + (prev ? '\n\n' : '') + `Prompt ${index + 1}: ${prompt}`)}
                >
                  <strong>Prompt {index + 1}:</strong> {prompt.substring(0, 100)}...
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="essay" className="block text-sm font-medium text-gray-700 mb-2">
                Your Essay (Minimum 100 words)
              </label>
              <textarea
                id="essay"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
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

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading || !essay.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Get AI Feedback'
                )}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="btn-secondary"
                disabled={isLoading}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Feedback Display */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            AI Feedback & Analysis
          </h2>
          
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your essay...</p>
            </div>
          )}

          {feedback && !isLoading && (
            <div className="prose prose-sm max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">📊 Feedback Summary</h3>
                <div className="text-blue-800 whitespace-pre-wrap">{feedback}</div>
              </div>
            </div>
          )}

          {!feedback && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📝</div>
              <p>Write an essay and submit it to get AI-powered feedback.</p>
            </div>
          )}
        </div>
      </div>

      {/* Writing Tips */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 TOEFL Writing Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Structure</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Introduction with clear thesis statement</li>
              <li>• 2-3 body paragraphs with examples</li>
              <li>• Conclusion that restates your position</li>
              <li>• Aim for 300-400 words</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Content</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use specific examples and details</li>
              <li>• Include transition words</li>
              <li>• Vary sentence structure</li>
              <li>• Check grammar and spelling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing; 