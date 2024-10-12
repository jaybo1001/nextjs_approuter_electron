import { useCodebase } from '@/contexts/CodebaseContext';

export const useRefreshCodebase = () => {
  const { refreshCodebase } = useCodebase();
  return refreshCodebase;
};