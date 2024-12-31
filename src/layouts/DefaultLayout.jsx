import React, { useState, useRef, useEffect } from "react";
import { message } from "antd";
import { NavLink, Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { formatName } from "@/utils/formatName";
import { formatPath } from "@/utils/formatPath";
import { adminMenu, studentMenu } from "@/data/data";
import Icon from "@/components/ui/Icon";
import NotificationsPanel from "@/components/NotificationsPanel";

const DefaultLayout = () => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationPanelVisible, setIsNotificationPanelVisible] = useState(false);
  const notificationPanelRef = useRef(null);

  let user = JSON.parse(localStorage.getItem("user"));
  const sortedNotifications = (user.notifications || []).slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const unreadNotifications = sortedNotifications.filter(
    (notification) => notification.userNotifications[0]?.seenAt === null
  );
  const readNotifications = sortedNotifications.filter(
    (notification) => notification.userNotifications[0]?.seenAt !== null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const menu = user.user.isAdmin ? adminMenu : studentMenu;
  const activeMenuItem = menu.find((item) => item.path === location.pathname);

  const handleLogout = () => {
    message.success("Logged out successfully");
    localStorage.clear();
    navigate("/auth/login");
  };

  const handleNotificationClick = (path) => {
    navigate(path);
    setIsNotificationPanelVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target)) {
        setIsNotificationPanelVisible(false);
      }
    };

    if (isNotificationPanelVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationPanelVisible]);

  return (
    <div className="flex h-screen bg-[#f0f5f9]">
      <div
        className={`bg-blue-950 text-white transition-all duration-300 flex flex-col ${
          isSidebarHovered ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => {
          setIsSidebarHovered(false);
          setIsProfileDropdownOpen(false);
        }}
      >
        <div className="flex items-center h-20 px-4 border-b border-blue-900">
          <img src="/favicon.png" alt="logo" className="h-12 w-12 object-cover rounded-md" />
          {isSidebarHovered && (
            <span className="ms-3 font-bold leading-tight">
              Asia Pacific Institute <br />
              of Information Technology
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <nav className="mt-4 space-y-2 px-2">
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
        <div className="border-t border-blue-900 px-4 py-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <img src={user.user.profilePic} alt={user.user.name} className="h-8 w-8 object-cover rounded-full" />
            {isSidebarHovered && (
              <div className="flex items-center space-x-2">
                <span className="ms-3 font-semibold">{formatName(user.user.name)}</span>
                <Icon icon="heroicons:chevron-up" className="w-5 h-5" />
              </div>
            )}
          </div>
          {isProfileDropdownOpen && isSidebarHovered && (
            <div
              className={`${
                isProfileDropdownOpen
                  ? "absolute bottom-20 left-24 h-20 rounded border border-slate-50/30 shadow-md w-40 mt-2 space-y-2"
                  : "hidden"
              }`}
            >
              <NavLink
                to="/auth/login"
                className="flex items-center space-x-2 mx-2 py-2 border-b border-slate-50/30"
                onClick={handleLogout}
              >
                <Icon icon="heroicons:arrow-left-end-on-rectangle" className="w-6 h-6" />
                <span>Logout</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <header className="border-b px-4 py-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">
            {activeMenuItem ? activeMenuItem.name : formatPath(location.pathname)}
          </h2>
          <div>
            <div className="cursor-pointer relative" onClick={() => setIsNotificationPanelVisible(true)}>
              <Icon icon="heroicons:bell" className="w-10 h-10 p-2 rounded-full bg-white" />
              {user.notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>

        <div
          ref={notificationPanelRef}
          className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 ease-in-out ${
            isNotificationPanelVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
            onClick={() => setIsNotificationPanelVisible(false)}
          >
            <Icon icon="heroicons:x-mark" className="w-6 h-6" />
          </button>
          <NotificationsPanel
            user={user}
            handleNotificationClick={handleNotificationClick}
            unreadNotifications={unreadNotifications}
            readNotifications={readNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
