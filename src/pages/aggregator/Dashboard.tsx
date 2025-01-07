import { Stats } from '../../components/dashboard/Stats';
import { RevenueChart } from '../../components/dashboard/RevenueChart';
import { RecentTransactions } from '../../components/dashboard/RecentTransactions';

export default function AggregatorDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Aggregator Dashboard</h1>
        <p className="text-gray-500 mt-1">
          {new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      <Stats />

      <div className="my-8">
        <RevenueChart />
      </div>

      <RecentTransactions />
    </div>
  );
}