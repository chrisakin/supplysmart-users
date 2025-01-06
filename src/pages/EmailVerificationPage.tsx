import { useLocation, Navigate } from 'react-router-dom';
import { EmailVerification } from '../components/auth/EmailVerification';

export default function EmailVerificationPage() {
  const location = useLocation();
  const { email, type } = location.state || {};

  if (!email || !type) {
    return <Navigate to="/" replace />;
  }

  return <EmailVerification email={email} type={type} />;
}