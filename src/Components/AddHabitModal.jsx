import { useState } from "react";

export default function AddHabitModal({ isOpen, onClose, onSubmit }) {

    const[habitText, setHabitText] = useState("");

    const handleSubmit = () => {
        if(!habitText.trim()) return;
        onSubmit(habitText);
        setHabitText("");
        onClose();
    }

    if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-50 bg-black bg-opacity-40 
     flex items-center justify-center">

        <div className="bg-white p-6 m-4 rounded shadow-md w-full max-w-sm">
            <h2>Add new habit</h2>
            <input
            type="text"
            value={habitText}
            onChange={(e)=>setHabitText(e.target.value)}
            className="px-3 py-2 mb-2 w-full border rounded"
            placeholder="Add new habit..."
            />

            <div className="flex justify-end gap-2">
                <button
                    className="px-4 py-2 rounded border text-black"
                    onClick={onClose}>
                        Close
                </button>

                <button 
                    className="px-4 py-2 rounded border text-black"
                    onClick={handleSubmit}>
                        Submit
                </button>
            </div>
        </div>
      </div>
  )
}
