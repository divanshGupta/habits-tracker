// import { useState, useEffect } from "react";
// import { defaultHabits } from "../App/defaultHabits";
// import Habits from "./HabitGrid";
// import MobileHeader from "./Mobile/MobileHeader";
// import AddHabitModal from "./AddHabitModal";
// import MobileFooter from "./Mobile/MobileFooter";
// import Header from "./header";

// export default function DailyTracker() {

//   const[isModalOpen, setModalOpen] = useState(false);

//   const handleAddHabit = () => {}

//   const today = new Date().toISOString().split("T")[0];
//   const [checked, setChecked] = useState(() => {
//     const saved = localStorage.getItem(today);
//     return saved ? JSON.parse(saved) : {};
//   });

//   useEffect(() => {
//     localStorage.setItem(today, JSON.stringify(checked));
//   }, [checked]);

//   const toggleCheck = (key) => {
//     setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div>
//       <MobileHeader
//         OnAddClick={()=>setModalOpen(true)}
//       />
      
//       {isModalOpen && (
//         <AddHabitModal 
//         onClose={()=> setModalOpen(false)}
//         onSubmit={handleAddHabit}
//         />
//       )}
        

//       <Header />

//       <div className="md:flex md:gap-6 md:px-24">
//         <div className="hidden md:block w-2/3 bg-blue-200">
//           <div></div>
//         </div>

//         <div className="w-full mx-auto p-4 md:w-1/3 md:border md:rounded-lg border-black">
//           {defaultHabits.map((habit) => (
//           <Habits
//             key={habit.id}
//             label={habit.label}
//             checked={!!checked[habit.key]}
//             onChange={() => toggleCheck(habit.key)}
//             onDelete={() => handleDeleteHabit(habit.key)}
//           />
//         ))}
//         </div>

//       </div>
//       <MobileFooter />
//     </div>
//   );
// }




