import React from 'react';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  MessageCircle, 
  User, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  showMobileMenu?: boolean;
  onToggleMobileMenu?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage = 'home',
  onNavigate = () => {},
  showMobileMenu = false,
  onToggleMobileMenu = () => {}
}) => {
  const { language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 'home',
      label: language === 'malayalam' ? 'ഹോം' : 'Home',
      icon: Home,
      path: '/'
    },
    {
      id: 'dashboard',
      label: language === 'malayalam' ? 'ഡാഷ്ബോർഡ്' : 'Dashboard',
      icon: User,
      path: '/dashboard'
    },
    {
      id: 'chatbot',
      label: language === 'malayalam' ? 'AI സഹായി' : 'AI Assistant',
      icon: MessageCircle,
      path: '/chatbot'
    },
    {
      id: 'settings',
      label: language === 'malayalam' ? 'സെറ്റിംഗുകൾ' : 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    onNavigate(item.id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">കൃ</span>
            </div>
            <span className={`font-semibold text-lg ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              കൃഷി സഖി
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item)}
                  className={`flex items-center gap-2 ${
                    isActive ? 'gradient-primary text-white' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className={language === 'malayalam' ? 'text-malayalam' : ''}>
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <LanguageToggle size="sm" />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item)}
                    className={`justify-start ${
                      isActive ? 'gradient-primary text-white' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className={language === 'malayalam' ? 'text-malayalam' : ''}>
                      {item.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
