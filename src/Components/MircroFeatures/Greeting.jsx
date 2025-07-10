import { getHours } from "date-fns";

export default function Greeting({ userName }) {

        const hour = getHours(new Date());
        let message = "";

        if (hour >= 5 && hour < 12) message = "Good Morning";
        else if (hour >= 12 && hour < 17) message = "Good Afternoon";
        else if (hour >= 17 && hour < 21) message = "Good Evening";
        else message = "Good Night";
    
  return <span>{message}, {userName}</span>;
};
