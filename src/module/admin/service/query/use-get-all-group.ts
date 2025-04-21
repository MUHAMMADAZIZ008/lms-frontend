import { useQuery } from "@tanstack/react-query";
import { PaginationT, ResponseGroup } from "../../../../common/interface";
import { request } from "../../../../config";

export const useGeAllGroup = (pagination?: PaginationT ) => {
  if (pagination) {
    return useQuery({
      queryKey: ["groups_list", pagination],
      queryFn: () =>
        request
          .get<ResponseGroup>("/groups", {
            params: {
              page: pagination.page,
              limit: pagination.limit,
            },
          })
          .then((res) => res.data),
    });
  }
  return useQuery({
    queryKey: ["group_list"],
    queryFn: () =>
      request.get<ResponseGroup>("/groups").then((res) => res.data),
  });
};
