import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { ApiDashboard } from "../../../../common/interface";

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () =>
      request
        .get<ApiDashboard>("/statistics/dashboard")
        .then((res) => res.data),
  });
};
