import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, XCircle, Plus } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';
import { PaymentModal } from '../components/payments/PaymentModal';
import { usePaymentsStore } from '../store/payments';
import { useUserType } from '../hooks/useUserType';
import { usePagination } from '../hooks/usePagination';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Pagination } from '../components/ui/Pagination';
import { formatCurrency, formatDate } from '../lib/utils';

export default function Payment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userType = useUserType();
  const { payments, stats, meta, loading, error, fetchPayments, fetchStats } = usePaymentsStore();
  const { page, setPage, getPaginationParams } = usePagination(10);

  useEffect(() => {
    fetchPayments(userType, getPaginationParams());
    fetchStats(userType);
  }, [userType, page, fetchPayments, fetchStats]);

  if (loading && !payments.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
      <p className="text-gray-500 mb-8">Process and manage payments</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={CreditCard}
          label="Total Payments"
          value={formatCurrency(stats.totalPayments.toString())}
        />
        <StatCard 
          icon={CheckCircle2}
          label="Completed"
          value={stats.completedPayments.toString()}
        />
        <StatCard 
          icon={XCircle}
          label="Failed"
          value={stats.failedPayments.toString()}
        />
      </div>

      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Make New Payment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Payment History</h2>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => {
                fetchPayments(userType, getPaginationParams());
                fetchStats(userType);
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Retry
            </button>
          </div>
        ) : payments.length === 0 ? (
          <EmptyState
            title="No payments found"
            description="Your payment history will appear here"
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.reference}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{payment.method}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{payment.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          payment.status === 'Completed' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : payment.status === 'Failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatDate(payment.date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{payment.recipient}</td>
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

      <PaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}