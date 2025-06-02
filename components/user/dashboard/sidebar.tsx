"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  ChartColumn,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="sm:hidden m-4 text-purple-300">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:w-[250px] p-0">
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden sm:block h-screen sm:w-[250px]">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default UserSidebar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/user/profile",
      icon: User,
      label: "Your Profile",
    },
    {
      href: "/user/articles/likedArticeles",
      icon: Heart,
      label: "Liked Articles",
    },
    {
      href: "/user/articles/comments",
      icon: MessageCircle,
      label: "Comments",
    },
    {
      href: "/user/dashboard/",
      icon: ChartColumn,
      label: "Tracks",
    },
  ];

  return (
    <div
      className="h-full px-6 py-6 bg-gradient-to-b from-black via-purple-500 to-black text-purple-200"
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={"/"}>
          <span className="text-xl font-bold text-purple-100">Pixel Perfect</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex flex-col">
  {links.map(({ href, icon: Icon, label }) => {
    const isActive = pathname === href;

    return (
      <Link href={href} key={href}>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-r-lg border-l-4 transition-all duration-200
            ${
              isActive
                ? "bg-purple-800/50 border-l-purple-400 text-white"
                : "border-l-transparent text-purple-200 hover:bg-purple-700 hover:text-white"
            }
          `}
          onClick={closeSheet}
        >
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
      </Link>
    );
  })}
</nav>

    </div>
  );
}
