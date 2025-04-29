import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config";
import {
  filterOptionForStudent,
  PaginationT,
  StudentResponse,
} from "../../../../common/interface";

export const useGetAllStudent = (
  paginationData: PaginationT,
  filterOption: filterOptionForStudent
) => {
  // if (!filterOption.isSaved) {
  //   return useQuery({
  //     queryKey: ["allStudent", paginationData],
  //     queryFn: () =>
  //       request
  //         .get<StudentResponse>("/students", {
  //           params: {
  //             limit: paginationData.limit,
  //             page: paginationData.page,
  //           },
  //         })
  //         .then((res) => res.data),
  //   });
  // }

  return useQuery({
    queryKey: ["allStudent", paginationData, filterOption],
    queryFn: () =>
      request
        .get<StudentResponse>("/students", {
          params: {
            limit: paginationData.limit,
            page: paginationData.page,
            gender: filterOption.gender,
            data_of_birth: filterOption.date_of_birth,
            groupId: filterOption.group_id,
            fullname: filterOption.fullname
          },
        })
        .then((res) => res.data),
  });
};
