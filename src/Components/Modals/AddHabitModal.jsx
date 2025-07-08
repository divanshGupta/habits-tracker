import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function AddHabitModal({ isOpen, onCancel, onSubmit, weekdays }) {
  const [name, setName] = useState('');
  const [days, setDays] = useState([]);

  const toggleDay = (index) => {
    setDays(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    const newHabit = {
      id: Date.now(),
      name,
      days,
      color: 'bg-blue-500',
      inactive: weekdays.map((_, i) => i).filter(i => !days.includes(i)),
    };
    onSubmit(newHabit);
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
              <Dialog.Title className="text-xl font-semibold mb-4">Add Habit</Dialog.Title>


        <label className="block mb-2">Habit Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-4"
        />

        <label className="block mb-2">Frequency</label>
        <div className="flex gap-2 mb-4">
          {weekdays.map((day, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full border ${
                days.includes(i) ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
              onClick={() => toggleDay(i)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Type of Habit</label>
          <div className="flex gap-4">
            <div>
              <input type="radio" id="to-do"  name="habitType" />
              <label >To-do</label>
            </div>
            <div>
              <input type="radio" id="not-to-do"  name="HabitType" />
              <label>Not-to-do</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="w-full sm:w-1/2 rounded-full px-4 py-2 bg-gray-200 border border-gray-400 hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-1/2 bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition"
            onClick={handleSubmit}
          >
            Add Habit
          </button>
        </div>
      </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
