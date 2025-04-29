import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";
import { TeacherPaymentFormType } from "../../../../common/interface";

export const useCreateTeacherPayment = () => {
  return useMutation({
    mutationFn: (data: TeacherPaymentFormType) =>
      request.post("/payment-teacher", data).then((res) => res),
  });
};
