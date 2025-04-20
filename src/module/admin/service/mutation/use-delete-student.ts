import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";

export const useDeleteStudent = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/students/${id}`).then((res) => res.data),
  });
};
