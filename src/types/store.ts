// Add to existing types
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  totalTransactions: number;
}

export interface AgentsState {
  agents: Agent[];
  stats: {
    totalAgents: number;
    activeAgents: number;
    inactiveAgents: number;
  };
  loading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  fetchStats: () => Promise<void>;
}