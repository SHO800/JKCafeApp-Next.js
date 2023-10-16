import {useSocket} from "@/app/hooks/useSocket";
import {useEffect, useState} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";

export const useRegiDisplayHooks = (apiUrl: string, clientId: number): RegiDisplayHooksType => {
    const nameSpace = "display/register"
    const {socket, setSocket} = useSocket(apiUrl, nameSpace);
    const [currentOrders, setCurrentOrders] = useState<OrderDetail[]>([])

    // useEffectとかで囲まないとtoo many renderになる
    useEffect(() => {
        setSocket((prevState) => {
            prevState.on("temp_order_data", (msg) => {
                setCurrentOrders(msg);
            })
            return prevState
        })
    }, [clientId, setSocket]);

    useEffect(() => {
        socket.emit("join", {clientId: clientId})
    }, [socket, clientId]);

    return {
        currentOrders,
    }
}

export type RegiDisplayHooksType = {
    currentOrders: OrderDetail[],
}