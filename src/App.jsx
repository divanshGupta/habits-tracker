import './index.css';
import { useState, useEffect } from 'react';
import HabitGrid from './components/HabitGrid';
import AddHabitModal from './Components/AddHabitModal';
import MobileHeader from './Components/Mobile/MobileHeader';
import MobileFooter from './Components/Mobile/MobileFooter';
import HabitCards from './Components/HabitCards';
import { startOfWeek, format, addDays } from 'date-fns';
import Header from './Components/header';
import { timeFrame } from './App/defaultHabits';
import Button from './Components/Button/Button';
import MonthyData from './Components/DataRange/MonthyData';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


function App() {

  const [chartType, setChartType] = useState("Weekly");

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

  {/* time frame for dashboard */}
  const toggleChartType = () => {
    setChartType((prev) => (prev === "Weekly" ? "Monthly" : "Weekly"));
  };

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
    <div className="w-full mx-auto">
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

      <div className='w-full h-full flex justify-center'>

        {/* dashboard */}
        <div className='hidden md:block w-2/3 border border-gray-300 rounded-lg'>
          {/* time frame buttons */}
          <div className='w-full bg-blue-200 flex justify-between p-2'>
            <div className='flex gap-4'>
            {timeFrame.map((time)=>(
              <Button
              className={`px-4 py-2 border border-gray-400 rounded-full
              bg-gray-400 hover:bg-gray-500`}
              key={time.id}
              content={time.label}
              />
            ))}
            </div>
            <Button
            className={`px-4 py-2 border border-gray-400 rounded-full
              bg-gray-400 hover:bg-gray-500`}
            OnAddClick={()=>setShowAdd(true)}
            content="+ Add a habit"
            />
          </div>

          {/* date switcher */}
          <div className='w-full bg-red-200 flex gap-4 p-2 justify-start items-center'>
            <div className='p-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 hover:bg-gray-500 border'>{"<"}</div>
            <div className='p-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500 border-black'>{">"}</div>
            <h3 className='text-lg'>Mon 7, July - Sun 13, July</h3>

            {/* data  chart visualisation toggle */}
            <div className="">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={chartType === "Monthly"}
                  onChange={toggleChartType}
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 transition-colors duration-200"></div>
                <div className="absolute w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition duration-200"></div>
              </label>
            </div>
          </div>

          {/* progress bar */}
          <div className='w-full bg-green-200'>
            <div className='w-full py-2 bg-blue-600 border-2 rounded-3xl'></div>
            <p>50% of doing goals achieved</p>
          </div>

          {/* data board */}
          <div className='w-full'>
            {chartType=== "Weekly" ? 
            <HabitGrid
            habits={habits}
            data={data}
            days={days}
            toggleHabit={toggleHabit}
            />
            :
            <MonthyData />}
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
