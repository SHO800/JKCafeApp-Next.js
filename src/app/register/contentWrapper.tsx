'use client'
import Registers from "@/app/register/css/register.module.css";
import {MenuList} from "@/app/register/menuList";
import {MenuData} from "@/app/Types/itemTypes";
import {HandleAddOrderContext, OrdersContext} from "@/app/register/ordersContext";
import {useOrders} from "@/app/hooks/useOrders";
import OrderList from "@/app/register/orderList/orderList";
import {useRegiHooks} from "@/app/hooks/useRegiHooks";

export function ContentWrapper({menus, apiUrl}: {
    menus: MenuData,
    apiUrl: string
}) {
    const ordersHooks = useOrders(menus);
    const registerHooks = useRegiHooks(apiUrl, ordersHooks);
    const currentOrders = ordersHooks.currentOrders
    const handleAddOrder = ordersHooks.handleAddOrder


    return (
        <>
            <p style={{margin: 0, textAlign: "right", fontSize: "0.8rem"}}>ID: {registerHooks.clientId}</p>
            <div className={Registers.container}>
                <OrdersContext.Provider value={currentOrders}>
                    <HandleAddOrderContext.Provider value={handleAddOrder}>
                        <MenuList menus={menus}/>
                        <OrderList ordersHooks={ordersHooks}/>
                    </HandleAddOrderContext.Provider>
                </OrdersContext.Provider>
            </div>
        </>
    )
}


