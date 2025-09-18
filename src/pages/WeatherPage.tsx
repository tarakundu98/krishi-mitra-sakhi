import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/ui/language-toggle';
import NavigationSidebar from '@/components/ui/navigation-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  CloudRain,
  Sun,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Info
} from 'lucide-react';

const WeatherPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const farmerData = location.state?.farmerData;

  // Mock weather data - in a real app, this would come from a weather API
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    humidity: 75,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    condition: 'cloudy',
    rainfall: 0,
    uvIndex: 6
  });

  const weatherForecast = [
    { day: 'Today', temp: { high: 32, low: 24 }, condition: 'cloudy', rainfall: 0 },
    { day: 'Tomorrow', temp: { high: 30, low: 23 }, condition: 'rainy', rainfall: 15 },
    { day: 'Friday', temp: { high: 29, low: 22 }, condition: 'rainy', rainfall: 25 },
    { day: 'Saturday', temp: { high: 31, low: 24 }, condition: 'sunny', rainfall: 0 },
    { day: 'Sunday', temp: { high: 33, low: 25 }, condition: 'sunny', rainfall: 0 }
  ];

  const farmingAlerts = [
    {
      type: 'warning',
      title: language === 'malayalam' ? 'മഴയുടെ മുന്നറിയിപ്പ്' : 'Rain Alert',
      message: language === 'malayalam' ? 
        'അടുത്ത 2 ദിവസത്തിൽ ശക്തമായ മഴ പ്രതീക്ഷിക്കുന്നു. വിളകൾ സംരക്ഷിക്കുക.' : 
        'Heavy rain expected in next 2 days. Protect your crops.'
    },
    {
      type: 'info',
      title: language === 'malayalam' ? 'ജലസേചന നിർദേശം' : 'Irrigation Advice',
      message: language === 'malayalam' ? 
        'മഴ കാരണം ഇന്ന് ജലസേചനം ആവശ്യമില്ല.' : 
        'No irrigation needed today due to expected rainfall.'
    }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard', { state: { farmerData } });
  };

  if (!farmerData) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
          <p className="text-muted-foreground mb-6">Please complete registration first.</p>
          <Button onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex sidebar-layout">
        <NavigationSidebar farmerData={farmerData} />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
            <SidebarTrigger className="" />
            <div className="flex-1" />
            <LanguageToggle />
          </header>
          <main className="flex-1 fullscreen-content bg-gradient-secondary p-responsive">
            <div className="w-full max-w-none mx-auto">
              {/* Header */}
              <div className="mb-8">
                <Button variant="ghost" onClick={handleGoBack} className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'malayalam' ? 'തിരികെ' : 'Back to Dashboard'}
                </Button>

                <div className="text-center">
                  <CloudRain className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h1 className={`text-3xl font-bold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'കാലാവസ്ഥാ റിപ്പോർട്ട്' : 'Weather Report'}
                  </h1>
                  <p className={`text-lg text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'നിങ്ങളുടെ പ്രദേശത്തെ കാലാവസ്ഥ' : 'Weather conditions in your area'}
                  </p>
                </div>
              </div>

              {/* Current Weather */}
              <Card className="mb-6 shadow-card border-0">
                <div className="p-responsive">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className={`text-2xl font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                        {language === 'malayalam' ? 'ഇപ്പോഴത്തെ കാലാവസ്ഥ' : 'Current Weather'}
                      </h2>
                      <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                        {farmerData.village || farmerData.location || 'Kerala'}
                      </p>
                    </div>
                    {getWeatherIcon(currentWeather.condition)}
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                      <Thermometer className="w-6 h-6 mr-3 text-orange-600" />
                      <div>
                        <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 'താപനില' : 'Temperature'}
                        </h4>
                        <p className="text-2xl font-bold">{currentWeather.temperature}°C</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <Droplets className="w-6 h-6 mr-3 text-blue-600" />
                      <div>
                        <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 'ആർദ്രത' : 'Humidity'}
                        </h4>
                        <p className="text-2xl font-bold">{currentWeather.humidity}%</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <Wind className="w-6 h-6 mr-3 text-green-600" />
                      <div>
                        <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 'കാറ്റിന്റെ വേഗത' : 'Wind Speed'}
                        </h4>
                        <p className="text-2xl font-bold">{currentWeather.windSpeed} km/h</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                      <CloudRain className="w-6 h-6 mr-3 text-purple-600" />
                      <div>
                        <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 'മഴ' : 'Rainfall'}
                        </h4>
                        <p className="text-2xl font-bold">{currentWeather.rainfall} mm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Weather Forecast */}
              <Card className="mb-6 shadow-card border-0">
                <div className="p-responsive">
                  <h2 className={`text-xl font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? '5 ദിവസത്തെ പ്രവചനം' : '5-Day Forecast'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {weatherForecast.map((day, index) => (
                      <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className={`font-semibold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' && index === 0 ? 'ഇന്ന്' :
                           language === 'malayalam' && index === 1 ? 'നാളെ' : day.day}
                        </p>
                        <div className="mb-2 flex justify-center">
                          {getWeatherIcon(day.condition)}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{day.temp.high}°C</p>
                          <p className="text-sm text-muted-foreground">{day.temp.low}°C</p>
                          {day.rainfall > 0 && (
                            <p className="text-xs text-blue-600">{day.rainfall}mm</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Farming Alerts */}
              <Card className="mb-6 shadow-card border-0">
                <div className="p-responsive">
                  <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    {language === 'malayalam' ? 'കാർഷിക അലർട്ടുകൾ' : 'Farming Alerts'}
                  </h2>
                  <div className="space-y-4">
                    {farmingAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.type === 'warning' 
                            ? 'bg-orange-50 border-orange-500' 
                            : 'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {alert.type === 'warning' ? (
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                          ) : (
                            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                          )}
                          <div>
                            <h3 className={`font-semibold mb-1 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                              {alert.title}
                            </h3>
                            <p className={`text-sm ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                              {alert.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Additional Weather Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card border-0">
                  <div className="p-responsive">
                    <h3 className={`text-lg font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'അധിക വിവരങ്ങൾ' : 'Additional Details'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={language === 'malayalam' ? 'text-malayalam' : ''}>
                          {language === 'malayalam' ? 'ദൃശ്യപരത' : 'Visibility'}
                        </span>
                        <span className="font-semibold">{currentWeather.visibility} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={language === 'malayalam' ? 'text-malayalam' : ''}>
                          {language === 'malayalam' ? 'വായു മർദ്ദം' : 'Pressure'}
                        </span>
                        <span className="font-semibold">{currentWeather.pressure} hPa</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={language === 'malayalam' ? 'text-malayalam' : ''}>
                          {language === 'malayalam' ? 'UV സൂചിക' : 'UV Index'}
                        </span>
                        <span className="font-semibold">{currentWeather.uvIndex}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="shadow-card border-0">
                  <div className="p-responsive">
                    <h3 className={`text-lg font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'ഇന്നത്തെ നിർദേശങ്ങൾ' : 'Today\'s Recommendations'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span className={`text-sm ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 
                            'ഉയർന്ന ആർദ്രത കാരണം കുമിൾ രോഗങ്ങൾ നിരീക്ഷിക്കുക' : 
                            'Monitor for fungal diseases due to high humidity'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Wind className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className={`text-sm ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 
                            'മിതമായ കാറ്റ് - പ്രകൃതിദത്ത വായുസഞ്ചാരത്തിന് നല്ലത്' : 
                            'Moderate wind - good for natural ventilation'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sun className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <span className={`text-sm ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 
                            'UV സൂചിക മിതമായത് - വയലിൽ പണിയെടുക്കാൻ അനുകൂലം' : 
                            'Moderate UV index - good for field work'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default WeatherPage;