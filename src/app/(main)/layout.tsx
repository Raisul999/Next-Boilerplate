"use client"
import Navbar from "@/components/Navbar";
import SidebarNav from "@/components/Sidebar";
import React from "react";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block h-[100vh]">
          <SidebarNav />
        </div>
        <div className="p-5 w-full md:max-w-[1140px]"> <SessionProvider>{children}</SessionProvider></div>
      </div>
    </div>
  );
};

export default MainLayout;
