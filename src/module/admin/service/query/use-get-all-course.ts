import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import {
  CourseResponse,
  filterOptionForCourse,
  PaginationT,
} from "../../../../common/interface";

export const useGetAllCourse = (
  paginationData?: PaginationT,
  filterOption?: filterOptionForCourse
) => {
  if (paginationData || filterOption) {
    return useQuery({
      queryKey: ["course_list", paginationData, filterOption],
      queryFn: () =>
        request
          .get<CourseResponse>("/courses", {
            params: {
              page: paginationData?.page,
              limit: paginationData?.limit,
              status: filterOption?.status,
              name: filterOption?.name,
            },
          })
          .then((res) => res.data),
    });
  }
  return useQuery({
    queryKey: ["course_list", paginationData],
    queryFn: () =>
      request.get<CourseResponse>("/courses").then((res) => res.data),
  });
};
