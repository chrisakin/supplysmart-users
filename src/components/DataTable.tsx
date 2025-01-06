import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Transaction {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  phone: string;
  datePosted: string;
  amount: string;
  status: 'Verified' | 'Not-Verified';
}

const transactions: Transaction[] = [
  {
    id: '1',
    name: 'Gbolahan Fagbure',
    email: 'ZUMA HOMES',
    city: 'Gbolahan Fagbure',
    state: 'Ogun-State, Nigeria',
    phone: '08112106215',
    datePosted: '2nd April - 3rd April',
    amount: '₦ 80000',
    status: 'Verified',
  },
  // Add more sample data here
];

export function DataTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-emerald-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Names</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.city}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.state}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.datePosted}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    transaction.status === 'Verified' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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