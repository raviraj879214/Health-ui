import { useEffect, useState } from "react";

export function ChatUserList({onSelectUser }) {
  const [userchatlist, setUserChatList] = useState([]);

  useEffect(() => {
    fetchChatUsers();
  }, []);

  const fetchChatUsers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/chat/get-user-list`
    );

    if (res.ok) {
      const result = await res.json();
      setUserChatList(result.data);  // ✅ store entire array
    }
  };

  return (
    <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
      {userchatlist.map((p, i) => (
        <div
          key={i}
          onClick={() => onSelectUser(p.id,p.clinic_name)}
          className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
        >
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
            <img
              src={`https://placehold.co/200x/aaa/ffffff.svg?text=${p.clinic_name[0]}`}
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{p.clinic_name}</h2>
            <p className="text-gray-600">{p.profession}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
