import { useEffect } from 'react';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';
import { useTerminalsStore } from '../store/terminals';
import { useUserType } from '../hooks/useUserType';
import { usePagination } from '../hooks/usePagination';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Pagination } from '../components/ui/Pagination';
import { formatDate } from '../lib/utils';

export default function Terminals() {
  const userType = useUserType();
  const { terminals, stats, meta, loading, error, fetchTerminals, fetchStats } = useTerminalsStore();
  const { page, setPage, getPaginationParams } = usePagination(10);

  useEffect(() => {
    fetchTerminals(userType, getPaginationParams());
    fetchStats(userType);
  }, [userType, page, fetchTerminals, fetchStats]);

  if (loading && !terminals.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Terminals</h1>
      <p className="text-gray-500 mb-8">Manage your terminal devices and configurations</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={Terminal}
          label="Total Terminals"
          value={stats.totalTerminals.toString()}
        />
        <StatCard 
          icon={CheckCircle}
          label="Active Terminals"
          value={stats.activeTerminals.toString()}
        />
        <StatCard 
          icon={XCircle}
          label="Inactive Terminals"
          value={stats.inactiveTerminals.toString()}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Terminal Devices</h2>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => {
                fetchTerminals(userType, getPaginationParams());
                fetchStats(userType);
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Retry
            </button>
          </div>
        ) : terminals.length === 0 ? (
          <EmptyState
            title="No terminals found"
            description="There are no terminals available at the moment."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {terminals.map((terminal) => (
                    <tr key={terminal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{terminal.serialNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{terminal.model}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{terminal.location}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          terminal.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {terminal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatDate(terminal.lastActive)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{terminal.transactions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {meta && (
              <Pagination
                currentPage={meta.currentPage}
                totalPages={meta.lastPage}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}