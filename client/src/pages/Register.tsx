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
    <div className="min-h-screen bg-gradient-to-br from-india-green-50/30 via-warm-50/30 to-saffron-50/20 flex items-center justify-center relative font-sans p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Modern Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#13880808_1px,transparent_1px),linear-gradient(to_bottom,#ff993308_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 w-full sm:max-w-md md:max-w-xl lg:max-w-5xl xl:max-w-6xl mx-auto h-full min-h-screen sm:min-h-0 sm:h-auto flex flex-col">
        <div className="bg-white/90 backdrop-blur-2xl shadow-none sm:shadow-2xl border-0 sm:border border-white/20 overflow-x-hidden overflow-y-auto rounded-none sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] ring-0 sm:ring-1 ring-black/5 flex-1 flex flex-col min-h-screen sm:min-h-0 sm:h-auto">
          <div className="flex flex-col lg:flex-row flex-1 lg:min-h-[600px] xl:min-h-[650px]">
            <RegisterDesktopSidebar />

            <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto flex-1">
              <div className="w-full max-w-md mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10 xl:px-10 xl:py-12 flex flex-col justify-center min-h-full lg:min-h-0">
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="lg:hidden -mx-4 sm:-mx-6 md:-mx-8">
                    <RegisterHeader />
                  </div>
                  <div className="hidden lg:block">
                    <RegisterHeader />
                  </div>

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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
