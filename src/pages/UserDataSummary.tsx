import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/ui/language-toggle';
import NavigationSidebar from '@/components/ui/navigation-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  User,
  Phone,
  MapPin,
  Sprout,
  ArrowLeft,
  ArrowRight,
  FileText,
  CheckCircle
} from 'lucide-react';

const UserDataSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Get farmer data from location state
  const farmerData = location.state?.farmerData;

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

  const handleGoToCropDetails = () => {
    navigate('/crop-details', { state: { farmerData } });
  };

  const handleGoBack = () => {
    navigate('/');
  };

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
            {language === 'malayalam' ? 'തിരികെ' : 'Back'}
          </Button>

          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1 className={`text-3xl font-bold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {language === 'malayalam' ? 'രജിസ്ട്രേഷൻ പൂർത്തിയായി' : 'Registration Complete'}
            </h1>
            <p className={`text-lg text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {language === 'malayalam' ? 'നിങ്ങളുടെ വിവരങ്ങൾ സംഗ്രഹം ചുവടെ കാണാം' : 'Here\'s a summary of your information'}
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <Card className="mb-6 shadow-card border-0">
          <div className="p-responsive">
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 mr-3 text-primary" />
              <h2 className={`text-xl font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {language === 'malayalam' ? 'വ്യക്തിഗത വിവരങ്ങൾ' : 'Personal Information'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'പേര്' : 'Name'}
                </label>
                <p className={`text-lg font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {farmerData.name}
                </p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'ഫോൺ നമ്പർ' : 'Phone Number'}
                </label>
                <p className="text-lg font-medium">{farmerData.phone}</p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'വയസ്സ്' : 'Age'}
                </label>
                <p className="text-lg font-medium">{farmerData.age}</p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'ലിംഗം' : 'Gender'}
                </label>
                <p className={`text-lg font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {farmerData.gender === 'male' ? (language === 'malayalam' ? 'പുരുഷൻ' : 'Male') :
                   farmerData.gender === 'female' ? (language === 'malayalam' ? 'സ്ത്രീ' : 'Female') :
                   (language === 'malayalam' ? 'മറ്റുള്ളവ' : 'Other')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Location Information */}
        <Card className="mb-6 shadow-card border-0">
          <div className="p-responsive">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 mr-3 text-primary" />
              <h2 className={`text-xl font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {language === 'malayalam' ? 'സ്ഥല വിവരങ്ങൾ' : 'Location Information'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'ഗ്രാമം' : 'Village'}
                </label>
                <p className={`text-lg font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {farmerData.village}
                </p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'പഞ്ചായത്ത്' : 'Panchayat'}
                </label>
                <p className={`text-lg font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {farmerData.panchayat}
                </p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'ജില്ല' : 'District'}
                </label>
                <p className={`text-lg font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {farmerData.district}
                </p>
              </div>

              {farmerData.gpsCoordinates && (
                <div>
                  <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'GPS സ്ഥാനം' : 'GPS Coordinates'}
                  </label>
                  <p className="text-lg font-medium">{farmerData.gpsCoordinates}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Farm Information */}
        <Card className="mb-6 shadow-card border-0">
          <div className="p-responsive">
            <div className="flex items-center mb-4">
              <Sprout className="w-6 h-6 mr-3 text-primary" />
              <h2 className={`text-xl font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {language === 'malayalam' ? 'കൃഷി വിവരങ്ങൾ' : 'Farm Information'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'ഭൂമിയുടെ വലുപ്പം' : 'Land Size'}
                </label>
                <p className="text-lg font-medium">{farmerData.landSize} acres</p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'മണ്ണിന്റെ തരം' : 'Soil Type'}
                </label>
                <p className={`text-lg font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {farmerData.soilType}
                </p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'ജലസേചന രീതി' : 'Irrigation Type'}
                </label>
                <p className={`text-lg font-medium ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {farmerData.irrigationType}
                </p>
              </div>

              <div>
                <label className={`text-sm font-medium text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'നിലവിലെ വിളകൾ' : 'Current Crops'}
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {farmerData.currentCrops && farmerData.currentCrops.length > 0 ? (
                    farmerData.currentCrops.map((crop: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-malayalam">
                        {crop}
                      </Badge>
                    ))
                  ) : (
                    <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'വിളകൾ വ്യക്തമാക്കിയിട്ടില്ല' : 'No crops specified'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Documents */}
        {farmerData.documents && farmerData.documents.length > 0 && (
          <Card className="mb-6 shadow-card border-0">
            <div className="p-responsive">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 mr-3 text-primary" />
                <h2 className={`text-xl font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                  {language === 'malayalam' ? 'അപ്‌ലോഡ് ചെയ്ത രേഖകൾ' : 'Uploaded Documents'}
                </h2>
              </div>

              <div className="space-y-2">
                {farmerData.documents.map((doc: File, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{doc.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {(doc.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'malayalam' ? 'തിരികെ' : 'Back to Home'}
          </Button>

          {farmerData.currentCrops && farmerData.currentCrops.length > 0 && (
            <Button onClick={handleGoToCropDetails} className="gradient-primary">
              {language === 'malayalam' ? 'വിളകളുടെ വിശദാംശങ്ങൾ കാണുക' : 'View Crop Details'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default UserDataSummary;