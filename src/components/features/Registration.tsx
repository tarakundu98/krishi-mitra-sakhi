import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
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
    onComplete(formData);
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

  const cropOptions = [
    'നെൽ', 'വാഴ', 'കപ്പ', 'കുരുമുളക്', 'ഏലം', 'തെങ്ങ്', 
    'റബ്ബർ', 'കാപ്പി', 'ചായ', 'പച്ചക്കറികൾ'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Phone className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold text-malayalam">അടിസ്ഥാന വിവരങ്ങൾ</h2>
        <p className="text-muted-foreground text-malayalam">
          നിങ്ങളുടെ പേരും ബന്ധപ്പെടാനുള്ള വിവരങ്ങളും
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="phone" className="text-malayalam">മൊബൈൽ നമ്പർ *</Label>
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
          <Label htmlFor="name" className="text-malayalam">പൂർണ്ണ നാമം *</Label>
          <Input
            id="name"
            placeholder="നിങ്ങളുടെ പേര് എഴുതുക"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="text-lg text-malayalam"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age" className="text-malayalam">പ്രായം *</Label>
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
            <Label className="text-malayalam">ലിംഗം *</Label>
            <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="തിരഞ്ഞെടുക്കുക" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">പുരുഷൻ</SelectItem>
                <SelectItem value="female">സ്ത്രീ</SelectItem>
                <SelectItem value="other">മറ്റുള്ളവ</SelectItem>
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
        <h2 className="text-2xl font-bold text-malayalam">സ്ഥലത്തിന്റെ വിവരങ്ങൾ</h2>
        <p className="text-muted-foreground text-malayalam">
          നിങ്ങളുടെ കൃഷിയിടത്തിന്റെ സ്ഥലം
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="village" className="text-malayalam">ഗ്രാമം *</Label>
          <Input
            id="village"
            placeholder="നിങ്ങളുടെ ഗ്രാമത്തിന്റെ പേര്"
            value={formData.village}
            onChange={(e) => updateFormData('village', e.target.value)}
            className="text-lg text-malayalam"
          />
        </div>

        <div>
          <Label htmlFor="panchayat" className="text-malayalam">പഞ്ചായത്ത് *</Label>
          <Input
            id="panchayat"
            placeholder="പഞ്ചായത്തിന്റെ പേര്"
            value={formData.panchayat}
            onChange={(e) => updateFormData('panchayat', e.target.value)}
            className="text-lg text-malayalam"
          />
        </div>

        <div>
          <Label className="text-malayalam">ജില്ല</Label>
          <Select value={formData.district} onValueChange={(value) => updateFormData('district', value)}>
            <SelectTrigger className="text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="തിരുവനന്തപുരം">തിരുവനന്തപുരം</SelectItem>
              <SelectItem value="കൊല്ലം">കൊല്ലം</SelectItem>
              <SelectItem value="പത്തനംതിട്ട">പത്തനംതിട്ട</SelectItem>
              <SelectItem value="ആലപ്പുഴ">ആലപ്പുഴ</SelectItem>
              <SelectItem value="കോട്ടയം">കോട്ടയം</SelectItem>
              <SelectItem value="എറണാകുളം">എറണാകുളം</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="gps" className="text-malayalam">GPS കോർഡിനേറ്റ്സ് (ഓപ്ഷണൽ)</Label>
          <Input
            id="gps"
            placeholder="8.5241° N, 76.9366° E"
            value={formData.gpsCoordinates}
            onChange={(e) => updateFormData('gpsCoordinates', e.target.value)}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground mt-1">
            കൃത്യമായ കാലാവസ്ഥാ പ്രവചനത്തിന് സഹായിക്കുന്നു
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Sprout className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold text-malayalam">കൃഷിയിടത്തിന്റെ വിവരങ്ങൾ</h2>
        <p className="text-muted-foreground text-malayalam">
          നിങ്ങളുടെ കൃഷിയെക്കുറിച്ചുള്ള വിവരങ്ങൾ
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="landSize" className="text-malayalam">ഭൂമിയുടെ വിസ്തീർണ്ണം (ഏക്കർ) *</Label>
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
          <Label className="text-malayalam">മണ്ണിന്റെ തരം *</Label>
          <Select value={formData.soilType} onValueChange={(value) => updateFormData('soilType', value)}>
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="തിരഞ്ഞെടുക്കുക" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="കളിമണ്ണ്">കളിമണ്ണ്</SelectItem>
              <SelectItem value="മണൽമണ്ണ്">മണൽമണ്ണ്</SelectItem>
              <SelectItem value="കളിമണൽ">കളിമണൽ</SelectItem>
              <SelectItem value="ലാറ്ററൈറ്റ്">ലാറ്ററൈറ്റ്</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-malayalam">ജലസേചനം *</Label>
          <Select value={formData.irrigationType} onValueChange={(value) => updateFormData('irrigationType', value)}>
            <SelectTrigger className="text-lg">
              <SelectValue placeholder="തിരഞ്ഞെടുക്കുക" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="മഴ">മഴ (Rain-fed)</SelectItem>
              <SelectItem value="കിണർ">കിണർ</SelectItem>
              <SelectItem value="കുളം">കുളം</SelectItem>
              <SelectItem value="ഡ്രിപ്പ്">ഡ്രിപ്പ് ഇറിഗേഷൻ</SelectItem>
              <SelectItem value="സ്പ്രിംക്ലർ">സ്പ്രിംക്ലർ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-malayalam">നിലവിലെ വിളകൾ</Label>
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
        <h2 className="text-2xl font-bold text-malayalam">രേഖകളും സമ്മതവും</h2>
        <p className="text-muted-foreground text-malayalam">
          അവസാന ഘട്ടം - രേഖകൾ അപ്‌ലോഡ് ചെയ്ത് സമ്മതം നൽകുക
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-4 border-dashed border-2 border-muted">
          <div className="text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-malayalam text-sm text-muted-foreground mb-2">
              ഭൂമിയുടെ രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക (ഓപ്ഷണൽ)
            </p>
            <Button variant="outline" size="sm">
              ഫയലുകൾ തിരഞ്ഞെടുക്കുക
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={formData.privacyConsent}
              onCheckedChange={(checked) => updateFormData('privacyConsent', checked)}
            />
            <Label htmlFor="privacy" className="text-sm text-malayalam leading-relaxed">
              ഞാൻ <span className="text-primary underline cursor-pointer">സ്വകാര്യതാ നയം</span> വായിച്ചു 
              മനസ്സിലാക്കുകയും എന്റെ വ്യക്തിഗത വിവരങ്ങൾ സുരക്ഷിതമായി സൂക്ഷിക്കുമെന്ന് 
              വിശ്വസിക്കുകയും ചെയ്യുന്നു. *
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="dataUsage"
              checked={formData.dataUsageConsent}
              onCheckedChange={(checked) => updateFormData('dataUsageConsent', checked)}
            />
            <Label htmlFor="dataUsage" className="text-sm text-malayalam leading-relaxed">
              കൃഷി സഖി സേവനം മെച്ചപ്പെടുത്തുന്നതിനും വ്യക്തിഗതമാക്കിയ ഉപദേശങ്ങൾ 
              നൽകുന്നതിനുമായി എന്റെ ഡാറ്റ ഉപയോഗിക്കാൻ ഞാൻ സമ്മതിക്കുന്നു. *
            </Label>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-semibold text-malayalam mb-2">ഞങ്ങൾ എന്ത് ചെയ്യുന്നു:</h4>
          <ul className="text-sm text-malayalam space-y-1">
            <li>• നിങ്ങളുടെ വിവരങ്ങൾ മൂന്നാം കക്ഷികളുമായി പങ്കിടുന്നില്ല</li>
            <li>• എല്ലാ ഡാറ്റയും എൻക്രിപ്റ്റ് ചെയ്ത് സൂക്ഷിക്കുന്നു</li>
            <li>• നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും അക്കൗണ്ട് ഇല്ലാതാക്കാം</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              തിരികെ
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
            മുമ്പോട്ട്
          </Button>

          {step < totalSteps ? (
            <Button 
              onClick={nextStep}
              disabled={!isStepValid()}
              className="gradient-primary w-24"
            >
              അടുത്തത്
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="gradient-primary"
            >
              <Check className="w-4 h-4 mr-2" />
              പൂർത്തിയാക്കുക
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;