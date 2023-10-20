import {Dispatch, memo, SetStateAction} from "react";
import {KitchenOrder, OrderItemDetail} from "@/app/Types/itemTypes";
import {useKitchenDisplaySockets} from "@/app/hooks/useKitchenDisplaySockets";

export const KitchenDisplaySockets = memo(({apiUrl, setKitchenOrders}: {apiUrl: string, setKitchenOrders: Dispatch<SetStateAction<KitchenOrder[]>>}) => {
    useKitchenDisplaySockets(apiUrl, setKitchenOrders);
    return (
        <>
        </>
    )
})
KitchenDisplaySockets.displayName = "KitchenDisplaySockets"