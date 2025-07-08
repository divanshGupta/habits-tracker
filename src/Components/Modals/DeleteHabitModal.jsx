import { RiDeleteBin6Line } from "react-icons/ri";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function DeleteHabitModal({ isOpen, onCancel, onConfirm, habitName }) {
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

        {/* Centered Panel */}
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
            <Dialog.Panel className="w-full max-w-md bg-white rounded-lg border border-black p-6 shadow-xl">
              {/* Header */}
              <div className="flex gap-4 items-center">
                <div className="bg-yellow-200 p-4 rounded-lg">
                  <RiDeleteBin6Line size={48} />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-gray-800">Delete Habit?</h1>
                  <p className="text-sm text-gray-600 mt-1">Are you sure you want to delete this habit?</p>
                  <p className="text-sm text-gray-600">You won't be able to see your history.</p>
                </div>
              </div>

              {/* Habit Name */}
              <div className="mt-6 w-full px-6 py-3 border border-gray-300 rounded text-lg text-center">
                {habitName}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row w-full justify-between gap-4 mt-6">
                <button
                  className="w-full sm:w-1/2 rounded-full px-4 py-2 bg-gray-200 border border-gray-400 hover:bg-gray-300 transition"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  className="w-full sm:w-1/2 bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition"
                  onClick={onConfirm}
                >
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}