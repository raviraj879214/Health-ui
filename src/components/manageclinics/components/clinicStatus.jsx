"use client";

import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { toast } from "react-toastify";

const MAX_WORDS = 90;

export function ClinicStatus({ id, onTrigger }) {
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState({
    active: "",
    inactive: "",
    message: "",
  });

  // ---------- WORD LIMIT ----------
  const handleChange = (key, value) => {
    const words = value.trim().split(/\s+/).filter(Boolean);
    if (words.length > MAX_WORDS) {
      setMessages((prev) => ({
        ...prev,
        [key]: words.slice(0, MAX_WORDS).join(" "),
      }));
    } else {
      setMessages((prev) => ({ ...prev, [key]: value }));
    }
  };

  const wordCount = (text) =>
    text.trim().split(/\s+/).filter(Boolean).length;

  // ---------- SEND ACTION ----------
  const sendAction = async (type, messageKey) => {
    if (!messages[messageKey].trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/make-an-action`,
        {
          method: "POST",
          headers: {
            ...(await adminHeaders()),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clinicId: id,
            messagetext: messages[messageKey],
            type,
          }),
        }
      );

      if (res.ok) {
        toast.success("Action completed successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });

        setMessages((prev) => ({ ...prev, [messageKey]: "" }));
        onTrigger?.(Math.random());
      }
    } catch {
      toast.error("Failed to send action", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------- ACTION PANEL ----------
  const renderActionPanel = (title, key, type) => (
    <TabPanel>
      <h2 className="font-semibold mb-2">{title} reason</h2>

      <textarea
        value={messages[key]}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full h-32 p-3 border rounded-md"
      />

      <p className="text-sm text-gray-500 text-right">
        {wordCount(messages[key])} / {MAX_WORDS} words
      </p>

      <button
        disabled={!messages[key].trim() || loading}
        onClick={() => sendAction(type, key)}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : title}
      </button>
    </TabPanel>
  );

  // ---------- UI ----------
  return (
    <div className="bg-white border shadow rounded-xl">
      <div className="border-b px-5 py-3">
        <h3 className="text-lg font-bold">Clinic Actions</h3>
      </div>

      <div className="p-5">
        <Tabs>
          <TabList className="flex border-b mb-4">
            {["Active", "Inactive", "Send Message"].map((tab, i) => (
              <Tab
                key={i}
                className="px-6 py-3 cursor-pointer text-gray-600
                           selected:text-blue-600
                           selected:border-b-2
                           selected:border-blue-600"
              >
                {tab}
              </Tab>
            ))}
          </TabList>

          {renderActionPanel("Activate Clinic", "active", "send_active")}
          {renderActionPanel("Deactivate Clinic", "inactive", "send_inactive")}

          <TabPanel>
            <h2 className="font-semibold mb-2">Write message to clinic</h2>

            <textarea
              value={messages.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full h-32 p-3 border rounded-md"
            />

            <p className="text-sm text-gray-500 text-right">
              {wordCount(messages.message)} / {MAX_WORDS} words
            </p>

            <button
              disabled={!messages.message.trim() || loading}
              onClick={() => sendAction("send_message", "message")}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
