import { useState, useEffect } from "react";
import { addDays, formatDistanceStrict, differenceInMinutes, parse, isBefore, isValid } from "date-fns";

function getTimeLeftToSleep (sleepTime) {
    const now = new Date();
    let sleepAt = parse(sleepTime, "HH:mm", now);

    if(!isValid(sleepAt)) return 'invalid sleep time';

    //if the sleep time is passed alreade then shift to next day
    if (isBefore(sleepAt, now)) {
        sleepAt = addDays(sleepAt, 1);
    }

    const totalMinutes = differenceInMinutes(sleepAt, now);

    // Guard against unexpected NaN
    if (isNaN(totalMinutes)) return 'Invalid time';

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hrs ${minutes} mins`;
}

export default function SleepCountdown({ sleepTime, className= "" }) {
    const [timeLeft, setTimeLeft] = useState(()=> getTimeLeftToSleep(sleepTime));

    useEffect(()=> {
        const interval = setInterval(()=>{
            setTimeLeft(getTimeLeftToSleep(sleepTime))
        }, 6000)

        return () => clearInterval(interval);

    }, [sleepTime]);

  return (
    <div className="">
        <h6 className={className}>{timeLeft} till bedtime</h6>
    </div>
  )
}
