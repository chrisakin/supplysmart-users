import { useEffect } from 'react';
import { useDashboardStore } from '../../store/dashboard';
import { formatCurrency, formatDate } from '../../lib/utils';
import { EmptyState } from '../EmptyState';
import { useUserType } from '../../hooks/useUserType';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../ui/Pagination';

export function RecentTransactions() {
  const userType = useUserType();
  const { transactions, meta, loading, error, fetchTransactions } = useDashboardStore();
  const { page, setPage, getPaginationParams } = usePagination(10);

  useEffect(() => {
    fetchTransactions(userType, getPaginationParams());
  }, [userType, page, fetchTransactions]);

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => fetchTransactions(userType, getPaginationParams())}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!loading && transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <EmptyState
          title="No transactions yet"
          description="Your recent transactions will appear here"
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <button className="text-emerald-600 text-sm hover:text-emerald-700">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {transaction.transactionReference}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {transaction.recipientAccountName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                  {transaction.recipientBank}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatCurrency(transaction.transactionAmount)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    transaction.transactionStatus === 'success'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.transactionStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(transaction.transactionDate)}
                </td>
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
  );
}