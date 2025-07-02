export default function HabitCards({ habits }) {
  return (
    <div>
      {habits.map((habit)=>(
        <div 
        className="bg-yellow-50 flex items-center justify-start border-2 
      border-gray-400 rounded-lg p-4 mb-4 text-xl"
        key={habit.id}>{habit.name}</div>
      ))}
    </div>
  );
}

