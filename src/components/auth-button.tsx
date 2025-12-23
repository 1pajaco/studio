"use client";

import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";
import Link from "next/link";

export function AuthButton() {
  const { login } = useUser();

  return (
    <Button asChild>
      <Link href="/login">
        <LogIn className="mr-2" />
        Login
      </Link>
    </Button>
  );
}
