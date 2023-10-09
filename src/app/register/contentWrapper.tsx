'use client'
import Registers from "@/app/register/css/register.module.css";
import {MenuList} from "@/app/register/menuList";
import OrderList from "@/app/register/orderList";
import {MenuData, OrderData, OrderDetail, ToppingData} from "@/app/register/itemTypes";
import {useEffect} from "react";
import {OrdersContext, HandleAddOrderContext} from "@/app/register/ordersContext";
import {useOrders} from "@/app/register/hooks/useOrders";

export function ContentWrapper({menus}:{menus:MenuData}){


    const ordersHooks = useOrders(menus);
    const currentOrders = ordersHooks.currentOrders
    const handleAddOrder = ordersHooks.handleAddOrder
    useEffect(()=>{
        // console.log(currentOrders[0] && Object.values(currentOrders[0])[0])
        console.log(currentOrders)
    }, [currentOrders])

    return(
        <div className={Registers.container}>
            <OrdersContext.Provider value={currentOrders}>
                <HandleAddOrderContext.Provider value={handleAddOrder}>
                    <MenuList menus={menus}/>
                    <OrderList ordersHooks={ordersHooks}/>
                </HandleAddOrderContext.Provider>
            </OrdersContext.Provider>
        </div>
    )
}


