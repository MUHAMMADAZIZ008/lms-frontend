import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: (id: string) =>
      request.delete(`/courses/${id}`).then((res) => res.data),
  });
};
