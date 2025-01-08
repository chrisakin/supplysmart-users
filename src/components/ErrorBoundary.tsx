import { useRouteError } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export function ErrorBoundary() {
  const error = useRouteError();
  const { user } = useAuthStore();
  
  const handleReturn = () => {
    if (user) {
      window.location.href = `/${user.type}/dashboard`;
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
        <button
          onClick={handleReturn}
          className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}