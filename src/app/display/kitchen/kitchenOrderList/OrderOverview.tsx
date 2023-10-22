import Overviews from "@/app/display/kitchen/css/overview.module.css";
import {ElapsedTime} from "@/app/display/kitchen/kitchenOrderList/ElapsedTime";

export function OrderOverview({index, orderedDate}: { index: number, orderedDate: Date}){

    return (
        <div className={Overviews.overview}>
            <div className={Overviews.index}>{index}</div>
            <div className={Overviews.times}>
                <p>{`注文時刻：${orderedDate.getHours()}時${orderedDate.getMinutes()}分${orderedDate.getSeconds()}秒`}</p>
                <ElapsedTime orderedDate={orderedDate}/>
            </div>
        </div>
    )
}

