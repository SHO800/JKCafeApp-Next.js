import {useSocket} from "@/app/hooks/useSocket";
import {Dispatch, MutableRefObject, SetStateAction, useCallback, useMemo, useState} from "react";
import {KitchenOrder, OrderItemDetail} from "@/app/Types/itemTypes";

export const useRegiSockets = (apiUrl: string, clientId: number, setHistoryRef: MutableRefObject<Dispatch<SetStateAction<KitchenOrder[]>> | null>): RegiHooksType => {
    const nameSpace = useMemo(() => "register", [])
    const {socket} = useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("history", (msg) => {
            if (!setHistoryRef.current) return
            setHistoryRef.current(msg);
        })
    });

    const sendOrderData = useCallback((orderDetails: OrderItemDetail[]) => {
        socket.emit("temp_order_data", {clientId: clientId, data: JSON.stringify(orderDetails)})
    }, [clientId, socket]);

    const cancelOrder = useCallback((orderUuid: string) => {
        socket.emit("cancel_order", {orderUuid: orderUuid})
    }, [socket])

    const submit = useCallback(async (orders: OrderItemDetail[]) => {
        const namespace = "/checkout-submit"

        const requestOptions ={
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(orders)
        };
        await fetch(apiUrl + namespace, requestOptions)
    }, [apiUrl]);

    return {
        sendOrderData,
        submit,
        cancelOrder,
    }
}

export type RegiHooksType = {
    sendOrderData: (orderDetails: OrderItemDetail[]) => void,
    submit: (orderDetails: OrderItemDetail[]) => void,
    cancelOrder: (orderUuid: string) => void,
}