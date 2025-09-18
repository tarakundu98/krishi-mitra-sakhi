import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'malayalam' | 'english';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object
const translations = {
  // Welcome/Landing Page
  'app.title': {
    malayalam: 'കൃഷി സഖി',
    english: 'Krishi Sakhi'
  },
  'app.subtitle': {
    malayalam: 'നിങ്ങളുടെ AI പവർഡ് വ്യക്തിഗത കൃഷി സഹായി',
    english: 'Your AI-Powered Personal Farming Assistant'
  },
  'app.description': {
    malayalam: 'കേരളത്തിലെ ചെറുകിട കർഷകർക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത, മലയാളത്തിൽ സംസാരിക്കുന്ന ബുദ്ധിമാനായ കൃഷി ഉപദേഷ്ടാവ്',
    english: 'Intelligent farming advisor designed specifically for Kerala\'s smallholder farmers, speaking your language'
  },
  'button.getStarted': {
    malayalam: 'ആരംഭിക്കുക',
    english: 'Get Started'
  },
  'button.goToDashboard': {
    malayalam: 'ഡാഷ്ബോർഡിലേക്ക് പോകുക',
    english: 'Go to Dashboard'
  },
  'feature.smartAdvice.title': {
    malayalam: 'സ്മാർട്ട് ഉപദേശം',
    english: 'Smart Advice'
  },
  'feature.smartAdvice.desc': {
    malayalam: 'കാലാവസ്ഥ, മണ്ണ്, വിള എന്നിവ അനുസരിച്ച് വ്യക്തിഗതമാക്കിയ കൃഷി ഉപദേശങ്ങൾ',
    english: 'Personalized farming advice based on weather, soil, and crop conditions'
  },
  'feature.malayalamSupport.title': {
    malayalam: 'മലയാളം സപ്പോർട്ട്',
    english: 'Malayalam Support'
  },
  'feature.malayalamSupport.desc': {
    malayalam: 'ശബ്ദം, ടെക്സ്റ്റ് - രണ്ടിലും മലയാളത്തിൽ സംസാരിക്കാം',
    english: 'Communicate in Malayalam through voice and text'
  },
  'feature.secure.title': {
    malayalam: 'സുരക്ഷിതം',
    english: 'Secure'
  },
  'feature.secure.desc': {
    malayalam: 'നിങ്ങളുടെ എല്ലാ വിവരങ്ങളും സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു',
    english: 'All your information is stored securely and safely'
  },

  // Dashboard
  'dashboard.greeting': {
    malayalam: 'സുപ്രഭാതം',
    english: 'Good Morning'
  },
  'dashboard.today': {
    malayalam: 'ഇന്ന് ചൊവ്വ',
    english: 'Tuesday Today'
  },
  'dashboard.weatherAlert': {
    malayalam: 'അടുത്ത 2 ദിവസത്തിൽ മഴയ്ക്ക് സാധ്യത',
    english: 'Rain expected in the next 2 days'
  },
  'dashboard.aiAssistant': {
    malayalam: 'AI സഹായി',
    english: 'AI Assistant'
  },
  'dashboard.ask': {
    malayalam: 'ചോദിക്കുക',
    english: 'Ask'
  },
  'dashboard.weather': {
    malayalam: 'കാലാവസ്ഥ',
    english: 'Weather'
  },
  'dashboard.forecast': {
    malayalam: 'പ്രവചനം',
    english: 'Forecast'
  },
  'dashboard.reminders': {
    malayalam: 'ഓർമ്മപ്പെടുത്തലുകൾ',
    english: 'Reminders'
  },
  'dashboard.newCount': {
    malayalam: '3 പുതിയത്',
    english: '3 New'
  },
  'dashboard.crops': {
    malayalam: 'വിളകൾ',
    english: 'Crops'
  },
  'dashboard.track': {
    malayalam: 'ട്രാക്ക് ചെയ്യുക',
    english: 'Track'
  },
  'dashboard.todayActivities': {
    malayalam: 'ഇന്നത്തെ പ്രവർത്തനങ്ങൾ',
    english: "Today's Activities"
  },
  'dashboard.viewAll': {
    malayalam: 'എല്ലാം കാണുക',
    english: 'View All'
  },
  'dashboard.complete': {
    malayalam: 'പൂർത്തിയാക്കുക',
    english: 'Complete'
  },
  'dashboard.currentCrops': {
    malayalam: 'നിലവിലെ വിളകൾ',
    english: 'Current Crops'
  },
  'dashboard.growthStage': {
    malayalam: 'വളർച്ചാ ഘട്ടം',
    english: 'Growth Stage'
  },
  'dashboard.monthProgress': {
    malayalam: 'ഈ മാസത്തെ പുരോഗതി',
    english: "This Month's Progress"
  },
  'dashboard.emergencyHelp': {
    malayalam: 'അടിയന്തര സഹായം',
    english: 'Emergency Help'
  },
  'dashboard.talkToExperts': {
    malayalam: 'കൃഷി വിദഗ്ധരുമായി നേരിട്ട് സംസാരിക്കുക',
    english: 'Talk directly with farming experts'
  },
  'dashboard.call': {
    malayalam: 'വിളിക്കുക',
    english: 'Call'
  },

  // Chatbot
  'chatbot.title': {
    malayalam: 'കൃഷി സഖി',
    english: 'Krishi Sakhi'
  },
  'chatbot.subtitle': {
    malayalam: 'AI കൃഷി സഹായി',
    english: 'AI Farming Assistant'
  },
  'chatbot.thinking': {
    malayalam: 'ചിന്തിക്കുന്നു...',
    english: 'Thinking...'
  },
  'chatbot.commonQuestions': {
    malayalam: 'സാധാരണ ചോദ്യങ്ങൾ:',
    english: 'Common Questions:'
  },
  'chatbot.placeholder.malayalam': {
    malayalam: 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...',
    english: 'Type your question...'
  },
  'chatbot.placeholder.english': {
    malayalam: 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...',
    english: 'Type your question...'
  },

  // Registration Page  
  'registration.step1.title': {
    malayalam: 'അടിസ്ഥാന വിവരങ്ങൾ',
    english: 'Basic Information'
  },
  'registration.step1.subtitle': {
    malayalam: 'നിങ്ങളുടെ പേരും ബന്ധപ്പെടാനുള്ള വിവരങ്ങളും',
    english: 'Your name and contact details'
  },

  // Common
  'button.back': {
    malayalam: 'തിരികെ',
    english: 'Back'
  },
  'language.malayalam': {
    malayalam: 'മലയാളം',
    english: 'Malayalam'
  },
  'language.english': {
    malayalam: 'English',
    english: 'English'
  },
  'account.existing': {
    malayalam: 'ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?',
    english: 'Already have an account?'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('krishi-sakhi-language');
    return (saved as Language) || 'malayalam';
  });

  useEffect(() => {
    localStorage.setItem('krishi-sakhi-language', language);
    
    // Update document language
    document.documentElement.lang = language === 'malayalam' ? 'ml' : 'en';
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};