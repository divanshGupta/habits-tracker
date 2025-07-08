import DropdownMenu from "./Menu/DropdownMenu";

export default function HabitCards({ handleDelete, handleEdit, onAddClick, habits, month, day, today }) {

  return (

    <div className="px-4 md:px-10 w-full md:w-1/3">
      <div className="py-2 hidden md:block">
        <h3 className="font-light text-3xl">{`${today}, ${month} ${day}`}</h3>
        {/* <h6 className="font-extralight text-lg text-gray-700">25% of daily goals achieved</h6> */}
      </div>

      <div className='grid mt-2'>
        {habits.length > 0 ? 
        habits.map((habit)=>(
          <div 
          className="md:w-full flex flex-col gap-1 md:gap-2 border 
        border-gray-400 rounded-lg py-2 md:py-4 px-8 m-2 md:mb-4 text-xl"
          key={habit.id}>
            <div className="flex justify-between items-center">
              <div className="font-medium text-xl">{habit.title}</div>
              <DropdownMenu
                onEdit={() => handleEdit(habit)}  // habit from map()
                onDelete={() => handleDelete(habit)}
              />
            </div>

            <div className="flex items-center">
                <button className="w-full hover:bg-gray-300
                rounded-lg border border-gray-400 py-2 px-14">
                  Mark Complete
                </button>
            </div>
          </div>
        ))
        :  
          <div className="bg-yellow-50 flex items-center border-2 
        border-gray-400 rounded-lg p-4 mb-4 text-xl"
        onClick={onAddClick}>Add a habit</div>
        }
      </div>
    </div>
  );
}

