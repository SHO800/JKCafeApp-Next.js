'use client'
import OrderList from "@/app/display/register/[clientId]/orderList/OrderList";
import {useRegiDisplaySockets} from "@/app/hooks/useRegiDisplaySockets";
import {useEffect, useState} from "react";
import {OrderItemDetail} from "@/app/Types/itemTypes";
import {RegiDisplaySockets} from "@/app/display/register/[clientId]/RegiDisplaySockets";

export function ContentWrapper({apiUrl, clientId}: {
    apiUrl: string,
    clientId: number
}) {
    const [currentOrders, setCurrentOrders] = useState<OrderItemDetail[]>([])


    return (
        <>
            <OrderList currentOrders={currentOrders}/>
            <RegiDisplaySockets apiUrl={apiUrl} clientId={clientId} setCurrentOrders={setCurrentOrders} />
        </>
    )
}


