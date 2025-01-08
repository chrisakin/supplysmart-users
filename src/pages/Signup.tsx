import { useParams, Navigate } from 'react-router-dom';
import { SignupForm } from '../components/auth/SignupForm';
import { SignupBenefits } from '../components/auth/SignupBenefits';
import { BackButton } from '../components/ui/BackButton';
import { images } from '../assets';

export default function Signup() {
  const { type } = useParams<{ type: string }>();
  
  if (type !== 'agent' && type !== 'aggregator') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white fixed inset-0 overflow-hidden">
      <div className="p-4">
        <BackButton to="/" />
      </div>

      <div className="lg:max-w-8xl max-w-full mx-auto px-4 py-4 h-full flex flex-col">
        <div className="flex justify-center mb-8">
          <img src={images.logo} alt="SupplySmart" className="h-12 w-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start flex-grow overflow-hidden mb-4">
          <div className="overflow-auto h-full lg:px-8 custom-scrollbar">
            <SignupForm type={type as 'agent' | 'aggregator'} />
          </div>
          <span className='hidden lg:block'>
          <SignupBenefits  />
          </span>
        </div>
      </div>
    </div>
  );
}