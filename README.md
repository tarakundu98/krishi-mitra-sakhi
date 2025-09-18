# 🌾 കൃഷി സഖി (Krishi Sakhi) - AI-Powered Personal Farming Assistant

**AI-powered personal farming assistant designed specifically for smallholder farmers in Kerala, India.**

## 🚀 Features

### Core Functionality
- **🤖 AI Assistant**: Conversational interface with Malayalam & English support
- **👤 Farmer Profiling**: Comprehensive registration with farm details
- **📊 Smart Dashboard**: Personalized farming insights and activity tracking
- **🔔 Intelligent Reminders**: Weather-based alerts and farming schedules
- **📱 PWA Ready**: Offline support for rural connectivity

### Accessibility & Localization
- **🗣️ Voice Input/Output**: Speech-to-text and text-to-speech in Malayalam
- **🔤 Native Malayalam**: Full Malayalam language support with proper typography
- **👆 Touch-Friendly**: Large buttons and intuitive interface for low-literacy users
- **📶 Low-Bandwidth**: Optimized for slow internet connections

### Technical Features
- **⚡ Modern Stack**: React 18, TypeScript, Tailwind CSS
- **🏗️ Modular Architecture**: Scalable, industry-ready code structure
- **🔌 API Integration**: Dedicated AI service layer with separation of concerns
- **🎨 Design System**: Agricultural theme with semantic tokens
- **📱 Responsive**: Mobile-first design with PWA capabilities

## 📁 Project Structure

```
src/
├── api-for-ai-assistant/          # AI Integration Layer
│   ├── ai-service.ts             # Core AI service implementation
│   └── index.ts                  # API configuration & utilities
├── components/
│   ├── features/                 # Feature-specific components
│   │   ├── Dashboard.tsx         # Main farmer dashboard
│   │   ├── Chatbot.tsx          # AI assistant interface
│   │   └── Registration.tsx      # Farmer onboarding flow
│   └── ui/                      # Reusable UI components (shadcn/ui)
├── pages/
│   ├── Index.tsx                # Main application coordinator
│   └── NotFound.tsx             # 404 error page
└── lib/
    └── utils.ts                 # Utility functions
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom agricultural design system
- **UI Components**: shadcn/ui with Malayalam localization
- **Icons**: Lucide React with agricultural iconography
- **AI Integration**: Structured service layer (placeholder API)
- **PWA**: Manifest with offline support configuration

## 🎨 Design System

The application uses a carefully crafted agricultural design system:

- **Colors**: Rich greens, warm earth tones, cream backgrounds
- **Typography**: Inter + Noto Sans Malayalam for optimal readability
- **Components**: Accessible, touch-friendly interface elements
- **Animations**: Gentle, purposeful micro-interactions

## 🌐 Accessibility Features

- **Language Support**: Seamless Malayalam ⟷ English switching
- **Voice Interface**: Speech recognition and synthesis for Malayalam
- **Visual Design**: High contrast, large touch targets, clear typography
- **Navigation**: Intuitive flow designed for rural users
- **Offline Support**: PWA capabilities for connectivity issues

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd krishi-sakhi

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Environment Setup

Replace the placeholder AI integration in `src/api-for-ai-assistant/ai-service.ts`:

1. **API Key**: Replace `'ABCD1234'` with your actual AI service API key
2. **Endpoints**: Update base URLs to point to your AI backend
3. **Voice Services**: Configure TTS/STT providers for Malayalam support

## 🎯 Key User Flows

### 1. Farmer Registration
- **Step 1**: Contact & basic information
- **Step 2**: Location details (GPS coordinates)
- **Step 3**: Farm details (crops, soil, irrigation)
- **Step 4**: Document upload & privacy consent

### 2. Daily Dashboard
- Weather alerts and forecasts
- Today's recommended activities
- Crop status overview
- Quick access to AI assistant

### 3. AI Assistant Interaction
- Voice/text input in Malayalam or English
- Contextual farming advice
- Speech synthesis for responses
- Quick question shortcuts

## 📊 AI Integration Architecture

The AI service layer provides:

- **Conversation Management**: Context-aware dialogue system
- **Speech Processing**: Malayalam STT/TTS integration
- **Farming Context**: Location, crop, and seasonal awareness
- **Error Handling**: Graceful fallbacks and user-friendly messages

## 🔒 Privacy & Security

- **Local Storage**: Sensitive data encrypted on device
- **Consent Management**: Explicit privacy policy agreement
- **Data Minimization**: Only collect necessary farming information
- **User Control**: Easy account deletion and data export

## 🌱 Future Enhancements

- **Supabase Integration**: Backend database and authentication
- **Government API**: Integration with agricultural schemes
- **Market Prices**: Real-time crop pricing information
- **Community Features**: Farmer-to-farmer knowledge sharing
- **Expert Network**: Connection to agricultural extension officers

## 👥 Target Users

- **Primary**: Smallholder farmers in Kerala (1-5 acres)
- **Secondary**: Agricultural extension officers
- **Tertiary**: Rural development organizations

## 📱 PWA Features

- **Offline Functionality**: Core features work without internet
- **Install Prompt**: Add to home screen on mobile devices
- **Background Sync**: Queue actions when offline
- **Push Notifications**: Weather alerts and reminders

## 🤝 Contributing

This is a prototype designed for demonstration of modern agricultural technology solutions. For production deployment:

1. Replace mock AI services with actual implementations
2. Add comprehensive testing suite
3. Implement backend integration (Supabase recommended)
4. Add analytics and monitoring
5. Conduct user testing with actual farmers

## 📜 License

This project is created as a prototype for educational and demonstration purposes.

---

**Built with ❤️ for Kerala's farming community**

*കേരളത്തിലെ കർഷകരുടെ അഭിമാനത്തോടെ നിർമ്മിച്ചത്* 🌾