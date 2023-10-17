'use client'
import Registers from "@/app/register/css/register.module.css";
import {MenuList} from "@/app/register/menuList";
import {MenuData} from "@/app/Types/itemTypes";
import {HandleAddOrderContext} from "@/app/register/ordersContext";
import {useOrders} from "@/app/hooks/useOrders";
import OrderList from "@/app/register/orderList/orderList";
import {useRegiSockets} from "@/app/hooks/useRegiSockets";
import {OrderHooksWrapper} from "@/app/register/orderList/OrderHooksWrapper";

// 1階層上でmenusは取得しておく
import React, {memo} from 'react';

export const RegisterSocketsWrapper = memo(function ({ menus, apiUrl }: {
    menus: MenuData,
    apiUrl: string
}) {
    console.log("wrapper");
    const registerSockets = useRegiSockets(apiUrl);
    const sendOrderData = registerSockets.sendOrderData;

    return (
        <>
            <p style={{ margin: 0, textAlign: "right", fontSize: "0.8rem" }}>ID: {registerSockets.clientId}</p>
            <div className={Registers.container}>
                <OrderHooksWrapper menus={menus} sendOrderData={sendOrderData}>
                    <MenuList menus={menus} />
                </OrderHooksWrapper>
            </div>
        </>
    );
});
RegisterSocketsWrapper.displayName = "RegisterSocketsWrapper"
