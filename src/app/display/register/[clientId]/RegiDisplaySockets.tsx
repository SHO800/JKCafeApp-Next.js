import {useRegiDisplaySockets} from "@/app/hooks/useRegiDisplaySockets";
import {Dispatch, memo, SetStateAction} from "react";
import {OrderItemDetail} from "@/app/Types/itemTypes";

export const RegiDisplaySockets = memo(({apiUrl, clientId, setCurrentOrders}: {apiUrl: string, clientId: number, setCurrentOrders: Dispatch<SetStateAction<OrderItemDetail[]>>}) => {
    useRegiDisplaySockets(apiUrl, clientId, setCurrentOrders);
    return <></>
})
RegiDisplaySockets.displayName = "RegiDisplaySockets"