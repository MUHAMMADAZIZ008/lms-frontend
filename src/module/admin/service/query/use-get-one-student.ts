import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { OneStudentResponse } from "../../../../common/interface";

export const useGetOneStudent = (id: string) => {
  return useQuery<OneStudentResponse>({
    queryKey: ["student", id],
    queryFn: () => request.get(`students/${id}`).then((res) => res.data),
  });
};
