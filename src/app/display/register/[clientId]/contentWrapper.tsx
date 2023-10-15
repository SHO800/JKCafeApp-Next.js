'use client'
import RegisterDisplays from "@/app/display/register/[clientId]/css/registerDisplay.module.css"
import {MenuData, OrderDetail} from "@/app/register/itemTypes";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import OrderList from "@/app/display/register/[clientId]/orderList/orderList";

export function ContentWrapper({menus, apiUrl, clientId}: {
    menus: MenuData,
    apiUrl: string,
    clientId: number
}) {

    const [currentOrders, setCurrentOrders] = useState<OrderDetail[]>([])

    useEffect(() => {
        const socketTmp = io(apiUrl + "display/register", {withCredentials: true})
        socketTmp.on("connect", () => {
            console.log("connect: ", clientId)
            socketTmp.emit("join", {clientId: clientId})
        })

        socketTmp.on("temp_order_data", (msg) => {
            console.log(msg)
            setCurrentOrders(msg)
        })
    }, [clientId, apiUrl]);

    return (
        <>
            {/*<p style={{margin: 0, textAlign: "right", fontSize: "0.8rem"}}>ID: {webHooks.clientId}</p>*/}
            {/*<div className={RegisterDisplays.container}>*/}
                <OrderList currentOrders={currentOrders}/>
            {/*</div>*/}
        </>
    )
}


