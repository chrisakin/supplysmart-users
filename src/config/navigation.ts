import {
  LayoutDashboard,
  Clock,
  Receipt,
  Wallet,
  CreditCard,
  MessageSquare,
  FileBarChart,
  Users,
  LucideIcon
} from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const agentMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/agent/dashboard' },
  { icon: Clock, label: 'Terminals', href: '/agent/terminals' },
  { icon: Receipt, label: 'Transactions', href: '/agent/transactions' },
  { icon: Wallet, label: 'Wallet', href: '/agent/wallet' },
  { icon: CreditCard, label: 'Payment', href: '/agent/payment' },
  { icon: MessageSquare, label: 'Feedback', href: '/agent/feedback' },
  { icon: FileBarChart, label: 'Report', href: '/agent/report' },
];

export const aggregatorMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/aggregator/dashboard' },
  { icon: Users, label: 'Agents', href: '/aggregator/agents' },
  { icon: Clock, label: 'Terminals', href: '/aggregator/terminals' },
  { icon: Receipt, label: 'Transactions', href: '/aggregator/transactions' },
  { icon: CreditCard, label: 'Payment', href: '/aggregator/payment' },
  { icon: MessageSquare, label: 'Feedback', href: '/aggregator/feedback' },
  { icon: FileBarChart, label: 'Report', href: '/aggregator/report' },
];