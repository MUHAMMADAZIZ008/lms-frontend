import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { OneGroupResponse } from "../../../../common/interface";

export const useGetOneGroup = (id: string) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => request.get<OneGroupResponse>(`/groups/${id}`).then((res) => res.data),
  });
};
