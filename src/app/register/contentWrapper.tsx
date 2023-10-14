'use client'
import Registers from "@/app/register/css/register.module.css";
import {MenuList} from "@/app/register/menuList";
import {MenuData} from "@/app/register/itemTypes";
import {useEffect} from "react";
import {HandleAddOrderContext, OrdersContext} from "@/app/register/ordersContext";
import {useOrders} from "@/app/register/hooks/useOrders";
import OrderList from "@/app/register/orderList/orderList";

export function ContentWrapper({menus}: { menus: MenuData }) {
    const ordersHooks = useOrders(menus);
    const currentOrders = ordersHooks.currentOrders
    const handleAddOrder = ordersHooks.handleAddOrder
    useEffect(() => {

    }, [currentOrders])

    return (
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


