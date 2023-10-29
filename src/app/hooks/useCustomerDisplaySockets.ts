import {useSocket} from "@/app/hooks/useSocket";
import {Dispatch, MouseEvent, SetStateAction, useEffect, useMemo} from "react";
import {KitchenOrder} from "@/app/Types/itemTypes";

export const useCustomerDisplaySockets = (apiUrl: string, setCurrentOrderId: Dispatch<SetStateAction<null | number[]>>): KitchenDisplayHooksType => {
    const nameSpace = useMemo(() => "display/customer", [])
    const {socket} = useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("customer_display", (msg) => {
            setCurrentOrderId(msg);
        })
    });
    return {}
}

export type KitchenDisplayHooksType = {}