import { CircleDot } from 'lucide-react';

export function SignupBenefits() {
  const benefits = [
    'Connect all your asset and banking account into a single interface',
    'Track unlimited real-time transactions across asset and bank',
    'Get spot and historical prices from leading industry providers.',
  ];

  return (
    <div className="lg:mt-[50px] max-w-xl mx-auto lg:mx-0">
    <div>
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <CircleDot className="w-6 h-6 rounded-xl text-[#FFFFFF] bg-emerald-500 flex-shrink-0 mt-1 " />
            {(index === 0 || index === 1) && (
              <svg className="my-8" width="5" height="89" viewBox="0 0 5 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.01172 1L2.00009 87.9999" stroke="#159896" stroke-opacity="0.7" stroke-width="3" stroke-dasharray="7 7"/>
              </svg>
            )}
          </div>
          <p className="text-xl text-gray-600 font-bold leading-relaxed">{benefit}</p>
        </div>
      ))}
    </div>
  </div>
  );
}