"use client";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";

import { Book, Home, LibraryBig, LogIn, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const navItems = [
    {
      title: "1",
      href: "/",
      icon: Home,
    },

    {
      title: "2",
      href: "/courses",
      icon: LibraryBig,
    },

    {
      title: "3",
      href: "/courses/22222222-2222-4222-8222-222222222222/a2020202-0002-4000-8000-000000000001",
      icon: Book,
    },

    {
      title: "4",
      name: currentUser ? null : "LOGIN",
      href: currentUser ? "/profile" : "/auth/login",
      icon: currentUser ? UserIcon : LogIn,
    },
  ];

  return (
    <nav className="fixed bottom-0 z-50 mb-3 block w-full items-center justify-center px-3 md:hidden">
      <div className="bg-card border-border flex h-16 items-center justify-around rounded-full border px-3 backdrop-blur-md">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-white"
              }`}
            >
              {isCurrentUserLoading &&
              (item.title == "3" || item.title == "4") ? (
                <Skeleton className="h-7 w-7 rounded-full" />
              ) : (
                <div className="relative">
                  <Icon className="text-card-foreground h-6 w-6" />
                </div>
              )}

              {/* {item.name ? (
                <span className="text-[9px]">{item.name}</span>
              ) : null} */}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
