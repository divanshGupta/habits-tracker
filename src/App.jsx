import './index.css';
import { useState, useEffect } from 'react';
import HabitGrid from './components/HabitGrid';
import AddHabitModal from './Components/AddHabitModal';
import MobileHeader from './Components/Mobile/MobileHeader';
import MobileFooter from './Components/Mobile/MobileFooter';
import HabitCards from './Components/HabitCards';
import { startOfWeek, format, addDays } from 'date-fns';
import Header from './Components/header';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const timeFrame = ['Weely', 'Monthly', 'Yearly', 'All Time'];

function App() {

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habitList');
    return saved ? JSON.parse(saved) : [];
  });

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('habitData');
    return saved ? JSON.parse(saved) : {};
  });

  const [showAdd, setShowAdd] = useState(false);

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => format(addDays(startDate, i), 'yyyy-MM-dd'));
  const today = format(new Date(), "eeee");
  const currentMonth = format(new Date(), 'MMMM');
  const currentDay = format(new Date(), 'd');

  const toggleHabit = (habitId, day) => {
    const updated = { ...data };
    updated[day] = updated[day] || {};
    updated[day][habitId] = !updated[day][habitId];
    setData(updated);
    localStorage.setItem('habitData', JSON.stringify(updated));
  };

  const handleAddHabit = (habit) => {
    const newHabits = [...habits, habit];
    setHabits(newHabits);
    localStorage.setItem('habitList', JSON.stringify(newHabits));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <MobileHeader
              OnAddClick={()=>setShowAdd(true)}
              today={today}
      />

      {showAdd && (
        <AddHabitModal
          weekdays={weekdays}
          onClose={() => setShowAdd(false)}
          onSubmit={handleAddHabit}
        />
      )}

      {/* <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowAdd(true)}
      >
        Add Habit
      </button> */}

      <Header 
      today={today}
      day={currentDay}
      month={currentMonth}
      />

      {/* main content body (habits list and dashboard) */}
      <div className='w-full h-full flex justify-center md:gap-4'>

        {/* dashboard */}
        <div className='hidden md:block w-2/3 border border-gray-300 rounded-lg'>
          <div className='w-full bg-blue-200'>
            {timeFrame.map((id, time)=>{
              <div key={id}>{time}</div>
            })}
          </div>

          {/* date switcher */}
          <div className='w-full bg-red-200'>date toggler</div>

          {/* progress bar */}
          <div className='w-full bg-green-200'>
            <div className='w-full py-2 bg-blue-600 border-2 rounded-3xl'></div>
            <p>50% of doing goals achieved</p>
          </div>

          {/* data board */}
          <div className='w-full'>
            <HabitGrid
            habits={habits}
            data={data}
            days={days}
            toggleHabit={toggleHabit}
            />
          </div>
        </div>

        {/* habits cards */}
        <div className='w-full border bg-pink-200 border-gray-300 px-2 py-2 md:w-1/3 rounded-lg'>
          <HabitCards 
          habits={habits}
          />
        </div>
      </div>

      {/* navigational menu as footer */}
      <MobileFooter />
      
    </div>
  );
}

export default App;
