import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Wifi, 
  WifiOff,
  Cloud,
  CloudOff
} from 'lucide-react';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'syncing' | 'error';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showText = true,
  size = 'md'
}) => {
  const { language } = useLanguage();

  const statusConfig = {
    online: {
      icon: Wifi,
      color: 'bg-green-500',
      text: language === 'malayalam' ? 'ഓൺലൈൻ' : 'Online',
      variant: 'default' as const
    },
    offline: {
      icon: WifiOff,
      color: 'bg-gray-500',
      text: language === 'malayalam' ? 'ഓഫ്‌ലൈൻ' : 'Offline',
      variant: 'secondary' as const
    },
    syncing: {
      icon: Cloud,
      color: 'bg-blue-500',
      text: language === 'malayalam' ? 'സിംക് ചെയ്യുന്നു' : 'Syncing',
      variant: 'outline' as const
    },
    error: {
      icon: AlertCircle,
      color: 'bg-red-500',
      text: language === 'malayalam' ? 'പ്രശ്നം' : 'Error',
      variant: 'destructive' as const
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className={`${config.color} rounded-full w-full h-full flex items-center justify-center`}>
          <Icon className={`text-white ${sizeClasses[size]}`} />
        </div>
        {status === 'syncing' && (
          <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping" />
        )}
      </div>
      
      {showText && (
        <span className={`text-xs font-medium ${
          language === 'malayalam' ? 'text-malayalam' : ''
        }`}>
          {config.text}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;
