"use client";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

import { IconSearch } from "@tabler/icons-react";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const pathname = usePathname();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const leftMenuItems = [
    { name: "Courses", href: "/courses" },
    { name: "My Learning", href: "/myLearning" },
  ];
  const rightMenuItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const router = useRouter();
  return (
    <header className="border-border bg-card/70 sticky top-0 left-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="flex h-18 w-full items-center justify-between gap-3 px-4 md:h-20 md:px-10">
        <img
          src={
            !mounted
              ? "/images/zekaLogoBlack2.png"
              : currentTheme === "dark"
                ? "/images/zekaLogo2.png"
                : "/images/zekaLogoBlack2.png"
          }
          className="w-24 hover:cursor-pointer sm:w-28 md:mr-3 md:w-40"
          alt="ZEKA Logo"
          onClick={() => {
            router.push("/");
          }}
        />

        <div className="hidden items-center gap-2 md:flex">
          {leftMenuItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <Button
                variant={"none"}
                className={`menu-item rounded-full text-base transition-colors hover:cursor-pointer ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground rounded-full font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="relative flex w-full items-center">
          <Input
            className="w-full pl-10 text-base md:flex"
            placeholder={"Search for anything.."}
          />
          <IconSearch className="text-muted-foreground absolute left-3 size-4.5" />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {rightMenuItems.map((item, i) => (
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
        {isCurrentUserLoading ? (
          <Skeleton className="md:h-8 md:w-50" />
        ) : (
          <div className="items-center gap-3 md:flex">
            {currentUser ? (
              <Link
                href={"/profile"}
                className="text-muted-foreground hover:text-foreground hover:bg-accent hidden items-center justify-center rounded-full p-1.5 transition-colors md:flex"
              >
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <Button variant={"outline"} asChild>
                  <Link
                    href={"/auth/login"}
                    className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                  >
                    Log in
                  </Link>
                </Button>

                <Button variant={"default"} className="hidden md:flex" asChild>
                  <Link
                    href={"/auth/signup"}
                    className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </Button>
              </div>
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
        )}
      </div>
    </header>
  );
};

export default Header;
