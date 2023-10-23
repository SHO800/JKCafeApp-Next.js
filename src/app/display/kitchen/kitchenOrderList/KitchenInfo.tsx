"use client"
import Kitchens from "@/app/display/kitchen/css/kitchen.module.css";
import {NowTime} from "@/app/display/kitchen/kitchenOrderList/NowTime";

// カードをタップして完了と現在時刻を表示するだけのコンポーネント
export function KitchenInfo() {
    return (
        <div className={Kitchens.info}>
            <p>カードをタップして完了</p>
            <NowTime />
        </div>
    )
}