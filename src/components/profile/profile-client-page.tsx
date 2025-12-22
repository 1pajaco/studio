"use client";

import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { User } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

interface ProfileClientPageProps {
  children: (user: User) => React.ReactNode;
}

export default function ProfileClientPage({ children }: ProfileClientPageProps) {
  const { user } = useUser();

  useEffect(() => {
    if (user === null) {
      redirect("/");
    }
  }, [user]);

  if (!user) {
    // Shows a loading/skeleton state while redirecting
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <CardSkeleton />
            <CardSkeleton />
        </div>
    );
  }

  return <>{children(user)}</>;
}


const CardSkeleton = () => (
    <div className="space-y-4 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex items-center gap-6">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    </div>
)
