'use client'
import OrderList from "@/app/display/register/[clientId]/orderList/orderList";
import {useRegiDisplaySockets} from "@/app/hooks/useRegiDisplaySockets";

export function ContentWrapper({apiUrl, clientId}: {
    apiUrl: string,
    clientId: number
}) {
    const regiDisplayHooks = useRegiDisplaySockets(apiUrl, clientId);
    return (
        <>
            {/*<p style={{margin: 0, textAlign: "right", fontSize: "0.8rem"}}>ID: {webHooks.clientId}</p>*/}
            {/*<div className={RegisterDisplays.container}>*/}
                <OrderList currentOrders={regiDisplayHooks.currentOrders}/>
            {/*</div>*/}
        </>
    )
}


