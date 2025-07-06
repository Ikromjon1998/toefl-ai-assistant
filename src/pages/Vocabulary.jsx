import React, { useState, useEffect } from 'react';
import { getVocabularyDefinition } from '../api/openai';

const Vocabulary = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);
  const [showFlashcard, setShowFlashcard] = useState(false);

  // Sample TOEFL vocabulary words
  const sampleWords = [
    'arbitrary', 'comprehensive', 'elaborate', 'facilitate', 'hypothesis',
    'implicit', 'justify', 'legitimate', 'methodology', 'notion',
    'objective', 'paradigm', 'qualitative', 'rationale', 'synthesis',
    'theoretical', 'undermine', 'validate', 'widespread', 'yield'
  ];

  useEffect(() => {
    // Load saved progress from localStorage
    const savedKnown = localStorage.getItem('toefl-known-words');
    const savedUnknown = localStorage.getItem('toefl-unknown-words');
    
    if (savedKnown) setKnownWords(JSON.parse(savedKnown));
    if (savedUnknown) setUnknownWords(JSON.parse(savedUnknown));
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('toefl-known-words', JSON.stringify(knownWords));
    localStorage.setItem('toefl-unknown-words', JSON.stringify(unknownWords));
  }, [knownWords, unknownWords]);

  const handleLookupWord = async (word) => {
    if (!word.trim()) {
      setError('Please enter a word to look up.');
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
    localStorage.removeItem('toefl-known-words');
    localStorage.removeItem('toefl-unknown-words');
  };

  const getRandomWord = () => {
    const allWords = [...sampleWords];
    const availableWords = allWords.filter(word => 
      !knownWords.includes(word) && !unknownWords.includes(word)
    );
    
    if (availableWords.length === 0) {
      return null;
    }
    
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  const startFlashcard = () => {
    const word = getRandomWord();
    if (word) {
      setCurrentWord(word);
      setDefinition(null);
      setShowFlashcard(true);
    } else {
      setError('No more words available for flashcards!');
    }
  };

  const revealDefinition = async () => {
    if (currentWord && !definition) {
      await handleLookupWord(currentWord);
    }
  };

  const nextFlashcard = () => {
    const word = getRandomWord();
    if (word) {
      setCurrentWord(word);
      setDefinition(null);
    } else {
      setShowFlashcard(false);
      setError('No more words available!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🧠 TOEFL Vocabulary Trainer
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn and review TOEFL vocabulary with flashcards, word lookup, and progress tracking.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Word Lookup */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Word Lookup
          </h2>

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
                onKeyPress={(e) => e.key === 'Enter' && handleLookupWord(e.target.value)}
              />
              <button
                onClick={() => handleLookupWord(document.getElementById('word').value)}
                disabled={isLoading}
                className="btn-primary"
              >
                Lookup
              </button>
            </div>
          </div>

          {/* Sample Words */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Sample TOEFL Words:</h3>
            <div className="flex flex-wrap gap-2">
              {sampleWords.slice(0, 10).map((word) => (
                <button
                  key={word}
                  onClick={() => handleLookupWord(word)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 text-sm mt-2">Looking up definition...</p>
            </div>
          )}

          {definition && !isLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="font-semibold text-blue-900 mb-2">{definition.word}</h3>
              <p className="text-blue-800 mb-2">
                <strong>Definition:</strong> {definition.definition}
              </p>
              <p className="text-blue-800 mb-2">
                <strong>Part of Speech:</strong> {definition.partOfSpeech}
              </p>
              <p className="text-blue-800 mb-2">
                <strong>Example:</strong> {definition.example}
              </p>
              {definition.synonyms && definition.synonyms.length > 0 && (
                <p className="text-blue-800 mb-2">
                  <strong>Synonyms:</strong> {definition.synonyms.join(', ')}
                </p>
              )}
              <p className="text-blue-800">
                <strong>Difficulty:</strong> {definition.difficulty}
              </p>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleMarkAsKnown(definition.word)}
                  className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded text-sm"
                >
                  ✅ I Know This
                </button>
                <button
                  onClick={() => handleMarkAsUnknown(definition.word)}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm"
                >
                  ❌ Need to Review
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Flashcards */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Flashcards
          </h2>

          {!showFlashcard ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🃏</div>
              <p className="text-gray-600 mb-6">Practice with flashcards to test your vocabulary knowledge.</p>
              <button
                onClick={startFlashcard}
                className="btn-primary"
              >
                Start Flashcards
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-8 mb-6 min-h-[200px] flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentWord}
                </h3>
                
                {definition ? (
                  <div className="text-left">
                    <p className="text-gray-700 mb-2">
                      <strong>Definition:</strong> {definition.definition}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Example:</strong> {definition.example}
                    </p>
                    <p className="text-gray-700">
                      <strong>Difficulty:</strong> {definition.difficulty}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">Click "Reveal" to see the definition</p>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                {!definition ? (
                  <button
                    onClick={revealDefinition}
                    disabled={isLoading}
                    className="btn-primary"
                  >
                    Reveal Definition
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleMarkAsKnown(currentWord)}
                      className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg"
                    >
                      ✅ I Know This
                    </button>
                    <button
                      onClick={() => handleMarkAsUnknown(currentWord)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg"
                    >
                      ❌ Need to Review
                    </button>
                  </>
                )}
                <button
                  onClick={nextFlashcard}
                  className="btn-secondary"
                >
                  Next Card
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="mt-12 card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            📊 Your Progress
          </h2>
          <button
            onClick={handleClearProgress}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear Progress
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {knownWords.length}
            </div>
            <div className="text-green-700">Words Known</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-2">
              {unknownWords.length}
            </div>
            <div className="text-red-700">Need Review</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {sampleWords.length - knownWords.length - unknownWords.length}
            </div>
            <div className="text-blue-700">Remaining</div>
          </div>
        </div>

        {/* Word Lists */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">✅ Known Words:</h3>
            <div className="flex flex-wrap gap-2">
              {knownWords.map((word) => (
                <span
                  key={word}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                >
                  {word}
                </span>
              ))}
              {knownWords.length === 0 && (
                <p className="text-gray-500 text-sm">No words marked as known yet.</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">❌ Need Review:</h3>
            <div className="flex flex-wrap gap-2">
              {unknownWords.map((word) => (
                <span
                  key={word}
                  className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
                >
                  {word}
                </span>
              ))}
              {unknownWords.length === 0 && (
                <p className="text-gray-500 text-sm">No words marked for review yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vocabulary; 