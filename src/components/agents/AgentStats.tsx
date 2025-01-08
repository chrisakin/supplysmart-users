import { useEffect } from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';
import { StatCard } from '../ui/StatCards';
import { useAgentsStore } from '../../store/agents';

export function AgentStats() {
  const { stats, fetchStats } = useAgentsStore();
  
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        icon={Users}
        label="Total Agents"
        value={stats.totalAgents.toString()}
      />
      <StatCard 
        icon={UserCheck}
        label="Active Agents"
        value={stats.activeAgents.toString()}
      />
      <StatCard 
        icon={UserX}
        label="Inactive Agents"
        value={stats.inactiveAgents.toString()}
      />
    </div>
  );
}