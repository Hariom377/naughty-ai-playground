
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
    return "I'm having trouble connecting to my AI brain right now. Please try again in a moment.";
  }
};

/**
 * Generate sexting messages based on parameters
 */
export const generateSextingMessages = async (
  tone: string,
  context: string,
  explicitness: number,
  customPrompt?: string
): Promise<string[]> => {
  const prompt = `Generate 3 unique sexting messages with the following parameters:
    Tone: ${tone}
    Relationship context: ${context}
    Explicitness level: ${explicitness}%
    ${customPrompt ? `Additional details: ${customPrompt}` : ''}
    
    The messages should be creative, authentic-sounding, and appropriate for the specified tone and explicitness level.
    The messages should be suitable for sexting between consenting adults.
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
    console.error('Error generating sexting messages:', error);
    return [
      "I'm having trouble creating messages right now. Please try again later.",
      "You can try adjusting your parameters for different results.",
      "Remember that AI-generated content may require human refinement.",
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
    flirty: "You are flirty and playful, love teasing and being teased. Your messages are suggestive but tasteful.",
    dominant: "You are confident and dominant, know exactly what you want. Your messages are assertive and commanding.",
    submissive: "You are sweet and submissive, eager to please and be guided. Your messages show vulnerability and desire to fulfill your partner's needs.",
    romantic: "You are romantic and passionate, focused on emotional connection. Your messages are intimate and sensual.",
    experimental: "You are adventurous and experimental, always open to new experiences. Your messages are bold and creative.",
    seductive: "You are mysterious and intense, a master of seduction. Your messages build anticipation and desire."
  };

  const personalityDescription = personalityDescriptions[personalityType as keyof typeof personalityDescriptions] || 
    "You are a flirty and engaging conversation partner.";

  const prompt = `${personalityDescription}
    You are engaging in an intimate chat conversation with a human partner.
    Your responses should be 1-3 sentences long, engaging, and match your personality type.
    Respond in a way that encourages continued conversation.
    
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
    console.error('Error generating chat response:', error);
    return "I'm having trouble connecting right now. Can we try again in a moment?";
  }
};
