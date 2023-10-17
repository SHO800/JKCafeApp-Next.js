import {useSocket} from "@/app/hooks/useSocket";
import {useCallback, useEffect, useState} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";
import {OrdersHooksType} from "@/app/hooks/useOrders";

export const useRegiHooks = (apiUrl: string, ordersHooks: OrdersHooksType): RegiHooksType => {
    const nameSpace = "register"
    const [clientId, setClientId] = useState<number>(-1);
    const {socket, setSocket} = useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("notice_join", (msg) => {
            setClientId(prevState => {
                if (prevState == -1) return parseInt(msg["id"]);
                else return prevState;
            })
        })
    });


    const sendOrderData = useCallback((orderDetails: OrderDetail[]) => {
        socket.emit("temp_order_data", {clientId: clientId, data: JSON.stringify(orderDetails)})
    }, [clientId, socket]);

    useEffect(() => {
        sendOrderData(ordersHooks.currentOrders)
    }, [sendOrderData, ordersHooks.currentOrders]);


    return {
        sendOrderData,
        clientId,
    }
}

export type RegiHooksType = {
    sendOrderData: (orderDetails: OrderDetail[]) => void,
    clientId: number
}