import { useMutation } from "@tanstack/react-query";
import { GroupTypeForm } from "../../../../common/interface";
import { request } from "../../../../config";

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: (data: GroupTypeForm) =>
      request.post("/groups", data).then((res) => res),
  });
};
