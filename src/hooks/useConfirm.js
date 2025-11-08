import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [promiseInfo, setPromiseInfo] = useState({ resolve: null, message: "" });

  const confirm = (message) => {
    setIsOpen(true);
    return new Promise((resolve) => {
      setPromiseInfo({ resolve, message });
    });
  };

  const handleConfirm = () => {
    promiseInfo.resolve(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    promiseInfo.resolve(false);
    setIsOpen(false);
  };

  const ConfirmDialog = () => (
    <Dialog open={isOpen} onClose={handleCancel} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 text-left">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-full bg-red-100 p-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Confirm
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-500">{promiseInfo.message}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );

  return { confirm, ConfirmDialog };
}
