import { useDispatch, useSelector } from "react-redux";
import { markHabitDone, markHabitSkipped } from "../Features/habitsSlice";
import {
  openAddModal,
  openEditModal,
  openDeleteModal,
  setSelectedHabit,
} from "../Features/uiSlice";
import DropdownMenu from "./Menu/DropdownMenu";

export default function HabitCards({ month, day }) {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits);
  const today = useSelector((state) => state.ui.selectedDate);

  const todayWeekday = new Date(today).toLocaleString("en-CA", {
    weekday: "short",
  });

  const todaysHabits = habits.filter((habit) =>
    habit.frequency?.includes(todayWeekday)
  );

  const handleEdit = (habit) => {
    dispatch(setSelectedHabit(habit));
    dispatch(openEditModal());
  };

  const handleDelete = (habit) => {
    dispatch(setSelectedHabit(habit));
    dispatch(openDeleteModal());
  };

  return (
    <div className="px-4 md:px-10 w-full md:w-1/3">
      {/* Date heading (desktop only) */}
      <div className="py-2 hidden md:block">
        <h3 className="font-light text-3xl">{`${todayWeekday}, ${month} ${day}`}</h3>
      </div>

      {/* Habit List */}
      <div className="grid mt-2">
        {todaysHabits.length === 0 ? (
          <>
            <p>No habit for today.</p>
            <button
              onClick={() => dispatch(openAddModal())}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              + Add a habit
            </button>
          </>
        ) : (
          todaysHabits.map((habit) => {
            const status = habit.records?.[today]; // ✅ Fix: was incorrectly using `history`

            return (
              <div
                key={habit.id}
                className="md:w-full flex flex-col gap-2 border border-gray-400 rounded-lg py-3 px-6 m-2 md:mb-4 text-xl"
              >
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold">{habit.title}</h4>
                    <p className="text-sm text-gray-500">
                      {habit.type === "todo" ? "To-Do" : "Not-To-Do"}
                    </p>
                  </div>
                  <DropdownMenu
                    habit={habit}
                    onEdit={() => handleEdit(habit)}
                    onDelete={() => handleDelete(habit)}
                  />
                </div>

                {/* Status Buttons */}
                <div className="flex gap-2">
                  {status === "done" || status === "skipped" ? (
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        status === "done"
                          ? "bg-green-200"
                          : "bg-yellow-200"
                      }`}
                    >
                      {status.toUpperCase()}
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          dispatch(markHabitDone({ id: habit.id, date: today }))
                        }
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() =>
                          dispatch(
                            markHabitSkipped({ id: habit.id, date: today })
                          )
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        ❌
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
