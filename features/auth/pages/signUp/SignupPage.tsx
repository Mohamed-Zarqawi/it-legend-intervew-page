"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useGetCurrentUser, useSignUp } from "../hooks/useAuth";

const SignUpPage = () => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const { mutate: handleSignUp, isPending: isSignUp } = useSignUp();

  const signupFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    }),
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const { values, errors, dirty, touched, handleSubmit, handleChange } =
    signupFormik;

  // -----------------------

  // -----------------------

  function capitalizeFirstLetter(val: string | undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  function handleErrors(type: string) {
    if (type == "email") {
      return capitalizeFirstLetter(errors.email);
    } else if (type == "password") {
      return capitalizeFirstLetter(errors.password);
    } else if (type == "firstName") {
      return capitalizeFirstLetter(errors.firstName);
    } else if (type == "lastName") {
      return capitalizeFirstLetter(errors.lastName);
    }
  }

  return (
    <div className="mx-6 md:mx-10">
      <div className="flex h-[calc(100dvh-155px)] items-center justify-center lg:h-[calc(100dvh-185px)]">
        {/* body */}

        <form
          onSubmit={handleSubmit}
          className="border-primary md:bg-card flex h-fit w-135 flex-col items-center justify-center gap-8 rounded-3xl md:border md:p-12"
        >
          {/* 1 */}
          <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-4">
            <div className="text-primary text-center text-2xl md:text-4xl">
              JOIN THE ELITE
            </div>
            <div className="text-muted-foreground text-center text-sm md:text-base">
              Create your account to start your journey !
            </div>
          </div>

          {/* 2 */}

          <div className="flex w-full flex-col items-end justify-center gap-4">
            <div className="flex w-full gap-3 md:gap-4">
              <Input
                name="firstName"
                type="text"
                label="First Name"
                isRequired={true}
                errors={errors}
                touched={touched}
                value={values.firstName}
                onChange={handleChange}
                aria-invalid={!!errors.firstName && !!touched.firstName}
              />

              <Input
                name="lastName"
                type="text"
                label="Last Name"
                isRequired={false}
                errors={errors}
                touched={touched}
                value={values.lastName}
                onChange={handleChange}
                aria-invalid={!!errors.lastName && !!touched.lastName}
              />
            </div>

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
          </div>

          {/* 3 */}
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button
              type="submit"
              size={"none"}
              isPending={isSignUp}
              pendingText="Registering"
              disabled={!dirty || isSignUp}
              className="bg-primary h-13 w-full rounded-lg px-4 py-4 text-center hover:cursor-pointer md:h-15"
            >
              CREATE ACCOUNT
            </Button>
            <div className="text-sm md:text-base">
              Already a member?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:text-chart-2 transition-colors duration-300"
              >
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUpPage;
