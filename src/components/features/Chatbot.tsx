import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Languages,
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
  farmContext = {
    farmerId: 'farmer001',
    location: 'തിരുവനന്തപുരം',
    cropType: ['നെൽ', 'വാഴ'],
    landSize: 2.5,
    soilType: 'കളിമണ്ണ്',
    irrigationType: 'മഴ',
    currentSeason: 'വർഷകാലം'
  }
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      text: 'നമസ്കാരം! ഞാൻ കൃഷി സഖി, നിങ്ങളുടെ AI കൃഷി സഹായി. എങ്ങനെ സഹായിക്കാം?',
      isUser: false,
      timestamp: new Date(),
      language: 'malayalam'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'malayalam' | 'english'>('malayalam');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiAssistant.sendMessage(text, farmContext, currentLanguage);
      
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        language: response.language,
        audioUrl: response.audioUrl
      };

      setMessages(prev => [...prev, aiMessage]);
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
            const transcription = await aiAssistant.speechToText(audioBlob, currentLanguage);
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

  const playAudio = async (text: string) => {
    try {
      const audioUrl = await aiAssistant.textToSpeech(text, currentLanguage);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'malayalam' ? 'english' : 'malayalam');
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
              <h1 className="text-xl font-bold">കൃഷി സഖി</h1>
              <p className="text-sm text-muted-foreground">AI കൃഷി സഹായി</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              <Languages className="w-4 h-4 mr-2" />
              {currentLanguage === 'malayalam' ? 'മലയാളം' : 'English'}
            </Button>
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
                  {!message.isUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playAudio(message.text)}
                      className="h-6 w-6 p-0"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card text-card-foreground rounded-2xl p-4 shadow-card">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ചിന്തിക്കുന്നു...</span>
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
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">
              സാധാരണ ചോദ്യങ്ങൾ:
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
                placeholder={
                  currentLanguage === 'malayalam' 
                    ? 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...'
                    : 'Type your question...'
                }
                className={`pr-12 ${currentLanguage === 'malayalam' ? 'text-malayalam' : ''}`}
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