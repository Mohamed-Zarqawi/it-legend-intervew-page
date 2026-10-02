"use client";

import { useLogout } from "@/features/auth/pages/hooks/useAuth";
import ProfilePage from "@/features/profile/pages/ProfilePage";

import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const logout = useLogout();
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div>
      <ProfilePage />
    </div>
  );
};

export default Profile;
