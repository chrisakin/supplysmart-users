import { useAuthStore } from '../store/auth';

export type UserType = 'agent' | 'aggregator';

export function useUserType(): UserType {
  const user = useAuthStore((state) => state.user);
  return user?.type || 'agent'; // Default to agent if not logged in
}