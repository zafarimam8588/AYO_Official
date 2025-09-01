import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginFormValues } from "@/types/auth";

export const useLoginForm = (
  onSubmit: (data: LoginFormValues) => Promise<void>
) => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await onSubmit(data);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(handleSubmit),
  };
};
