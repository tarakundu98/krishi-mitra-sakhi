import React from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from '@/components/features/Registration';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleRegistrationComplete = (data: any) => {
    // Navigate to user summary with the data
    navigate('/user-summary', { state: { farmerData: data } });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Registration
      onComplete={handleRegistrationComplete}
      onBack={handleBack}
    />
  );
};

export default RegistrationPage;