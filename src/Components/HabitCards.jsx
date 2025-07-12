import { useDispatch, useSelector } from "react-redux";
import HabitStatusCard from "./Satus/HabitStatusCard";
import DateNavigator from "./MircroFeatures/DateNavigator";

export default function HabitCards({ month, day }) {
  const habits = useSelector((state) => state.habits);
  const selectedDate = useSelector((state) => state.ui.selectedDate);

  const todayWeekday = new Date(selectedDate).toLocaleString("en-CA", {
    weekday: "short",
  });

  const todaysHabits = habits.filter((habit) =>
    habit.frequency?.includes(todayWeekday)
  );

  return (
    <div className="px-4 md:px-10 w-full md:w-1/3">
      {/* Date heading (desktop only) */}
      <div className="py-2 hidden md:block">
        <h3 className="font-light text-3xl">{`${todayWeekday}, ${month} ${day}`}</h3>
        <DateNavigator />
      </div>

      {/* Habit List */}
      <div className="grid mt-2">
        
        {todaysHabits.length === 0 ? (
          <>
            <p>No habit for today.</p>
            <p>Chill!</p>
          </>
        ) : (
          todaysHabits.map((habit) => (
            <HabitStatusCard key={habit.id} habit={habit} date={selectedDate} />
          )))}
      </div>
    </div>
  )
};
