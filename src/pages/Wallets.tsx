import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';

interface WalletTransaction {
  id: string;
  type: 'Credit' | 'Debit';
  amount: string;
  balance: string;
  description: string;
  date: string;
}

const transactions: WalletTransaction[] = [
  {
    id: '1',
    type: 'Credit',
    amount: '₦100,000',
    balance: '₦150,000',
    description: 'Fund Transfer',
    date: '2024-03-15 14:30',
  },
  // Add more sample data
];

export default function Wallets() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Wallets</h1>
      <p className="text-gray-500 mb-8">Manage your wallet balances and transactions</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={Wallet}
          label="Available Balance"
          value="₦150,000"
        />
        <StatCard 
          icon={ArrowUpRight}
          label="Total Credits"
          value="₦500,000"
        />
        <StatCard 
          icon={ArrowDownRight}
          label="Total Debits"
          value="₦350,000"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Wallet Transactions</h2>
        </div>
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
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}