import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Chatbot from '@/components/features/Chatbot';
import NavigationSidebar from '@/components/ui/navigation-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

const ChatbotPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const farmerData = location.state?.farmerData;

  const handleBack = () => {
    navigate('/dashboard', { state: { farmerData } });
  };

  if (!farmerData) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
          <p className="text-muted-foreground mb-6">Please complete registration first.</p>
          <button onClick={() => navigate('/')} className="text-primary hover:underline">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Transform farmer data to FarmContext format for AI service
  const farmContext = {
    farmerId: 'farmer001',
    location: farmerData.location || 'Kerala',
    cropType: farmerData.crops || ['Rice'],
    landSize: farmerData.landSize || 2.5,
    soilType: farmerData.soilType || 'Clay',
    irrigationType: farmerData.irrigationType || 'Rain-fed',
    currentSeason: 'Monsoon'
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex sidebar-layout">
        <NavigationSidebar farmerData={farmerData} />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
            <SidebarTrigger className="" />
            <div className="flex-1" />
          </header>
          <main className="flex-1">
            <Chatbot
              onBack={handleBack}
              farmContext={farmContext}
            />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ChatbotPage;