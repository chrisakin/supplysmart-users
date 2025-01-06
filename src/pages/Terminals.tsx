import { Terminal, CheckCircle, XCircle } from 'lucide-react';
import { StatCard } from '../components/ui/StatCards';

interface TerminalData {
  id: string;
  serialNumber: string;
  model: string;
  location: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  transactions: number;
}

const terminals: TerminalData[] = [
  {
    id: '1',
    serialNumber: 'TRM-001-223',
    model: 'PAX S900',
    location: 'Lagos, Nigeria',
    status: 'Active',
    lastActive: '2024-03-15 14:30',
    transactions: 156,
  },
  // Add more sample data
];

export default function Terminals() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Terminals</h1>
      <p className="text-gray-500 mb-8">Manage your terminal devices and configurations</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={Terminal}
          label="Total Terminals"
          value="24"
        />
        <StatCard 
          icon={CheckCircle}
          label="Active Terminals"
          value="18"
        />
        <StatCard 
          icon={XCircle}
          label="Inactive Terminals"
          value="6"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Terminal Devices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {terminals.map((terminal) => (
                <tr key={terminal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{terminal.serialNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{terminal.model}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{terminal.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      terminal.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {terminal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{terminal.lastActive}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{terminal.transactions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}