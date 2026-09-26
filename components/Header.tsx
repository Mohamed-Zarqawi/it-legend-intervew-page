"use client";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Header = () => {
  const pathname = usePathname();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  // const { data: cart = [], isLoading: isCartLoading } = useGetCart(
  //   currentUser?.id,
  // );

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "My Learning", href: "/dashboard" },
    { name: "About", href: "/aboutUs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="border- sticky top-0 left-0 z-50 w-full border-b">
      <div className="flex h-18 w-full items-center justify-between px-4 md:h-20 md:px-10">
        <img
          src="/images/zekaLogo2.png"
          className="absolute top-1/2 left-1/2 w-24 -translate-x-1/2 -translate-y-1/2 object-contain sm:w-28 md:static md:w-40 md:translate-x-0 md:translate-y-0"
        />

        <div className="mx-auto hidden items-center gap-5 md:flex">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <Button
                variant={"none"}
                className={`menu-item rounded-full text-base hover:cursor-pointer ${
                  pathname === item.href
                    ? "menu-item-active rounded-full"
                    : "menu-item-inactive"
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden items-center md:flex">
          {currentUser ? (
            <Link href={"/profile"}>
              <User />
            </Link>
          ) : (
            <Link href={"/auth/login"}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
