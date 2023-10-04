"use client"
import {MenuType, OrderedMenu} from "@/app/register/itemTypes";
import {createContext, useContext, useEffect, useState} from "react";
import {ContentWrapper} from "@/app/register/contentWrapper";
import {OrdersContext} from "@/app/register/ordersContext";


const apiUrl:string = "http://127.0.0.1:5000/menus";

export default function Register() {

    const [currentOrders, setCurrentOrders] = useState<OrderedMenu[] | null>(null)

    useEffect(() => {
        alert(currentOrders)
    }, [currentOrders]);

    return (
        <>
            <OrdersContext.Provider value={setCurrentOrders}>
                <ContentWrapper url={apiUrl}/>
            </OrdersContext.Provider>

            {/*<Script*/}
            {/*    strategy="lazyOnload"*/}
            {/*    src="../components/./sumValues"*/}
            {/*/>*/}
        </>
    )
}