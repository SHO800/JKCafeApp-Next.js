import {useEffect, useState} from "react";

// 現在時刻を返すコンポーネント

export function NowTime() {
    const [nowTime, setNowTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNowTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <p>現在時刻: {nowTime.getHours()}時{nowTime.getMinutes()}分{nowTime.getSeconds()}秒</p>
    )
}