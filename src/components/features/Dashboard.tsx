import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sprout, 
  CloudRain, 
  Bell, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  Wheat,
  Phone
} from 'lucide-react';

interface DashboardProps {
  farmer?: {
    name: string;
    location: string;
    crops: string[];
  };
  onNavigate?: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  farmer = { 
    name: 'രാധാകൃഷ്ണൻ', 
    location: 'തിരുവനന്തപുരം', 
    crops: ['നെൽ', 'വാഴ', 'കപ്പ']
  },
  onNavigate = () => {}
}) => {
  const { t, language } = useLanguage();
  const quickActions = [
    {
      title: t('dashboard.aiAssistant'),
      subtitle: t('dashboard.ask'),
      icon: MessageCircle,
      color: 'gradient-primary',
      action: () => onNavigate('chatbot')
    },
    {
      title: t('dashboard.weather'),
      subtitle: t('dashboard.forecast'),
      icon: CloudRain,
      color: 'bg-blue-500',
      action: () => onNavigate('weather')
    },
    {
      title: t('dashboard.reminders'),
      subtitle: t('dashboard.newCount'),
      icon: Bell,
      color: 'bg-warning',
      action: () => onNavigate('reminders')
    },
    {
      title: t('dashboard.crops'),
      subtitle: t('dashboard.track'),
      icon: Sprout,
      color: 'bg-success',
      action: () => onNavigate('crops')
    }
  ];

  const todayActivities = [
    { time: '06:00', activity: 'നെൽവയലിൽ വെള്ളം നൽകുക', status: 'pending' },
    { time: '08:30', activity: 'കീട പരിശോധന', status: 'completed' },
    { time: '16:00', activity: 'വളം പ്രയോഗിക്കുക', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary p-4 md:p-6">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      {/* Header */}
      <div className="gradient-card rounded-xl p-6 mb-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-2xl font-bold text-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {t('dashboard.greeting')}, {farmer.name}!
            </h1>
            <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {farmer.location} • {t('dashboard.today')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-success text-lg font-semibold">28°C</div>
            <div className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {language === 'malayalam' ? 'കാറ്റുള്ള' : 'Windy'}
            </div>
          </div>
        </div>
        
        {/* Weather Alert */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-warning" />
            <span className={`text-warning font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {t('dashboard.weatherAlert')}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="p-4 cursor-pointer hover:scale-105 transition-smooth shadow-card border-0"
            onClick={action.action}
          >
            <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
            <p className="text-xs text-muted-foreground">{action.subtitle}</p>
          </Card>
        ))}
      </div>

      {/* Today's Activities */}
      <Card className="mb-6 shadow-card border-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              <Calendar className="w-5 h-5" />
              {t('dashboard.todayActivities')}
            </h2>
            <Button variant="outline" size="sm">
              {t('dashboard.viewAll')}
            </Button>
          </div>
          
          <div className="space-y-3">
            {todayActivities.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'completed' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <div>
                    <p className={`font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>{activity.activity}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                {activity.status === 'pending' && (
                  <Button size="sm" variant="outline" className={language === 'malayalam' ? 'text-malayalam' : ''}>
                    {t('dashboard.complete')}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Crop Overview */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="shadow-card border-0">
          <div className="p-6">
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              <Wheat className="w-5 h-5" />
              {t('dashboard.currentCrops')}
            </h3>
            <div className="space-y-3">
              {farmer.crops.map((crop, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{crop}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {t('dashboard.growthStage')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="shadow-card border-0">
          <div className="p-6">
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              <TrendingUp className="w-5 h-5" />
              {t('dashboard.monthProgress')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>പ്രവർത്തനങ്ങൾ പൂർത്തിയാക്കി</span>
                <span className="font-semibold">24/30</span>
              </div>
              <div className="flex justify-between">
                <span>AI ഉപദേശങ്ങൾ സ്വീകരിച്ചു</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span>മഴയിൽ സംരക്ഷിത ദിനങ്ങൾ</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="shadow-card border-0 bg-gradient-primary text-white">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {t('dashboard.emergencyHelp')}
              </h3>
              <p className={`text-white/80 text-sm ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {t('dashboard.talkToExperts')}
              </p>
            </div>
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Phone className="w-4 h-4 mr-2" />
              {t('dashboard.call')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;