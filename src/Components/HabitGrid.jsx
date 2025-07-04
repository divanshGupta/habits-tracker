import { format } from 'date-fns';

export default function HabitGrid({ habits, data, days, toggleHabit }) {
  return (
    <>
      <div className="grid grid-cols-8 gap-2 text-center font-semibold">
        <div className="text-left">Habit</div>
        {days.map(day => (
          <div key={day}>{format(new Date(day), 'EEE')}</div>
        ))}
      </div>

      {habits.map(habit => (
        <div key={habit.id} className="grid grid-cols-8 gap-2 items-center my-2">
          <div className="text-left flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${habit.color}`}></div>
            {habit.name}
          </div>
          {days.map(day => (
            <div
              key={day}
              className={`w-6 h-6 mx-auto rounded-full cursor-pointer border ${
                data[day]?.[habit.id] ? habit.color : 'border-gray-300'
              } ${habit.inactive.includes(format(new Date(day), 'EEEE')) ? 'opacity-30 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!habit.inactive.includes(format(new Date(day), 'EEEE')))
                  toggleHabit(habit.id, day);
              }}
            ></div>
          ))}
        </div>
      ))}
    </>
  );
}
