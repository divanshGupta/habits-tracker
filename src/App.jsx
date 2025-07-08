import './index.css';
import { useState, useEffect } from 'react';
import HabitGrid from './Components/DataRange/HabitGrid';
import AddHabitModal from './Components/Modals/AddHabitModal';
import EditHabitModal from './Components/Modals/EditHabitModal';
import DeleteHabitModal from './Components/Modals/DeleteHabitModal';
import MobileHeader from './Components/Mobile/MobileHeader';
import MobileFooter from './Components/Mobile/MobileFooter';
import HabitCards from './Components/HabitCards';
import { startOfWeek, format, addDays } from 'date-fns';
import Header from './Components/header';
import { timeFrame } from './App/defaultHabits';
import Button from './Components/Button/Button';
import MonthyData from './Components/DataRange/MonthyData';
import SleepCountdown from './Features/SleepCountdown';
import {
  getHabits,
} from './Utils/dataService';

import {
  createHabit, 
  persistHabits,
} from './Utils/dataService';

import DropdownMenu from './Components/Menu/DropdownMenu';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


function App() {

  const [chartType, setChartType] = useState("Weekly");
  const [sleepTime, setSleepTime] = useState("23:00");

  const [habits, setHabits] = useState([]);

  useEffect(() => {
  const stored = getHabits();
  const normalized = stored.map(habit => ({
    ...habit,
    title: habit.title || habit.name || "Untitled Habit", // normalize
  }));
  setHabits(normalized);
  }, []);

function handleAddHabit(habitInput) {
  const newHabit = createHabit(habitInput);
  const updated = [...habits, newHabit];
  setHabits(updated);
  persistHabits(updated);
}

function handleDeleteHabit(id) {
  const updated = habits.filter(h => h.id !== id);
  setHabits(updated);
  persistHabits(updated);
}

    // Update (e.g. name)
function handleUpdateHabitTitle(id, newTitle) {
  const updated = habits.map(h =>
    h.id === id ? { ...h, title: newTitle } : h
  );
  setHabits(updated);
  persistHabits(updated);
}

  //modals states
  const [showAdd, setShowAdd] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);

  const openDeleteModal = (habit) => {
    setHabitToDelete(habit);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setHabits(prev => prev.filter(h => h.id !== habitToDelete.id));
    setIsDeleteOpen(false);
  };

  const openEditModal = (habit) => {
    setHabitToEdit(habit);
    setEditModalOpen(true);
  };

  const saveEditedHabit = (id, newTitle) => {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, title: newTitle } : h))
    );
  };

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => format(addDays(startDate, i), 'yyyy-MM-dd'));
  const today = format(new Date(), "eeee");
  const currentMonth = format(new Date(), 'MMMM');
  const currentDay = format(new Date(), 'd');

  {/* time frame for dashboard */}
  const toggleChartType = () => {
    setChartType((prev) => (prev === "Weekly" ? "Monthly" : "Weekly"));
  };

  const toggleHabit = (habitId, dayKey) => {
  const updated = habits.map(habit => {
    if (habit.id !== habitId) return habit;

    const updatedRecords = {
      ...habit.records,
      [dayKey]: !habit.records?.[dayKey]
    };

    return { ...habit, records: updatedRecords };
  });

  setHabits(updated);
  localStorage.setItem('habit_data_v1', JSON.stringify(updated));
};

  return (
    <div className="w-full md:flex flex-col gap-10">
      <MobileHeader
              OnAddClick={()=>setShowAdd(true)}
              today={today}
      />

      {showAdd && (
        <AddHabitModal
        isOpen={showAdd}
          weekdays={weekdays}
          onCancel={() => setShowAdd(false)}
          onSubmit={handleAddHabit}
        />
      )}

      <Header />

      {/* main content body (habits list and dashboard) */}

      <div className='w-full flex justify-center md:px-40'>

        {/* dashboard */}
        <div className='hidden md:block w-2/3'>

          {/* welcome message */}
          <div className='flex-col w-full items-center justify-between px-2 py-8np'>
              <h3 className="font-normal font-nunito text-5xl">Good Morning, Divyansh</h3>
              <SleepCountdown className={`text-lg text-gray-700`} sleepTime={sleepTime}/>
          </div>

          {/* time frame buttons */}
          <div className='w-full h-[60px] flex justify-between px-2'>
            <div className='flex gap-4 bg-gray-300 px-4 py-2 rounded-full'>
            {timeFrame.map((time)=>(
              <Button
              className={`px-4 py-2 border  rounded-full
              bg-white`}
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
          <div className='w-full h-[60px] flex px-2  justify-between'>
            <div className='flex gap-4 justify-center items-center '>
              <div className='p-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 hover:bg-gray-500 border'>{"<"}</div>
              <div className='p-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500 border-black'>{">"}</div>
              <h3 className='text-lg'>Mon 7, July - Sun 13, July</h3>
            </div>

            {/* data  chart visualisation toggle */}
            <div className=" flex items-center justify-end">
              <label className=" inline-flex items-center cursor-pointer">
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
          <div className='w-full px-2 py-2 flex flex-col gap-2 border-b-2'>
            <div className='w-full py-2 bg-blue-600 border-2 rounded-3xl'></div>
            <p className='text-base'>50% of doing goals achieved</p>
          </div>

          {/* data board */}
          <div className='w-full p-2'>
            {chartType=== "Weekly" ? 
            <HabitGrid
              habits={habits}
              days={days}
              toggleHabit={toggleHabit}
            />
            :
            <MonthyData />}
          </div>
        </div>

        {/* habits cards */}
        
          <HabitCards
            habits={habits}
            today={today}
            day={currentDay}
            month={currentMonth}
            handleDelete={openDeleteModal}
            handleEdit={openEditModal}
            onAddClick={() => setShowAdd(true)}
          />

          <DeleteHabitModal
            isOpen={isDeleteOpen}
            onCancel={() => setIsDeleteOpen(false)}
            onConfirm={confirmDelete}
            habitName={habitToDelete?.title || "Habit"}
          />

          <EditHabitModal
            isOpen={editModalOpen}
            onCancel={() => setEditModalOpen(false)}
            onSave={handleUpdateHabitTitle}
            habit={habitToEdit}
            weekdays={weekdays}
          />
        
      </div>

      {/* navigational menu as footer */}
      <MobileFooter />
      
      
    </div>
    
  );
}

export default App;
