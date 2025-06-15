import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
  });
};