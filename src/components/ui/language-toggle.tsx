import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'lg' | 'default';
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  variant = 'dropdown',
  size = 'default',
  className = ''
}) => {
  const { language, setLanguage, t } = useLanguage();

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={() => setLanguage(language === 'malayalam' ? 'english' : 'malayalam')}
        className={`flex items-center gap-2 ${className}`}
      >
        <Languages className="w-4 h-4" />
        {language === 'malayalam' ? 'മലയാളം' : 'English'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} className={`flex items-center gap-2 ${className}`}>
          <Languages className="w-4 h-4" />
          {language === 'malayalam' ? 'മലയാളം' : 'English'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-popover border border-border shadow-floating z-50 backdrop-blur-sm"
      >
        <DropdownMenuItem
          onClick={() => setLanguage('malayalam')}
          className="flex items-center justify-between cursor-pointer hover:bg-muted/50"
        >
          <span className="text-malayalam">മലയാളം</span>
          {language === 'malayalam' && <Check className="w-4 h-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('english')}
          className="flex items-center justify-between cursor-pointer hover:bg-muted/50"
        >
          <span>English</span>
          {language === 'english' && <Check className="w-4 h-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;