import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddModal } from "../../Features/uiSlice";
import { addHabit } from "../../Features/habitsSlice";
import { createHabit } from "../../Utils/dataService";

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AddHabitModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.ui.isAddHabitModalOpen);

  const [title, setTitle] = useState('');
  const [type, setType] = useState("todo");
  const [frequency, setFrequency] = useState([]);

  const handleFrequencyChange = (day) => {
    setFrequency(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if (!title || frequency.length === 0) return;

    const newHabit = createHabit({ title, frequency, type });
    dispatch(addHabit(newHabit));
    dispatch(closeAddModal());

    // reset fields
    setTitle("");
    setFrequency([]);
    setType("todo");
    console.log("Creating Habit:", { title, type, frequency });

  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => dispatch(closeAddModal())}>
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

              {/* Habit Name */}
              <label className="block mb-2">Habit Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-2 py-1 border rounded mb-4"
              />

              {/* Frequency */}
              <label className="font-semibold block mb-2">Frequency</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {weekdays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleFrequencyChange(day)}
                    className={`w-10 h-10 flex items-center justify-center border rounded-full 
                      ${frequency.includes(day) ? "bg-blue-600 text-white" : "bg-white text-black border-gray-300"}
                    `}
                  >
                    {day[0]}
                  </button>
                ))}
              </div>

              {/* Type: To-do / Not-to-do */}
              <div className="mt-6">
                <p className="block mb-2 font-semibold">Type of Habit</p>
                <div className="flex gap-6">
                  <label>
                    <input
                      type="radio"
                      checked={type === "todo"}
                      name="habitType"
                      onChange={() => setType("todo")}
                    />{" "}
                    To-do
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={type === "notodo"}
                      name="habitType"
                      onChange={() => setType("notodo")}
                    />{" "}
                    Not-to-do
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="w-full sm:w-1/2 rounded-full px-4 py-2 bg-gray-200 border border-gray-400 hover:bg-gray-300 transition"
                  onClick={() => dispatch(closeAddModal())}
                >
                  Cancel
                </button>
                <button
                  className="w-full sm:w-1/2 bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition"
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
}
