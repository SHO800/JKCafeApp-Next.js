"use client"
import {KitchenDisplaySockets} from "@/app/display/kitchen/KitchenDisplaySockets";
import {MouseEvent, useState} from "react";
import {KitchenOrder} from "@/app/Types/itemTypes";
import {KitchenOrderList} from "@/app/display/kitchen/kitchenOrderList/KitchenOrderList";

export function ContentWrapper({apiUrl}: {apiUrl: string,}){
    const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);
    const [handleSubmit, setHandleSubmit] = useState<(uuid: string) => void>(() => {});
    return (
        <>
            <KitchenOrderList kitchenOrders={kitchenOrders} handleSubmit={handleSubmit}/>
            <KitchenDisplaySockets apiUrl={apiUrl} setKitchenOrders={setKitchenOrders} setHandleSubmit={setHandleSubmit}/>
        </>
    )
}