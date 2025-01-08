import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';
import { images, icons } from '../assets';

export default function PreLogin() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src={images.logo} alt="SupplySmart" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-64px)]">
        <div className="hidden lg:flex w-1/2 bg-[#1fc18833] items-center justify-center relative">
          <div className="absolute inset-0 flex items-start justify-center z-10 pt-20">
            <div className="max-w-lg text-center">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                We go wherever you lead us
              </h1>
              <p className="text-xl text-gray-700">
                You're good to go. All you ever need from a bank is in your hand, within reach.
              </p>
            </div>
          </div>
          <div className="mt-48">
            <icons.EmptyStateIcon className="w-[448px] h-[422px] opacity-50" />
          </div>
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#1fc18833] to-transparent" />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
          <div className="max-w-lg w-full">
            <div className="lg:hidden text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                We go wherever you lead us
              </h1>
              <p className="text-gray-600 text-lg">
                You're good to go. All you ever need from a bank is in your hand, within reach.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold text-center mb-8">
                {isSignup ? 'Choose account type' : 'Choose your preferred service'}
              </h2>
              <div className="space-y-4">
                <Link
                  to={isSignup ? '/signup/agent' : '/login/agent'}
                  className="flex items-center justify-between w-full px-6 py-4 border-2 border-emerald-500 rounded-xl text-emerald-500 hover:bg-emerald-50 transition-all duration-200 group hover:shadow-md"
                >
                  <span className="font-medium">
                    {isSignup ? 'Become an agent' : 'Sign in as agent'}
                  </span>
                  <Box className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-200" />
                </Link>
                <Link
                  to={isSignup ? '/signup/aggregator' : '/login/aggregator'}
                  className="flex items-center justify-between w-full px-6 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-200 group hover:shadow-md"
                >
                  <span className="font-medium">
                    {isSignup ? 'Become an aggregator' : 'Sign in as aggregator'}
                  </span>
                  <Box className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-200" />
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                  <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-emerald-600 hover:text-emerald-500 font-medium"
                  >
                    {isSignup ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}