import {useSocket} from "@/app/hooks/useSocket";
import {useEffect, useState} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";

export const useRegiDisplayHooks = (apiUrl: string, clientId: number): RegiDisplayHooksType => {
    const nameSpace = "display/register"
    const [currentOrders, setCurrentOrders] = useState<OrderDetail[]>([])
    const {socket} = useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("temp_order_data", (msg) => {
            setCurrentOrders(msg);
        })
        socket.emit("join", {clientId: clientId})
    });


    return {
        currentOrders,
    }
}

export type RegiDisplayHooksType = {
    currentOrders: OrderDetail[],
}