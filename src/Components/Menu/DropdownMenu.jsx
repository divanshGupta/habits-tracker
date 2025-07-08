import { useRef, useState, useEffect } from 'react';

export default function DropdownMenu({ habit, onEdit, onDelete }) {

    const[open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:bg-gray-100 p-1 rounded-full"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit Habit
          </button>
          
          <button
            onClick={() => onDelete(habit)}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
          >
            Yes, Delete Habit
          </button>
        </div>
      )}
    </div>
  )
}
