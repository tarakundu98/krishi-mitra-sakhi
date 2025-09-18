import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout, Users, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleGoToDashboard = () => {
    // Create demo farmer data for direct dashboard access
    const demoFarmerData = {
      name: language === 'malayalam' ? 'രാധാകൃഷ്ണൻ' : 'Demo Farmer',
      location: language === 'malayalam' ? 'തിരുവനന്തപുരം' : 'Thiruvananthapuram',
      crops: language === 'malayalam' ? ['നെൽ', 'വാഴ', 'കപ്പ'] : ['Rice', 'Banana', 'Tapioca']
    };

    navigate('/user-summary', { state: { farmerData: demoFarmerData } });
  };

  return (
    <div className="fullscreen-layout bg-gradient-secondary flex flex-col">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-responsive">
        <div className="w-full max-w-none">
          {/* Main Hero Card */}
          <Card className="gradient-card shadow-floating border-0 p-responsive text-center mb-8">
            <div className="animate-bounce-gentle mb-6">
              <Sprout className="w-20 h-20 mx-auto text-primary" />
            </div>

            <h1 className="text-responsive-4xl md:text-responsive-6xl font-bold mb-4 text-malayalam">
              {t('app.title')}
            </h1>

            <p className="text-responsive-xl md:text-responsive-2xl text-muted-foreground mb-6 text-malayalam">
              {t('app.subtitle')}
            </p>

            <div className="text-responsive-lg text-muted-foreground mb-8 text-malayalam max-w-2xl mx-auto">
              {t('app.description')}
            </div>

            <Button
              size="lg"
              className="gradient-primary text-responsive-lg px-8 py-4 h-auto"
              onClick={handleGetStarted}
            >
              {t('button.getStarted')}
            </Button>
          </Card>          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-responsive-lg mb-8">
            <Card className="p-responsive text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-responsive-lg font-semibold mb-2 text-malayalam">{t('feature.smartAdvice.title')}</h3>
              <p className="text-muted-foreground text-malayalam">
                {t('feature.smartAdvice.desc')}
              </p>
            </Card>

            <Card className="p-responsive text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-responsive-lg font-semibold mb-2 text-malayalam">{t('feature.malayalamSupport.title')}</h3>
              <p className="text-muted-foreground text-malayalam">
                {t('feature.malayalamSupport.desc')}
              </p>
            </Card>

            <Card className="p-responsive text-center shadow-card border-0 hover:scale-105 transition-smooth">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-responsive-lg font-semibold mb-2 text-malayalam">{t('feature.secure.title')}</h3>
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
                onClick={handleGoToDashboard}
              >
                {t('button.goToDashboard')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
