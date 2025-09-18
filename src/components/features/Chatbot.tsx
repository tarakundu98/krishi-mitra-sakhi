import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LanguageToggle from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { aiAssistant, AIMessage, FarmContext } from '@/api-for-ai-assistant/ai-service';

interface ChatbotProps {
  onBack?: () => void;
  farmContext?: FarmContext;
}

const Chatbot: React.FC<ChatbotProps> = ({ 
  onBack = () => {},
  farmContext
}) => {
  const { t, language, setLanguage } = useLanguage();
  
  // Create default farm context based on current language
  const defaultFarmContext: FarmContext = {
    farmerId: 'farmer001',
    location: language === 'malayalam' ? 'തിരുവനന്തപുരം' : 'Thiruvananthapuram',
    cropType: language === 'malayalam' ? ['നെൽ', 'വാഴ'] : ['Rice', 'Banana'],
    landSize: 2.5,
    soilType: language === 'malayalam' ? 'കളിമണ്ണ്' : 'Clay',
    irrigationType: language === 'malayalam' ? 'മഴ' : 'Rain-fed',
    currentSeason: language === 'malayalam' ? 'വർഷകാലം' : 'Monsoon'
  };

  const activeFarmContext = farmContext || defaultFarmContext;
  
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [voicesReady, setVoicesReady] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [ttsLanguage, setTtsLanguage] = useState<'english' | 'malayalam'>(
    language === 'malayalam' ? 'malayalam' : 'english'
  );

  // Create language-aware initial message
  const getInitialMessage = (): AIMessage => ({
    id: '1',
    text: language === 'malayalam' 
      ? 'നമസ്കാരം! ഞാൻ കൃഷി മിത്ര, നിങ്ങളുടെ AI കൃഷി സഹായി. എങ്ങനെ സഹായിക്കാം?'
      : 'Hello! I am Krishi Mitra, your AI farming assistant. How can I help you?',
    isUser: false,
    timestamp: new Date(),
    language: language
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize and update messages when language changes
  useEffect(() => {
    setMessages([getInitialMessage()]);
    // Default tts language to match current UI language when user switches
    setTtsLanguage(language === 'malayalam' ? 'malayalam' : 'english');
  }, [language]);

  // Ensure speechSynthesis voices are loaded (important for some browsers)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const check = () => {
        const v = synth.getVoices();
        if (v && v.length > 0) setVoicesReady(true);
      };
      check();
      // Some browsers fire "voiceschanged" when voices become available
      synth.addEventListener?.('voiceschanged', check as any);
      return () => synth.removeEventListener?.('voiceschanged', check as any);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
      language: language
    };

  setMessages(prev => [...prev, userMessage]);
  // Do not clear input; keep the user's query visible as requested
    setIsLoading(true);

    try {
      const response = await aiAssistant.sendMessage(text, activeFarmContext, language);
      
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        language: response.language,
        audioUrl: response.audioUrl
      };

      setMessages(prev => [...prev, aiMessage]);
      // If audio is toggled ON, auto-speak the assistant reply using selected EN/ML
      if (isAudioOn) {
        await playAudio(aiMessage.text, ttsLanguage);
      }
    } catch (error) {
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: 'ക്ഷമിക്കണം, ഇപ്പോൾ പ്രതികരണം നൽകാൻ കഴിയുന്നില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
        isUser: false,
        timestamp: new Date(),
        language: 'malayalam'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        const audioChunks: BlobPart[] = [];

        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.current.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          try {
            const transcription = await aiAssistant.speechToText(audioBlob, language);
            setInputMessage(transcription);
          } catch (error) {
            console.error('Speech recognition failed:', error);
          }
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Microphone access denied:', error);
      }
    } else {
      mediaRecorder.current?.stop();
      setIsRecording(false);
    }
  };

  // Speak text in the selected language using Web Speech API with Indian accents
  const playAudio = async (text: string, forceLang?: 'malayalam' | 'english') => {
    // Try Web Speech API first for lower latency and no network needed
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        // Cancel any ongoing speech
        if (synth.speaking) synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        // Pick a voice based on requested language and prefer Indian accent
        const voices = synth.getVoices();
        const langToUse = forceLang ?? language;
        const wanted = langToUse === 'malayalam' ? ['ml-in', 'ml'] : ['en-in', 'en'];
        const voice = voices.find(v => {
          const l = (v.lang || '').toLowerCase();
          return wanted.some(w => l.startsWith(w));
        }) || voices.find(v => (v.lang || '').toLowerCase().startsWith(wanted[1]));

        if (voice) utterance.voice = voice;
        utterance.lang = voice?.lang || (langToUse === 'malayalam' ? 'ml-IN' : 'en-IN');
        utterance.rate = 1; // natural speed
        utterance.pitch = 1; // natural pitch
        synth.speak(utterance);
        return;
      }
    } catch (e) {
      // Continue to fallback
      console.warn('Web Speech API TTS failed, falling back to audio URL.', e);
    }

    // Fallback to server/AI generated audio url
    try {
      const audioUrl = await aiAssistant.textToSpeech(text, forceLang ?? language);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const quickQuestions = [
    { text: 'എന്റെ വിളകളുടെ നിലവിലെ അവസ്ഥ എന്താണ്?', lang: 'malayalam' },
    { text: 'ഇന്ന് എന്ത് പ്രവർത്തനങ്ങൾ ചെയ്യണം?', lang: 'malayalam' },
    { text: 'കീട നിയന്ത്രണത്തിന് എന്ത് ചെയ്യാം?', lang: 'malayalam' },
    { text: 'What fertilizer should I use?', lang: 'english' }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary flex flex-col">
      {/* Header */}
      <div className="gradient-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className={`text-xl font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {t('chatbot.title')}
              </h1>
              <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {t('chatbot.subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Global audio ON/OFF toggle */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={isAudioOn ? 'Disable audio' : 'Enable audio'}
              onClick={() => setIsAudioOn(v => !v)}
              title={isAudioOn ? 'Audio On' : 'Audio Off'}
            >
              {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            {/* EN / ML selectors (global) */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <button
                type="button"
                className={ttsLanguage === 'english' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}
                onClick={() => setTtsLanguage('english')}
                title="Speak in English (India)"
              >
                EN
              </button>
              <button
                type="button"
                className={ttsLanguage === 'malayalam' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}
                onClick={() => setTtsLanguage('malayalam')}
                title="Speak in Malayalam (India)"
              >
                ML
              </button>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-4 shadow-card ${
                  message.isUser
                    ? 'gradient-primary text-white'
                    : 'bg-card text-card-foreground'
                }`}
              >
                <p className={`${message.language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {message.text}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString('ml-IN')}
                  </span>
                  {/* No per-message buttons; speech is controlled globally */}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card text-card-foreground rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className={language === 'malayalam' ? 'text-malayalam' : ''}>
                    {t('chatbot.thinking')}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="p-4">
          <div className="max-w-4xl mx-auto">
            <h3 className={`text-sm font-medium mb-3 text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {t('chatbot.commonQuestions')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-3"
                  onClick={() => sendMessage(question.text)}
                >
                  {question.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <Card className="m-4 shadow-floating border-0">
        <div className="p-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t(`chatbot.placeholder.${language}`)}
                className={`pr-12 ${language === 'malayalam' ? 'text-malayalam' : ''}`}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              />
            </div>
            <Button
              onClick={handleVoiceInput}
              variant="outline"
              size="icon"
              className={isRecording ? 'bg-destructive text-destructive-foreground' : ''}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isLoading}
              className="gradient-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;