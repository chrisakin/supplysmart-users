import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to: string;
  label?: string;
  className?: string;
}

export function BackButton({ to, label = 'Back', className = '' }: BackButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center text-gray-600 hover:text-gray-900 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Link>
  );
}