import { ReloadIcon } from "@/icons";
import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  showReload?: boolean;
  infoText?: string; // 👈 New optional prop for info tooltip
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  showReload = false,
  infoText = "", // 👈 Default empty
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between px-6 py-5">
        <div>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90 flex items-center gap-2">
            {title}
            {/* ✅ Show Info Icon only if infoText exists */}
            {infoText && (
              <div className="relative inline-block">
                <span
                  className="cursor-pointer text-gray-500"
                  title={infoText}
                >
                  ℹ️
                </span>
              </div>
            )}
          </h3>

          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>

        {/* ✅ Conditionally show Reload Button */}
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

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
