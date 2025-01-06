import {
  LayoutDashboard,
  Clock,
  Receipt,
  Wallet,
  CreditCard,
  MessageSquare,
  FileBarChart,
  Users,
  ListChecks,
  LucideIcon
} from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const agentMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Clock, label: 'Terminals', href: '/dashboard/terminals' },
  { icon: Receipt, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: Wallet, label: 'Wallet', href: '/dashboard/wallet' },
  { icon: CreditCard, label: 'Payment', href: '/dashboard/payment' },
  { icon: MessageSquare, label: 'Feedback', href: '/dashboard/feedback' },
  { icon: FileBarChart, label: 'Report', href: '/dashboard/report' },
];

export const aggregatorMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Agents', href: '/dashboard/agents' },
  { icon: Receipt, label: 'Transactions', href: '/dashboard/transactions' },
  { icon: ListChecks, label: 'Listings', href: '/dashboard/listings' },
  { icon: CreditCard, label: 'Payment', href: '/dashboard/payment' },
  { icon: MessageSquare, label: 'Feedback', href: '/dashboard/feedback' },
  { icon: FileBarChart, label: 'Report', href: '/dashboard/report' },
];