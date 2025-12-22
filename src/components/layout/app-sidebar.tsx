"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { BookMarked, Search, Shield, PlusCircle, MinusCircle, Bell } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { genres } from "@/lib/mock-data";
import { RecommendationsButton } from "../recommendations-button";
import Link from "next/link";

export default function AppSidebar() {
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold tracking-tight">
              LibWise
            </span>
          </Link>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name/author..." className="pl-8" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent className="grid grid-cols-2 gap-2">
            {genres.map((genre) => (
              <div key={genre.id} className="flex items-center space-x-2">
                <Checkbox id={genre.id} />
                <Label htmlFor={genre.id} className="text-sm font-normal">
                  {genre.type}
                </Label>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === 'standard' && (
          <SidebarGroup>
            <RecommendationsButton />
          </SidebarGroup>
        )}

        {user?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Admin Panel
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <button className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent">
                    <PlusCircle className="h-4 w-4" /> Add Book
                  </button>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <button className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent">
                    <MinusCircle className="h-4 w-4" /> Remove Book
                  </button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <button disabled={!user} className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-sidebar-accent disabled:opacity-50 disabled:cursor-not-allowed">
                    <Bell className="h-4 w-4" /> Notifications
                </button>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
