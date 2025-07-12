import { CiMenuKebab } from "react-icons/ci";
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteHabit } from '../../Features/habitsSlice';
import { openEditModal } from '../../Features/uiSlice';
import { openDeleteModal } from '../../Features/uiSlice';

export default function DropdownMenu({ habit }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    dispatch(openEditModal(habit.id));
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(openDeleteModal(habit.id));
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:bg-gray-100 p-1 rounded-full"
      >
        <CiMenuKebab />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={handleEdit}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit Habit
          </button>
          <button
            onClick={handleDelete}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
          >
            Delete Habit
          </button>
        </div>
      )}
    </div>
  );
}
