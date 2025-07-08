import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function EditHabitModal({ isOpen, onCancel, onSave, habit }) {
  const [title, setTitle] = useState(habit?.title || "");

  useEffect(() => {
    setTitle(habit?.title || "");
  }, [habit]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave(habit.id, title.trim());
    onCancel();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Dialog.Panel className="w-full max-w-md bg-white border border-black rounded-lg p-6 shadow-xl">
              <Dialog.Title className="text-xl font-semibold mb-4">Edit Habit</Dialog.Title>

              <input
                className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new habit title"
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={onCancel}
                  className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-400 bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}