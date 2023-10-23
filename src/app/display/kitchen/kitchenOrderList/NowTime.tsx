"use client"
import {useEffect, useState} from "react";

// 現在時刻を返すコンポーネント

export function NowTime() {
    const [nowTime, setNowTime] = useState<{hour: number, minute: number, second: number}>({hour: 0, minute: 0, second: 0});

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setNowTime({hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()});
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <p>現在時刻: {nowTime.hour}時{nowTime.minute}分{nowTime.second}秒</p>
    )
}