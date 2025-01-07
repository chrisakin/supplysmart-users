import { useEffect } from 'react';
import { AgentStats } from '../components/agents/AgentStats';
import { AgentsTable } from '../components/agents/AgentsTable';
import { useAgentsStore } from '../store/agents';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export default function Agents() {
  const { loading, error, fetchAgents, fetchStats } = useAgentsStore();

  useEffect(() => {
    fetchAgents({ page: 1, limit: 10 });
    fetchStats();
  }, [fetchAgents, fetchStats]);

  if (loading && !error) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => {
            fetchAgents({ page: 1, limit: 10 });
            fetchStats();
          }}
          className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
        <p className="text-gray-500">Manage and monitor your agents</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Agent Overview</h2>
        <AgentStats />
      </div>

      <div className="mt-8">
        <AgentsTable />
      </div>
    </div>
  );
}