import {useSocket} from "@/app/hooks/useSocket";
import {useCallback, useMemo, useState} from "react";
import {KitchenOrder, OrderItemDetail} from "@/app/Types/itemTypes";

export const useRegiSockets = (apiUrl: string, clientId: number): RegiHooksType => {
    const nameSpace = useMemo(() => "register", [])
    const {socket} = useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("history", (msg) => {
            setHistory(msg);
        })
    });
    const [history, setHistory] = useState<KitchenOrder[]>([]);

    const sendOrderData = useCallback((orderDetails: OrderItemDetail[]) => {
        socket.emit("temp_order_data", {clientId: clientId, data: JSON.stringify(orderDetails)})
    }, [clientId, socket]);

    const submit = useCallback(async (orders: OrderItemDetail[]) => {
        const namespace = "/checkout-submit"

        const requestOptions ={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(orders)
        };
        console.log("submit")
        await fetch(apiUrl + namespace, requestOptions)
            .then(res => res.json()).then(value => console.log(value))
    }, [apiUrl]);

    return {
        sendOrderData,
        submit,
        history,
    }
}

export type RegiHooksType = {
    sendOrderData: (orderDetails: OrderItemDetail[]) => void,
    submit: (orderDetails: OrderItemDetail[]) => void,
    history: KitchenOrder[],
}