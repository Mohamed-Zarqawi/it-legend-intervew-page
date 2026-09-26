"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/types/auth/login";
import { useFormik } from "formik";
import { useLogin } from "../hooks/useAuth";

const LoginPage = () => {
  const { mutate: handleLogin, isPending: isLogin } = useLogin();

  const { values, errors, dirty, touched, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        enableReinitialize: true,
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await handleLogin(values);
      },
    });

  return (
    <div className="mx-6 md:mx-10">
      <div className="flex h-[calc(100dvh-155px)] items-center justify-center lg:h-[calc(100dvh-185px)]">
        {/* body */}

        <form
          onSubmit={handleSubmit}
          className="border-primary md:bg-card flex h-fit w-130 flex-col items-center justify-center gap-7 rounded-3xl md:border md:p-12"
          noValidate
        >
          {/* 1 */}
          <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
            <div className="text-primary text-center text-2xl md:text-4xl">
              WELCOME BACK
            </div>

            <div className="text-muted-foreground text-center text-sm md:text-base">
              Login to access your profile !
            </div>
          </div>

          {/* 2 */}

          <div className="group flex w-full flex-col items-end justify-center gap-3 md:gap-4">
            <Input
              name="email"
              type="email"
              label="Email"
              isRequired={true}
              errors={errors}
              touched={touched}
              value={values.email}
              onChange={handleChange}
              aria-invalid={!!errors.email && !!touched.email}
            />

            {/* ----------------------------------------------------- */}

            <Input
              name="password"
              type="password"
              label="Password"
              isRequired={true}
              errors={errors}
              touched={touched}
              value={values.password}
              onChange={handleChange}
              aria-invalid={!!errors.password && !!touched.password}
            />

            <Link
              href="/auth/forgotPassword"
              className="text-primary hover:text-chart-3 text-xs"
            >
              Forgot password?
            </Link>
          </div>

          {/* 3 */}
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button
              size={"none"}
              disabled={!dirty || isLogin}
              isPending={isLogin}
              pendingText="Wait . . ."
              type="submit"
              className="h-13 w-full rounded-lg px-4 py-4 text-center hover:cursor-pointer md:h-15"
            >
              LOG IN
            </Button>

            <div className="text-sm md:text-base">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-primary hover:text-chart-3 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
