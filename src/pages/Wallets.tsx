import { useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';
import { useWalletsStore } from '../store/wallets';
import { useUserType } from '../hooks/useUserType';
import { usePagination } from '../hooks/usePagination';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Pagination } from '../components/ui/Pagination';
import { formatCurrency, formatDate } from '../lib/utils';

export default function Wallets() {
  const userType = useUserType();
  const { transactions, stats, meta, loading, error, fetchTransactions, fetchStats } = useWalletsStore();
  const { page, setPage, getPaginationParams } = usePagination(10);

  useEffect(() => {
    fetchTransactions(userType, getPaginationParams());
    fetchStats(userType);
  }, [userType, page, fetchTransactions, fetchStats]);

  if (loading && !transactions.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Wallets</h1>
      <p className="text-gray-500 mb-8">Manage your wallet balances and transactions</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={Wallet}
          label="Available Balance"
          value={formatCurrency(stats.availableBalance.toString())}
        />
        <StatCard 
          icon={ArrowUpRight}
          label="Total Credits"
          value={formatCurrency(stats.totalCredits.toString())}
        />
        <StatCard 
          icon={ArrowDownRight}
          label="Total Debits"
          value={formatCurrency(stats.totalDebits.toString())}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Wallet Transactions</h2>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => {
                fetchTransactions(userType, getPaginationParams());
                fetchStats(userType);
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Retry
            </button>
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            title="No transactions found"
            description="You haven't made any wallet transactions yet."
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          transaction.type === 'Credit' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.balance}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatDate(transaction.date)}</td>
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