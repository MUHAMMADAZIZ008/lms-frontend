import { useQuery } from "@tanstack/react-query";
import {
  filterOptionForTeacher,
  PaginationT,
  TeacherResponse,
} from "../../../../common/interface";
import { request } from "../../../../config";

export const useGetAllTeacher = (
  pagination?: PaginationT,
  filterOption?: filterOptionForTeacher
) => {
  return useQuery({
    queryKey: ["teacher__list", pagination, filterOption],
    queryFn: () =>
      request
        .get<TeacherResponse>("/teacher", {
          params: {
            page: pagination?.page,
            limit: pagination?.limit,
            gender: filterOption?.gender,
            date_of_birth: filterOption?.date_of_birth,
          },
        })
        .then((res) => res.data),
  });
};
