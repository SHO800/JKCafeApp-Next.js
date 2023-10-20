import {useSocket} from "@/app/hooks/useSocket";
import {Dispatch, SetStateAction, useMemo, useState} from "react";
import {OrderItemDetail} from "@/app/Types/itemTypes";

export const useRegiDisplaySockets = (apiUrl: string, clientId: number, setCurrentOrders: Dispatch<SetStateAction<OrderItemDetail[]>>): RegiDisplayHooksType => {
    const nameSpace = useMemo(() => "display/register", [])
    console.log("useRegiDisplay")
    useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("temp_order_data", (msg) => {
            setCurrentOrders(msg);
        })
        socket.emit("join", {clientId: clientId})
    });


    return {
    }
}

export type RegiDisplayHooksType = {

}