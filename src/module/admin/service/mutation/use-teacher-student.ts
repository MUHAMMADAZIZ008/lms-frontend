import { useMutation } from "@tanstack/react-query";
import { TeacherFieldType } from "../../../../common/interface";
import { request } from "../../../../config";

export const useTeacherStudent = () => {
  return useMutation({
    mutationFn: (data: TeacherFieldType) =>
      request.post("/teacher/createTeacher", data).then((res) => res),
  });
};
