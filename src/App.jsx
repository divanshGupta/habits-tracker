import './index.css';
import { useState, useEffect } from 'react';
import { startOfWeek, format, addDays } from 'date-fns';
import Header from './Components/header';
import Button from './Components/Button/Button';
import HabitGrid from './Components/DataRange/HabitGrid';
import MonthyData from './Components/DataRange/MonthyData';
import SleepCountdown from './Components/SleepCountdown';
import AddHabitModal from './Components/Modals/AddHabitModal';
import EditHabitModal from './Components/Modals/EditHabitModal';
import DeleteHabitModal from './Components/Modals/DeleteHabitModal';
import HabitCards from './Components/HabitCards';
import MobileHeader from './Components/Mobile/MobileHeader';
import MobileFooter from './Components/Mobile/MobileFooter';
import { timeFrame } from './App/defaultHabits';
import { useDispatch, useSelector } from 'react-redux';
import { openAddModal } from "./Features/uiSlice";
import { getHabits } from './Utils/dataService';
import { setHabits } from "./Features/habitsSlice";
import { saveHabits, toPlainHabits } from './Utils/dataService';
import Greeting from './Components/MircroFeatures/Greeting';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function App() {
  // State
  const [chartType, setChartType] = useState("Weekly");
  const [sleepTime, setSleepTime] = useState("23:00");

  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.ui.isAddHabitModelOpen);

  const habits = useSelector(state => state.habits) || [];
 // adjust if slice is named differently

  useEffect(() => {
    if (habits.length > 0) {
      saveHabits(toPlainHabits(habits));
    }
  }, [habits]);

  // Chart toggle
  const toggleChartType = () => {
    setChartType(prev => (prev === "Weekly" ? "Monthly" : "Weekly"));
  };

  useEffect(() => {
  const storedHabits = getHabits(); // ✅ Is this returning correct data?
  dispatch(setHabits(storedHabits));
  }, []);

  // Date info
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) =>
    format(addDays(startDate, i), 'yyyy-MM-dd')
  );
  const today = format(new Date(), "eee");
  const todayLong = format(new Date(), "eeee");
  const currentMonth = format(new Date(), 'MMM');
  const currentDay = format(new Date(), 'd');

  return (
    <div className="w-full md:flex flex-col gap-10">
      {/* header for mobile */}
      <MobileHeader
        month={currentMonth}
        day={currentDay}
      />
      <AddHabitModal />

      {/* header for desktop */}
      <Header />

      {/* Main Body */}
      <div className='w-full flex justify-center md:px-40'>
        {/* Dashboard */}
        <div className='hidden md:block w-2/3'>
          <div className='flex-col w-full items-center justify-between px-2 py-8'>
            <h3 className="font-normal font-nunito text-5xl">
              <Greeting userName={"Divyansh"} />
            </h3>
            <SleepCountdown className={`text-lg text-gray-700`} sleepTime={sleepTime} />
          </div>

          {/* TimeFrame */}
          <div className='w-full h-[60px] flex justify-between px-2'>
            <div className='flex gap-4 bg-gray-300 px-4 py-2 rounded-full'>
              {timeFrame.map((time) => (
                <Button
                  key={time.id}
                  content={time.label}
                  className="px-4 py-2 border rounded-full bg-white"
                />
              ))}
            </div>
            <Button
              onClick={() => dispatch(openAddModal())}
              content="+ Add a habit"
              className="px-4 py-2 border border-gray-400 rounded-full bg-gray-400 hover:bg-gray-500"
            />
          </div>

          {/* Week Navigator */}
          <div className='w-full h-[60px] flex px-2 justify-between'>
            <div className='flex gap-4 justify-center items-center '>
              <div className='p-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500 border'>{"<"}</div>
              <div className='p-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500 border-black'>{">"}</div>
              <h3 className='text-lg'>Mon 7, July - Sun 13, July</h3>
            </div>

            <div className="flex items-center justify-end">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={chartType === "Monthly"}
                  onChange={toggleChartType}
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
                <div className="absolute w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition duration-200"></div>
              </label>
            </div>
          </div>

          {/* Progress */}
          <div className='w-full px-2 py-2 flex flex-col gap-2 border-b-2'>
            <div className='w-full py-2 bg-blue-600 border-2 rounded-3xl'></div>
            <p className='text-base'>50% of doing goals achieved</p>
          </div>

          {/* Chart */}
          <div className='w-full p-2'>
            {chartType === "Monthly" ? (
              <HabitGrid
                // habits={habits}
                // days={days}
                // toggleHabit={toggleHabit}
              />
            ) : (
              <MonthyData />
            )}
          </div>
        </div>

        {/* Habit Cards */}
        <HabitCards
          day={currentDay}
          month={currentMonth}
        />

        {/* Modals */}
        <DeleteHabitModal />

        <EditHabitModal
          weekdays={weekdays}
        />
      </div>

      {/* Mobile Nav */}
      <MobileFooter />
    </div>
  );
}

export default App;
