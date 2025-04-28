import { useQuery } from "@tanstack/react-query";
import {
  filterOptionForGroup,
  PaginationT,
  ResponseGroup,
} from "../../../../common/interface";
import { request } from "../../../../config";

export const useGeAllGroup = (
  pagination?: PaginationT,
  filterOption?: filterOptionForGroup
) => {
  return useQuery({
    queryKey: ["groups_list", pagination, filterOption],
    queryFn: () =>
      request
        .get<ResponseGroup>("/groups", {
          params: {
            page: pagination?.page,
            limit: pagination?.limit,
            start_date: filterOption?.start_date,
            status: filterOption?.status,
          },
        })
        .then((res) => res.data),
  });
};
