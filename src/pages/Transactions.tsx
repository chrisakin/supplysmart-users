import { CircleDollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';

interface TransactionData {
  id: string;
  reference: string;
  amount: string;
  type: string;
  status: 'Successful' | 'Failed' | 'Pending';
  date: string;
  customer: string;
}

const transactions: TransactionData[] = [
  {
    id: '1',
    reference: 'TXN-2024-001',
    amount: '₦50,000',
    type: 'Transfer',
    status: 'Successful',
    date: '2024-03-15 14:30',
    customer: 'John Doe',
  },
  // Add more sample data
];

export default function Transactions() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      <p className="text-gray-500 mb-8">View and manage all your transactions</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={CircleDollarSign}
          label="Total Transactions"
          value="₦1,234,567"
        />
        <StatCard 
          icon={CheckCircle2}
          label="Successful"
          value="1,234"
        />
        <StatCard 
          icon={XCircle}
          label="Failed"
          value="23"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
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
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.amount}</td>
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
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}