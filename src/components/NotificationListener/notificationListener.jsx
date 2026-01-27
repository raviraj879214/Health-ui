"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { formatBrazilDate } from "../../lib/formatDate";

let socket;

export default function NotificationUI({id}) {
  
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [notificationloader,setNotificationLoader] = useState(false);


  const fetchnotifications = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/get-notify/${id}`,{
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
      console.log("newNotifications",newNotifications);
     
      setNotifications(
        newNotifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    });

    return () => {
      socket.disconnect();
    };
    
  }, [id]);




  const unreadCount = notifications.filter((n) => !n.isRead && n.globaluserid === id).length;



  const markAsRead = async(id)=>{
   setNotificationLoader(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/mark-as-read`,{
      method : "Post",
      headers :{
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    });
    if(res.ok){
      const result = await res.json();
      fetchnotifications();
    }

    setNotificationLoader(false);
  }



  return (
    <div className="relative">
  
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-full p-2 text-gray-700  transition"
      >
        <span className="text-2xl">🔔</span>

 
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
            {unreadCount}
          </span>
        )}
    
      </button> 


      {open && (
        <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-xl">
       
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="font-semibold text-gray-800">Notifications</span>
            <span className="text-xs text-gray-500">{notifications.filter(x=>x.globaluserid === id).length}</span>
          </div>

         <div className="max-h-[360px] overflow-y-auto">
  {notifications.filter(x => x.globaluserid === id).length === 0 ? (
    <div className="px-4 py-6 text-center text-sm text-gray-500">
      No notifications yet
    </div>
  ) : (
    notifications.filter(x => x.globaluserid === id).map((n) => (
      <div
        key={n.id}
        className={`relative border-b px-4 py-3 transition ${
          !n.isRead ? "bg-blue-50/40" : "bg-white"
        }`}>

        <div className="flex items-start gap-3">
        
          <span
            className={`mt-2 h-2 w-2 rounded-full ${
              n.isRead ? "bg-gray-400" : "bg-blue-600"
            }`}></span>

          <div className="flex-1 pr-20">
            <p className="text-sm font-semibold text-gray-900">{n.type}</p>
            <p className="mt-1 text-sm text-gray-600">{n.message}</p>
            <p className="mt-2 text-xs text-gray-400">
              {formatBrazilDate(n.createdAt)}
            </p>
          </div>
        </div>

      
        {!n.isRead && (
          <button
            onClick={()=> markAsRead(n.id)}
            className="absolute bottom-3 right-3 rounded-md border border-blue-200 bg-white px-2 py-1 text-xs font-medium text-blue-600 shadow-sm hover:bg-blue-50 hover:text-blue-800 transition">
            Mark read
          </button>
        )}
      </div>
    ))
  )}
</div>





        </div>
      )}
    </div>
  );
}
