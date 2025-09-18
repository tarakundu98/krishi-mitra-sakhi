import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/features/Dashboard';
import Chatbot from '@/components/features/Chatbot';
import Registration from '@/components/features/Registration';
import { Sprout, Users, Shield } from 'lucide-react';

type AppState = 'welcome' | 'registration' | 'dashboard' | 'chatbot';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [farmerData, setFarmerData] = useState(null);

  const handleRegistrationComplete = (data: any) => {
    setFarmerData(data);
    setCurrentState('dashboard');
  };

  const navigateToSection = (section: string) => {
    switch (section) {
      case 'chatbot':
        setCurrentState('chatbot');
        break;
      case 'dashboard':
        setCurrentState('dashboard');
        break;
      default:
        break;
    }
  };

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-secondary flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Main Hero Card */}
          <Card className="gradient-card shadow-floating border-0 p-8 md:p-12 text-center mb-8">
            <div className="animate-bounce-gentle mb-6">
              <Sprout className="w-20 h-20 mx-auto text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-malayalam">
              കൃഷി സഖി
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-malayalam">
              നിങ്ങളുടെ AI പവർഡ് വ്യക്തിഗത കൃഷി സഹായി
            </p>
            
            <div className="text-lg text-muted-foreground mb-8 text-malayalam max-w-2xl mx-auto">
              കേരളത്തിലെ ചെറുകിട കർഷകർക്കായി പ്രത്യേകം രൂപകൽപ്പന ചെയ്ത, 
              മലയാളത്തിൽ സംസാരിക്കുന്ന ബുദ്ധിമാനായ കൃഷി ഉപദേഷ്ടാവ്
            </div>
            
            <Button 
              size="lg" 
              className="gradient-primary text-lg px-8 py-4 h-auto"
              onClick={() => setCurrentState('registration')}
            >
              ആരംഭിക്കുക
            </Button>
          </Card>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-malayalam">സ്മാർട്ട് ഉപദേശം</h3>
              <p className="text-muted-foreground text-malayalam">
                കാലാവസ്ഥ, മണ്ണ്, വിള എന്നിവ അനുസരിച്ച് വ്യക്തിഗതമാക്കിയ കൃഷി ഉപദേശങ്ങൾ
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-malayalam">മലയാളം സപ്പോർട്ട്</h3>
              <p className="text-muted-foreground text-malayalam">
                ശബ്ദം, ടെക്സ്റ്റ് - രണ്ടിലും മലയാളത്തിൽ സംസാരിക്കാം
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-malayalam">സുരക്ഷിതം</h3>
              <p className="text-muted-foreground text-malayalam">
                നിങ്ങളുടെ എല്ലാ വിവരങ്ങളും സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു
              </p>
            </Card>
          </div>

          {/* Quick Demo */}
          <Card className="p-6 shadow-card border-0">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-malayalam">
                ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?
              </h3>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setCurrentState('dashboard')}
              >
                ഡാഷ്ബോർഡിലേക്ക് പോകുക
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  // Render based on current state
  switch (currentState) {
    case 'registration':
      return (
        <Registration 
          onComplete={handleRegistrationComplete}
          onBack={() => setCurrentState('welcome')}
        />
      );
      
    case 'dashboard':
      return (
        <Dashboard 
          farmer={farmerData}
          onNavigate={navigateToSection}
        />
      );
      
    case 'chatbot':
      return (
        <Chatbot 
          onBack={() => setCurrentState('dashboard')}
          farmContext={farmerData}
        />
      );
      
    default:
      return renderWelcome();
  }
};

export default Index;
