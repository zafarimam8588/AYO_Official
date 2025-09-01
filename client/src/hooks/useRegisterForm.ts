import { useForm, type SubmitHandler } from "react-hook-form";
import type { RegisterFormValues } from "@/types/auth";

export const useRegisterForm = (
  onSubmit: (data: RegisterFormValues) => Promise<void>
) => {
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const handleSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    await onSubmit(data);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(handleSubmit),
  };
};
