import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { DataResponse } from '@/models/data';

export function useMeterData(sensorId: string) {
  return useQuery<DataResponse, Error>({
    queryKey: ['meterData', sensorId],
    queryFn: () =>
      api.get<DataResponse>(`/data/meter/${sensorId}`).then(res => res.data),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: 'always',
  });
}
