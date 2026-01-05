"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { formatBrazilDate } from "../../lib/formatDate";

let socket;

export default function NotificationUI() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);


  const fetchnotifications = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/get-notify`,{
      method : "Get"
    });
    if(res.ok){
      debugger;
      const result =await res.json();

      console.log("result",result);
      setNotifications(result.data);
    }
  }







  useEffect(() => {
   
    fetchnotifications();


    socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Connected to notification socket");
    });


    socket.on("notification", (data) => {
      const newNotifications = Array.isArray(data) ? data : [data];
      // Replace state with latest notifications from backend
      setNotifications(
        newNotifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);




  const unreadCount = notifications.filter((n) => !n.isRead).length;


  return (
    <div className="relative">
      {/* 🔔 Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-full p-2 text-gray-700  transition"
      >
        <span className="text-2xl">🔔</span>

        {/* 🔴 Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📬 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="font-semibold text-gray-800">Notifications</span>
            <span className="text-xs text-gray-500">{notifications.length}</span>
          </div>

          {/* Body */}
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="group cursor-pointer border-b px-4 py-3 transition hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    {/* Dot */}
                    <span
                      className={`mt-2 h-2 w-2 rounded-full ${
                        n.isRead ? "bg-gray-400" : "bg-blue-600"
                      } opacity-80 group-hover:opacity-100`}
                    ></span>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{n.type}</p>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {n.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {formatBrazilDate(n.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
