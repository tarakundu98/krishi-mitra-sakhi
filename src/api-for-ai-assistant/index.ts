/**
 * AI Assistant API Integration Module
 * Centralized exports for all AI-related services
 */

export { aiAssistant } from './ai-service';
export type { AIMessage, AIResponse, FarmContext } from './ai-service';

// Configuration constants
export const AI_CONFIG = {
  // Replace with actual API endpoints
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.krishimitra.com/v1' 
    : '/api/v1',
  
  // Timeout settings
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  TTS_TIMEOUT: 10000,     // 10 seconds
  STT_TIMEOUT: 15000,     // 15 seconds
  
  // Language settings
  SUPPORTED_LANGUAGES: ['malayalam', 'english'] as const,
  DEFAULT_LANGUAGE: 'malayalam' as const,
  
  // Voice settings
  VOICE_SETTINGS: {
    malayalam: {
      voiceId: 'malayalam-female-1',
      speed: 1.0,
      pitch: 1.0
    },
    english: {
      voiceId: 'english-indian-female',
      speed: 1.0,
      pitch: 1.0
    }
  },
  
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 60,
  MAX_MESSAGE_LENGTH: 1000,
  
  // File upload limits
  MAX_AUDIO_SIZE_MB: 10,
  SUPPORTED_AUDIO_FORMATS: ['mp3', 'wav', 'webm', 'ogg']
};

// Error types
export enum AIErrorTypes {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_KEY_INVALID = 'API_KEY_INVALID',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  UNSUPPORTED_LANGUAGE = 'UNSUPPORTED_LANGUAGE',
  AUDIO_PROCESSING_FAILED = 'AUDIO_PROCESSING_FAILED',
  CONTEXT_TOO_LARGE = 'CONTEXT_TOO_LARGE',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE'
}

// Utility functions for AI integration
export const AIUtils = {
  /**
   * Validate message before sending to AI
   */
  validateMessage: (message: string): { isValid: boolean; error?: string } => {
    if (!message || message.trim().length === 0) {
      return { isValid: false, error: 'Message cannot be empty' };
    }
    
    if (message.length > AI_CONFIG.MAX_MESSAGE_LENGTH) {
      return { 
        isValid: false, 
        error: `Message too long. Maximum ${AI_CONFIG.MAX_MESSAGE_LENGTH} characters allowed.` 
      };
    }
    
    return { isValid: true };
  },

  /**
   * Format farmer context for API calls
   */
  formatFarmContext: (context: any) => {
    return {
      location: context?.location || 'Unknown',
      crops: Array.isArray(context?.cropType) ? context.cropType.join(', ') : 'Unknown',
      landSize: context?.landSize || 0,
      soilType: context?.soilType || 'Unknown',
      irrigation: context?.irrigationType || 'Unknown',
      season: context?.currentSeason || 'Unknown'
    };
  },

  /**
   * Get appropriate error message in Malayalam/English
   */
  getErrorMessage: (errorType: AIErrorTypes, language: 'malayalam' | 'english') => {
    const messages = {
      [AIErrorTypes.NETWORK_ERROR]: {
        malayalam: 'ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക',
        english: 'Please check your internet connection and try again'
      },
      [AIErrorTypes.API_KEY_INVALID]: {
        malayalam: 'സേവനം ലഭ്യമല്ല. കുറച്ച് സമയത്തിന് ശേഷം ശ്രമിക്കുക',
        english: 'Service unavailable. Please try again later'
      },
      [AIErrorTypes.RATE_LIMIT_EXCEEDED]: {
        malayalam: 'വളരെയധികം അഭ്യർത്ഥനകൾ. കുറച്ച് സമയം കാത്തിരിക്കുക',
        english: 'Too many requests. Please wait a moment'
      },
      [AIErrorTypes.SERVICE_UNAVAILABLE]: {
        malayalam: 'AI സേവനം ലഭ്യമല്ല. പിന്നീട് ശ്രമിക്കുക',
        english: 'AI service is currently unavailable. Please try later'
      }
    };
    
    return messages[errorType]?.[language] || messages[AIErrorTypes.SERVICE_UNAVAILABLE][language];
  }
};