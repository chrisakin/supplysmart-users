export interface Transaction {
  id: string;
  amount: string;
  status: 'successful' | 'failed' | 'pending';
  date: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalCommission: number;
  successfulTransactions: string;
  failedTransactions: string;
}

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

export interface AgentStats {
  totalAgents: number;
  activeAgents: number;
  inactiveAgents: number;
}

export interface AgentsState {
  agents: Agent[];
  stats: AgentStats;
  loading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  fetchStats: () => Promise<void>;
}