import React, { useState } from 'react';
import { generateReadingQuestions } from '../api/openai';

const Reading = () => {
  const [passage, setPassage] = useState('');
  const [questions, setQuestions] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const samplePassages = [
    {
      title: "The Impact of Climate Change on Agriculture",
      content: `Climate change is having a profound impact on agricultural systems worldwide. Rising temperatures, changing precipitation patterns, and increased frequency of extreme weather events are all affecting crop yields and farming practices. Scientists predict that by 2050, global food production could decrease by 10-25% due to climate-related factors.

Farmers are already adapting to these changes by implementing new technologies and practices. Some are using drought-resistant crop varieties, while others are adopting precision agriculture techniques that use sensors and data analysis to optimize water and fertilizer use. Additionally, many agricultural regions are shifting planting dates to align with changing seasonal patterns.

However, adaptation alone may not be sufficient. Research shows that the most vulnerable populations, particularly in developing countries, will face the greatest challenges. These regions often lack the resources and infrastructure needed to implement advanced farming technologies or to recover from climate-related disasters.

The economic implications are significant. As crop yields decrease, food prices are expected to rise, potentially leading to food insecurity for millions of people. This could also trigger social and political instability in regions where agriculture is a primary economic activity.`
    },
    {
      title: "The Evolution of Digital Communication",
      content: `The way humans communicate has evolved dramatically over the past few decades, driven primarily by advances in digital technology. From the early days of email in the 1970s to the current era of social media and instant messaging, digital communication has transformed both personal and professional interactions.

One of the most significant changes has been the speed of communication. What once took days or weeks through traditional mail can now be accomplished in seconds. This immediacy has created new expectations for response times and has fundamentally altered how people plan and coordinate activities. Businesses, in particular, have had to adapt to this faster pace, implementing new protocols and tools to meet customer expectations.

However, this rapid evolution has also brought challenges. The constant connectivity enabled by smartphones and social media has led to concerns about information overload and the blurring of boundaries between work and personal life. Many people report feeling overwhelmed by the volume of messages and notifications they receive daily.

Despite these challenges, digital communication has also created opportunities for greater inclusivity and global connection. People can now maintain relationships across vast distances, participate in international communities, and access information from around the world instantaneously. This has particularly benefited individuals in remote areas or those with mobility limitations.`
    }
  ];

  const handleGenerateQuestions = async () => {
    if (!passage.trim()) {
      setError('Please enter a passage before generating questions.');
      return;
    }

    setIsLoading(true);
    setError('');
    setQuestions(null);
    setUserAnswers({});
    setShowResults(false);

    try {
      const result = await generateReadingQuestions(passage);
      setQuestions(result);
    } catch (err) {
      setError('Failed to generate questions. Please check your API key and try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setPassage('');
    setQuestions(null);
    setUserAnswers({});
    setShowResults(false);
    setError('');
  };

  const getScore = () => {
    if (!questions || !showResults) return 0;
    let correct = 0;
    questions.questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.questions.length) * 100);
  };

  const score = getScore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📖 TOEFL Reading Practice
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practice reading comprehension with AI-generated questions. Enter a passage or use our sample texts to get started.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Passage Input */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Reading Passage
          </h2>

          {/* Sample Passages */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Sample Passages:</h3>
            <div className="space-y-2">
              {samplePassages.map((sample, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setPassage(sample.content)}
                >
                  <strong>{sample.title}</strong>
                  <p className="text-gray-600 mt-1">{sample.content.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="passage" className="block text-sm font-medium text-gray-700 mb-2">
              Or enter your own passage:
            </label>
            <textarea
              id="passage"
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              className="input-field h-64 resize-none"
              placeholder="Paste or type a reading passage here..."
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleGenerateQuestions}
              disabled={isLoading || !passage.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Questions'
              )}
            </button>
            <button
              onClick={handleReset}
              className="btn-secondary"
              disabled={isLoading}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Questions and Results */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Comprehension Questions
          </h2>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating questions...</p>
            </div>
          )}

          {questions && !isLoading && (
            <div>
              <div className="mb-6">
                {questions.questions.map((question, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Question {index + 1}: {question.question}
                    </h3>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={userAnswers[index] === option}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            disabled={showResults}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`text-sm ${
                            showResults 
                              ? option === question.correctAnswer 
                                ? 'text-green-700 font-medium' 
                                : userAnswers[index] === option && option !== question.correctAnswer
                                ? 'text-red-700 font-medium'
                                : 'text-gray-700'
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>

                    {showResults && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {showResults && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">📊 Your Results</h3>
                  <p className="text-blue-800">
                    Score: <strong>{score}%</strong> ({questions.questions.filter((q, index) => userAnswers[index] === q.correctAnswer).length} out of {questions.questions.length} correct)
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                {!showResults ? (
                  <button
                    onClick={handleCheckAnswers}
                    className="btn-primary flex-1"
                  >
                    Check Answers
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResults(false)}
                    className="btn-secondary flex-1"
                  >
                    Hide Results
                  </button>
                )}
              </div>
            </div>
          )}

          {!questions && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📖</div>
              <p>Enter a passage and generate questions to start practicing.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reading Tips */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 TOEFL Reading Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Reading Strategy</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Skim the passage first for main ideas</li>
              <li>• Read questions before reading in detail</li>
              <li>• Look for key words in questions</li>
              <li>• Use context clues for vocabulary</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Question Types</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Main idea and supporting details</li>
              <li>• Vocabulary in context</li>
              <li>• Inference and implication</li>
              <li>• Author's purpose and tone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reading; 