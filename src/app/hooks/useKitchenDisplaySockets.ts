import {useSocket} from "@/app/hooks/useSocket";
import {Dispatch, MouseEvent, SetStateAction, useEffect, useMemo} from "react";
import {KitchenOrder} from "@/app/Types/itemTypes";

export const useKitchenDisplaySockets = (apiUrl: string, setKitchenOrders: Dispatch<SetStateAction<KitchenOrder[]>>, setHandleSubmit: Dispatch<SetStateAction<(e: MouseEvent<HTMLButtonElement>) => void>>): KitchenDisplayHooksType => {
    const nameSpace = useMemo(() => "display/kitchen", [])
    const {socket} = useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("kitchen_order_data", (msg) => {
            setKitchenOrders(msg);
        })
    });

    useEffect(() => {
            setHandleSubmit(() => (e: MouseEvent<HTMLButtonElement>) => {
                if (!e) return;
                e.preventDefault();
                console.log("kitchen_order_provided", e.currentTarget.value);
                socket.emit("kitchen_order_provided", e.currentTarget.value);
            })
        }, [socket, setHandleSubmit])

    return {}
}

export type KitchenDisplayHooksType = {}