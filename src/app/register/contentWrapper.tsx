'use client'

import Registers from "@/app/register/register.module.css";
import {MenuList} from "@/app/register/menuList";
import OrderList from "@/app/register/orderList";
import {MenuType, OrderedMenu} from "@/app/register/itemTypes";
import {useEffect, useState} from "react";
import {OrdersContext, SetOrdersContext} from "@/app/register/ordersContext";


export function ContentWrapper({menus}:{menus:MenuType}){

    const [currentOrders, setCurrentOrders] = useState<OrderedMenu[]>([])
    useEffect(()=>{
        console.log(currentOrders[0] && Object.values(currentOrders[0])[0])
    }, [currentOrders])


    return(
        <div className={Registers.container}>
            <OrdersContext.Provider value={currentOrders}>
                <SetOrdersContext.Provider value={setCurrentOrders}>
                    <MenuList menus={menus}/>
                    <OrderList />
                </SetOrdersContext.Provider>
            </OrdersContext.Provider>
        </div>
    )
}


