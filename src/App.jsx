import { useState, useEffect } from 'react';
import HabitGrid from './components/HabitGrid';
import AddHabitModal from './Components/AddHabitModal';
import MobileHeader from './Components/Mobile/MobileHeader';
import MobileFooter from './Components/Mobile/MobileFooter';
import './index.css';
import HabitCards from './Components/HabitCards';
import { startOfWeek, format, addDays } from 'date-fns';
import Header from './Components/header';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
      />

      {/* <HabitGrid
        habits={habits}
        data={data}
        days={days}
        toggleHabit={toggleHabit}
      /> */}

      <div className="w-full mx-auto p-4 md:w-1/3 md:border md:rounded-lg border-black">
        <HabitCards 
          habits={habits}
        />
      </div>

      <MobileFooter />
      
    </div>
  );
}

export default App;
