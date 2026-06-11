"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export function SeoMaster() {
  const [activeTab, setActiveTab] = useState("sitemap");

  const [sitemap, setSitemap] = useState("");
  const [robots, setRobots] = useState("");
  const [llms, setLlms] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch existing content
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const [s1, s2, s3] = await Promise.all([
        fetch("/api/seo/sitemap").then((r) => r.text()),
        fetch("/api/seo/robots").then((r) => r.text()),
        fetch("/api/seo/llms").then((r) => r.text()),
      ]);

      setSitemap(s1);
      setRobots(s2);
      setLlms(s3);

      setLoading(false);
    };

    load();
  }, []);

  const save = async () => {
    setSaving(true);

    await fetch("/api/seo/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sitemap,
        robots,
        llms,
      }),
    });

    setSaving(false);
    alert("Saved successfully");
  };

  return (
    
    <div className="bg-gray-50 p-6">
      <ToastContainer></ToastContainer>
      <div className="mx-auto ">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            SEO File Manager
          </h1>
          <p className="text-gray-500 text-sm">
            Edit sitemap.xml, robots.txt, and llms.txt
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "sitemap", label: "Sitemap.xml" },
            { key: "robots", label: "Robots.txt" },
            { key: "llms", label: "LLMs.txt" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-black text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Box */}
        <div className="bg-white border rounded-xl shadow-sm">
          {loading ? (
            <div className="p-6 text-gray-500">Loading...</div>
          ) : (
            <>
              {activeTab === "sitemap" && (
                <textarea
                  className="w-full h-[500px] p-4 font-mono text-sm outline-none"
                  value={sitemap}
                  onChange={(e) => setSitemap(e.target.value)}
                />
              )}

              {activeTab === "robots" && (
                <textarea
                  className="w-full h-[500px] p-4 font-mono text-sm outline-none"
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                />
              )}

              {activeTab === "llms" && (
                <textarea
                  className="w-full h-[500px] p-4 font-mono text-sm outline-none"
                  value={llms}
                  onChange={(e) => setLlms(e.target.value)}
                />
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-100"
          >
            Reset
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}