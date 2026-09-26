"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/pages/hooks/useAuth";

import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const logout = useLogout();
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div>
      Hi
      <Button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default page;
