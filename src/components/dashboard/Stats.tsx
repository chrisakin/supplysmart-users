import { Wallet, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';
import { StatCard } from '../ui/StatCards';
import { useDashboardStore } from '../../store/dashboard';
import { formatCurrency } from '../../lib/utils';

export function Stats() {
  const { stats } = useDashboardStore();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard 
        icon={Wallet}
        label="Total Revenue"
        value={formatCurrency(stats.totalRevenue)}
      />
      <StatCard 
        icon={ArrowUpRight}
        label="Total Commission"
        value={formatCurrency(stats.totalCommission)}
      />
      <StatCard 
        icon={ArrowDownRight}
        label="Successful Transactions"
        value={stats.successfulTransactions}
      />
      <StatCard 
        icon={AlertCircle}
        label="Failed Transactions"
        value={stats.failedTransactions}
      />
    </div>
  );
}