import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, className = '' }: StatCardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-emerald-100">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}