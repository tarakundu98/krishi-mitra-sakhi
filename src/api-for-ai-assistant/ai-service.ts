/**
 * AI Assistant Service for Krishi Mitra
 * Professional AI integration layer for agricultural assistance
 * Handles conversation management, speech processing, and contextual farming advice
 * 
 * @author Krishi Mitra Team
 * @version 1.0.0
 */

interface AIMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: 'malayalam' | 'english';
  audioUrl?: string;
}

interface AIResponse {
  message: string;
  confidence: number;
  language: 'malayalam' | 'english';
  audioUrl?: string;
  actionType?: 'advice' | 'reminder' | 'alert' | 'question';
}

interface FarmContext {
  farmerId: string;
  location: string;
  cropType: string[];
  landSize: number;
  soilType: string;
  irrigationType: string;
  currentSeason: string;
}

class AIAssistantService {
  private apiKey: string;
  private baseURL: string;
  private retryAttempts: number = 3;
  private timeout: number = 10000; // 10 seconds
  
  constructor() {
    // Use the provided Google AI API key
    this.apiKey = 'AIzaSyDRTh6N8oQ4FXdeyua5RZdeLKN4Vdor690';
    // Prefer the current public text model endpoint
    // Docs: https://ai.google.dev/api/generate-content
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
  }

  /**
   * Send a message to AI assistant and get response
   * Includes retry logic and proper error handling
   */
  async sendMessage(
    message: string, 
    farmContext: FarmContext,
    language: 'malayalam' | 'english' = 'english'
  ): Promise<AIResponse> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
  // Use actual Google Gemini API (will throw on HTTP errors)
        const response = await this.callGeminiAPI(message, farmContext, language);
        
        // Log for debugging (only in development)
        if (import.meta.env.DEV) {
          console.log('AI Request:', { message, farmContext, language });
          console.log('AI Response:', response);
        }
        
        return response;
      } catch (error) {
        lastError = error as Error;
        console.warn(`AI Service attempt ${attempt} failed:`, error);
        
        // Don't retry on the last attempt
        if (attempt === this.retryAttempts) break;
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    
    // All attempts failed - surface error so UI can show a message
    console.error('AI Service failed after retries:', lastError);
    throw lastError ?? new Error('AI service unavailable');
  }

  /**
   * Convert text to speech for Malayalam/English
   */
  async textToSpeech(text: string, language: 'malayalam' | 'english'): Promise<string> {
    try {
      // Placeholder for TTS API integration
      return await this.mockTTSCall(text, language);
    } catch (error) {
      console.error('TTS Error:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text for Malayalam/English
   */
  async speechToText(audioBlob: Blob, language: 'malayalam' | 'english'): Promise<string> {
    try {
      // Placeholder for STT API integration
      return await this.mockSTTCall(audioBlob, language);
    } catch (error) {
      console.error('STT Error:', error);
      throw error;
    }
  }

  /**
   * Get personalized farming advice based on context
   */
  async getFarmingAdvice(
    query: string,
    farmContext: FarmContext,
    language: 'malayalam' | 'english'
  ): Promise<AIResponse> {
    const contextualQuery = `Farming context: ${JSON.stringify(farmContext)}. Question: ${query}`;
    return this.sendMessage(contextualQuery, farmContext, language);
  }

  /**
   * Call Google Gemini API for AI responses
   */
  private async callGeminiAPI(
    message: string,
    farmContext: FarmContext,
    language: 'malayalam' | 'english'
  ): Promise<AIResponse> {
    const prompt = this.buildFarmingPrompt(message, farmContext, language);
    
    const requestBody = {
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      // Keep default safety; change if you need fewer blocks
      // safetySettings: []
    } as const;

    const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Google AI API');
    }

    // Some responses return multiple parts; join them for a complete message
    const parts = data.candidates[0].content.parts || [];
    const aiMessage = parts.map((p: any) => p.text ?? '').join('').trim();

    return {
      message: aiMessage,
      confidence: 0.9,
      language,
      actionType: 'advice'
    };
  }

  /**
   * Build farming-specific prompt for AI
   */
  private buildFarmingPrompt(
    message: string,
    farmContext: FarmContext,
    language: 'malayalam' | 'english'
  ): string {
    const languageInstruction = language === 'malayalam' 
      ? 'Please respond in Malayalam language.'
      : 'Please respond in English language.';

    return `You are Krishi Mitra, an AI farming assistant for Kerala farmers. ${languageInstruction}

Farmer Context:
- Location: ${farmContext.location}
- Crops: ${farmContext.cropType.join(', ')}
- Land Size: ${farmContext.landSize} acres
- Soil Type: ${farmContext.soilType}
- Irrigation: ${farmContext.irrigationType}
- Season: ${farmContext.currentSeason}

Farmer's Question: ${message}

Please provide helpful, practical farming advice specific to Kerala's agricultural conditions. Keep responses concise and actionable.`;
  }

  // Mock implementations - replace with actual API integrations
  private async mockAPICall(
    message: string, 
    farmContext: FarmContext, 
    language: 'malayalam' | 'english'
  ): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      malayalam: [
        'നിങ്ങളുടെ വിളകൾക്ക് ഇപ്പോൾ ജലം നൽകേണ്ട സമയമാണ്.',
        'കീട നിയന്ത്രണത്തിന് നീം എണ്ണ ഉപയോഗിക്കാവുന്നതാണ്.',
        'അടുത്ത ആഴ്ച മഴ പ്രതീക്ഷിക്കുന്നു. വിത്ത് വിതയ്ക്കാൻ നല്ല സമയം.',
        'നിങ്ങളുടെ പ്രദേശത്ത് സർക്കാർ സബ്സിഡി ലഭ്യമാണ്.',
      ],
      english: [
        'Based on your crop type and weather, watering is recommended now.',
        'For pest control, consider using neem oil as an organic solution.',
        'Weather forecast shows rain next week. Good time for sowing.',
        'Government subsidy schemes are available for your area.',
      ]
    };

    const randomResponse = responses[language][Math.floor(Math.random() * responses[language].length)];

    return {
      message: randomResponse,
      confidence: 0.85,
      language,
      actionType: 'advice'
    };
  }

  private async mockTTSCall(text: string, language: 'malayalam' | 'english'): Promise<string> {
    // Simulate TTS processing
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return placeholder audio URL
    return '/mock-audio-response.mp3';
  }

  private async mockSTTCall(audioBlob: Blob, language: 'malayalam' | 'english'): Promise<string> {
    // Simulate STT processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockTranscriptions = {
      malayalam: 'എന്റെ വിളകളിൽ കീടങ്ങൾ കാണുന്നു',
      english: 'I see pests on my crops'
    };
    
    return mockTranscriptions[language];
  }
}

// Export singleton instance
export const aiAssistant = new AIAssistantService();
export type { AIMessage, AIResponse, FarmContext };