import {useCallback, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {OrderData, OrderDetail} from "@/app/register/itemTypes";

export const useWebHooks = (apiUrl: string): WebHooksType => {

    const [clientId, setClientId] = useState<null | number>(null);

    const [socket, setSocket] = useState<null | Socket>(null);

    // 初期化処理
    useEffect(() => {
        if (socket) return;
        setSocket(() => {

            const socketTmp = io(apiUrl + 'register', {withCredentials: true})
            socketTmp.on("connect", () => {
                socketTmp.emit("join")
            })

            socketTmp.on("notice_join", (msg) => {
                setClientId(prevState => {
                    if (prevState == null) return parseInt(msg["id"]);
                    else return prevState;
                })
            })

            return socketTmp
        })
    }, [apiUrl, socket]);

    const sendOrderData = useCallback((orderDetails: OrderDetail[]) => {
        if (!socket) return;

        socket.emit("temp_order_data", {clientId: clientId, data: JSON.stringify(orderDetails)})
    }, [clientId, socket]);


    return {
        clientId,
        sendOrderData,
    }
}

export type WebHooksType = {
    clientId: number | null,
    sendOrderData: (orderDetails: OrderDetail[]) => void,
}