import React, { useState } from 'react';
import { generateReadingQuestions } from '../api/openai';

// Constants
const SAMPLE_PASSAGES = [
  {
    title: 'The Impact of Climate Change on Agriculture',
    content: `Climate change is having a profound impact on agricultural systems worldwide. Rising temperatures, changing precipitation patterns, and increased frequency of extreme weather events are all affecting crop yields and farming practices. Scientists predict that by 2050, global food production could decrease by 10-25% due to climate-related factors.

Farmers are already adapting to these changes by implementing new technologies and practices. Some are using drought-resistant crop varieties, while others are adopting precision agriculture techniques that use sensors and data analysis to optimize water and fertilizer use. Additionally, many agricultural regions are shifting planting dates to align with changing seasonal patterns.

However, adaptation alone may not be sufficient. Research shows that the most vulnerable populations, particularly in developing countries, will face the greatest challenges. These regions often lack the resources and infrastructure needed to implement advanced farming technologies or to recover from climate-related disasters.

The economic implications are significant. As crop yields decrease, food prices are expected to rise, potentially leading to food insecurity for millions of people. This could also trigger social and political instability in regions where agriculture is a primary economic activity.`,
  },
  {
    title: 'The Evolution of Digital Communication',
    content: `The way humans communicate has evolved dramatically over the past few decades, driven primarily by advances in digital technology. From the early days of email in the 1970s to the current era of social media and instant messaging, digital communication has transformed both personal and professional interactions.

One of the most significant changes has been the speed of communication. What once took days or weeks through traditional mail can now be accomplished in seconds. This immediacy has created new expectations for response times and has fundamentally altered how people plan and coordinate activities. Businesses, in particular, have had to adapt to this faster pace, implementing new protocols and tools to meet customer expectations.

However, this rapid evolution has also brought challenges. The constant connectivity enabled by smartphones and social media has led to concerns about information overload and the blurring of boundaries between work and personal life. Many people report feeling overwhelmed by the volume of messages and notifications they receive daily.

Despite these challenges, digital communication has also created opportunities for greater inclusivity and global connection. People can now maintain relationships across vast distances, participate in international communities, and access information from around the world instantaneously. This has particularly benefited individuals in remote areas or those with mobility limitations.`,
  },
];

// Utility functions
const validatePassage = passage => {
  if (!passage.trim()) {
    return 'Please enter a passage before generating questions.';
  }
  return null;
};

const calculateScore = (questions, userAnswers) => {
  if (!questions || !userAnswers) return 0;

  let correct = 0;
  questions.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correct++;
    }
  });

  return Math.round((correct / questions.questions.length) * 100);
};

// Sub-components
const PageHeader = () => (
  <div className='text-center mb-8'>
    <h1 className='text-3xl font-bold text-gray-900 mb-4'>
      📖 TOEFL Reading Practice
    </h1>
    <p className='text-gray-600 max-w-2xl mx-auto'>
      Practice reading comprehension with AI-generated questions. Enter a
      passage or use our sample texts to get started.
    </p>
  </div>
);

const SamplePassageCard = ({ passage, onSelect }) => (
  <div
    className='p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors'
    onClick={() => onSelect(passage.content)}
  >
    <strong>{passage.title}</strong>
    <p className='text-gray-600 mt-1'>{passage.content.substring(0, 100)}...</p>
  </div>
);

const SamplePassagesSection = ({ passages, onPassageSelect }) => (
  <div className='mb-6'>
    <h3 className='font-medium text-gray-900 mb-3'>Sample Passages:</h3>
    <div className='space-y-2'>
      {passages.map((passage, index) => (
        <SamplePassageCard
          key={index}
          passage={passage}
          index={index}
          onSelect={onPassageSelect}
        />
      ))}
    </div>
  </div>
);

const PassageTextarea = ({ passage, onPassageChange, isLoading }) => (
  <div className='mb-4'>
    <label
      htmlFor='passage'
      className='block text-sm font-medium text-gray-700 mb-2'
    >
      Or enter your own passage:
    </label>
    <textarea
      id='passage'
      value={passage}
      onChange={onPassageChange}
      className='input-field h-64 resize-none'
      placeholder='Paste or type a reading passage here...'
      disabled={isLoading}
    />
  </div>
);

const ErrorMessage = ({ error }) =>
  error && (
    <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md'>
      <p className='text-red-700 text-sm'>{error}</p>
    </div>
  );

const LoadingSpinner = () => (
  <svg
    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
);

const ActionButtons = ({ onGenerate, onReset, isLoading, isDisabled }) => (
  <div className='flex gap-4'>
    <button
      onClick={onGenerate}
      disabled={isDisabled}
      className='btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1'
    >
      {isLoading ? (
        <span className='flex items-center justify-center'>
          <LoadingSpinner />
          Generating...
        </span>
      ) : (
        'Generate Questions'
      )}
    </button>
    <button onClick={onReset} className='btn-secondary' disabled={isLoading}>
      Reset
    </button>
  </div>
);

const PassageInputSection = ({
  passage,
  onPassageChange,
  onGenerate,
  onReset,
  onPassageSelect,
  isLoading,
  error,
}) => (
  <div className='card'>
    <h2 className='text-xl font-semibold text-gray-900 mb-4'>
      Reading Passage
    </h2>

    <SamplePassagesSection
      passages={SAMPLE_PASSAGES}
      onPassageSelect={onPassageSelect}
    />

    <PassageTextarea
      passage={passage}
      onPassageChange={onPassageChange}
      isLoading={isLoading}
    />

    <ErrorMessage error={error} />

    <ActionButtons
      onGenerate={onGenerate}
      onReset={onReset}
      isLoading={isLoading}
      isDisabled={isLoading || !passage.trim()}
    />
  </div>
);

const QuestionOption = ({
  option,
  questionIndex,
  userAnswer,
  onAnswerChange,
  showResults,
  correctAnswer,
}) => {
  const isSelected = userAnswer === option;
  const isCorrect = option === correctAnswer;
  const showCorrectAnswer = showResults && isCorrect;
  const showWrongAnswer = showResults && isSelected && !isCorrect;

  const getOptionClasses = () => {
    let classes = 'flex items-center space-x-3 cursor-pointer';

    if (showResults) {
      if (showCorrectAnswer) {
        classes += ' text-green-700 bg-green-50';
      } else if (showWrongAnswer) {
        classes += ' text-red-700 bg-red-50';
      }
    }

    return classes;
  };

  return (
    <label className={getOptionClasses()}>
      <input
        type='radio'
        name={`question-${questionIndex}`}
        value={option}
        checked={isSelected}
        onChange={() => onAnswerChange(questionIndex, option)}
        disabled={showResults}
        className='text-blue-600 focus:ring-blue-500'
      />
      <span className='text-sm'>{option}</span>
    </label>
  );
};

const QuestionCard = ({
  question,
  questionIndex,
  userAnswer,
  onAnswerChange,
  showResults,
}) => (
  <div className='mb-6 p-4 border border-gray-200 rounded-lg'>
    <h3 className='font-medium text-gray-900 mb-3'>
      Question {questionIndex + 1}: {question.question}
    </h3>

    <div className='space-y-2'>
      {question.options.map((option, optionIndex) => (
        <QuestionOption
          key={optionIndex}
          option={option}
          questionIndex={questionIndex}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
          showResults={showResults}
          correctAnswer={question.correctAnswer}
        />
      ))}
    </div>
  </div>
);

const QuestionsLoadingState = () => (
  <div className='text-center py-8'>
    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
    <p className='text-gray-600'>Generating questions...</p>
  </div>
);

const ScoreDisplay = ({ score, totalQuestions, answeredQuestions }) => (
  <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
    <h3 className='text-lg font-semibold text-blue-900 mb-2'>📊 Your Score</h3>
    <div className='text-2xl font-bold text-blue-700 mb-2'>{score}%</div>
    <p className='text-blue-800 text-sm'>
      You answered {answeredQuestions} out of {totalQuestions} questions
      correctly.
    </p>
  </div>
);

const CheckAnswersButton = ({
  onCheckAnswers,
  answeredQuestions,
  totalQuestions,
}) => (
  <button
    onClick={onCheckAnswers}
    disabled={answeredQuestions < totalQuestions}
    className='btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full mb-6'
  >
    Check Answers ({answeredQuestions}/{totalQuestions})
  </button>
);

const QuestionsSection = ({
  questions,
  userAnswers,
  onAnswerChange,
  showResults,
  onCheckAnswers,
}) => {
  if (!questions) return null;

  const answeredQuestions = Object.keys(userAnswers).length;
  const totalQuestions = questions.questions.length;
  const score = calculateScore(questions, userAnswers);

  return (
    <div>
      {showResults && (
        <ScoreDisplay
          score={score}
          totalQuestions={totalQuestions}
          answeredQuestions={answeredQuestions}
        />
      )}

      {!showResults && (
        <CheckAnswersButton
          onCheckAnswers={onCheckAnswers}
          answeredQuestions={answeredQuestions}
          totalQuestions={totalQuestions}
        />
      )}

      {questions.questions.map((question, index) => (
        <QuestionCard
          key={index}
          question={question}
          questionIndex={index}
          userAnswer={userAnswers[index]}
          onAnswerChange={onAnswerChange}
          showResults={showResults}
        />
      ))}
    </div>
  );
};

const EmptyQuestionsState = () => (
  <div className='text-center py-8 text-gray-500'>
    <div className='text-4xl mb-4'>📖</div>
    <p>Enter a passage and generate questions to start practicing.</p>
  </div>
);

const QuestionsDisplay = ({
  questions,
  userAnswers,
  onAnswerChange,
  showResults,
  onCheckAnswers,
  isLoading,
}) => (
  <div className='card'>
    <h2 className='text-xl font-semibold text-gray-900 mb-4'>
      Comprehension Questions
    </h2>

    {isLoading && <QuestionsLoadingState />}
    {questions && !isLoading && (
      <QuestionsSection
        questions={questions}
        userAnswers={userAnswers}
        onAnswerChange={onAnswerChange}
        showResults={showResults}
        onCheckAnswers={onCheckAnswers}
      />
    )}
    {!questions && !isLoading && <EmptyQuestionsState />}
  </div>
);

const Reading = () => {
  const [passage, setPassage] = useState('');
  const [questions, setQuestions] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePassageChange = e => {
    setPassage(e.target.value);
    setError(''); // Clear error when user starts typing
  };

  const handlePassageSelect = content => {
    setPassage(content);
    setError('');
  };

  const handleGenerateQuestions = async () => {
    const validationError = validatePassage(passage);
    if (validationError) {
      setError(validationError);
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
      setError(
        'Failed to generate questions. Please check your API key and try again.'
      );
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer,
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

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <PageHeader />

      <div className='grid lg:grid-cols-2 gap-8'>
        <PassageInputSection
          passage={passage}
          onPassageChange={handlePassageChange}
          onGenerate={handleGenerateQuestions}
          onReset={handleReset}
          onPassageSelect={handlePassageSelect}
          isLoading={isLoading}
          error={error}
        />

        <QuestionsDisplay
          questions={questions}
          userAnswers={userAnswers}
          onAnswerChange={handleAnswerChange}
          showResults={showResults}
          onCheckAnswers={handleCheckAnswers}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Reading;
