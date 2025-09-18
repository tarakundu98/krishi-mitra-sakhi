import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LanguageToggle from '@/components/ui/language-toggle';
import NavigationSidebar from '@/components/ui/navigation-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sprout,
  ArrowLeft,
  Droplets,
  Sun,
  Thermometer,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

const CropDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Get farmer data from location state
  const farmerData = location.state?.farmerData;
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  if (!farmerData || !farmerData.currentCrops || farmerData.currentCrops.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No Crops Found</h2>
          <p className="text-muted-foreground mb-6">Please complete registration with crop information first.</p>
          <Button onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate('/user-summary', { state: { farmerData } });
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard', { state: { farmerData } });
  };

  // Mock crop data - in a real app, this would come from an API
  const getCropDetails = (cropName: string) => {
    const cropData: Record<string, any> = {
      'Rice': {
        name: 'Rice',
        malayalamName: 'നെൽ',
        season: 'Monsoon (June-September)',
        malayalamSeason: 'മൺസൂൺ (ജൂൺ-സെപ്റ്റംബർ)',
        waterRequirement: 'High',
        malayalamWater: 'ഉയർന്നത്',
        temperature: '25-35°C',
        soilType: 'Clay/Loam',
        malayalamSoil: 'കളിമണ്ണ്/ലോം',
        duration: '120-150 days',
        malayalamDuration: '120-150 ദിവസം',
        pests: ['Stem borer', 'Brown plant hopper', 'Rice bug'],
        malayalamPests: ['സ്റ്റെം ബോറർ', 'ബ്രൗൺ പ്ലാന്റ് ഹോപ്പർ', 'റൈസ് ബഗ്'],
        diseases: ['Bacterial blight', 'Rice blast', 'Sheath blight'],
        malayalamDiseases: ['ബാക്ടീരിയൽ ബ്ലൈറ്റ്', 'റൈസ് ബ്ലാസ്റ്റ്', 'ഷീത്ത് ബ്ലൈറ്റ്'],
        tips: [
          'Ensure proper water management',
          'Apply fertilizers at right time',
          'Monitor for pest attacks regularly',
          'Harvest when grains are golden yellow'
        ],
        malayalamTips: [
          'നല്ല വെള്ള ക്രമീകരണം ഉറപ്പാക്കുക',
          'ശരിയായ സമയത്ത് ഫെർട്ടിലൈസർ പ്രയോഗിക്കുക',
          'പ്രതിദിനം കീടാക്രമണങ്ങൾ നിരീക്ഷിക്കുക',
          'ധാന്യങ്ങൾ സ്വർണ്ണ മഞ്ഞയായിരിക്കുമ്പോൾ കൊയ്യുക'
        ]
      },
      'Banana': {
        name: 'Banana',
        malayalamName: 'വാഴ',
        season: 'Year-round',
        malayalamSeason: 'വർഷം മുഴുവൻ',
        waterRequirement: 'High',
        malayalamWater: 'ഉയർന്നത്',
        temperature: '26-30°C',
        soilType: 'Rich loamy soil',
        malayalamSoil: 'സമ്പന്നമായ ലോമി മണ്ണ്',
        duration: '9-12 months',
        malayalamDuration: '9-12 മാസം',
        pests: ['Banana weevil', 'Nematodes', 'Aphids'],
        malayalamPests: ['ബനാന വീവിൽ', 'നിമറ്റോഡുകൾ', 'അഫിഡുകൾ'],
        diseases: ['Panama disease', 'Black sigatoka', 'Bunchy top'],
        malayalamDiseases: ['പനാമ രോഗം', 'ബ്ലാക്ക് സിഗാറ്റോക്ക', 'ബഞ്ചി ടോപ്പ്'],
        tips: [
          'Plant in well-drained soil',
          'Provide adequate spacing',
          'Regular irrigation during dry periods',
          'Remove dead leaves regularly'
        ],
        malayalamTips: [
          'നന്നായി ഡ്രെയ്ൻ ചെയ്ത മണ്ണിൽ നടുക',
          'മതിയായ അകലം നൽകുക',
          'വരണ്ട കാലങ്ങളിൽ പതിവ് ജലസേചനം',
          'മരിച്ച ഇലകൾ പതിവായി നീക്കം ചെയ്യുക'
        ]
      },
      'Coconut': {
        name: 'Coconut',
        malayalamName: 'തെങ്ങ്',
        season: 'Year-round',
        malayalamSeason: 'വർഷം മുഴുവൻ',
        waterRequirement: 'Medium',
        malayalamWater: 'ഇടത്തരം',
        temperature: '27-35°C',
        soilType: 'Sandy loam',
        malayalamSoil: 'മണൽ ലോം',
        duration: '5-6 years to first yield',
        malayalamDuration: 'ആദ്യ വിളവിന് 5-6 വർഷം',
        pests: ['Red palm weevil', 'Rhinoceros beetle', 'Scale insects'],
        malayalamPests: ['റെഡ് പാം വീവിൽ', 'റൈനോസെറോസ് ബീറ്റിൽ', 'സ്കെയിൽ കീടങ്ങൾ'],
        diseases: ['Bud rot', 'Leaf blight', 'Stem bleeding'],
        malayalamDiseases: ['ബഡ് റോട്ട്', 'ലീഫ് ബ്ലൈറ്റ്', 'സ്റ്റെം ബ്ലീഡിംഗ്'],
        tips: [
          'Plant during monsoon season',
          'Maintain proper spacing (7.5m x 7.5m)',
          'Apply organic manure regularly',
          'Protect from strong winds'
        ],
        malayalamTips: [
          'മൺസൂൺ കാലത്ത് നടുക',
          'ശരിയായ അകലം പാലിക്കുക (7.5m x 7.5m)',
          'ജൈവ വളം പതിവായി പ്രയോഗിക്കുക',
          'ശക്തമായ കാറ്റിൽ നിന്ന് സംരക്ഷിക്കുക'
        ]
      }
    };

    // Try exact match first
    if (cropData[cropName]) {
      return cropData[cropName];
    }

    // Try case-insensitive match
    const lowerCropName = cropName.toLowerCase();
    for (const key of Object.keys(cropData)) {
      if (key.toLowerCase() === lowerCropName) {
        return cropData[key];
      }
    }

    // Try partial matches
    for (const key of Object.keys(cropData)) {
      if (key.toLowerCase().includes(lowerCropName) || lowerCropName.includes(key.toLowerCase())) {
        return cropData[key];
      }
    }

    // Default crop data for unknown crops
    return {
      name: cropName,
      malayalamName: cropName,
      season: 'Information not available',
      malayalamSeason: 'വിവരങ്ങൾ ലഭ്യമല്ല',
      waterRequirement: 'Medium',
      malayalamWater: 'ഇടത്തരം',
      temperature: 'Varies',
      soilType: 'Well-drained soil',
      malayalamSoil: 'നന്നായി ഡ്രെയ്ൻ ചെയ്ത മണ്ണ്',
      duration: 'Varies',
      malayalamDuration: 'വ്യത്യാസപ്പെടുന്നു',
      pests: ['General pests'],
      malayalamPests: ['സാധാരണ കീടങ്ങൾ'],
      diseases: ['Common diseases'],
      malayalamDiseases: ['സാധാരണ രോഗങ്ങൾ'],
      tips: ['Consult local agricultural experts for specific guidance'],
      malayalamTips: ['പ്രത്യേക മാർഗനിർദേശത്തിനായി പ്രാദേശിക കാർഷിക വിദഗ്ധരെ സമീപിക്കുക']
    };
  };

  const selectedCropData = selectedCrop ? getCropDetails(selectedCrop) : null;

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
                  {language === 'malayalam' ? 'തിരികെ' : 'Back to Summary'}
                </Button>

                <div className="text-center">
                  <Sprout className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h1 className={`text-3xl font-bold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'വിളകളുടെ വിശദാംശങ്ങൾ' : 'Crop Details'}
                  </h1>
                  <p className={`text-lg text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'നിങ്ങളുടെ വിളകളെക്കുറിച്ചുള്ള വിശദമായ വിവരങ്ങൾ' : 'Detailed information about your crops'}
                  </p>
                </div>
              </div>

              {/* Crop Selection */}
              <Card className="mb-6 shadow-card border-0">
                <div className="p-responsive">
                  <h2 className={`text-xl font-semibold mb-4 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                    {language === 'malayalam' ? 'നിങ്ങളുടെ വിളകൾ' : 'Your Crops'}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {farmerData.currentCrops.map((crop: string, index: number) => (
                      <Button
                        key={index}
                        variant={selectedCrop === crop ? "default" : "outline"}
                        onClick={() => setSelectedCrop(crop)}
                        className={`text-malayalam ${selectedCrop === crop ? 'gradient-primary' : ''}`}
                      >
                        {crop}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Crop Details Display */}
              {!selectedCrop && (
                <Card className="shadow-card border-0">
                  <div className="p-responsive text-center">
                    <Sprout className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
                    <h3 className={`text-xl font-semibold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'ഒരു വിള തിരഞ്ഞെടുക്കുക' : 'Select a Crop'}
                    </h3>
                    <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                      {language === 'malayalam' ? 'വിശദമായ വിവരങ്ങൾ കാണാൻ മുകളിൽ നിന്ന് ഒരു വിള തിരഞ്ഞെടുക്കുക' : 'Choose a crop from above to see detailed information'}
                    </p>
                  </div>
                </Card>
              )}

              {selectedCrop && selectedCropData && (
                <Card className="shadow-card border-0">
                  <div className="p-responsive">
                    <div className="flex items-center mb-6">
                      <Sprout className="w-8 h-8 mr-3 text-primary" />
                      <div>
                        <h2 className={`text-2xl font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? selectedCropData.malayalamName : selectedCropData.name}
                        </h2>
                        <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                          {language === 'malayalam' ? selectedCropData.malayalamSeason : selectedCropData.season}
                        </p>
                      </div>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview" className={language === 'malayalam' ? 'text-malayalam' : ''}>
                          {language === 'malayalam' ? 'അവലോകനം' : 'Overview'}
                        </TabsTrigger>
                        <TabsTrigger value="care" className={language === 'malayalam' ? 'text-malayalam' : ''}>
                          {language === 'malayalam' ? 'പരിചരണം' : 'Care'}
                        </TabsTrigger>
                        <TabsTrigger value="pests" className={language === 'malayalam' ? 'text-malayalam' : ''}>
                          {language === 'malayalam' ? 'കീടങ്ങൾ' : 'Pests'}
                        </TabsTrigger>
                        <TabsTrigger value="diseases" className={language === 'malayalam' ? 'text-malayalam' : ''}>
                          {language === 'malayalam' ? 'രോഗങ്ങൾ' : 'Diseases'}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                              <Droplets className="w-6 h-6 mr-3 text-blue-600" />
                              <div>
                                <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {language === 'malayalam' ? 'വെള്ളത്തിന്റെ ആവശ്യം' : 'Water Requirement'}
                                </h4>
                                <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {language === 'malayalam' ? selectedCropData.malayalamWater : selectedCropData.waterRequirement}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                              <Thermometer className="w-6 h-6 mr-3 text-orange-600" />
                              <div>
                                <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {language === 'malayalam' ? 'താപനില' : 'Temperature'}
                                </h4>
                                <p className="text-muted-foreground">
                                  {selectedCropData.temperature}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center p-4 bg-green-50 rounded-lg">
                              <Sun className="w-6 h-6 mr-3 text-green-600" />
                              <div>
                                <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {language === 'malayalam' ? 'മണ്ണിന്റെ തരം' : 'Soil Type'}
                                </h4>
                                <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {language === 'malayalam' ? selectedCropData.malayalamSoil : selectedCropData.soilType}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                              <Calendar className="w-6 h-6 mr-3 text-purple-600" />
                              <div>
                                <h4 className={`font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {language === 'malayalam' ? 'കാലാവധി' : 'Duration'}
                                </h4>
                                <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                  {language === 'malayalam' ? selectedCropData.malayalamDuration : selectedCropData.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="care" className="mt-6">
                        <div className="bg-green-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                            <h3 className={`text-lg font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                              {language === 'malayalam' ? 'പരിചരണ നിർദേശങ്ങൾ' : 'Care Instructions'}
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {(language === 'malayalam' ? selectedCropData.malayalamTips : selectedCropData.tips).map((tip: string, index: number) => (
                              <li key={index} className={`flex items-start ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                                <CheckCircle className="w-5 h-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="pests" className="mt-6">
                        <div className="bg-yellow-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <AlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
                            <h3 className={`text-lg font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                              {language === 'malayalam' ? 'സാധാരണ കീടങ്ങൾ' : 'Common Pests'}
                            </h3>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            {(language === 'malayalam' ? selectedCropData.malayalamPests : selectedCropData.pests).map((pest: string, index: number) => (
                              <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                                <AlertTriangle className="w-5 h-5 mr-3 text-yellow-600" />
                                <span className={language === 'malayalam' ? 'text-malayalam' : ''}>{pest}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="diseases" className="mt-6">
                        <div className="bg-red-50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Info className="w-6 h-6 mr-3 text-red-600" />
                            <h3 className={`text-lg font-semibold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                              {language === 'malayalam' ? 'സാധാരണ രോഗങ്ങൾ' : 'Common Diseases'}
                            </h3>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            {(language === 'malayalam' ? selectedCropData.malayalamDiseases : selectedCropData.diseases).map((disease: string, index: number) => (
                              <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                                <Info className="w-5 h-5 mr-3 text-red-600" />
                                <span className={language === 'malayalam' ? 'text-malayalam' : ''}>{disease}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <Button variant="outline" onClick={handleGoBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'malayalam' ? 'തിരികെ' : 'Back to Summary'}
                </Button>

                <Button onClick={handleGoToDashboard} className="gradient-primary">
                  {language === 'malayalam' ? 'ഡാഷ്ബോർഡിലേക്ക് പോകുക' : 'Go to Dashboard'}
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CropDetails;