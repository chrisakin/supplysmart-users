import { useEffect } from 'react';
import { AgentStats } from '../components/agents/AgentStats';
import { AgentsTable } from '../components/agents/AgentsTable';
import { useAgentsStore } from '../store/agents';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export default function Agents() {
  const { loading, error, fetchAgents, fetchStats } = useAgentsStore();

  useEffect(() => {
    fetchAgents();
    fetchStats();
  }, [fetchAgents, fetchStats]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => {
            fetchAgents();
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
      <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
      <p className="text-gray-500 mb-8">Manage and monitor your agents</p>

      <AgentStats />

      <div className="mt-8">
        <AgentsTable />
      </div>
    </div>
  );
}