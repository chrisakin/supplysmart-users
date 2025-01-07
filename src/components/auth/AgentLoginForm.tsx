import { useState } from 'react';
import { Phone, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validatePhoneNumber, validatePin } from '../../lib/validation';

export function AgentLoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [touched, setTouched] = useState({ phone: false, pin: false });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const isPhoneValid = validatePhoneNumber(phoneNumber);
  const isPinValid = validatePin(pin);
  const isFormValid = isPhoneValid && isPinValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      await login('agent', { phoneNumber, pin });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
            placeholder="e.g. 0816XXXXXX"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        {touched.phone && !isPhoneValid && (
          <p className="mt-1 text-sm text-red-500">Please enter a valid Nigerian phone number</p>
        )}
      </div>

      <div>
        <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
          PIN
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, pin: true }))}
            maxLength={6}
            placeholder="Enter your 6-digit PIN"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        {touched.pin && !isPinValid && (
          <p className="mt-1 text-sm text-red-500">PIN must be exactly 6 digits</p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <Link 
          to="/forgot-password/agent"
          className="text-sm text-emerald-600 hover:text-emerald-700"
        >
          Forgot PIN?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading || !isFormValid}
        className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}