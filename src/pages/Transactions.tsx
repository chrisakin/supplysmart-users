import { useState } from 'react';
import { CircleDollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { formatCurrency, formatDate } from '../lib/utils';

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const transactions = [
    {
      _id: "65db544fef1e2fa83c422e91",
      agentId: "65db51ed78b",
      aggregatorId: "",
      transactionStatus: "success",
      transactionType: "transfer",
      recipientBank: "first bank of nigeria",
      recipientAccountName: "Abayomi Ogunnusi",
      recipientAccountNumber: "3105786060",
      ref: "09876544578678",
      type: "Web",
      source: "Web",
      transactionGroup: "transfer",
      transactionCharges: 0.06,
      userType: "agent",
      createdAt: "2024-02-25T14:53:03.099Z",
      updatedAt: "2024-02-25T14:54:01.013Z",
      transactionAmount: "1.06",
      transactionDate: "2024-02-25T14:53:05.000Z",
      transactionDescription: "Transfer to Abayomi",
      transactionFailureReason: null,
      transactionId: "471545189",
      transactionRecipient: "56530116",
      transactionReference: "88d4d364-2298-4ccb-b19d-a343d2734735",
      transactionSourceDetails: null,
      transactionTransferCode: "TRF_ca4t7nz30vyt8dqm",
      sessionId: "110006240225145305047154518901"
    }
  ];

  const stats = {
    totalAmount: transactions.reduce((sum, tx) => sum + parseFloat(tx.transactionAmount), 0),
    successfulTransactions: transactions.filter(tx => tx.transactionStatus === 'success').length,
    failedTransactions: transactions.filter(tx => tx.transactionStatus !== 'success').length
  };

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
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