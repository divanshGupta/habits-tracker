// src/components/EditHabitModal.jsx (or AddHabitModal.jsx)
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeEditModal } from "../../Features/uiSlice";
import { editHabit } from "../../Features/habitsSlice";

const weekdaysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function EditHabitModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.ui.isEditHabitModalOpen);
  const editHabitId = useSelector(state => state.ui.editHabitId);
  const habits = useSelector(state => state.habits);

  const habitToEdit = habits.find(h => h.id === editHabitId);

  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState([]);
  const [type, setType] = useState("todo");

  // Populate form when editing
  useEffect(() => {
    if (habitToEdit) {
      setTitle(habitToEdit.title);
      setFrequency(habitToEdit.frequency);
      setType(habitToEdit.type);
    }
  }, [habitToEdit]);

  const handleFrequencyChange = (day) => {
    setFrequency(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if (!title || frequency.length === 0) return;

    dispatch(editHabit({
      id: editHabitId,
      title,
      frequency,
      type
    }));

    dispatch(closeEditModal());
  };

  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => dispatch(closeEditModal())}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-xl">
              <Dialog.Title className="text-lg font-bold mb-4">
                {editHabitId ? "Edit Habit" : "Add New Habit"}
              </Dialog.Title>

              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Habit Name"
                className="w-full p-2 border rounded mb-4"
              />

              <div className="mb-4">
                <p className="font-semibold">Frequency:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {weekdaysList.map(day => (
                    <label key={day} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={frequency.includes(day)}
                        onChange={() => handleFrequencyChange(day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Type:</p>
                <label className="mr-4">
                  <input type="radio" value="todo" checked={type === "todo"} onChange={() => setType("todo")} />
                  To-Do
                </label>
                <label>
                  <input type="radio" value="notodo" checked={type === "notodo"} onChange={() => setType("notodo")} />
                  Not-To-Do
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => dispatch(closeEditModal())} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                  {editHabitId ? "Update" : "Save"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
