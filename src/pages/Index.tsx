import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/features/Dashboard';
import Chatbot from '@/components/features/Chatbot';
import Registration from '@/components/features/Registration';
import LanguageToggle from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout, Users, Shield } from 'lucide-react';

type AppState = 'welcome' | 'registration' | 'dashboard' | 'chatbot';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [farmerData, setFarmerData] = useState(null);
  const { t, language } = useLanguage();

  const handleRegistrationComplete = (data: any) => {
    // Map registration data to dashboard format
    const mappedFarmerData = {
      name: data.name || 'Unknown',
      location: data.district || data.village || 'Unknown Location',
      crops: data.currentCrops || []
    };
    
    setFarmerData(mappedFarmerData);
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

  const handleDirectDashboardAccess = () => {
    // Create demo farmer data for direct dashboard access
    const demoFarmerData = {
      name: language === 'malayalam' ? 'രാധാകൃഷ്ണൻ' : 'Demo Farmer',
      location: language === 'malayalam' ? 'തിരുവനന്തപുരം' : 'Thiruvananthapuram',
      crops: language === 'malayalam' ? ['നെൽ', 'വാഴ', 'കപ്പ'] : ['Rice', 'Banana', 'Tapioca']
    };
    
    setFarmerData(demoFarmerData);
    setCurrentState('dashboard');
  };

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-secondary flex flex-col">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Main Hero Card */}
          <Card className="gradient-card shadow-floating border-0 p-8 md:p-12 text-center mb-8">
            <div className="animate-bounce-gentle mb-6">
              <Sprout className="w-20 h-20 mx-auto text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-malayalam">
              {t('app.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-malayalam">
              {t('app.subtitle')}
            </p>
            
            <div className="text-lg text-muted-foreground mb-8 text-malayalam max-w-2xl mx-auto">
              {t('app.description')}
            </div>
            
            <Button 
              size="lg" 
              className="gradient-primary text-lg px-8 py-4 h-auto"
              onClick={() => setCurrentState('registration')}
            >
              {t('button.getStarted')}
            </Button>
          </Card>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-malayalam">{t('feature.smartAdvice.title')}</h3>
              <p className="text-muted-foreground text-malayalam">
                {t('feature.smartAdvice.desc')}
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-malayalam">{t('feature.malayalamSupport.title')}</h3>
              <p className="text-muted-foreground text-malayalam">
                {t('feature.malayalamSupport.desc')}
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-malayalam">{t('feature.secure.title')}</h3>
              <p className="text-muted-foreground text-malayalam">
                {t('feature.secure.desc')}
              </p>
            </Card>
          </div>

          {/* Quick Demo */}
          <Card className="p-6 shadow-card border-0">
            <div className="text-center">
              <h3 className={`text-xl font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {t('account.existing')}
              </h3>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDirectDashboardAccess}
              >
                {t('button.goToDashboard')}
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
      // Transform farmer data to FarmContext format for AI service
      const farmContext = farmerData ? {
        farmerId: 'farmer001',
        location: farmerData.location || 'Kerala',
        cropType: farmerData.crops || ['Rice'],
        landSize: 2.5, // Default value, could be added to registration
        soilType: 'Clay', // Default value, could be from registration
        irrigationType: 'Rain-fed', // Default value, could be from registration
        currentSeason: 'Monsoon'
      } : undefined;

      return (
        <Chatbot 
          onBack={() => setCurrentState('dashboard')}
          farmContext={farmContext}
        />
      );
      
    default:
      return renderWelcome();
  }
};

export default Index;
