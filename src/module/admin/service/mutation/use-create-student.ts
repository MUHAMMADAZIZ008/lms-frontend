import { useMutation } from "@tanstack/react-query";
import { StudentFieldType } from "../../../../common/interface";
import { request } from "../../../../config";

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: (data: StudentFieldType) =>
      request.post("/students", data).then((res) => res),
  });
};
