import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Krishi Mitra Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const { t, language } = useLanguage();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 text-center shadow-card border-0">
        <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-warning" />
        </div>
        
        <h2 className={`text-xl font-semibold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {language === 'malayalam' ? 'എന്തോ പ്രശ്നം ഉണ്ടായി' : 'Something went wrong'}
        </h2>
        
        <p className={`text-muted-foreground mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {language === 'malayalam' 
            ? 'കൃഷി സഖി ആപ്പിൽ ഒരു പ്രശ്നം ഉണ്ടായി. ദയവായി വീണ്ടും ശ്രമിക്കുക.' 
            : 'There was an issue with Krishi Mitra. Please try again.'}
        </p>
        
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-muted/50 rounded-lg p-3 mb-4 text-left">
            <p className="text-xs text-muted-foreground font-mono">
              {error.message}
            </p>
          </div>
        )}
        
        <Button onClick={handleReload} className="gradient-primary">
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === 'malayalam' ? 'വീണ്ടും ശ്രമിക്കുക' : 'Try Again'}
        </Button>
      </Card>
    </div>
  );
};

// Wrapper component to use hooks
const ErrorBoundary: React.FC<Props> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

export default ErrorBoundary;
