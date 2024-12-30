import React, { useState } from "react";
import { message } from "antd";
import { Tab } from "@headlessui/react";
import API from "@/services/index";
import { formatDateTime } from "@/utils/formatDateTime";

const NotificationsPanel = ({ user, handleNotificationClick, unreadNotifications, readNotifications }) => {
  const [selectedTab, setSelectedTab] = useState("Unread");

  const categories = {
    Unread: unreadNotifications,
    Read: readNotifications,
  };

  const markAllAsRead = async () => {
    try {
      const response = await API.private.markAllAsRead();
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  };

  const deleteAllRead = async () => {
    try {
      const response = await API.private.deleteAllRead();
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl text-blue-700 font-bold mb-4">Notifications</h2>
      <Tab.Group
        onChange={(index) => {
          const categoryKeys = Object.keys(categories);
          setSelectedTab(categoryKeys[index]); // Update selectedTab based on tab change
        }}
      >
        <Tab.List className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `text-sm font-medium ${selected ? "text-blue-500 border-b-2 border-blue-500" : "text-slate-600"}`
                }
              >
                {category}
              </Tab>
            ))}
          </div>
          <button
            onClick={() => {
              if (selectedTab === "Unread") {
                markAllAsRead();
              } else if (selectedTab === "Read") {
                deleteAllRead();
              }
            }}
            className="text-blue-400 text-sm"
          >
            {selectedTab === "Read" ? "Delete All Read" : "Mark All As Read"}
          </button>
        </Tab.List>
        <Tab.Panels className="mt-4">
          {Object.entries(categories).map(([category, notifications], idx) => (
            <Tab.Panel key={idx}>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="p-2 border-b border-l-4 border-l-blue-400 cursor-pointer rounded my-4"
                    onClick={() => handleNotificationClick(notification.path)}
                  >
                    <p className="font-bold text-md uppercase">{notification.title}</p>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-right text-gray-400">{formatDateTime(notification.createdAt)}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No {category.toLowerCase()} notifications available</p>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NotificationsPanel;
