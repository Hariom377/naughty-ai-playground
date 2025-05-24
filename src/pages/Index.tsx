
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AgeVerificationPage from './AgeVerificationPage';

const Index = () => {
  const navigate = useNavigate();

  const handleVerification = () => {
    navigate('/home');
  };

  return (
    <AgeVerificationPage onVerify={handleVerification} />
  );
};

export default Index;
