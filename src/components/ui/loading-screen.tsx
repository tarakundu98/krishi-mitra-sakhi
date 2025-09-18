import React from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message,
  showProgress = false,
  progress = 0
}) => {
  const { language } = useLanguage();

  const defaultMessage = language === 'malayalam' 
    ? 'കൃഷി സഖി ലോഡ് ചെയ്യുന്നു...' 
    : 'Loading Krishi Mitra...';

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className="max-w-sm w-full p-8 text-center shadow-card border-0">
        <div className="animate-bounce-gentle mb-6">
          <Sprout className="w-16 h-16 mx-auto text-primary" />
        </div>
        
        <h2 className={`text-xl font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          കൃഷി സഖി
        </h2>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
            {message || defaultMessage}
          </p>
        </div>
        
        {showProgress && (
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoadingScreen;
