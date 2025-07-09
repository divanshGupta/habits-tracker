import DropdownMenu from "./Menu/DropdownMenu";

export default function HabitCards({
  habits,
  today,
  day,
  month,
  handleEdit,
  handleDelete,
  onAddClick,
}) {
  return (
    <div className="px-4 md:px-10 w-full md:w-1/3">
      {/* Header: Only on desktop */}
      <div className="py-2 hidden md:block">
        <h3 className="font-light text-3xl">{`${today}, ${month} ${day}`}</h3>
      </div>

      {/* Habit List */}
      <div className="grid mt-2">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="md:w-full flex flex-col gap-2 border border-gray-400 rounded-lg py-3 px-6 m-2 md:mb-4 text-xl"
            >
              {/* Top Row: Title + Dropdown */}
              <div className="flex justify-between items-center">
                <div className="font-medium text-xl truncate">{habit.title}</div>
                <DropdownMenu
                  onEdit={() => handleEdit(habit)}
                  onDelete={() => handleDelete(habit)}
                />
              </div>

              {/* Button */}
              <div className="flex items-center">
                <button
                  className="w-full text-base font-light rounded-lg border border-gray-400 py-2 hover:bg-gray-100 transition"
                >
                  Mark Complete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="bg-yellow-50 flex items-center justify-center border-2 border-gray-400 rounded-lg p-4 mb-4 text-xl cursor-pointer"
            onClick={onAddClick}
          >
            + Add a habit
          </div>
        )}
      </div>
    </div>
  );
}
