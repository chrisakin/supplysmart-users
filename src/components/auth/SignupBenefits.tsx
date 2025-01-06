import { CircleDot } from 'lucide-react';

export function SignupBenefits() {
  const benefits = [
    'Connect all your asset and banking account into a single interface',
    'Track unlimited real-time transactions across asset and bank',
    'Get spot and historical prices from leading industry providers.',
  ];

  return (
    <div className="lg:mt-24 max-w-xl mx-auto lg:mx-0">
      <div className="space-y-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-4">
            <CircleDot className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
            <p className="text-xl text-gray-600 leading-relaxed">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}