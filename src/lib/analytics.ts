/**
 * Analytics and Monitoring Service for Krishi Mitra
 * Professional tracking and performance monitoring
 */

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  errorCount: number;
  userInteractions: number;
}

class AnalyticsService {
  private sessionId: string;
  private userId: string | null = null;
  private isEnabled: boolean;
  private eventQueue: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = (import.meta as any).env?.PROD || (import.meta as any).env?.VITE_ENABLE_ANALYTICS === 'true';
    
    // Initialize performance monitoring
    this.initializePerformanceMonitoring();
  }

  /**
   * Track user events and interactions
   */
  track(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        language: this.getCurrentLanguage(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      },
      timestamp: new Date(),
      userId: this.userId,
      sessionId: this.sessionId
    };

    this.eventQueue.push(analyticsEvent);
    
    // Send to analytics service (placeholder)
    this.sendToAnalytics(analyticsEvent);
    
    // Log in development
    if ((import.meta as any).env?.DEV) {
      console.log('Analytics Event:', analyticsEvent);
    }
  }

  /**
   * Track user identification
   */
  identify(userId: string, traits?: Record<string, any>) {
    this.userId = userId;
    
    this.track('User Identified', {
      userId,
      traits
    });
  }

  /**
   * Track page views
   */
  page(pageName: string, properties?: Record<string, any>) {
    this.track('Page Viewed', {
      page: pageName,
      ...properties
    });
  }

  /**
   * Track AI assistant interactions
   */
  trackAIIntraction(type: 'message_sent' | 'message_received' | 'voice_input' | 'voice_output', properties?: Record<string, any>) {
    this.track(`AI ${type}`, {
      ...properties,
      aiService: 'krishi-mitra'
    });
  }

  /**
   * Track farming-related actions
   */
  trackFarmingAction(action: string, cropType?: string, properties?: Record<string, any>) {
    this.track('Farming Action', {
      action,
      cropType,
      ...properties
    });
  }

  /**
   * Track errors and exceptions
   */
  trackError(error: Error, context?: Record<string, any>) {
    this.track('Error Occurred', {
      errorMessage: error.message,
      errorStack: error.stack,
      context
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metrics: PerformanceMetrics) {
    this.track('Performance Metrics', {
      ...metrics,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track language switching
   */
  trackLanguageSwitch(fromLanguage: string, toLanguage: string) {
    this.track('Language Switched', {
      fromLanguage,
      toLanguage,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Track registration completion
   */
  trackRegistrationComplete(farmerData: any) {
    this.track('Registration Completed', {
      farmerId: farmerData.farmerId || 'unknown',
      location: farmerData.location,
      cropTypes: farmerData.cropTypes,
      landSize: farmerData.landSize
    });
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getCurrentLanguage(): string {
    const stored = localStorage.getItem('krishi-mitra-language');
    return stored || 'malayalam';
  }

  private initializePerformanceMonitoring() {
    if (typeof window === 'undefined') return;

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.trackPerformance({
        pageLoadTime: loadTime,
        apiResponseTime: 0,
        errorCount: 0,
        userInteractions: 0
      });
    });

    // Track API response times
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      try {
        const response = await originalFetch(...args);
        const end = performance.now();
        
        this.track('API Call', {
          url: args[0],
          method: args[1]?.method || 'GET',
          responseTime: end - start,
          status: response.status
        });
        
        return response;
      } catch (error) {
        const end = performance.now();
        this.trackError(error as Error, {
          apiUrl: args[0],
          responseTime: end - start
        });
        throw error;
      }
    };
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // Placeholder for actual analytics service integration
    // In production, send to your analytics service (Google Analytics, Mixpanel, etc.)
    
    if ((import.meta as any).env?.VITE_GOOGLE_ANALYTICS_ID) {
      // Example Google Analytics integration
      // gtag('event', event.event, event.properties);
    }

    // Store locally for offline sync
    const storedEvents = JSON.parse(localStorage.getItem('analytics-events') || '[]');
    storedEvents.push(event);
    
    // Keep only last 100 events
    if (storedEvents.length > 100) {
      storedEvents.splice(0, storedEvents.length - 100);
    }
    
    localStorage.setItem('analytics-events', JSON.stringify(storedEvents));
  }

  /**
   * Get analytics summary for debugging
   */
  getSummary() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      eventCount: this.eventQueue.length,
      language: this.getCurrentLanguage(),
      isEnabled: this.isEnabled
    };
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();

// React hook for easy usage
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    identify: analytics.identify.bind(analytics),
    page: analytics.page.bind(analytics),
    trackAIIntraction: analytics.trackAIIntraction.bind(analytics),
    trackFarmingAction: analytics.trackFarmingAction.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackLanguageSwitch: analytics.trackLanguageSwitch.bind(analytics),
    trackRegistrationComplete: analytics.trackRegistrationComplete.bind(analytics)
  };
};

export default analytics;
