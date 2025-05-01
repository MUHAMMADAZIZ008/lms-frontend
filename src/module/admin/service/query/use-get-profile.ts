import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { GetProfileResponse } from "../../../../common/interface";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      request
        .get<GetProfileResponse>("/admin/getProfile")
        .then((res) => res.data),
  });
};
