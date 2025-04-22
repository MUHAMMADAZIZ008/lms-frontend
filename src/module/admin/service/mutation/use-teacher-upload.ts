import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";

export const useTeacherUpload = () => {
  return useMutation({
    mutationFn: (uploadFile: FormData) =>
      request
        .post("/teacher/upload-image", uploadFile, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
