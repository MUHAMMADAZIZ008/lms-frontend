import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { OneCourseResponse } from "../../../../common/interface";

export const useGetOneCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () =>
      request.get<OneCourseResponse>(`/courses/${id}`).then((res) => res.data),
  });
};
