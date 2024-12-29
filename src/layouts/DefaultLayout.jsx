import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatName } from "@/utils/formatName";
import { adminMenu, studentMenu } from "@/data/data";
import Icon from "@/components/ui/Icon";

const DefaultLayout = () => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const { user } = useSelector((state) => state.user);

  const menu = user?.isAdmin ? adminMenu : studentMenu;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-blue-950 text-white transition-all duration-300 ${isSidebarHovered ? "w-64" : "w-16"}`}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        {/* Logo and Organization Name */}
        <div className="flex items-center h-20 px-4 border-b border-blue-900">
          <img src="/favicon.png" alt="logo" className="h-12 w-12 object-cover rounded-md" />
          {isSidebarHovered && (
            <span className="ms-3 font-bold leading-tight">
              Asia Pacific Institute <br />
              of Information Technology
            </span>
          )}
        </div>

        {/* Menu */}
        <div className="flex flex-col h-full px-2">
          <button className="p-4 focus:outline-none">
            <Icon icon="heroicons:menu" className="w-6 h-6" />
          </button>
          <nav className="mt-4 space-y-2">
            {menu.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) =>
                  `flex items-center ${
                    isSidebarHovered ? "justify-start ps-4" : "justify-center"
                  } w-full h-12 rounded ${isActive ? "bg-blue-500" : "hover:bg-blue-700"}`
                }
              >
                <Icon icon={item.icon} className="w-6 h-6" />
                {isSidebarHovered && <span className="ms-2">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-blue-900 text-white shadow p-4 flex items-center justify-end">
          <div className="flex items-center space-x-4">
            <Icon icon="heroicons:bell" className="w-10 h-10 bg-blue-800 p-2 rounded-md text-white" />
            <span className="text-lg font-semibold">{formatName(user?.name)}</span>
            <img src={user?.profilePic} alt={user?.name} className="h-12 w-12 object-cover rounded-full" />
          </div>
        </header>
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
