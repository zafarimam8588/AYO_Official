import { useEffect } from "react";
import { useLoginAuth } from "@/hooks/useLoginAuth";
import { useLoginForm } from "@/hooks/useLoginForm";

import { DesktopSidebar } from "@/components/auth/LoginDesktopRightSide";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  const { isSubmitting, login, loginWithGoogle, checkExistingAuth } =
    useLoginAuth();
  const form = useLoginForm(login);

  useEffect(() => {
    checkExistingAuth();
  }, [checkExistingAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <DesktopSidebar />

        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <LoginHeader />

            <LoginForm
              form={form}
              onSubmit={form.onSubmit}
              onGoogleLogin={loginWithGoogle}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
