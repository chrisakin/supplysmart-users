import { useParams, Navigate, Link } from 'react-router-dom';
import { AgentLoginForm } from '../components/auth/AgentLoginForm';
import { AggregatorLoginForm } from '../components/auth/AggregatorLoginForm';
import { BackButton } from '../components/ui/BackButton';
import { images } from '../assets';

type LoginType = 'agent' | 'aggregator';

export default function Login() {
  const { type } = useParams<{ type: string }>();
  
  // Validate login type
  if (type !== 'agent' && type !== 'aggregator') {
    return <Navigate to="/" replace />;
  }

  const loginType: LoginType = type;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4">
        <BackButton to="/" />
      </div>
      
      <div className="flex-1 flex flex-col justify-center py-9 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <img src={images.logo} alt="SupplySmart" className="h-12 w-auto" />
          </div>
          <h2 className="mt-4 text-center text-2xl sm:text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {loginType === 'agent' ? <AgentLoginForm /> : <AggregatorLoginForm />}
            <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to={`/signup/${loginType}`} className="text-emerald-600 hover:text-emerald-500">
            Sign up
          </Link>
        </p>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}