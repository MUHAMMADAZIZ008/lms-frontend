import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { CourseResponse, PaginationT } from "../../../../common/interface";

export const useGetAllCourse = (paginationData?: PaginationT) => {
  if (paginationData) {
    return useQuery({
      queryKey: ["course_list", paginationData],
      queryFn: () =>
        request
          .get<CourseResponse>("/courses", {
            params: {
              page: paginationData.page,
              limit: paginationData.limit,
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
