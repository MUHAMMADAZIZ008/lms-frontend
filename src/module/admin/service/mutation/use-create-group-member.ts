import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";
import { GroupMemberFormType } from "../../../../common/interface";

export const useCreateGroupMember = () => {
  return useMutation({
    mutationFn: (data: GroupMemberFormType) =>
      request.post("/group-members", data).then((res) => res),
  });
};
