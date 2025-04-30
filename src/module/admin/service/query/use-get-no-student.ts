import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { NoStudentResponse } from "../../../../common/interface";

export const useGetNoStudent = (groupId: string) => {
  return useQuery({
    queryKey: ["no-students", groupId],
    queryFn: () =>
      request
        .get<NoStudentResponse>("/students/no-student", {
          params: { group_id: groupId },
        })
        .then((res) => res.data),
  });
};
