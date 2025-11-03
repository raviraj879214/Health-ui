"use client";

import { useEffect, useRef, useState } from "react";

export function MessagesBox({ receiverid, senderid }) {
  const [chatmessages, setChatMessages] = useState([]);
  const [currentuserid, setCurrentUserId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getChatMessages();
    const interval = setInterval(() => getChatMessages(), 2000);
    return () => clearInterval(interval);
  }, [senderid, receiverid]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getUser = async () => {
    const resToken = await fetch("/api/auth/get-userid");
    const { userid } = await resToken.json();
    setCurrentUserId(userid);
  };

  const getChatMessages = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/chat/get-chat-list/${senderid}/${receiverid}`
    );
    if (res.ok) {
      const result = await res.json();
      setChatMessages(result.data || []);
      scrollToBottom();
    }
  };

  return (
    <div className="h-full overflow-y-auto px-8 py-6 pb-32 bg-gray-100">

      {chatmessages.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No messages yet. Start the conversation 👇
        </p>
      )}

      {chatmessages.map((item) => {
        const isMine = item.sender_id == currentuserid;

        return (
          <div
            key={item.id}
            className={`flex mb-6 items-end ${
              isMine ? "justify-end" : "justify-start"
            }`}
          >

            {/* Left avatar for received messages */}
            {!isMine && (
              <img
                src={`https://placehold.co/40x40/ffa8e4/fff?text=${item.sender.clinic_name[0]}`}
                className="w-8 h-8 rounded-full mr-3 border shadow-sm"
              />
            )}

            {/* Bubble */}
            <div
              className={`bg-white shadow-md text-gray-800 px-4 py-3 rounded-2xl max-w-sm ${
                isMine ? "rounded-br-none" : "rounded-bl-none"
              }`}
            >
              <p>{item.message}</p>

              <p className="text-[10px] text-gray-500 mt-1 text-right">
                {new Date(item.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Right avatar for sent messages */}
            {isMine && (
              <img
                src={`https://placehold.co/40x40/b7a8ff/fff?text=A`}
                className="w-8 h-8 rounded-full ml-3 border shadow-sm"
              />
            )}
          </div>
        );
      })}

      <div ref={chatEndRef}></div>
    </div>
  );
}
