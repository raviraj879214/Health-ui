import { useState } from "react";

export function ManageNotes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Hey TARS, what's your honesty parameter?",
      time: "8:34 AM",
      isMine: true,
      sender: "You",
    },
    {
      id: 2,
      text: "I am always honest 🙂",
      time: "8:35 AM",
      isMine: false,
      sender: "TARS",
    },
  ]);

  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSend = () => {
    if (!message.trim()) return;

    if (editId) {
      setNotes((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, text: message } : item
        )
      );
      setEditId(null);
      setMessage("");
      return;
    }

    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: true,
        sender: "You",
      },
    ]);

    setMessage("");
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setMessage(item.text);
  };

  return (
    <>
      <div className="w-full rounded-lg bg-white shadow-lg mt-10">
        {/* Header */}
        <div className="relative flex w-full items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="font-semibold">Manage Notes</div>
          </div>
        </div>

        {/* CHAT LIST */}
        <ul className="border-t border-gray-200 p-3 pb-6 max-h-96 overflow-y-auto space-y-4">
          {notes.map((item) => (
            <li
              key={item.id}
              className={`flex flex-col ${
                item.isMine ? "items-end" : "items-start"
              }`}
            >
              {/* NAME */}
              <div
                className={`text-xs mb-1 ${
                  item.isMine ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {item.sender}
              </div>

              {/* TIME */}
              <div className="text-[10px] opacity-60">{item.time}</div>

              {/* MESSAGE BUBBLE */}
              <div
                className={`relative max-w-xs px-3 py-2 rounded-lg text-sm 
                ${
                  item.isMine
                    ? "bg-blue-600 text-white text-right"
                    : "bg-gray-200 text-black text-left"
                }`}
              >
                {item.text}

                {/* ACTIONS */}
                <div className="flex gap-2 text-xs mt-1 justify-end">
                  {item.isMine && (
                    <>
                      <button
                        className="text-yellow-300"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️
                      </button>
                      <button
                        className="text-red-400"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* INPUT BAR */}
        <div className="relative">
          <input
            type="text"
            placeholder="Add message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-10 w-full rounded-b-lg border-t border-gray-200 bg-gray-100 pl-3 text-sm focus:outline-blue-600/50"
          />

          <button
            onClick={handleSend}
            className="absolute top-0 right-2 bottom-0 my-auto px-2 text-blue-600 hover:bg-gray-200 rounded"
          >
            {editId ? "Update" : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}
