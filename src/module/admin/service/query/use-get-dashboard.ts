import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import { ApiDashboard, DashboardT } from "../../../../common/interface";

export const useGetDashboard = (dashboardConfig: DashboardT) => {
  return useQuery({
    queryKey: ["dashboard", dashboardConfig],
    queryFn: () =>
      request
        .get<ApiDashboard>("/statistics/dashboard", {
          params: {
            fullname: dashboardConfig.fullname,
            category: dashboardConfig.category,
          },
        })
        .then((res) => res.data),
  });
};
