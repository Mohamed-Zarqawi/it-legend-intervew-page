"use client";

import React, { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { toast } from "sonner";

export const ContactUsPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [buttonText, setButtonText] = useState("SUBMIT");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) return;

    setButtonText("SENDING...");

    const serviceID = "default_service";
    const templateID = "template_bp2hz3o";
    const publicKey = "AOq4bhkAry0qF8tdT";
  };
  return (
    <div className="mx-4 md:mx-10">
      {/* body */}

      <div className="flex flex-col gap-6 md:h-[calc(100dvh-155px)] md:flex-wrap md:items-center md:justify-center md:gap-10 lg:max-h-[calc(100dvh-185px)]">
        <div className="border-border md:bg-card flex flex-col justify-between gap-6 md:flex-row md:items-center md:gap-20 md:rounded-3xl md:border md:p-6">
          {/* Left */}

          <div className="flex w-full flex-col justify-start gap-8 py-10 md:pl-10">
            <div className="flex flex-col gap-2 md:gap-5">
              <div className="text-2xl md:text-4xl">
                GET IN <span className="text-card-foreground">TOUCH</span>
              </div>

              <div className="text-muted-foreground text-sm md:text-lg">
                Have questions about our courses? Our experts are here to help!
              </div>
            </div>

            <div className="flex flex-col gap-5 md:gap-6">
              {/* 1 */}
              <div className="text-card-foreground text-sm md:text-xl">
                CONTACT INFORMATION
              </div>
              <div className="flex flex-col gap-4 md:gap-5">
                <div
                  className="flex items-center gap-3 md:gap-4"
                  onClick={() => {
                    navigator.clipboard.writeText("+1 (555) 000-0000");
                    toast.success("Copied address to clipboard");
                  }}
                >
                  <Button
                    variant={"outline"}
                    size="icon-sm"
                    className="border-muted-foreground rounded-lg border"
                  >
                    <PhoneIcon className="text-muted-foreground size-4" />
                  </Button>
                  <div>+1 (555) 000-0000</div>
                </div>

                {/* 2 */}
                <div
                  className="flex items-center gap-4"
                  onClick={() => {
                    navigator.clipboard.writeText("support@zekastore.com");
                    toast.success("Copied email to clipboard");
                  }}
                >
                  <Button
                    variant={"outline"}
                    size="icon-sm"
                    className="border-muted-foreground rounded-lg border p-1.75"
                  >
                    <MailIcon className="text-muted-foreground size-4" />
                  </Button>
                  <div>support@zekastore.com</div>
                </div>

                {/* 3 */}
                <div
                  className="flex items-center gap-4"
                  onClick={() => {
                    navigator.clipboard.writeText("81 New Cairo, Cairo, Egypt");
                    toast.success("Copied address to clipboard");
                  }}
                >
                  <Button
                    variant={"outline"}
                    size="icon-sm"
                    className="border-muted-foreground rounded-lg border"
                  >
                    <MapPinIcon className="text-muted-foreground size-4" />
                  </Button>
                  <div>81 New Cairo, Cairo, Egypt</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-6 md:py-10 md:pr-10"
          >
            <div className="flex w-full flex-col gap-5 md:gap-6">
              <div className="text-card-foreground text-sm md:text-xl">
                CONTACT US
              </div>
              <div className="flex flex-col gap-4 md:gap-5">
                <Input
                  type="text"
                  name="name"
                  isRequired={true}
                  placeholder="Full Name"
                  required
                />

                <Input
                  type="email"
                  name="email"
                  isRequired={true}
                  placeholder="Email Address"
                  required
                />

                <Textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={4}
                  required
                />
              </div>
            </div>

            <Button type="submit">{buttonText}</Button>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogContent className="border-muted-foreground flex flex-col gap-6 rounded-3xl border bg-[#1a1a1a]/90 p-6 backdrop-blur-md">
                <AlertDialogHeader className="flex w-full flex-col gap-4 text-center">
                  <AlertDialogTitle className="text-muted-foreground flex w-full flex-col text-center text-[16px]">
                    THANK YOU FOR CONTACTING US!
                  </AlertDialogTitle>

                  <AlertDialogDescription className="flex w-full flex-col items-center justify-center gap-3 text-center text-zinc-300">
                    We appreciate you reaching out and will get back to you as
                    soon as possible.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={() => setIsAlertOpen(false)}
                    className="bg-muted-foreground hover:bg-secondary w-full rounded-lg px-5 py-6 text-center text-white transition-colors duration-300 hover:cursor-pointer"
                  >
                    CLOSE
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
    </div>
  );
};
