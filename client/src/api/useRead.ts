import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { Esl } from '@/models';
import type { Sdat } from '@/models';

function useReadFiles<T>(
  endpoint: '/data/upload/esl' | '/data/upload/sdat'
): UseMutationResult<T[], Error, FileList | File[]> {
  return useMutation<T[], Error, FileList | File[]>({
    mutationFn: files => {
      const fileArray = Array.isArray(files) ? files : Array.from(files);
      const formData = new FormData();
      fileArray.forEach(f => formData.append('file', f));
      return api
        .post<T[]>(endpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => res.data);
    },
  });
}

/**
 * Hook for reading ESL files:
 * POST /read/esl, returns Esl[]
 */
export function useReadEsl(): UseMutationResult<
  Esl[],
  Error,
  FileList | File[]
> {
  return useReadFiles<Esl>('/data/upload/esl');
}

/**
 * Hook for reading Sdat files:
 * POST /read/sdat, returns sdat[]
 */
export function useReadSdat(): UseMutationResult<
  Sdat[],
  Error,
  FileList | File[]
> {
  return useReadFiles<Sdat>('/data/upload/sdat');
}
