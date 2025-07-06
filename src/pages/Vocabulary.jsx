import React, { useState, useEffect } from 'react';
import { getVocabularyDefinition } from '../api/openai';

// Constants
const SAMPLE_WORDS = [
  'arbitrary', 'comprehensive', 'elaborate', 'facilitate', 'hypothesis',
  'implicit', 'justify', 'legitimate', 'methodology', 'notion',
  'objective', 'paradigm', 'qualitative', 'rationale', 'synthesis',
  'theoretical', 'undermine', 'validate', 'widespread', 'yield'
];

const STORAGE_KEYS = {
  KNOWN_WORDS: 'toefl-known-words',
  UNKNOWN_WORDS: 'toefl-unknown-words'
};

// Utility functions
const validateWord = (word) => {
  if (!word.trim()) {
    return 'Please enter a word to look up.';
  }
  return null;
};

const getRandomWord = (sampleWords, knownWords, unknownWords) => {
  const availableWords = sampleWords.filter(word => 
    !knownWords.includes(word) && !unknownWords.includes(word)
  );
  
  if (availableWords.length === 0) {
    return null;
  }
  
  return availableWords[Math.floor(Math.random() * availableWords.length)];
};

const loadFromStorage = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return [];
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

// Sub-components
const PageHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">
      🧠 TOEFL Vocabulary Trainer
    </h1>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Learn and review TOEFL vocabulary with flashcards, word lookup, and progress tracking.
    </p>
  </div>
);

const WordLookupInput = ({ onLookup, isLoading }) => (
  <div className="mb-6">
    <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-2">
      Enter a word to look up:
    </label>
    <div className="flex gap-2">
      <input
        id="word"
        type="text"
        placeholder="Enter a word..."
        className="input-field flex-1"
        onKeyPress={(e) => e.key === 'Enter' && onLookup(e.target.value)}
      />
      <button
        onClick={() => onLookup(document.getElementById('word').value)}
        disabled={isLoading}
        className="btn-primary"
      >
        Lookup
      </button>
    </div>
  </div>
);

const SampleWordButton = ({ word, onLookup }) => (
  <button
    onClick={() => onLookup(word)}
    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
  >
    {word}
  </button>
);

const SampleWordsSection = ({ words, onLookup }) => (
  <div className="mb-6">
    <h3 className="font-medium text-gray-900 mb-3">Sample TOEFL Words:</h3>
    <div className="flex flex-wrap gap-2">
      {words.slice(0, 10).map((word) => (
        <SampleWordButton key={word} word={word} onLookup={onLookup} />
      ))}
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
  <div className="text-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
    <p className="text-gray-600 text-sm mt-2">Looking up definition...</p>
  </div>
);

const DefinitionCard = ({ definition }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
    <h3 className="font-semibold text-blue-900 mb-2">{definition.word}</h3>
    <p className="text-blue-800 mb-2">
      <strong>Definition:</strong> {definition.definition}
    </p>
    <p className="text-blue-800 mb-2">
      <strong>Part of Speech:</strong> {definition.partOfSpeech}
    </p>
    {definition.example && (
      <p className="text-blue-800 mb-2">
        <strong>Example:</strong> {definition.example}
      </p>
    )}
    {definition.synonyms && (
      <p className="text-blue-800">
        <strong>Synonyms:</strong> {definition.synonyms.join(', ')}
      </p>
    )}
  </div>
);

const WordLookupSection = ({ onLookup, isLoading, error, definition }) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Word Lookup
    </h2>

    <WordLookupInput onLookup={onLookup} isLoading={isLoading} />
    <SampleWordsSection words={SAMPLE_WORDS} onLookup={onLookup} />
    <ErrorMessage error={error} />
    {isLoading && <LoadingSpinner />}
    {definition && !isLoading && <DefinitionCard definition={definition} />}
  </div>
);

const ProgressCard = ({ title, words, onMarkAsKnown, onMarkAsUnknown, type }) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      {title} ({words.length})
    </h2>
    
    {words.length === 0 ? (
      <p className="text-gray-500 text-center py-4">No words yet.</p>
    ) : (
      <div className="space-y-2">
        {words.map((word) => (
          <div key={word} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-700">{word}</span>
            <div className="flex gap-2">
              {type === 'known' ? (
                <button
                  onClick={() => onMarkAsUnknown(word)}
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  Mark Unknown
                </button>
              ) : (
                <button
                  onClick={() => onMarkAsKnown(word)}
                  className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                >
                  Mark Known
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Flashcard = ({ currentWord, definition, onReveal, onNext, onMarkAsKnown, onMarkAsUnknown, showFlashcard }) => {
  if (!showFlashcard) return null;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        🃏 Flashcard Mode
      </h2>
      
      <div className="text-center py-8">
        <div className="text-4xl mb-6">🧠</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentWord}</h3>
        
        {!definition ? (
          <button
            onClick={onReveal}
            className="btn-primary mb-4"
          >
            Reveal Definition
          </button>
        ) : (
          <div className="mb-6">
            <DefinitionCard definition={definition} />
          </div>
        )}
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onMarkAsUnknown(currentWord)}
            className="btn-secondary"
          >
            Don't Know
          </button>
          <button
            onClick={() => onMarkAsKnown(currentWord)}
            className="btn-primary"
          >
            Know It
          </button>
          <button
            onClick={onNext}
            className="btn-secondary"
          >
            Next Card
          </button>
        </div>
      </div>
    </div>
  );
};

const FlashcardControls = ({ onStartFlashcard, onClearProgress, hasWords }) => (
  <div className="card">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Flashcard Mode
    </h2>
    
    <div className="space-y-4">
      <button
        onClick={onStartFlashcard}
        disabled={!hasWords}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Start Flashcard Session
      </button>
      
      <button
        onClick={onClearProgress}
        className="btn-secondary w-full"
      >
        Clear All Progress
      </button>
    </div>
    
    {!hasWords && (
      <p className="text-sm text-gray-500 mt-2 text-center">
        No words available for flashcards. Try marking some words as known/unknown first.
      </p>
    )}
  </div>
);

const Vocabulary = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [showFlashcard, setShowFlashcard] = useState(false);

  // Load saved progress on component mount
  useEffect(() => {
    const savedKnown = loadFromStorage(STORAGE_KEYS.KNOWN_WORDS);
    const savedUnknown = loadFromStorage(STORAGE_KEYS.UNKNOWN_WORDS);
    
    setKnownWords(savedKnown);
    setUnknownWords(savedUnknown);
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.KNOWN_WORDS, knownWords);
  }, [knownWords]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.UNKNOWN_WORDS, unknownWords);
  }, [unknownWords]);

  const handleLookupWord = async (word) => {
    const validationError = validateWord(word);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setDefinition(null);

    try {
      const result = await getVocabularyDefinition(word);
      setDefinition(result);
      setCurrentWord(word);
    } catch (err) {
      setError('Failed to get definition. Please check your API key and try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsKnown = (word) => {
    if (!knownWords.includes(word)) {
      setKnownWords(prev => [...prev, word]);
    }
    if (unknownWords.includes(word)) {
      setUnknownWords(prev => prev.filter(w => w !== word));
    }
  };

  const handleMarkAsUnknown = (word) => {
    if (!unknownWords.includes(word)) {
      setUnknownWords(prev => [...prev, word]);
    }
    if (knownWords.includes(word)) {
      setKnownWords(prev => prev.filter(w => w !== word));
    }
  };

  const handleClearProgress = () => {
    setKnownWords([]);
    setUnknownWords([]);
    localStorage.removeItem(STORAGE_KEYS.KNOWN_WORDS);
    localStorage.removeItem(STORAGE_KEYS.UNKNOWN_WORDS);
  };

  const handleStartFlashcard = () => {
    const word = getRandomWord(SAMPLE_WORDS, knownWords, unknownWords);
    if (word) {
      setCurrentWord(word);
      setDefinition(null);
      setShowFlashcard(true);
    } else {
      setError('No more words available for flashcards!');
    }
  };

  const handleRevealDefinition = async () => {
    if (currentWord && !definition) {
      await handleLookupWord(currentWord);
    }
  };

  const handleNextFlashcard = () => {
    const word = getRandomWord(SAMPLE_WORDS, knownWords, unknownWords);
    if (word) {
      setCurrentWord(word);
      setDefinition(null);
    } else {
      setShowFlashcard(false);
      setError('No more words available!');
    }
  };

  const hasAvailableWords = getRandomWord(SAMPLE_WORDS, knownWords, unknownWords) !== null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <WordLookupSection
            onLookup={handleLookupWord}
            isLoading={isLoading}
            error={error}
            definition={definition}
          />
          
          <FlashcardControls
            onStartFlashcard={handleStartFlashcard}
            onClearProgress={handleClearProgress}
            hasWords={hasAvailableWords}
          />
        </div>

        <div className="space-y-8">
          <Flashcard
            currentWord={currentWord}
            definition={definition}
            onReveal={handleRevealDefinition}
            onNext={handleNextFlashcard}
            onMarkAsKnown={handleMarkAsKnown}
            onMarkAsUnknown={handleMarkAsUnknown}
            showFlashcard={showFlashcard}
          />
          
          <ProgressCard
            title="Known Words"
            words={knownWords}
            onMarkAsKnown={handleMarkAsKnown}
            onMarkAsUnknown={handleMarkAsUnknown}
            type="known"
          />
          
          <ProgressCard
            title="Unknown Words"
            words={unknownWords}
            onMarkAsKnown={handleMarkAsKnown}
            onMarkAsUnknown={handleMarkAsUnknown}
            type="unknown"
          />
        </div>
      </div>
    </div>
  );
};

export default Vocabulary; 