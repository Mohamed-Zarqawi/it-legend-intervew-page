"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/types/auth/forgotPassword";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useResetPassword } from "../hooks/useAuth";

export default function ResetPasswordPage() {
  const router = useRouter();

  const { mutateAsync: handleResetPassword, isPending: isReseting } =
    useResetPassword();

  type ResetPasswordValues = {
    password: string;
  };
  const { values, errors, touched, handleSubmit, handleChange, dirty } =
    useFormik<ResetPasswordValues>({
      enableReinitialize: true,
      initialValues: {
        password: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: async (values) => {
        await handleResetPassword(values.password);
        router.push("/auth/login");
      },
    });

  return (
    <div className="mx-6 md:mx-10">
      <form onSubmit={handleSubmit}>
        <div className="flex h-[calc(100dvh-155px)] items-center justify-center lg:h-[calc(100dvh-185px)]">
          {/* body */}
          <div className="border-border bg-card/50 text-card-foreground flex h-fit w-160 flex-col items-center justify-center gap-7 rounded-3xl backdrop-blur-sm md:border md:p-12 md:shadow-lg">
            {/* 1 */}

            <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
              <div className="text-foreground text-center text-2xl font-bold tracking-tight md:text-4xl">
                RESET PASSWORD
              </div>
              <div className="text-muted-foreground text-center text-sm md:text-base">
                Set new password here !
              </div>
            </div>

            {/* 2 */}

            <div className="group flex w-full flex-col items-end justify-center gap-4">
              <div className="flex w-full flex-col gap-2">
                <Input
                  type="password"
                  id="password"
                  label="New Password"
                  isRequired={true}
                  errors={errors}
                  touched={touched}
                  value={values.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password && !!touched.password}
                />
              </div>
            </div>

            {/* 3 */}
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <Button
                  type="submit"
                  disabled={!dirty || isReseting}
                  isPending={isReseting}
                  pendingText="UPDATING"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-13 w-full rounded-lg px-4 py-4 text-center font-medium transition-colors hover:cursor-pointer md:h-15"
                >
                  UPDATE PASSWORD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
