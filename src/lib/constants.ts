/**
 * Application Constants for Krishi Mitra
 * Centralized configuration and constants
 */

// Application Information
export const APP_CONFIG = {
  NAME: 'കൃഷി മിത്ര',
  NAME_EN: 'Krishi Mitra',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered personal farming assistant for Kerala\'s farmers',
  DESCRIPTION_MALAYALAM: 'കേരളത്തിലെ കർഷകർക്കായി AI പവർഡ് വ്യക്തിഗത കൃഷി സഹായി',
  AUTHOR: 'Krishi Mitra Team',
  SUPPORT_EMAIL: 'support@krishimitra.com',
  WEBSITE: 'https://krishimitra.com'
} as const;

// Language Configuration
export const LANGUAGES = {
  MALAYALAM: 'malayalam',
  ENGLISH: 'english'
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  BASE_URL: (import.meta as any).env?.VITE_API_BASE_URL || '/api',
  AI_SERVICE_URL: (import.meta as any).env?.VITE_AI_API_URL || '/api/ai-assistant'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  LANGUAGE: 'krishi-mitra-language',
  USER_DATA: 'krishi-mitra-user-data',
  FARM_DATA: 'krishi-mitra-farm-data',
  ANALYTICS_EVENTS: 'analytics-events',
  SETTINGS: 'krishi-mitra-settings'
} as const;

// Crop Types (Kerala-specific)
export const CROP_TYPES = [
  'നെൽ', // Rice
  'വാഴ', // Banana
  'കപ്പ', // Coconut
  'കുരുമുളക്', // Pepper
  'ഏലം', // Cardamom
  'തെങ്ങ്', // Palm
  'റബ്ബർ', // Rubber
  'കാപ്പി', // Coffee
  'ചായ', // Tea
  'പച്ചക്കറികൾ', // Vegetables
  'ഫലവൃക്ഷങ്ങൾ', // Fruit Trees
  'ഔഷധ സസ്യങ്ങൾ' // Medicinal Plants
] as const;

// Soil Types
export const SOIL_TYPES = [
  'കളിമണ്ണ്', // Clay
  'മണൽമണ്ണ്', // Sandy
  'കളിമണൽ', // Clay-Sandy
  'ലാറ്ററൈറ്റ്', // Laterite
  'ചുവന്ന മണ്ണ്', // Red Soil
  'കറുത്ത മണ്ണ്' // Black Soil
] as const;

// Irrigation Types
export const IRRIGATION_TYPES = [
  'മഴ', // Rain-fed
  'കിണർ', // Well
  'കുളം', // Pond
  'ഡ്രിപ്പ് ഇറിഗേഷൻ', // Drip Irrigation
  'സ്പ്രിംക്ലർ', // Sprinkler
  'നദി ജലം', // River Water
  'കാൻച്ചൽ' // Canal
] as const;

// Kerala Districts
export const KERALA_DISTRICTS = [
  'തിരുവനന്തപുരം',
  'കൊല്ലം',
  'പത്തനംതിട്ട',
  'ആലപ്പുഴ',
  'കോട്ടയം',
  'എറണാകുളം',
  'തൃശൂർ',
  'പാലക്കാട്',
  'മലപ്പുറം',
  'കോഴിക്കോട്',
  'വയനാട്',
  'കണ്ണൂർ',
  'കാസർഗോഡ്',
  'ഇടുക്കി'
] as const;

// Weather Conditions
export const WEATHER_CONDITIONS = {
  SUNNY: { malayalam: 'സൂര്യപ്രകാശം', english: 'Sunny' },
  CLOUDY: { malayalam: 'മേഘാവൃതം', english: 'Cloudy' },
  RAINY: { malayalam: 'മഴ', english: 'Rainy' },
  WINDY: { malayalam: 'കാറ്റുള്ള', english: 'Windy' },
  HUMID: { malayalam: 'ഈർപ്പം', english: 'Humid' },
  HOT: { malayalam: 'ചൂട്', english: 'Hot' },
  COOL: { malayalam: 'തണുപ്പ്', english: 'Cool' }
} as const;

// Growth Stages
export const GROWTH_STAGES = {
  SEEDING: { malayalam: 'വിത്ത് വിതയ്ക്കൽ', english: 'Seeding' },
  GERMINATION: { malayalam: 'മുളയ്ക്കൽ', english: 'Germination' },
  VEGETATIVE: { malayalam: 'വളർച്ചാ ഘട്ടം', english: 'Vegetative Growth' },
  FLOWERING: { malayalam: 'പുഷ്പിക്കൽ', english: 'Flowering' },
  FRUITING: { malayalam: 'കായ്ക്കൽ', english: 'Fruiting' },
  MATURITY: { malayalam: 'പാകമാകൽ', english: 'Maturity' },
  HARVEST: { malayalam: 'വിളവെടുപ്പ്', english: 'Harvest' }
} as const;

// AI Assistant Configuration
export const AI_CONFIG = {
  MAX_MESSAGE_LENGTH: 1000,
  RESPONSE_TIMEOUT: 30000,
  VOICE_TIMEOUT: 60000,
  MAX_RETRY_ATTEMPTS: 3,
  SUPPORTED_LANGUAGES: [LANGUAGES.MALAYALAM, LANGUAGES.ENGLISH]
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  TOAST_DURATION: 5000,
  MODAL_ANIMATION_DURATION: 200,
  PAGINATION_SIZE: 20
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  VOICE_INPUT: (import.meta as any).env?.VITE_ENABLE_VOICE_INPUT !== 'false',
  OFFLINE_MODE: (import.meta as any).env?.VITE_ENABLE_OFFLINE_MODE !== 'false',
  PUSH_NOTIFICATIONS: (import.meta as any).env?.VITE_ENABLE_PUSH_NOTIFICATIONS !== 'false',
  ANALYTICS: (import.meta as any).env?.VITE_ENABLE_ANALYTICS === 'true',
  DEBUG_MODE: (import.meta as any).env?.DEV
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: {
    malayalam: 'നെറ്റ്‌വർക്ക് പ്രശ്നമുണ്ട്. ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കുക.',
    english: 'Network error. Please check your internet connection.'
  },
  AI_SERVICE_ERROR: {
    malayalam: 'AI സേവനം ലഭ്യമല്ല. ദയവായി പിന്നീട് ശ്രമിക്കുക.',
    english: 'AI service is currently unavailable. Please try again later.'
  },
  GENERIC_ERROR: {
    malayalam: 'എന്തോ പ്രശ്നം ഉണ്ടായി. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
    english: 'Something went wrong. Please try again.'
  }
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTRATION_COMPLETE: {
    malayalam: 'രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയാക്കി!',
    english: 'Registration completed successfully!'
  },
  SETTINGS_SAVED: {
    malayalam: 'സെറ്റിംഗുകൾ സേവ് ചെയ്തു!',
    english: 'Settings saved successfully!'
  }
} as const;

// Date and Time Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  TIMESTAMP: 'YYYY-MM-DD HH:mm:ss'
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PHONE: /^[6-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MESSAGE_MIN_LENGTH: 1,
  MESSAGE_MAX_LENGTH: 1000
} as const;

export default {
  APP_CONFIG,
  LANGUAGES,
  API_CONFIG,
  STORAGE_KEYS,
  CROP_TYPES,
  SOIL_TYPES,
  IRRIGATION_TYPES,
  KERALA_DISTRICTS,
  WEATHER_CONDITIONS,
  GROWTH_STAGES,
  AI_CONFIG,
  UI_CONFIG,
  FEATURE_FLAGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DATE_FORMATS,
  VALIDATION_RULES
};
