import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, className = '' }: StatCardProps) {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-100">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-semibold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}