import React, { ReactNode } from 'react';
import UserSidebar from "@/components/dashboard/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-purple-200 flex">
      
      {/* Sidebar */}
      <aside className="w-64 h-screen fixed left-0 bg-purple-900/10 ">
        <UserSidebar />
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
