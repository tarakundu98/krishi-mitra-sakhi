import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Home,
  User,
  Sprout,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  CloudRain,
  Bell
} from 'lucide-react';

interface NavigationSidebarProps {
  farmerData?: any;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ farmerData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const navigationItems = [
    {
      id: 'home',
      path: '/',
      label: language === 'malayalam' ? 'ഹോം' : 'Home',
      icon: Home,
      available: true
    },
    {
      id: 'summary',
      path: '/user-summary',
      label: language === 'malayalam' ? 'സംഗ്രഹം' : 'Summary',
      icon: User,
      available: !!farmerData
    },
    {
      id: 'crops',
      path: '/crop-details',
      label: language === 'malayalam' ? 'വിളകൾ' : 'Crops',
      icon: Sprout,
      available: !!farmerData && farmerData.currentCrops && farmerData.currentCrops.length > 0
    },
    {
      id: 'dashboard',
      path: '/dashboard',
      label: language === 'malayalam' ? 'ഡാഷ്ബോർഡ്' : 'Dashboard',
      icon: BarChart3,
      available: !!farmerData
    },
    {
      id: 'chatbot',
      path: '/chatbot',
      label: language === 'malayalam' ? 'ചാറ്റ്ബോട്ട്' : 'Chatbot',
      icon: MessageSquare,
      available: !!farmerData
    },
    {
      id: 'weather',
      path: '/weather',
      label: language === 'malayalam' ? 'കാലാവസ്ഥ' : 'Weather',
      icon: CloudRain,
      available: !!farmerData
    },
    {
      id: 'reminders',
      path: '/reminders',
      label: language === 'malayalam' ? 'ഓർമ്മപ്പെടുത്തലുകൾ' : 'Reminders',
      icon: Bell,
      available: !!farmerData
    }
  ];

  const handleNavigation = (path: string) => {
    if (path === '/user-summary' || path === '/crop-details' || path === '/dashboard' || path === '/chatbot' || path === '/weather' || path === '/reminders') {
      if (farmerData) {
        navigate(path, { state: { farmerData } });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
          <div className="flex items-center space-x-3 px-2 py-2">
            <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {language === 'malayalam' ? 'കൃഷി മിത്ര സഖി' : 'Krishi Mitra Sakhi'}
              </h2>
              {farmerData && (
                <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? `സ്വാഗതം, ${farmerData.name}` : `Welcome, ${farmerData.name}`}
                </p>
              )}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  if (!item.available) return null;

                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item.path)}
                        isActive={isActive}
                        className={language === 'malayalam' ? 'text-malayalam' : ''}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className={language === 'malayalam' ? 'text-malayalam' : ''}>
                <Settings className="w-5 h-5" />
                <span>{language === 'malayalam' ? 'ക്രമീകരണങ്ങൾ' : 'Settings'}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className={`text-red-600 hover:text-red-700 hover:bg-red-50 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                <LogOut className="w-5 h-5" />
                <span>{language === 'malayalam' ? 'ലോഗൗട്ട്' : 'Logout'}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="px-2 py-2">
            <p className="text-xs text-muted-foreground text-center">
              Version 1.0.0
            </p>
          </div>
        </SidebarFooter>
      </Sidebar>
  );
};

export default NavigationSidebar;