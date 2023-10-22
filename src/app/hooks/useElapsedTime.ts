import {useEffect, useState} from "react";

export const useElapsedTime = (orderedDate: Date) => {
    const [now, updateNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            updateNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, [])
    const elapsedTime = now.getTime() - orderedDate.getTime();
    const elapsedHour = Math.floor(elapsedTime / (1000 * 60 * 60));
    const elapsedMinute = Math.floor((elapsedTime - elapsedHour * 1000 * 60 * 60) / (1000 * 60));
    const elapsedSecond = Math.floor((elapsedTime - elapsedHour * 1000 * 60 * 60 - elapsedMinute * 1000 * 60) / 1000);

    return {
        hour: elapsedHour,
        minute: elapsedMinute,
        second: elapsedSecond,
    }
}

