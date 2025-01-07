import { useEffect } from 'react';
import { CircleDollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';
import { useTransactionsStore } from '../store/transactions';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useUserType } from '../hooks/useUserType';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from '../components/ui/Pagination';
import { formatCurrency, formatDate } from '../lib/utils';

export default function Transactions() {
  const userType = useUserType();
  const { page, setPage, getPaginationParams } = usePagination(10);
  const { transactions, stats, meta, loading, error, fetchTransactions } = useTransactionsStore();

  useEffect(() => {
    fetchTransactions(userType, getPaginationParams());
  }, [userType, page, fetchTransactions]);

  if (loading && !transactions.length) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => fetchTransactions(userType, getPaginationParams())}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      <p className="text-gray-500 mb-8">View and manage all your transactions</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={CircleDollarSign}
          label="Total Amount"
          value={formatCurrency(stats.totalAmount)}
        />
        <StatCard 
          icon={CheckCircle2}
          label="Successful"
          value={stats.successfulTransactions}
        />
        <StatCard 
          icon={XCircle}
          label="Failed"
          value={stats.failedTransactions}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.reference}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(transaction.amount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'Successful' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : transaction.status === 'Failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDate(transaction.date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.customer}</td>
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
      </div>
    </div>
  );
}