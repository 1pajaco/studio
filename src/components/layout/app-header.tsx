"use client";

import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BookMarked } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { UserAvatar } from "@/components/user-avatar";
import { useUser } from "@/hooks/use-user";
import { ThemeSwitcher } from "../theme-switcher";

export default function AppHeader() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>

      <Link href="/" className="hidden items-center gap-2 md:flex">
        <BookMarked className="h-6 w-6 text-primary" />
        <span className="font-headline text-xl font-bold tracking-tight">
          LibWise
        </span>
      </Link>

      <div className="flex w-full items-center justify-end gap-4">
        <ThemeSwitcher />
        {user ? <UserAvatar /> : <AuthButton />}
      </div>
    </header>
  );
}
