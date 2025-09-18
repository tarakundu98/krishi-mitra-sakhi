import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import LanguageToggle from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Phone, 
  User, 
  MapPin, 
  Sprout, 
  Upload,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';

interface RegistrationProps {
  onComplete?: (farmerData: any) => void;
  onBack?: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ 
  onComplete = () => {},
  onBack = () => {}
}) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Contact & Basic Info
    phone: '',
    name: '',
    age: '',
    gender: '',
    
    // Step 2: Location
    village: '',
    panchayat: '',
    district: 'തിരുവനന്തപുരം',
    gpsCoordinates: '',
    
    // Step 3: Farm Details
    landSize: '',
    soilType: '',
    irrigationType: '',
    currentCrops: [] as string[],
    
    // Step 4: Documents & Consent
    documents: [] as File[],
    privacyConsent: false,
    dataUsageConsent: false
  });

  const totalSteps = 4;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Ensure all required fields are filled
    if (!formData.name || !formData.phone || !formData.age || !formData.gender || 
        !formData.village || !formData.panchayat || !formData.district ||
        !formData.landSize || !formData.soilType || !formData.irrigationType) {
      alert(language === 'malayalam' ? 'ദയവായി എല്ലാ ആവശ്യമായ വിവരങ്ങളും പൂരിപ്പിക്കുക' : 'Please fill all required fields');
      return;
    }
    
    // Call the onComplete callback to navigate to dashboard
    if (onComplete) {
      onComplete(formData);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.phone && formData.name && formData.age && formData.gender;
      case 2:
        return formData.village && formData.panchayat;
      case 3:
        return formData.landSize && formData.soilType && formData.irrigationType;
      case 4:
        return formData.privacyConsent && formData.dataUsageConsent;
      default:
        return false;
    }
  };

  const cropOptions = language === 'malayalam' ? [
    'നെൽ', 'വാഴ', 'കപ്പ', 'കുരുമുളക്', 'ഏലം', 'തെങ്ങ്', 
    'റബ്ബർ', 'കാപ്പി', 'ചായ', 'പച്ചക്കറികൾ'
  ] : [
    'Rice', 'Banana', 'Tapioca', 'Pepper', 'Cardamom', 'Coconut',
    'Rubber', 'Coffee', 'Tea', 'Vegetables'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Phone className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className={`text-2xl font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step1.title')}
        </h2>
        <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step1.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="phone" className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.phone')} *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="9876543210"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="text-lg"
          />
        </div>

        <div>
          <Label htmlFor="name" className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.name')} *</Label>
          <Input
            id="name"
            placeholder={language === 'malayalam' ? 'നിങ്ങളുടെ പേര് എഴുതുക' : 'Enter your full name'}
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className={`text-lg ${language === 'malayalam' ? 'text-malayalam' : ''}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age" className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.age')} *</Label>
            <Input
              id="age"
              type="number"
              placeholder="35"
              value={formData.age}
              onChange={(e) => updateFormData('age', e.target.value)}
              className="text-lg"
            />
          </div>

          <div>
            <Label className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.gender')} *</Label>
            <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
              <SelectTrigger className="text-lg">
                <SelectValue placeholder={t('registration.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t('registration.male')}</SelectItem>
                <SelectItem value="female">{t('registration.female')}</SelectItem>
                <SelectItem value="other">{t('registration.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className={`text-2xl font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step2.title')}
        </h2>
        <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step2.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="village" className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.village')} *</Label>
          <Input
            id="village"
            placeholder={language === 'malayalam' ? 'നിങ്ങളുടെ ഗ്രാമത്തിന്റെ പേര്' : 'Enter your village name'}
            value={formData.village}
            onChange={(e) => updateFormData('village', e.target.value)}
            className={`text-lg ${language === 'malayalam' ? 'text-malayalam' : ''}`}
          />
        </div>

        <div>
          <Label htmlFor="panchayat" className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.panchayat')} *</Label>
          <Input
            id="panchayat"
            placeholder={language === 'malayalam' ? 'പഞ്ചായത്തിന്റെ പേര്' : 'Enter your panchayat name'}
            value={formData.panchayat}
            onChange={(e) => updateFormData('panchayat', e.target.value)}
            className={`text-lg ${language === 'malayalam' ? 'text-malayalam' : ''}`}
          />
        </div>

        <div>
          <Label className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.district')}</Label>
          <Select value={formData.district} onValueChange={(value) => updateFormData('district', value)}>
            <SelectTrigger className="text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {language === 'malayalam' ? (
                <>
                  <SelectItem value="തിരുവനന്തപുരം">തിരുവനന്തപുരം</SelectItem>
                  <SelectItem value="കൊല്ലം">കൊല്ലം</SelectItem>
                  <SelectItem value="പത്തനംതിട്ട">പത്തനംതിട്ട</SelectItem>
                  <SelectItem value="ആലപ്പുഴ">ആലപ്പുഴ</SelectItem>
                  <SelectItem value="കോട്ടയം">കോട്ടയം</SelectItem>
                  <SelectItem value="ഇടുക്കി">ഇടുക്കി</SelectItem>
                  <SelectItem value="എറണാകുളം">എറണാകുളം</SelectItem>
                  <SelectItem value="തൃശൂർ">തൃശൂർ</SelectItem>
                  <SelectItem value="പാലക്കാട്">പാലക്കാട്</SelectItem>
                  <SelectItem value="മലപ്പുറം">മലപ്പുറം</SelectItem>
                  <SelectItem value="കോഴിക്കോട്">കോഴിക്കോട്</SelectItem>
                  <SelectItem value="വയനാട്">വയനാട്</SelectItem>
                  <SelectItem value="കണ്ണൂർ">കണ്ണൂർ</SelectItem>
                  <SelectItem value="കാസർഗോഡ്">കാസർഗോഡ്</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="Thiruvananthapuram">Thiruvananthapuram</SelectItem>
                  <SelectItem value="Kollam">Kollam</SelectItem>
                  <SelectItem value="Pathanamthitta">Pathanamthitta</SelectItem>
                  <SelectItem value="Alappuzha">Alappuzha</SelectItem>
                  <SelectItem value="Kottayam">Kottayam</SelectItem>
                  <SelectItem value="Idukki">Idukki</SelectItem>
                  <SelectItem value="Ernakulam">Ernakulam</SelectItem>
                  <SelectItem value="Thrissur">Thrissur</SelectItem>
                  <SelectItem value="Palakkad">Palakkad</SelectItem>
                  <SelectItem value="Malappuram">Malappuram</SelectItem>
                  <SelectItem value="Kozhikode">Kozhikode</SelectItem>
                  <SelectItem value="Wayanad">Wayanad</SelectItem>
                  <SelectItem value="Kannur">Kannur</SelectItem>
                  <SelectItem value="Kasaragod">Kasaragod</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="gps" className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.gps')}</Label>
          <Input
            id="gps"
            placeholder="8.5241° N, 76.9366° E"
            value={formData.gpsCoordinates}
            onChange={(e) => updateFormData('gpsCoordinates', e.target.value)}
            className="text-lg"
          />
          <p className={`text-xs text-muted-foreground mt-1 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
            {language === 'malayalam' ? 'കൃത്യമായ കാലാവസ്ഥാ പ്രവചനത്തിന് സഹായിക്കുന്നു' : 'Helps provide accurate weather forecasts'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Sprout className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className={`text-2xl font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step3.title')}
        </h2>
        <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step3.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="landSize" className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.landSize')} *</Label>
          <Input
            id="landSize"
            type="number"
            step="0.1"
            placeholder="2.5"
            value={formData.landSize}
            onChange={(e) => updateFormData('landSize', e.target.value)}
            className="text-lg"
          />
        </div>

        <div>
          <Label className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.soilType')} *</Label>
          <Select value={formData.soilType} onValueChange={(value) => updateFormData('soilType', value)}>
            <SelectTrigger className="text-lg">
              <SelectValue placeholder={t('registration.select')} />
            </SelectTrigger>
            <SelectContent>
              {language === 'malayalam' ? (
                <>
                  <SelectItem value="കളിമണ്ണ്">കളിമണ്ണ്</SelectItem>
                  <SelectItem value="മണൽമണ്ണ്">മണൽമണ്ണ്</SelectItem>
                  <SelectItem value="കളിമണൽ">കളിമണൽ</SelectItem>
                  <SelectItem value="ലാറ്ററൈറ്റ്">ലാറ്ററൈറ്റ്</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="Clay">Clay</SelectItem>
                  <SelectItem value="Sandy">Sandy</SelectItem>
                  <SelectItem value="Loam">Loam</SelectItem>
                  <SelectItem value="Laterite">Laterite</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.irrigation')} *</Label>
          <Select value={formData.irrigationType} onValueChange={(value) => updateFormData('irrigationType', value)}>
            <SelectTrigger className="text-lg">
              <SelectValue placeholder={t('registration.select')} />
            </SelectTrigger>
            <SelectContent>
              {language === 'malayalam' ? (
                <>
                  <SelectItem value="മഴ">മഴ (Rain-fed)</SelectItem>
                  <SelectItem value="കിണർ">കിണർ</SelectItem>
                  <SelectItem value="കുളം">കുളം</SelectItem>
                  <SelectItem value="ഡ്രിപ്പ്">ഡ്രിപ്പ് ഇറിഗേഷൻ</SelectItem>
                  <SelectItem value="സ്പ്രിംക്ലർ">സ്പ്രിംക്ലർ</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="Rain-fed">Rain-fed</SelectItem>
                  <SelectItem value="Well">Well</SelectItem>
                  <SelectItem value="Pond">Pond</SelectItem>
                  <SelectItem value="Drip Irrigation">Drip Irrigation</SelectItem>
                  <SelectItem value="Sprinkler">Sprinkler</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className={language === 'malayalam' ? 'text-malayalam' : ''}>{t('registration.currentCrops')}</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {cropOptions.map((crop) => (
              <div key={crop} className="flex items-center space-x-2">
                <Checkbox
                  id={crop}
                  checked={formData.currentCrops.includes(crop)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFormData('currentCrops', [...formData.currentCrops, crop]);
                    } else {
                      updateFormData('currentCrops', formData.currentCrops.filter(c => c !== crop));
                    }
                  }}
                />
                <Label htmlFor={crop} className="text-malayalam cursor-pointer">
                  {crop}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className={`text-2xl font-bold ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step4.title')}
        </h2>
        <p className={`text-muted-foreground ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
          {t('registration.step4.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-4 border-dashed border-2 border-muted">
          <div className="text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className={`text-sm text-muted-foreground mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {language === 'malayalam' ? 'ഭൂമിയുടെ രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക (ഓപ്ഷണൽ)' : 'Upload land documents (Optional)'}
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                updateFormData('documents', files);
              }}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {language === 'malayalam' ? 'ഫയലുകൾ തിരഞ്ഞെടുക്കുക' : 'Choose Files'}
            </Button>
            {formData.documents.length > 0 && (
              <p className={`text-xs text-green-600 mt-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
                {language === 'malayalam' 
                  ? `${formData.documents.length} ഫയൽ(കൾ) തിരഞ്ഞെടുത്തു` 
                  : `${formData.documents.length} file(s) selected`}
              </p>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={formData.privacyConsent}
              onCheckedChange={(checked) => updateFormData('privacyConsent', checked)}
            />
            <Label htmlFor="privacy" className={`text-sm leading-relaxed ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {language === 'malayalam' 
                ? 'ഞാൻ സ്വകാര്യതാ നയം വായിച്ചു മനസ്സിലാക്കുകയും എന്റെ വ്യക്തിഗത വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിക്കുമെന്ന് വിശ്വസിക്കുകയും ചെയ്യുന്നു.'
                : 'I have read and understood the privacy policy and trust that my personal information will be stored securely.'} *
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="dataUsage"
              checked={formData.dataUsageConsent}
              onCheckedChange={(checked) => updateFormData('dataUsageConsent', checked)}
            />
            <Label htmlFor="dataUsage" className={`text-sm leading-relaxed ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
              {language === 'malayalam'
                ? 'കൃഷി മിത്ര സേവനം മെച്ചപ്പെടുത്തുന്നതിനും വ്യക്തിഗതമാക്കിയ ഉപദേശങ്ങൾ നൽകുന്നതിനുമായി എന്റെ ഡാറ്റ ഉപയോഗിക്കാൻ ഞാൻ സമ്മതിക്കുന്നു.'
                : 'I agree to use my data to improve Krishi Mitra service and provide personalized advice.'} *
            </Label>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className={`font-semibold mb-2 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
            {language === 'malayalam' ? 'ഞങ്ങൾ എന്ത് ചെയ്യുന്നു:' : 'What we do:'}
          </h4>
          <ul className={`text-sm space-y-1 ${language === 'malayalam' ? 'text-malayalam' : ''}`}>
            {language === 'malayalam' ? (
              <>
                <li>• നിങ്ങളുടെ വിവരങ്ങൾ മൂന്നാം കക്ഷികളുമായി പങ്കിടുന്നില്ല</li>
                <li>• എല്ലാ ഡാറ്റയും എൻക്രിപ്റ്റ് ചെയ്ത് സൂക്ഷിക്കുന്നു</li>
                <li>• നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും അക്കൗണ്ട് ഇല്ലാതാക്കാം</li>
              </>
            ) : (
              <>
                <li>• We do not share your information with third parties</li>
                <li>• All data is encrypted and stored securely</li>
                <li>• You can delete your account anytime</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      {/* Language Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('registration.back')}
            </Button>
            <span className="text-sm text-muted-foreground">
              {step} / {totalSteps}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-card border-0">
          <div className="p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1}
            className="w-24"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('registration.previous')}
          </Button>

          {step < totalSteps ? (
            <Button 
              onClick={nextStep}
              disabled={!isStepValid()}
              className="gradient-primary w-24"
            >
              {t('registration.next')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="gradient-primary"
            >
              <Check className="w-4 h-4 mr-2" />
              {t('registration.complete')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;