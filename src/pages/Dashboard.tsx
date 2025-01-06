import { useEffect } from 'react';
import { Stats } from '../components/dashboard/Stats';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { useDashboardStore } from '../store/dashboard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export default function Dashboard() {
  const { loading, error, fetchStats, fetchTransactions } = useDashboardStore();

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, [fetchStats, fetchTransactions]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => {
            fetchStats();
            fetchTransactions();
          }}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
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