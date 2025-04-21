import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";

export const useStudentUpload = () => {
  return useMutation({
    mutationFn: (uploadFile: FormData) =>
      request
        .post("/students/upload-image", uploadFile, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
