"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/types/auth/forgotPassword";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForgotPassword } from "../hooks/useAuth";

const TIMER_KEY = "reset_password_cooldown_expiry";
const COOLDOWN_DURATION = 61;

const ForgotPasswordPage = () => {
  const { mutateAsync: handleForgotPassword, isPending: isEmailSending } =
    useForgotPassword();

  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    const savedExpiry = localStorage.getItem(TIMER_KEY);
    if (savedExpiry) {
      const remainingTime = Math.ceil(
        (parseInt(savedExpiry, 10) - Date.now()) / 1000,
      );
      if (remainingTime > 0) {
        setCooldown(remainingTime);
      } else {
        localStorage.removeItem(TIMER_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(TIMER_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const startCooldown = () => {
    const expiryTime = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem(TIMER_KEY, expiryTime.toString());
    setCooldown(COOLDOWN_DURATION);
  };

  type ForgotPasswordValues = {
    email: string;
  };
  const { values, errors, dirty, touched, handleSubmit, handleChange } =
    useFormik<ForgotPasswordValues>({
      enableReinitialize: true,
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values) => {
        await handleForgotPassword(values);
        startCooldown();
      },
    });

  return (
    <div className="mx-6 md:mx-10">
      <form onSubmit={handleSubmit}>
        <div className="flex h-[calc(100dvh-155px)] items-center justify-center lg:h-[calc(100dvh-185px)]">
          {/* body */}
          <div className="border-primary flex h-fit w-160 flex-col items-center justify-center gap-7 rounded-3xl md:border md:bg-[#1a1a1a]/20 md:p-12">
            {/* 1 */}
            <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
              <div className="text-primary text-center text-2xl md:text-4xl">
                FORGOT PASSWORD
              </div>
              <div className="text-muted-foreground text-center text-sm md:text-base">
                Enter your email and we'll send you a recovery link.
              </div>
            </div>

            {/* 2 */}

            <div className="group flex w-full flex-col items-end justify-center gap-4">
              <div className="flex w-full flex-col gap-2">
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
              </div>
            </div>

            {/* 3 */}
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <Button
                  type="submit"
                  variant={"none"}
                  size={"none"}
                  disabled={!dirty || isEmailSending || cooldown > 0}
                  onClick={handleChange}
                  className="bg-primary hover:bg-secondary h-13 w-full rounded-lg px-4 py-4 text-center hover:cursor-pointer md:h-15"
                >
                  {cooldown > 0
                    ? `RESEND IN ${cooldown} Second`
                    : "SEND RECOVERY EMAIL"}
                </Button>
              </div>
            </div>

            <Link
              href="/auth/login"
              className="hover:text-chart-2 text-muted-foreground flex items-center justify-center gap-1.5 text-sm hover:cursor-pointer md:text-base md:transition-colors md:duration-300"
            >
              <ArrowLeft className="size-5" />
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPasswordPage;
