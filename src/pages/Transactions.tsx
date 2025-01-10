import { useState, useEffect } from 'react';
import { CircleDollarSign, CheckCircle2, XCircle, ListChecks } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { formatCurrency, formatDate } from '../lib/utils';
import { useTransactionsStore } from '../store/transactions';
import { useUserType } from '../hooks/useUserType';
import { usePagination } from '../hooks/usePagination';
import { EmptyState } from '../components/EmptyState';
import { Pagination } from '../components/ui/Pagination';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export default function Transactions() {
  const userType = useUserType();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const { transactions, stats, meta, loading, error, fetchTransactions, fetchStats } = useTransactionsStore();
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
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      <p className="text-gray-500 mb-8">View and manage all your transactions</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={CircleDollarSign}
          label="Total Amount"
          value={formatCurrency(stats.totalAmount.toString())}
        />
        <StatCard 
          icon={CheckCircle2}
          label="Successful"
          value={stats.successfulTransactions.toString()}
        />
        <StatCard 
          icon={XCircle}
          label="Failed"
          value={stats.failedTransactions.toString()}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Transaction History</h2>
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
          icon={ListChecks}
            title="No transactions found"
            description="Your transaction history will appear here"
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr 
                      key={transaction._id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
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
                      <td className="px-6 py-4 text-sm capitalize text-gray-900">
                        {transaction.transactionType}
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
          </>
        )}
      </div>

      {selectedTransaction && (
        <TransactionModal 
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}