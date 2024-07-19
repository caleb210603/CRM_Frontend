import { ClientDetail } from "@/types/auth";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { fetchClients } from "../services/clientService";
import { useEffect } from "react";

export const useClientsFetch = (search: string | number) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ next?: string; clients: ClientDetail[]; count: number }>(
      ["clients"],
      ({ pageParam }) => fetchClients({ pageParam, search }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.next) {
            const url = new URL(lastPage.next);
            const pageParam = url.searchParams.get("page");
            return pageParam ? parseInt(pageParam, 10) : undefined;
          }
          return undefined;
        },
      }
    );

  useEffect(() => {
    refetch();
  }, [search]);

  return {
    isLoading,
    isError,
    clients: data?.pages.flatMap((map) => map.clients) ?? [],
    count: data?.pages[0]?.count ?? 0,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
