import {useSocket} from "@/app/hooks/useSocket";
import {Dispatch, MouseEvent, SetStateAction, useEffect, useMemo} from "react";
import {KitchenOrder} from "@/app/Types/itemTypes";

export const useKitchenDisplaySockets = (apiUrl: string, setKitchenOrders: Dispatch<SetStateAction<KitchenOrder[]>>, setHandleSubmit: Dispatch<SetStateAction<(uuid: string) => void>>): KitchenDisplayHooksType => {
    const nameSpace = useMemo(() => "display/kitchen", [])
    const {socket} = useSocket(apiUrl, nameSpace, (socket) => {
        socket.on("kitchen_order_data", (msg) => {
            setKitchenOrders(msg);
        })
    });

    useEffect(() => {
            setHandleSubmit(() => (uuid: string) => {
                console.log("kitchen_order_provided", uuid);
                socket.emit("kitchen_order_provided", uuid);
            })
        }, [socket, setHandleSubmit])

    return {}
}

export type KitchenDisplayHooksType = {}