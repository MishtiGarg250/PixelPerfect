import React, { ReactNode } from 'react';
import UserSidebar from "@/components/user/dashboard/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-purple-200 flex">
      
      {/* Sidebar */}
      <aside className="w-[250px] h-screen fixed ">
        <UserSidebar />
      </aside>

      {/* Main Content */}
      <main className="sm:ml-[250px]  ml-6 mt-5 flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
