import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { TeacherResponse } from "../../../../common/interface";

export const useTeacherForGroup = () => {
  return useQuery<Omit<TeacherResponse, "meta">>({
    queryKey: ["teacher-group"],
    queryFn: () => request.get("/teacher/for-group").then((res) => res.data),
  });
};
