'use client'
import Registers from "@/app/register/register.module.css";
import {MenuList} from "@/app/register/menuList";
import OrderList from "@/app/register/orderList";
import {MenuData, OrderData, OrderDetail, ToppingData} from "@/app/register/itemTypes";
import {useEffect} from "react";
import {OrdersContext, HandleAddOrderContext} from "@/app/register/ordersContext";
import useOrderDetails from "@/app/register/hooks/useOrderDetails";

export function ContentWrapper({menus}:{menus:MenuData}){


    const {currentOrders, handleAddOrder} = useOrderDetails(menus);

    useEffect(()=>{
        // console.log(currentOrders[0] && Object.values(currentOrders[0])[0])
        console.log(currentOrders)
    }, [currentOrders])




    return(
        <div className={Registers.container}>
            <OrdersContext.Provider value={currentOrders}>
                <HandleAddOrderContext.Provider value={handleAddOrder}>
                    <MenuList menus={menus}/>
                    <OrderList currentOrders={currentOrders}/>
                </HandleAddOrderContext.Provider>
            </OrdersContext.Provider>
        </div>
    )
}


