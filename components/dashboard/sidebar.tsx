"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  FileText,
  LayoutDashboard,
  
} from "lucide-react";
import Link from "next/link";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden m-4 text-purple-300">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

function DashboardSidebar() {
  return (
    <div className="h-full px-8 py-6 text-white border-r-1 bg-purple-500
    ">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={"/"}>
        <span className="text-xl font-bold">Pixel Perfect</span>
        </Link>
      </div>
      <nav className="space-y-1 flex flex-col gap-2">
        <Link href={"/admin/dashboard/tracks"}>
          <Button
            variant="ghost"
            className="w-full justify-start p-5 border-white/20 rounded-xl border-1"
            
          >
            <BarChart className="mr-2 h-4 w-4" />
            Tracks
          </Button>
        </Link>

        <Link href={"/admin/dashboard/articles"}>
          <Button
            variant="ghost"
            className="w-full justify-start p-5 border-white/20 rounded-xl border-1"

          >
            <FileText className="mr-2 h-4 w-4" />
            Articles
          </Button>
        </Link>
        
         
      </nav>
    </div>
  );
}