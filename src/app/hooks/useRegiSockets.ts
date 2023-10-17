import {useSocket} from "@/app/hooks/useSocket";
import {useCallback, useEffect, useMemo, useState} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";
import {OrdersHooksType} from "@/app/hooks/useOrders";

export const useRegiSockets = (apiUrl: string): RegiHooksType => {
    console.log("regihooks")
    // こいつの再描画をなんとしても止めなければならない
    const nameSpace = useMemo(() => "register", [])
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
        console.log("datasend!", orderDetails)
        socket.emit("temp_order_data", {clientId: clientId, data: JSON.stringify(orderDetails)})
    }, [clientId, socket]);


    return {
        sendOrderData,
        clientId,
    }
}

export type RegiHooksType = {
    sendOrderData: (orderDetails: OrderDetail[]) => void,
    clientId: number
}