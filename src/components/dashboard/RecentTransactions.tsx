import { useDashboardStore } from '../../store/dashboard';
import { formatCurrency, formatDate } from '../../lib/utils';

export function RecentTransactions() {
  const { transactions } = useDashboardStore();

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(transaction.amount)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    transaction.status === 'successful' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatDate(transaction.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}