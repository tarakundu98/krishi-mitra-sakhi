import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-primary" />
            <span className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              കൃഷി സഖി
            </span>
          </div>
          
          <div className="text-center md:text-right">
            <p className={`text-sm text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {language === 'malayalam' 
                ? 'കേരളത്തിലെ കർഷകരുടെ അഭിമാനത്തോടെ നിർമ്മിച്ചത്'
                : 'Built with pride for Kerala\'s farmers'
              }
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {currentYear} Krishi Mitra. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{language === 'malayalam' ? 'നിർമ്മിച്ചത്' : 'Made with'}</span>
            <Heart className="w-3 h-3 text-red-500" />
            <span>{language === 'malayalam' ? 'കേരളത്തിൽ' : 'in Kerala'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
