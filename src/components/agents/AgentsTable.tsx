import { useAgentsStore } from '../../store/agents';
import { formatDate } from '../../lib/utils';

export function AgentsTable() {
  const { agents } = useAgentsStore();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">All Agents</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{agent.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{agent.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{agent.location}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    agent.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{formatDate(agent.joinedDate)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{agent.totalTransactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}