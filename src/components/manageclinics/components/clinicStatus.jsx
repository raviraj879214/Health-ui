"use client";

import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { toast } from "react-toastify";

const MAX_WORDS = 90;

export function ClinicStatus({ id ,onTrigger }) {
  const [clinicDetails, setClinicDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState({
    approve: "",
    block: "",
    reject: "",
    unreject: "",
    send_message: "",
  });

  // ---------- WORD LIMIT HANDLER ----------
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

  // ---------- FETCH CLINIC DETAILS ----------
  useEffect(() => {
    if (id) fetchClinicDetails();
  }, [id]);

  const fetchClinicDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-details/${id}`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );
      if (res.ok) setClinicDetails(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

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

        onTrigger(Math.random());


        toast.success("Action sent successfully", {
                          position: "bottom-right",
                          autoClose: 3000,
                        });

        setMessages((prev) => ({ ...prev, [messageKey]: "" }));
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

  // ---------- UI ----------
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
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : title}
      </button>
    </TabPanel>
  );

  return (
    <div className="bg-white border shadow rounded-xl">
      <div className="border-b px-5 py-3">
        <h3 className="text-lg font-bold">Make Action</h3>
      </div>

      <div className="p-5">
        <Tabs>
          <TabList className="flex border-b mb-4">
            {["Approve", "Block", "Reject", "Un-Reject/Block", "Send Message To Clinic"].map(
              (tab, i) => (
                <Tab
                  key={i}
                  className="px-6 py-3 cursor-pointer text-gray-600 selected:text-blue-600 selected:border-b-2 selected:border-blue-600"
                >
                  {tab}
                </Tab>
              )
            )}
          </TabList>

          {renderActionPanel("Approve", "approve", "send_approve")}
          {renderActionPanel("Block", "block", "send_block")}
          {renderActionPanel("Reject", "reject", "send_reject")}
          {renderActionPanel("Un-Reject / Un-Block", "unreject", "send_unreject")}

          <TabPanel>
            <h2 className="font-semibold mb-2">Write message to send</h2>
            <textarea
              value={messages.send_message}
              onChange={(e) => handleChange("send_message", e.target.value)}
              className="w-full h-32 p-3 border rounded-md"
            />
            <p className="text-sm text-gray-500 text-right">
              {wordCount(messages.send_message)} / {MAX_WORDS} words
            </p>
            <button
              disabled={!messages.send_message.trim() || loading}
              onClick={() => sendAction("send_message", "send_message")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
