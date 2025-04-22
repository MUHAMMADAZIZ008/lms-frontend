import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";
import { CourseTypeForm } from "../../../../common/interface";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: (data: CourseTypeForm) => request.post("/courses", data).then((res) => res),
  });
};
