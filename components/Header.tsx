"use client";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // تحديد اسم الثيم الحالي بشكل آمن
  const currentTheme = theme === "system" ? resolvedTheme : theme;
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
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 left-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-18 w-full items-center justify-between px-4 md:h-20 md:px-10">
        <img
          // استخدام صورة موحدة أو شفافة بسيطة قبل الـ Mounted لمنع خطأ الـ Hydration
          src={
            !mounted
              ? "/images/zekaLogoBlack2.png"
              : currentTheme === "dark"
                ? "/images/zekaLogo2.png"
                : "/images/zekaLogoBlack2.png"
          }
          className="absolute top-1/2 left-1/2 w-24 -translate-x-1/2 -translate-y-1/2 object-contain sm:w-28 md:static md:w-40 md:translate-x-0 md:translate-y-0"
          alt="ZEKA Logo"
        />

        <div className="mx-auto hidden items-center gap-5 md:flex">
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <Button
                variant={"none"}
                className={`menu-item rounded-full text-base transition-colors hover:cursor-pointer ${
                  pathname === item.href
                    ? "menu-item-active bg-accent text-accent-foreground rounded-full font-medium"
                    : "menu-item-inactive text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {currentUser ? (
            <Link
              href={"/profile"}
              className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center justify-center rounded-full p-2 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href={"/auth/login"}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Login
            </Link>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground relative"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
