import React, { useEffect, useState } from "react";
import { formatDate } from "./../../utils/formatDate";
import Badge from "@/components/ui/Badge";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.notifications) {
      setNotifications(user.notifications);
    }
  }, []);

  return (
    <>
      {notifications.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          <p className="text-lg">No notifications available</p>
          <p className="mt-2 text-sm">You're all caught up!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => {
            const isRead = notification.userNotifications.every((userNotif) => userNotif.seenAt !== null);
            return (
              <li
                key={notification.id}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-medium text-gray-700">{notification.title}</h2>
                  <Badge color={isRead ? "green" : "blue"} text={isRead ? "Read" : "Unread"} />
                </div>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                <span className="text-gray-400 text-xs">{formatDate(notification.createdAt)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Notifications;
