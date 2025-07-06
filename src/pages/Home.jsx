import React from 'react';

// Constants
const FEATURES = [
  {
    id: 'writing',
    title: '✍️ Writing Practice',
    description:
      'Get AI-powered feedback on your TOEFL essays with detailed scoring and improvement suggestions.',
    icon: '✍️',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  {
    id: 'reading',
    title: '📖 Reading Comprehension',
    description:
      'Practice with authentic passages and AI-generated questions to improve your reading skills.',
    icon: '📖',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  {
    id: 'vocabulary',
    title: '🧠 Vocabulary Trainer',
    description:
      'Learn and review TOEFL vocabulary with flashcards, quizzes, and spaced repetition.',
    icon: '🧠',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
  },
];

const STATS = [
  {
    title: 'AI-Powered',
    description: 'Advanced feedback using GPT technology',
  },
  {
    title: 'TOEFL-Focused',
    description: 'Specifically designed for TOEFL exam preparation',
  },
  {
    title: 'Free Access',
    description: 'No cost, unlimited practice sessions',
  },
];

const WRITING_TIPS = [
  'Practice timed essay writing (30 minutes)',
  'Focus on clear thesis statements',
  'Use specific examples and details',
  'Review grammar and vocabulary',
];

const READING_TIPS = [
  'Read academic texts regularly',
  'Practice skimming and scanning',
  'Pay attention to main ideas',
  'Build vocabulary systematically',
];

// Sub-components
const FeatureCard = ({ feature, onClick }) => (
  <div
    className='card hover:shadow-lg transition-shadow duration-300 cursor-pointer'
    onClick={() => onClick(feature.id)}
  >
    <div
      className={`${feature.color} ${feature.hoverColor} w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mb-4 transition-colors duration-200`}
    >
      {feature.icon}
    </div>
    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
      {feature.title}
    </h3>
    <p className='text-gray-600'>{feature.description}</p>
  </div>
);

const StatCard = ({ stat }) => (
  <div>
    <div className='text-3xl font-bold mb-2'>{stat.title}</div>
    <div className='text-blue-100'>{stat.description}</div>
  </div>
);

const TipsSection = ({ title, tips }) => (
  <div>
    <h3 className='font-semibold text-gray-900 mb-2'>{title}</h3>
    <ul className='text-gray-600 space-y-1'>
      {tips.map((tip, index) => (
        <li key={index}>• {tip}</li>
      ))}
    </ul>
  </div>
);

const HeroSection = () => (
  <div className='text-center mb-12'>
    <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
      Master the TOEFL with AI
    </h1>
    <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
      Your personal AI tutor for TOEFL preparation. Practice writing, reading,
      and vocabulary with intelligent feedback and personalized learning.
    </p>
  </div>
);

const FeaturesGrid = ({ features, onFeatureClick }) => (
  <div className='grid md:grid-cols-3 gap-8 mb-12'>
    {features.map(feature => (
      <FeatureCard
        key={feature.id}
        feature={feature}
        onClick={onFeatureClick}
      />
    ))}
  </div>
);

const StatsSection = () => (
  <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-12'>
    <div className='grid md:grid-cols-3 gap-8 text-center'>
      {STATS.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  </div>
);

const GettingStartedSection = ({ onPageChange }) => (
  <div className='text-center'>
    <h2 className='text-2xl font-bold text-gray-900 mb-4'>Ready to Start?</h2>
    <p className='text-gray-600 mb-6'>
      Choose a practice mode above or explore our features to begin your TOEFL
      preparation journey.
    </p>
    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
      <button onClick={() => onPageChange('writing')} className='btn-primary'>
        Start Writing Practice
      </button>
      <button onClick={() => onPageChange('reading')} className='btn-secondary'>
        Try Reading Practice
      </button>
    </div>
  </div>
);

const TipsSectionComponent = () => (
  <div className='mt-16 bg-gray-50 rounded-lg p-8'>
    <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
      💡 TOEFL Preparation Tips
    </h2>
    <div className='grid md:grid-cols-2 gap-6'>
      <TipsSection title='Writing Section' tips={WRITING_TIPS} />
      <TipsSection title='Reading Section' tips={READING_TIPS} />
    </div>
  </div>
);

const Home = ({ onPageChange }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <HeroSection />
      <FeaturesGrid features={FEATURES} onFeatureClick={onPageChange} />
      <StatsSection />
      <GettingStartedSection onPageChange={onPageChange} />
      <TipsSectionComponent />
    </div>
  );
};

export default Home;
