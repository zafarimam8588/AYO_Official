import { useEffect } from "react";
import { useRegisterAuth } from "@/hooks/useRegisterAuth";
import { useRegisterForm } from "@/hooks/useRegisterForm";

import { RegisterDesktopSidebar } from "@/components/auth/RegisterDesktopRightside";
import { RegisterHeader } from "@/components/auth/RegisterHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  const { isSubmitting, register, registerWithGoogle, checkExistingAuth } =
    useRegisterAuth();
  const form = useRegisterForm(register);

  useEffect(() => {
    checkExistingAuth();
  }, [checkExistingAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <RegisterDesktopSidebar />

        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <RegisterHeader />

            <RegisterForm
              form={form}
              onSubmit={form.onSubmit}
              onGoogleRegister={registerWithGoogle}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
