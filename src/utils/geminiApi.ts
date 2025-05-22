
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
 * Generate anniversary ideas based on parameters
 */
export const generateAnniversaryIdeas = async (
  ideaType: string,
  milestone: string,
  budget: string,
  season?: string,
  interests?: string,
  memories?: string
): Promise<string[]> => {
  const prompt = `Generate 3 creative anniversary ideas for couples with these parameters:
    - Type of ideas: ${ideaType}
    - Anniversary milestone: ${milestone} years
    - Budget: ${budget}
    ${season ? `- Season/time of year: ${season}` : ''}
    ${interests ? `- Interests/hobbies: ${interests}` : ''}
    ${memories ? `- Special memories to incorporate: ${memories}` : ''}

    Each idea should include:
    1. A title/heading
    2. A brief description (2-3 sentences)
    3. Estimated cost or budget range
    4. A suggested gift that pairs well with the idea (if applicable)

    Make ideas practical, specific, and ready to implement. Format each idea clearly with line breaks between sections.`;

  try {
    const response = await generateWithGemini({
      prompt,
      temperature: 0.8,
      maxOutputTokens: 1000,
    });

    // Split the response into individual ideas
    return response.split(/\n\n(?=\d\.|\w+:|\*\*|\#)/).map(idea => idea.trim()).slice(0, 3);
  } catch (error) {
    console.error('Error generating anniversary ideas:', error);
    return [
      "Memory Lane Dinner\nRecreate your first date at the same restaurant or cook your first meal together at home. Add photos from your relationship as table decorations and reminisce about your journey.\nCost: $50-$150\nGift idea: A photo album with space to add future memories",
      
      "Star Gazing Picnic\nPack a basket with your favorite foods and a bottle of champagne. Find a quiet spot under the stars, bring blankets and star maps to identify constellations that were visible on your wedding night.\nCost: $30-$75\nGift idea: A star named after both of you with certificate",
      
      "Memory Scavenger Hunt\nCreate clues leading your partner to significant places in your relationship. Hide small gifts or love notes at each location, culminating in a special dinner or activity.\nCost: $50-$200\nGift idea: A custom puzzle made from a favorite photo"
    ];
  }
};

/**
 * Generate first date ideas based on parameters
 */
export const generateFirstDateIdeas = async (
  interest: string,
  budget: string,
  location: string,
  season?: string,
  personality?: string,
  isFirstDate: boolean = true
): Promise<string[]> => {
  const prompt = `Generate 3 creative ${isFirstDate ? 'first ' : ''}date ideas with these parameters:
    ${interest ? `- Interest category: ${interest}` : ''}
    ${budget ? `- Budget: ${budget}` : ''}
    ${location ? `- Location: ${location}` : ''}
    ${season ? `- Season: ${season}` : ''}
    ${personality ? `- Personality type: ${personality}` : ''}
    
    Each idea should include:
    1. A catchy title
    2. A detailed description (2-3 sentences explaining the date)
    3. Why it works for ${isFirstDate ? 'a first date' : 'dates'} (a brief explanation of why this is a good choice)
    4. Any tips or things to consider

    Make the ideas creative, specific, and tailored to the parameters. Format each idea with the title first, followed by the details.`;

  try {
    const response = await generateWithGemini({
      prompt,
      temperature: 0.8,
      maxOutputTokens: 1000,
    });

    // Split the response into individual ideas
    return response.split(/\n\n(?=\d\.|\w+:|\*\*|\#)/).map(idea => idea.trim()).slice(0, 3);
  } catch (error) {
    console.error('Error generating first date ideas:', error);
    return [
      "Coffee Shop Exploration\nVisit three unique local coffee shops over a few hours, sampling a different drink or treat at each. This creates natural transitions and allows for both sitting and walking conversations.\nWhy it works: The casual atmosphere reduces pressure, multiple locations provide fresh conversation starters, and it's easy to extend or end based on how things are going.\nTip: Research the shops beforehand to ensure they have good seating and reasonable noise levels.",
      
      "Interactive Museum Date\nVisit a science, art, or specialty museum with interactive exhibits that encourage playful engagement and conversation. Look for evening events that might include music and refreshments.\nWhy it works: The environment provides endless conversation starters and reveals your date's curiosities and personality in a relaxed setting.\nTip: Check if the museum has a café or restaurant for a natural transition to continue the conversation afterward.",
      
      "Sunset Picnic\nPrepare a simple but thoughtful picnic with finger foods, drinks, and a comfortable blanket. Choose a scenic park, riverside, or hilltop location with a good sunset view.\nWhy it works: The beautiful setting creates a romantic atmosphere while the informal picnic setup keeps things relaxed and allows for natural conversation.\nTip: Pack extra layers as temperatures may drop after sunset, and bring a small bluetooth speaker for subtle background music."
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
