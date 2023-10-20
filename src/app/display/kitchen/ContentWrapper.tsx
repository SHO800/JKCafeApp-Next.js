"use client"
import {KitchenDisplaySockets} from "@/app/display/kitchen/KitchenDisplaySockets";
import {useState} from "react";
import {KitchenOrder} from "@/app/Types/itemTypes";
import {KitchenOrderList} from "@/app/display/kitchen/kitchenOrderList/KitchenOrderList";

export function ContentWrapper({apiUrl}: {apiUrl: string,}){
    const [kitchenOrders, setKitchenOrders] = useState<KitchenOrder[]>([]);


    return (
        <>
            <KitchenOrderList kitchenOrders={kitchenOrders} />
            <KitchenDisplaySockets apiUrl={apiUrl} setKitchenOrders={setKitchenOrders}/>
        </>
    )
}