import {useElapsedTime} from "@/app/hooks/useElapsedTime";

export function ElapsedTime({orderedDate}: {orderedDate: Date}) {
    const {hour, minute, second} = useElapsedTime(orderedDate);
    return (
        <p>{`経過時間： ${hour? `${hour}時間` : ""}${minute}分${second}秒`}</p>
    )
}