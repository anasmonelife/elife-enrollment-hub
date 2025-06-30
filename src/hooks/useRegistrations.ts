
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Registration } from '@/types';

export const useRegistrations = () => {
  return useQuery({
    queryKey: ['registrations'],
    queryFn: async (): Promise<Registration[]> => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useCreateRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (registration: Omit<Registration, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('registrations')
        .insert([registration])
        .select()
        .single();

      if (error) {
        console.error('Error creating registration:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
    },
  });
};

export const useSearchRegistration = () => {
  return useMutation({
    mutationFn: async (searchQuery: string): Promise<Registration | null> => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .or(`customer_id.eq.${searchQuery},mobile.eq.${searchQuery}`)
        .maybeSingle();

      if (error) {
        console.error('Error searching registration:', error);
        throw error;
      }

      return data;
    },
  });
};
