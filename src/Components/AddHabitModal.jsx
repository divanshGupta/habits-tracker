import { useState } from 'react';

export default function AddHabitModal({ onClose, onSubmit, weekdays }) {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>

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

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
