import {useRegiDisplaySockets} from "@/app/hooks/useRegiDisplaySockets";
import {Dispatch, memo, SetStateAction} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";

export const RegiDisplaySockets = memo(({apiUrl, clientId, setCurrentOrders}: {apiUrl: string, clientId: number, setCurrentOrders: Dispatch<SetStateAction<OrderDetail[]>>}) => {
    useRegiDisplaySockets(apiUrl, clientId, setCurrentOrders);
    return <></>
})
RegiDisplaySockets.displayName = "RegiDisplaySockets"