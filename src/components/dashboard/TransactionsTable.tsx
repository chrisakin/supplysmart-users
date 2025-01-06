import { ChevronRight } from 'lucide-react';

interface Transaction {
  beneficiary: string;
  reference: string;
  amount: string;
  charges: string;
  type: string;
  date: string;
  status: 'Successful' | 'Failed';
}

const transactions: Transaction[] = [
  {
    beneficiary: 'Abayomi Ogunnusi',
    reference: '88d4d364-2298-4ccb-b19d-a343d2734735',
    amount: 'NGN 1.06',
    charges: 'NGN 0.06',
    type: 'transfer',
    date: 'Feb 25, 3:53 PM',
    status: 'Successful',
  },
  // Add more sample transactions here
];

export function TransactionsTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 flex justify-between items-center border-b">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <button className="text-emerald-600 text-sm hover:text-emerald-700">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Transaction Reference</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Charges</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((transaction) => (
              <tr key={transaction.reference} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{transaction.beneficiary}</td>
                <td className="px-6 py-4 text-sm font-mono">{transaction.reference}</td>
                <td className="px-6 py-4 text-sm">{transaction.amount}</td>
                <td className="px-6 py-4 text-sm">{transaction.charges}</td>
                <td className="px-6 py-4 text-sm capitalize">{transaction.type}</td>
                <td className="px-6 py-4 text-sm">{transaction.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    transaction.status === 'Successful' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}