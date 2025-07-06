export async function getEssayFeedback(essayText) {
  console.log('🔍 Starting essay feedback request...');
  console.log('📝 Essay length:', essayText.length, 'characters');
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log('🔑 API Key present:', !!apiKey);
  console.log('🔑 API Key starts with sk-:', apiKey?.startsWith('sk-'));
  console.log('🔑 API Key length:', apiKey?.length);
  console.log('🔑 API Key preview:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
  
  try {
    console.log('📤 Making API request to OpenAI...');
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert TOEFL English tutor. Evaluate the following essay based on TOEFL writing criteria:
            - Organization and Development (0-5 points)
            - Language Use (0-5 points)
            - Grammar and Mechanics (0-5 points)
            
            Provide specific feedback using markdown formatting with the following structure:
            
            ## Overall Score: [X]/30
            
            ## Strengths
            - [List key strengths with bullet points]
            
            ## Areas for Improvement
            - [List areas that need work]
            
            ## Detailed Analysis
            
            ### Organization and Development
            [Provide specific feedback on essay structure, thesis, and development]
            
            ### Language Use
            [Comment on vocabulary, sentence variety, and language sophistication]
            
            ### Grammar and Mechanics
            [Address grammar, punctuation, and spelling issues]
            
            ## Specific Suggestions
            - [Actionable improvement suggestions]
            
            ## Sample Corrections
            
            **Example 1:**
            Original: "Technology make life easier."
            Correction: "Technology makes life easier."
            
            **Example 2:**
            Original: "Some people like technology, some people don't like technology."
            Correction: "While some people appreciate technology, others do not."
            
            **Example 3:**
            Original: "Life is complicated, technology more complicated."
            Correction: "Life has become more complicated, with technology adding further complexity."
            
            Be encouraging but honest. Use **bold** for emphasis, bullet points for lists, and clear headings for organization.`,
          },
          {
            role: "user",
            content: `Please evaluate this TOEFL essay:\n\n${essayText}`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Response received successfully');
    console.log('📊 Response data keys:', Object.keys(data));
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error getting essay feedback:", error);
    console.error("❌ Error message:", error.message);
    throw error;
  }
}

export async function generateReadingQuestions(passage) {
  console.log('🔍 Starting reading questions generation...');
  console.log('📖 Passage length:', passage.length, 'characters');
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log('🔑 API Key present:', !!apiKey);
  console.log('🔑 API Key starts with sk-:', apiKey?.startsWith('sk-'));
  console.log('🔑 API Key length:', apiKey?.length);
  console.log('🔑 API Key preview:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
  
  try {
    console.log('📤 Making API request to OpenAI...');
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Generate 5 multiple-choice reading comprehension questions based on the given passage. 
            Format your response as a JSON object with this structure:
            {
              "questions": [
                {
                  "question": "Question text here?",
                  "options": ["A", "B", "C", "D"],
                  "correctAnswer": "A",
                  "explanation": "Brief explanation of why this is correct"
                }
              ]
            }
            
            Make questions that test:
            - Main idea
            - Supporting details
            - Vocabulary in context
            - Inference
            - Author's purpose`,
          },
          {
            role: "user",
            content: `Generate questions for this passage:\n\n${passage}`,
          },
        ],
        max_tokens: 800,
        temperature: 0.5,
      }),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Response received successfully');
    console.log('📊 Response data keys:', Object.keys(data));
    
    const content = data.choices[0].message.content;
    console.log('📄 Raw response content length:', content.length);
    
    try {
      const parsed = JSON.parse(content);
      console.log('✅ JSON parsed successfully');
      return parsed;
    } catch (parseError) {
      console.error("❌ Error parsing JSON response:", parseError);
      console.error("❌ Raw content:", content);
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("❌ Error generating reading questions:", error);
    console.error("❌ Error message:", error.message);
    throw error;
  }
}

export async function getVocabularyDefinition(word) {
  console.log('🔍 Starting vocabulary lookup...');
  console.log('📚 Word:', word);
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log('🔑 API Key present:', !!apiKey);
  console.log('🔑 API Key starts with sk-:', apiKey?.startsWith('sk-'));
  console.log('🔑 API Key length:', apiKey?.length);
  console.log('🔑 API Key preview:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
  
  try {
    console.log('📤 Making API request to OpenAI...');
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Provide a comprehensive definition for the given word, suitable for TOEFL preparation. 
            Include:
            1. Definition
            2. Part of speech
            3. Example sentence
            4. Synonyms (if applicable)
            5. Difficulty level (Basic/Intermediate/Advanced)
            
            Format as JSON:
            {
              "word": "word",
              "definition": "definition",
              "partOfSpeech": "noun/verb/etc",
              "example": "example sentence",
              "synonyms": ["syn1", "syn2"],
              "difficulty": "Basic/Intermediate/Advanced"
            }`,
          },
          {
            role: "user",
            content: `Define this word: ${word}`,
          },
        ],
        max_tokens: 300,
        temperature: 0.3,
      }),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Response received successfully');
    console.log('📊 Response data keys:', Object.keys(data));
    
    const content = data.choices[0].message.content;
    console.log('📄 Raw response content length:', content.length);
    
    try {
      const parsed = JSON.parse(content);
      console.log('✅ JSON parsed successfully');
      return parsed;
    } catch (parseError) {
      console.error("❌ Error parsing JSON response:", parseError);
      console.error("❌ Raw content:", content);
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("❌ Error getting vocabulary definition:", error);
    console.error("❌ Error message:", error.message);
    throw error;
  }
} 