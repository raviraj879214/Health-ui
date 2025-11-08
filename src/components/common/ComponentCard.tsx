import { ReloadIcon } from "@/icons";
import React from "react";

interface Tab {
  label: string;
  value: string; // ✅ changed from url to value
}

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  showReload?: boolean;
  infoText?: string;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (value: string) => void; // ✅ value instead of url
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  showReload = false,
  infoText = "",
  tabs = [],
  activeTab = "",
  onTabChange
}) => {
  const handleReload = () => window.location.reload();

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Header */}
      <div className="px-6 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90 flex items-center gap-2">
              {title}
              {infoText && (
                <span className="cursor-pointer text-gray-500" title={infoText}>
                  ℹ️
                </span>
              )}
            </h3>

            {desc && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            )}
          </div>

          {showReload && (
            <button
              onClick={handleReload}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 transition"
              title="Reload Page"
            >
              <ReloadIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Responsive Tabs */}
        {tabs.length > 0 && (
          <>
            {/* Dropdown for small screens */}
            <div className="sm:hidden mt-4">
              <label htmlFor="tabs" className="sr-only">Select Tab</label>
              <select
                id="tabs"
                value={activeTab}
                onChange={(e) => onTabChange?.(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {tabs.map((tab) => (
                  <option key={tab.value} value={tab.value}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Horizontal tabs for larger screens */}
            <ul className="hidden sm:flex mt-4 text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm dark:divide-gray-700 dark:text-gray-400">
              {tabs.map((tab, index) => (
                <li key={tab.value} className="w-full focus-within:z-10">
                  <button
                    onClick={() => onTabChange?.(tab.value)}
                    className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-none transition-colors 
                      ${
                        activeTab === tab.value
                          ? "text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white"
                          : "bg-white dark:bg-gray-800 hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                      } 
                      ${index === 0 ? "rounded-l-lg" : ""} 
                      ${index === tabs.length - 1 ? "rounded-r-lg border-r-0" : ""}`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
