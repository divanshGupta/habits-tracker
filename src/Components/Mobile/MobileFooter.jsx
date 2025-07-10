import Button from '../Button/Button';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeAddModal, openAddModal } from "../../Features/uiSlice";
import { addHabit } from "../../Features/habitsSlice";

export default function MobileFooter() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.ui.isAddHabitModalOpen);
  return (
    // Hide footer by default — add 'hidden' class or render conditionally when needed
    <div className=" md:hidden fixed bottom-0 left-0 right-0 bg-pink-200 z-50">
      {/* Flex container with equal spacing */}
      <div className="flex justify-between items-center gap-20 px-6 relative text-lg font-medium">
        
        {/* Dashboard Button */}

        <div className='flex w-1/2'>
          <Button 
          content={<IoHomeOutline/>}
          className="flex-1 flex justify-center py-4"
          />
          <Button 
            content={<LuLayoutDashboard/>}
            className="flex-1 flex justify-center py-4"
          />
        </div>

        {/* Add Button in Center - Elevated Floating Style */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-10">
          <div className="bg-blue-600 text-white rounded-2xl h-12 w-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
            <Button 
              onClick={() => dispatch(openAddModal())}
              content={"+"}
              className="text-3xl"
            />
          </div>
        </div>

        {/* Profile Button */}
        <div className='flex w-1/2'>
          <Button 
          content={<FaRegUser />}
          className="flex-1 flex justify-center py-4"/>

          <Button 
          content={<IoSettingsOutline />}
          className="flex-1 flex justify-center py-4 "/>
        </div>
      </div>
    </div>
  );
}
