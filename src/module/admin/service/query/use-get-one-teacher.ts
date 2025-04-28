import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { OneTeacherResponse } from "../../../../common/interface";

export const useGetOneTeacher = (id: string) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () =>
      request.get<OneTeacherResponse>(`/teacher/${id}`).then((res) => res.data),
  });
};
