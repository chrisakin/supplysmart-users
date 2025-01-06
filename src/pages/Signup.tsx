import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <div className="p-4">
        <BackButton to="/" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="flex justify-center mb-8">
          <img src={images.logo} alt="SupplySmart" className="h-12 w-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <SignupForm type={type as 'agent' | 'aggregator'} />
          <SignupBenefits />
        </div>
      </div>
    </div>
  );
}