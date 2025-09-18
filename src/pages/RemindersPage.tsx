import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import LanguageToggle from '@/components/ui/language-toggle';
import NavigationSidebar from '@/components/ui/navigation-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Bell,
  Clock,
  Calendar,
  Sprout,
  Droplets,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  category: 'irrigation' | 'fertilizer' | 'pest' | 'harvest' | 'general';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  recurring: boolean;
}

const RemindersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const farmerData = location.state?.farmerData;

  // Mock reminders data - in a real app, this would come from a database
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: language === 'malayalam' ? 'നെൽവയലിൽ വെള്ളം നൽകുക' : 'Water the rice field',
      description: language === 'malayalam' ? 'രാവിലെ 6 മണിക്ക് നെൽവയലിൽ വെള്ളം നൽകുക' : 'Water the rice field at 6 AM',
      time: '06:00',
      date: '2025-09-19',
      category: 'irrigation',
      priority: 'high',
      completed: false,
      recurring: true
    },
    {
      id: '2',
      title: language === 'malayalam' ? 'കീട പരിശോധന' : 'Pest inspection',
      description: language === 'malayalam' ? 'വിളകളിൽ കീടങ്ങൾ ഉണ്ടോ എന്ന് പരിശോധിക്കുക' : 'Check crops for pest infestation',
      time: '08:30',
      date: '2025-09-19',
      category: 'pest',
      priority: 'medium',
      completed: true,
      recurring: false
    },
    {
      id: '3',
      title: language === 'malayalam' ? 'വളം പ്രയോഗിക്കുക' : 'Apply fertilizer',
      description: language === 'malayalam' ? 'വാഴത്തോട്ടത്തിൽ ജൈവ വളം പ്രയോഗിക്കുക' : 'Apply organic fertilizer to banana plantation',
      time: '16:00',
      date: '2025-09-19',
      category: 'fertilizer',
      priority: 'high',
      completed: false,
      recurring: false
    },
    {
      id: '4',
      title: language === 'malayalam' ? 'വിള കൊയ്ത്ത്' : 'Harvest crops',
      description: language === 'malayalam' ? 'പച്ചക്കറികൾ കൊയ്ത്ത് ചെയ്യുക' : 'Harvest vegetables',
      time: '07:00',
      date: '2025-09-21',
      category: 'harvest',
      priority: 'medium',
      completed: false,
      recurring: false
    },
    {
      id: '5',
      title: language === 'malayalam' ? 'കാലാവസ്ഥാ റിപ്പോർട്ട് പരിശോധിക്കുക' : 'Check weather report',
      description: language === 'malayalam' ? 'അടുത്ത ആഴ്ചയിലെ മഴയുടെ പ്രവചനം പരിശോധിക്കുക' : 'Check rainfall forecast for next week',
      time: '18:00',
      date: '2025-09-20',
      category: 'general',
      priority: 'low',
      completed: false,
      recurring: true
    }
  ]);

  const handleGoBack = () => {
    navigate('/dashboard', { state: { farmerData } });
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation': return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'fertilizer': return <Sprout className="w-5 h-5 text-green-600" />;
      case 'pest': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'harvest': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'general': return <Bell className="w-5 h-5 text-gray-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      irrigation: language === 'malayalam' ? 'ജലസേചനം' : 'Irrigation',
      fertilizer: language === 'malayalam' ? 'വളം' : 'Fertilizer',
      pest: language === 'malayalam' ? 'കീടനിയന്ത്രണം' : 'Pest Control',
      harvest: language === 'malayalam' ? 'കൊയ്ത്ത്' : 'Harvest',
      general: language === 'malayalam' ? 'പൊതുവായത്' : 'General'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      high: language === 'malayalam' ? 'ഉയർന്നത്' : 'High',
      medium: language === 'malayalam' ? 'ഇടത്തരം' : 'Medium',
      low: language === 'malayalam' ? 'കുറഞ്ഞത്' : 'Low'
    };
    return labels[priority as keyof typeof labels] || priority;
  };

  const todayReminders = reminders.filter(r => r.date === '2025-09-19');
  const upcomingReminders = reminders.filter(r => r.date > '2025-09-19');
  const completedReminders = reminders.filter(r => r.completed);

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

                <div className="flex items-center justify-between">
                  <div>
                    <h1 className={`text-3xl font-bold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'ഓർമ്മപ്പെടുത്തലുകൾ' : 'Reminders'}
                    </h1>
                    <p className={`text-lg text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'നിങ്ങളുടെ കാർഷിക പ്രവർത്തനങ്ങൾ ട്രാക്ക് ചെയ്യുക' : 'Track your farming activities'}
                    </p>
                  </div>
                  <Button className="gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'malayalam' ? 'പുതിയത് ചേർക്കുക' : 'Add New'}
                  </Button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-responsive text-center shadow-card border-0">
                  <div className="text-2xl font-bold text-primary">{todayReminders.length}</div>
                  <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'ഇന്നത്തെ കാര്യങ്ങൾ' : 'Today\'s Tasks'}
                  </p>
                </Card>
                <Card className="p-responsive text-center shadow-card border-0">
                  <div className="text-2xl font-bold text-orange-600">{upcomingReminders.length}</div>
                  <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'വരാനിരിക്കുന്നവ' : 'Upcoming'}
                  </p>
                </Card>
                <Card className="p-responsive text-center shadow-card border-0">
                  <div className="text-2xl font-bold text-green-600">{completedReminders.length}</div>
                  <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'പൂർത്തിയായവ' : 'Completed'}
                  </p>
                </Card>
                <Card className="p-responsive text-center shadow-card border-0">
                  <div className="text-2xl font-bold text-blue-600">{reminders.filter(r => r.recurring).length}</div>
                  <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'ആവർത്തിക്കുന്നവ' : 'Recurring'}
                  </p>
                </Card>
              </div>

              {/* Today's Reminders */}
              <Card className="mb-6 shadow-card border-0">
                <div className="p-responsive">
                  <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    <Calendar className="w-6 h-6 text-primary" />
                    {language === 'malayalam' ? 'ഇന്നത്തെ ഓർമ്മപ്പെടുത്തലുകൾ' : 'Today\'s Reminders'}
                  </h2>
                  <div className="space-y-4">
                    {todayReminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className={`p-4 border rounded-lg transition-colors ${
                          reminder.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <Checkbox
                              checked={reminder.completed}
                              onCheckedChange={() => toggleReminder(reminder.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getCategoryIcon(reminder.category)}
                                <h3 className={`font-semibold ${reminder.completed ? 'line-through text-muted-foreground' : ''} ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {reminder.title}
                                </h3>
                                <Badge variant="outline" className={getPriorityColor(reminder.priority)}>
                                  {getPriorityLabel(reminder.priority)}
                                </Badge>
                              </div>
                              <p className={`text-sm text-muted-foreground mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                {reminder.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {reminder.time}
                                </div>
                                <Badge variant="secondary">
                                  {getCategoryLabel(reminder.category)}
                                </Badge>
                                {reminder.recurring && (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                    {language === 'malayalam' ? 'ആവർത്തിക്കുന്നു' : 'Recurring'}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Upcoming Reminders */}
              <Card className="mb-6 shadow-card border-0">
                <div className="p-responsive">
                  <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    <Bell className="w-6 h-6 text-orange-600" />
                    {language === 'malayalam' ? 'വരാനിരിക്കുന്ന ഓർമ്മപ്പെടുത്തലുകൾ' : 'Upcoming Reminders'}
                  </h2>
                  <div className="space-y-4">
                    {upcomingReminders.map((reminder) => (
                      <div key={reminder.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {getCategoryIcon(reminder.category)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {reminder.title}
                                </h3>
                                <Badge variant="outline" className={getPriorityColor(reminder.priority)}>
                                  {getPriorityLabel(reminder.priority)}
                                </Badge>
                              </div>
                              <p className={`text-sm text-muted-foreground mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                {reminder.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {reminder.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {reminder.time}
                                </div>
                                <Badge variant="secondary">
                                  {getCategoryLabel(reminder.category)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card border-0">
                  <div className="p-responsive">
                    <h3 className={`text-lg font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ' : 'Quick Actions'}
                    </h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        {language === 'malayalam' ? 'ജലസേചന ഓർമ്മപ്പെടുത്തൽ ചേർക്കുക' : 'Add Irrigation Reminder'}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        {language === 'malayalam' ? 'കീട പരിശോധന ഓർമ്മപ്പെടുത്തൽ' : 'Add Pest Check Reminder'}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        {language === 'malayalam' ? 'വളം പ്രയോഗ ഓർമ്മപ്പെടുത്തൽ' : 'Add Fertilizer Reminder'}
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="shadow-card border-0">
                  <div className="p-responsive">
                    <h3 className={`text-lg font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'ഇന്നത്തെ പുരോഗതി' : 'Today\'s Progress'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className={`text-sm ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                            {language === 'malayalam' ? 'പൂർത്തിയായ പ്രവർത്തനങ്ങൾ' : 'Completed Tasks'}
                          </span>
                          <span className="text-sm font-semibold">
                            {todayReminders.filter(r => r.completed).length}/{todayReminders.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ 
                              width: `${todayReminders.length > 0 ? (todayReminders.filter(r => r.completed).length / todayReminders.length) * 100 : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {todayReminders.length > 0 ? Math.round((todayReminders.filter(r => r.completed).length / todayReminders.length) * 100) : 0}%
                        </div>
                        <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? 'ഇന്ന് പൂർത്തിയായത്' : 'Completed Today'}
                        </p>
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

export default RemindersPage;