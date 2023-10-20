import {useSocket} from "@/app/hooks/useSocket";
import {Dispatch, SetStateAction, useMemo, useState} from "react";
import {KitchenOrder, OrderItemDetail} from "@/app/Types/itemTypes";

export const useKitchenDisplaySockets = (apiUrl: string, setKitchenOrders: Dispatch<SetStateAction<KitchenOrder[]>>): KitchenDisplayHooksType => {
    const nameSpace = useMemo(() => "display/kitchen", [])
    console.log("useKitchenDisplay")
    useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("kitchen_order_data", (msg) => {
            setKitchenOrders(msg);
        })
    });

    return {
    }
}

export type KitchenDisplayHooksType = {

}