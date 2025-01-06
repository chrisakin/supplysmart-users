import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validatePhoneNumber, validatePin } from '../../lib/validation';
import { LocationSelect } from '../forms/LocationSelect';
import { getFCMToken } from '../../lib/firebase';
import { getDeviceIdentifier } from '../../lib/deviceIdentifier';

interface SignupFormProps {
  type: 'agent' | 'aggregator';
}

export function SignupForm({ type }: SignupFormProps) {
  const { signup, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    state: '',
    city: '',
    bvn: '',
    pin: '',
    password: '',
    proofOfAddress: null as File | null,
    passportPhoto: null as File | null,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const formDataObj = new FormData();
      
      // Add all form fields to FormData except password for agents
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          // Skip password field for agents
          if (type === 'agent' && key === 'password') return;
          // Skip pin field for aggregators
          if (type === 'aggregator' && key === 'pin') return;
          formDataObj.append(key, value);
        }
      });

      // Add FCM token and device identifier
      const fcmToken = await getFCMToken();
      const deviceIdentifier = getDeviceIdentifier();
      
      formDataObj.append('fcmToken', fcmToken);
      formDataObj.append('deviceIdentifier', deviceIdentifier);

      await signup(type, formDataObj);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    }
  };

  const isFormValid = () => {
    const baseValidation = 
      formData.name &&
      validatePhoneNumber(formData.phoneNumber) &&
      validateEmail(formData.email) &&
      formData.state &&
      formData.city &&
      formData.bvn &&
      formData.proofOfAddress &&
      formData.passportPhoto;

    if (type === 'agent') {
      return baseValidation && validatePin(formData.pin);
    }
    return baseValidation && validatePassword(formData.password);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm max-w-2xl mx-auto w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Complete the {type} Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={() => handleBlur('name')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            placeholder="e.g. 08012345678"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            onBlur={() => handleBlur('phoneNumber')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
          {touched.phoneNumber && !validatePhoneNumber(formData.phoneNumber) && (
            <p className="mt-1 text-sm text-red-500">Please enter a valid Nigerian phone number</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
          {touched.email && !validateEmail(formData.email) && (
            <p className="mt-1 text-sm text-red-500">Please enter a valid email address</p>
          )}
        </div>

        <LocationSelect
          state={formData.state}
          city={formData.city}
          onStateChange={(state) => setFormData(prev => ({ ...prev, state, city: '' }))}
          onCityChange={(city) => setFormData(prev => ({ ...prev, city }))}
        />

        <div>
          <label htmlFor="bvn" className="block text-sm font-medium text-gray-700 mb-1">
            BVN
          </label>
          <input
            id="bvn"
            type="text"
            name="bvn"
            placeholder="Enter your BVN"
            value={formData.bvn}
            onChange={handleInputChange}
            onBlur={() => handleBlur('bvn')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        {type === 'agent' ? (
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              name="pin"
              maxLength={6}
              placeholder="Create a 6-digit PIN"
              value={formData.pin}
              onChange={handleInputChange}
              onBlur={() => handleBlur('pin')}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            {touched.pin && !validatePin(formData.pin) && (
              <p className="mt-1 text-sm text-red-500">PIN must be exactly 6 digits</p>
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => handleBlur('password')}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            {touched.password && !validatePassword(formData.password) && (
              <p className="mt-1 text-sm text-red-500">Password must be at least 6 characters</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Proof of Address
              </span>
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                <span className="text-gray-500">
                  {formData.proofOfAddress ? formData.proofOfAddress.name : 'Upload utility bill'}
                </span>
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="file"
                name="proofOfAddress"
                onChange={handleInputChange}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                required
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Passport Photo
              </span>
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                <span className="text-gray-500">
                  {formData.passportPhoto ? formData.passportPhoto.name : 'Upload passport photo'}
                </span>
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="file"
                name="passportPhoto"
                onChange={handleInputChange}
                className="hidden"
                accept=".jpg,.jpeg,.png"
                required
              />
            </label>
          </div>
        </div>

        <div className="flex items-start mt-6">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I acknowledge that I have read and accept the{' '}
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid()}
          className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}