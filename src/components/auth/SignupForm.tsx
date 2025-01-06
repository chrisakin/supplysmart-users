import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../lib/validation';

interface SignupFormProps {
  type: 'agent' | 'aggregator';
}

export function SignupForm({ type }: SignupFormProps) {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    state: '',
    city: '',
    email: '',
    bvn: '',
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
    try {
      await signup(type, formData);
      navigate(`/${type}/dashboard`);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      validatePhoneNumber(formData.phoneNumber) &&
      formData.state &&
      formData.city &&
      validateEmail(formData.email) &&
      formData.bvn &&
      validatePassword(formData.password) &&
      formData.proofOfAddress &&
      formData.passportPhoto
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm max-w-xl mx-auto lg:mx-0 w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Complete the {type} Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={() => handleBlur('fullName')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            onBlur={() => handleBlur('phoneNumber')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            onBlur={() => handleBlur('state')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            onBlur={() => handleBlur('city')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur('email')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="bvn"
            placeholder="BVN"
            value={formData.bvn}
            onChange={handleInputChange}
            onBlur={() => handleBlur('bvn')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={() => handleBlur('password')}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
              <span className="text-gray-500">
                {formData.proofOfAddress ? formData.proofOfAddress.name : 'Proof of Address (Utility bills)'}
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

          <label className="block">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
              <span className="text-gray-500">
                {formData.passportPhoto ? formData.passportPhoto.name : 'Passport Photo'}
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

        <div className="flex items-start mt-6">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I acknowledge that have read and do hereby accept the terms and conditions in the secsystem{' '}
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              Terms Of Use Merchant Agreement
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
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading ? 'Creating Account...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}