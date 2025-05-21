
/**
 * Utility for interacting with Google's Gemini API
 */

// This is a publishable API key for Google's Gemini API
const GEMINI_API_KEY = "AIzaSyDZn4R5pteQsii3PfCVN87psfs-QhrFhYs";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

interface GeminiRequestOptions {
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  topK?: number;
  topP?: number;
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

/**
 * Generates content using Google's Gemini API
 */
export const generateWithGemini = async (options: GeminiRequestOptions): Promise<string> => {
  try {
    const { prompt, temperature = 0.7, maxOutputTokens = 800, topK = 40, topP = 0.95 } = options;
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature,
          maxOutputTokens,
          topK,
          topP,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating with Gemini:', error);
    return "I'm having a moment connecting to my heart right now. Could we try again in a moment? 💕";
  }
};

/**
 * Generate romantic messages based on parameters
 */
export const generateSextingMessages = async (
  tone: string,
  context: string,
  explicitness: number,
  customPrompt?: string
): Promise<string[]> => {
  const prompt = `Generate 3 unique romantic messages with the following parameters:
    Tone: ${tone}
    Relationship context: ${context}
    Passion intensity level: ${explicitness}%
    ${customPrompt ? `Personal details: ${customPrompt}` : ''}
    
    The messages should be creative, heartfelt, and express genuine emotion with the specified tone and intensity level.
    Each message should feel authentic and personal, suitable for lovers or romantic partners.
    Add a romantic emoji at the end of each message (like 💕, 💖, 💘, 💓, 💗, 💞, 💫, ✨).
    Return ONLY the 3 messages, one per line, with no additional text, numbering, or formatting.`;

  try {
    const response = await generateWithGemini({
      prompt,
      temperature: 0.8,
      maxOutputTokens: 500,
    });

    // Split the response into individual messages
    return response.split('\n').filter(line => line.trim() !== '').slice(0, 3);
  } catch (error) {
    console.error('Error generating romantic messages:', error);
    return [
      "My heart skips a beat whenever I think of you. What I wouldn't give to be in your arms right now... 💖",
      "You bring out a side of me that no one else sees. The way you make me feel is beyond words... 💞",
      "Distance means nothing when someone means everything. I'm counting the moments until we're together again... 💫",
    ];
  }
};

/**
 * Generate chat responses based on AI personality and conversation history
 */
export const generateChatResponse = async (
  personalityType: string,
  messages: { sender: string, text: string }[],
  userMessage: string
): Promise<string> => {
  // Create a prompt with conversation history and personality
  const lastMessages = messages.slice(-5); // Use the last 5 messages for context
  
  const conversationHistory = lastMessages
    .map(msg => `${msg.sender === 'user' ? 'Human' : 'AI'}: ${msg.text}`)
    .join('\n');

  const personalityDescriptions = {
    flirty: "You are sweet and flirty, playful yet heartfelt. Your messages convey genuine affection with a touch of playfulness.",
    dominant: "You are confidently romantic and passionate, expressing your desires with a mix of tenderness and assertiveness.",
    submissive: "You are tenderly devoted and gentle, showing deep admiration and care in your words.",
    romantic: "You are deeply romantic and passionate, focused on emotional connection and intimate feelings.",
    experimental: "You are imaginative and adventurous in your expressions of love, always finding new ways to express affection.",
    seductive: "You are mysteriously alluring, weaving words that build anticipation and express deep desire."
  };

  const personalityDescription = personalityDescriptions[personalityType as keyof typeof personalityDescriptions] || 
    "You are a warm and engaging romantic conversation partner.";

  const prompt = `${personalityDescription}
    You are engaging in an intimate romantic chat conversation with a human partner.
    Your responses should be 1-3 sentences long, warm, and match your personality type.
    Add occasional romantic emojis (💕, 💖, 💘, etc) to enhance your messages.
    Respond in a way that encourages continued connection and conversation.
    
    Recent conversation:
    ${conversationHistory}
    Human: ${userMessage}
    AI:`;

  try {
    return await generateWithGemini({
      prompt,
      temperature: 0.9,
      maxOutputTokens: 250,
    });
  } catch (error) {
    console.error('Error generating romantic chat response:', error);
    return "I'm having a moment connecting with my heart. Could we try again? I so enjoy our conversations... 💫";
  }
};
