import { useState } from "react";
import AddHabitModal from "./AddHabitModal";

export default function Header() {

  const[isModalOpen, setModalOpen] = useState(false);

  const handleAddHabit = () => {

  }
  return (
    <div className="bg-pink-200 flex items-center justify-between h-16 p-4">
      <div>
        <h1 className="text-2xl">Today, July 7</h1>
        <h6 className="text-sm">25% of daily goals achieved</h6>
      </div>

      <div className="rounded-full bg-slate-500 h-10 w-10 flex
      items-center justify-center">
        <button 
          className="text-3xl"
          onClick={()=> setModalOpen(true)}>
            +
        </button>
      </div>

      <AddHabitModal 
        isOpen={isModalOpen}
        onClose={()=> setModalOpen(false)}
        onSubmit={handleAddHabit}
      />
    </div>

  )
}
