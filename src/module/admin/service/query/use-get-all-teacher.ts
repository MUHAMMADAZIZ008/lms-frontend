import { useQuery } from "@tanstack/react-query";
import { PaginationT, TeacherResponse } from "../../../../common/interface";
import { request } from "../../../../config";

export const useGetAllTeacher = (pagination?: PaginationT) => {
  return useQuery({
    queryKey: ["teacher__list", pagination],
    queryFn: () =>
      request.get("/teacher", {
        params: {
          page: pagination?.page,
          limit: pagination?.limit,
        },
      }).then((res) => res.data.data as TeacherResponse),
  });
};
