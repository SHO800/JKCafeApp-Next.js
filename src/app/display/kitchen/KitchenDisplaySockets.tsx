import {Dispatch, memo, MouseEvent, SetStateAction} from "react";
import {KitchenOrder} from "@/app/Types/itemTypes";
import {useKitchenDisplaySockets} from "@/app/hooks/useKitchenDisplaySockets";

//再レンダリング対策の緩衝材
export const KitchenDisplaySockets = memo(({apiUrl, setKitchenOrders, setHandleSubmit}: {
    apiUrl: string,
    setKitchenOrders: Dispatch<SetStateAction<KitchenOrder[]>>,
    setHandleSubmit: Dispatch<SetStateAction<(uuid: string) => void>>
}) => {
    useKitchenDisplaySockets(apiUrl, setKitchenOrders, setHandleSubmit);
    return (<></>)
})
KitchenDisplaySockets.displayName = "KitchenDisplaySockets"