import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { PaginationT, StudentResponse } from "../../../../common/interface";

export const useGetAllStudent = (paginationData: PaginationT) => {
  return useQuery({
    queryKey: ["allStudent", paginationData],
    queryFn: () =>
      request
        .get<StudentResponse>("/students", {
          params: {
            limit: paginationData.limit,
            page: paginationData.page,
          },
        })
        .then((res) => res.data),
  });
};
