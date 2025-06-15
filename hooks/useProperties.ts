import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: api.getProperties,
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => api.getProperty(id),
    enabled: !!id,
  });
};

export const useSearchProperties = (query: string) => {
  return useQuery({
    queryKey: ['properties', 'search', query],
    queryFn: () => api.searchProperties(query),
    enabled: !!query,
  });
};