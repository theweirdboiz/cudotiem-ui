import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchData<T = unknown>(
  queryKey: QueryKey,
  fetchFn: () => Promise<T>
) {
  const queryClient = useQueryClient();

  return useQuery<T>(queryKey, fetchFn, {
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });
}
