import {useSocket} from "@/app/hooks/useSocket";
import {useCallback, useMemo} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";

export const useRegiSockets = (apiUrl: string, clientId: number): RegiHooksType => {
    const nameSpace = useMemo(() => "register", [])
    const {socket} = useSocket(apiUrl, nameSpace, () => {});

    const sendOrderData = useCallback((orderDetails: OrderDetail[]) => {
        console.log("datasend!", orderDetails)
        socket.emit("temp_order_data", {clientId: clientId, data: JSON.stringify(orderDetails)})
    }, [clientId, socket]);

    return {
        sendOrderData,
    }
}

export type RegiHooksType = {
    sendOrderData: (orderDetails: OrderDetail[]) => void,
}