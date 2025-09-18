import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from '@/components/features/Dashboard';
import NavigationSidebar from '@/components/ui/navigation-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const farmerData = location.state?.farmerData;

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'chatbot':
        navigate('/chatbot', { state: { farmerData } });
        break;
      case 'weather':
        navigate('/weather', { state: { farmerData } });
        break;
      case 'reminders':
        navigate('/reminders', { state: { farmerData } });
        break;
      case 'crops':
        navigate('/crop-details', { state: { farmerData } });
        break;
      case 'dashboard':
        // Already on dashboard
        break;
      default:
        break;
    }
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
            <Dashboard
              farmer={farmerData}
              onNavigate={handleNavigate}
            />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;