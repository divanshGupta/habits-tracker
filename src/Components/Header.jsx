import { useState } from "react";
import SleepCountdown from "../Features/SleepCountdown";

export default function Header({ today, day, month }) {
  const [sleepTime, setSleepTime] = useState("23:00");
  return (
    <div className='hidden md:flex bg-yellow-100 w-full items-center justify-between'>
      <div className=''>
        <h3 className="text-4xl">Good Morning, Divyansh</h3>
        <SleepCountdown sleepTime={sleepTime}/>
      </div>

      <div className="">
        <h3 className="text-4xl">{`${month}, ${day}`}</h3>
        <h6 className="text-lg">25% of daily goals achieved</h6>
      </div>
    </div>
  )
}
