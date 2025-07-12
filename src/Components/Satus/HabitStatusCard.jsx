import { useHabitStatus } from "../../Hooks/useHabitStatus";
import { Flame } from "lucide-react"; 
import DropdownMenu from "../Menu/DropdownMenu";

export default function HabitStatusCard({ habit, date }) {
  const { isDone, toggleStatus } = useHabitStatus(habit.id, date);

  return (
    <div
      className={`mb-4 rounded-lg p-4 shadow border transition-all duration-300 relative
        ${isDone ? "bg-yellow-400 text-white" : "bg-white text-black border-gray-200"}
      `}
    >
      {/* Habit title with its type and the dropdown menu */}
      <div className="flex justify-between">

        {/* Title */}
        <div className="flex flex-col">
          <h3 className="ml-6 text-xl font-semibold">{habit.title}</h3>
          <p className="ml-6 text-sm text-gray-500">
          {habit.type === "todo" ? "To-Do" : "Not-To-Do"}
          </p>
        </div>
        <DropdownMenu
            habit={habit}
        />
      </div>

      {/* Status Buttons */}
      <div className="ml-6 mt-4 flex gap-4">
        {isDone ? (
          <>
            <span className="flex items-center gap-1 font-semibold">
              ✅ Completed
            </span>
            <button
              onClick={toggleStatus}
              className="text-white underline hover:text-gray-100"
            >
              Undo
            </button>
          </>
        ) : (
          <button
            onClick={toggleStatus}
            className="border border-blue-500 text-blue-500 font-medium px-4 py-1 rounded hover:bg-blue-50 transition"
          >
            Mark Complete
          </button>
        )}
      </div>

    </div>
  );
}
