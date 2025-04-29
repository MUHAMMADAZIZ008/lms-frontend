import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config";
import { StudentPaymentFormType } from "../../../../common/interface";

export const useCreateStudentPayment = () => {
  return useMutation({
    mutationFn: (data: StudentPaymentFormType) =>
      request.post("/payment-student", data).then((res) => res),
  });
};
