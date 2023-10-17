'use client'
import OrderList from "@/app/display/register/[clientId]/orderList/orderList";
import {useRegiDisplaySockets} from "@/app/hooks/useRegiDisplaySockets";
import {useEffect, useState} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";
import {RegiDisplaySockets} from "@/app/display/register/[clientId]/regiDisplaySockets";

export function ContentWrapper({apiUrl, clientId}: {
    apiUrl: string,
    clientId: number
}) {
    const [currentOrders, setCurrentOrders] = useState<OrderDetail[]>([])


    return (
        <>
            {/*<p style={{margin: 0, textAlign: "right", fontSize: "0.8rem"}}>ID: {webHooks.clientId}</p>*/}
            {/*<div className={RegisterDisplays.container}>*/}
            <OrderList currentOrders={currentOrders}/>
            <RegiDisplaySockets apiUrl={apiUrl} clientId={clientId} setCurrentOrders={setCurrentOrders} />
            {/*</div>*/}
        </>
    )
}


