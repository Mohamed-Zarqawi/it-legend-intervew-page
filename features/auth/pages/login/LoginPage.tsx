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
          className="border-border bg-card text-card-foreground flex h-fit w-130 flex-col items-center justify-center gap-7 rounded-3xl md:border md:p-12 md:shadow-sm"
          noValidate
        >
          {/* 1 */}
          <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
            <div className="text-foreground text-center text-2xl font-bold md:text-4xl">
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
              className="text-muted-foreground hover:text-primary text-xs transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* 3 */}
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button
              disabled={!dirty || isLogin}
              isPending={isLogin}
              pendingText="Wait . . ."
              type="submit"
              className="w-full"
            >
              LOG IN
            </Button>

            <div className="text-muted-foreground text-sm md:text-base">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
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
