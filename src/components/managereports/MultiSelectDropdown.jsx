import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";

export function MultiSelectDropdown({ onSelected = () => {} }) {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toggle select
  const toggleOption = (option) => {
    setSelected((prev) => {
      let updated;

      if (prev.includes(option.id)) {
        updated = prev.filter((id) => id !== option.id);
      } else {
        updated = [...prev, option.id];
      }

      onSelected(updated); // ✅ always latest value
      return updated;
    });
  };

  // Select all
  const handleSelectAll = () => {
    setSelected((prev) => {
      let updated;

      if (prev.length === options.length) {
        updated = [];
      } else {
        updated = options.map((item) => item.id);
      }

      onSelected(updated); // ✅ send latest
      return updated;
    });
  };

  // Fetch API
  const fetchPatietnQueryCodes = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/report/get-patient-query-codes`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );

      if (res.ok) {
        const result = await res.json();
        setOptions(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatietnQueryCodes();
  }, []);

  return (
    <div className="w-72 relative">
      {/* Label */}
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Select Patient Query Code
      </label>

      {/* Dropdown Button */}
      <div
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded-xl px-3 py-2 bg-white cursor-pointer flex justify-between items-center"
      >
        <span className="text-sm text-gray-600 truncate">
          {loading
            ? "Loading..."
            : selected.length > 0
            ? `${selected.length} selected`
            : "Choose code"}
        </span>
        <span className="text-gray-400">▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-full border border-gray-200 rounded-xl shadow-lg bg-white">
          
          {/* Select All */}
          <div className="flex items-center px-3 py-2 border-b bg-gray-50">
            <input
              type="checkbox"
              checked={selected.length === options.length && options.length > 0}
              onChange={handleSelectAll}
              className="accent-blue-600 mr-2"
            />
            <span className="text-sm">Select All</span>
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto p-2 space-y-1">
            {loading && (
              <div className="text-sm text-gray-400 px-3 py-2">
                Loading...
              </div>
            )}

            {!loading && options.length === 0 && (
              <div className="text-sm text-gray-400 px-3 py-2">
                No data available
              </div>
            )}

            {!loading &&
              options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.id)}
                    onChange={() => toggleOption(option)}
                    className="accent-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {option.querycode}
                  </span>
                </label>
              ))}
          </div>
        </div>
      )}


    


    </div>
  );
}