export default function HabitCards({ handleDelete, habits, month, day, today }) {

  return (

    <div className="px-4 w-full border border-gray-30 md:w-1/3 rounded-lg">
      <div className="py-4 hidden md:block">
        <h3 className="font-semibold text-4xl">{`${today}, ${month} ${day}`}</h3>
        <h6 className="text-lg text-gray-700">25% of daily goals achieved</h6>
      </div>

      <div className={`grid`}>
        {habits.map((habit)=>(
          <div 
          className="bg-yellow-50 flex items-center border-2 
        border-gray-400 rounded-lg p-4 mb-4 text-xl"
          key={habit.id}>
            <div>{habit.name}</div>
            <button
            className="text-red-500 text-sm hover:underline"
            onClick={handleDelete(habit.id)}
            >
            ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

