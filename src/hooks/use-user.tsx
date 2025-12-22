"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "@/lib/types";
import { users as mockUsers } from "@/lib/mock-data";

type UserContextType = {
  user: User | null;
  login: (role: "standard" | "admin") => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: "standard" | "admin") => {
    const userToLogin = mockUsers.find((u) => u.role === role);
    setUser(userToLogin || null);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
