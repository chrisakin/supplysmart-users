import { Users, UserCheck, UserX } from 'lucide-react';
import { StatCard } from '../ui/StatCards';
import { useAgentsStore } from '../../store/agents';

export function AgentStats() {
  const { stats } = useAgentsStore();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        icon={Users}
        label="Total Agents"
        value={stats.totalAgents}
      />
      <StatCard 
        icon={UserCheck}
        label="Active Agents"
        value={stats.activeAgents}
      />
      <StatCard 
        icon={UserX}
        label="Inactive Agents"
        value={stats.inactiveAgents}
      />
    </div>
  );
}