
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Panchayath } from '@/types';

export const usePanchayaths = () => {
  return useQuery({
    queryKey: ['panchayaths'],
    queryFn: async (): Promise<Panchayath[]> => {
      const { data, error } = await supabase
        .from('panchayaths')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching panchayaths:', error);
        throw error;
      }

      return data || [];
    },
  });
};
