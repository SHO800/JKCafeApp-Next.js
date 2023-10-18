'use client'
import Registers from "@/app/register/css/register.module.css";
import {MenuList} from "@/app/register/MenuList";
import {MenuData} from "@/app/Types/itemTypes";
import {useRegiSockets} from "@/app/hooks/useRegiSockets";
import {OrderHooksWrapper} from "@/app/register/OrderLists/OrderHooksWrapper";
import React, {memo} from 'react';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

// 1階層上でmenusは取得しておく
export const RegisterSocketsWrapper = memo(function ({ menus, apiUrl, clientId }: {
    menus: MenuData,
    apiUrl: string,
    clientId: number
}) {
    console.log("wrapper");
    const registerSockets = useRegiSockets(apiUrl, clientId);

    return (
        <>
            <p style={{ margin: 0, textAlign: "right", fontSize: "0.8rem" }}>ID: {clientId}</p>
            <div className={Registers.container}>
                <OrderHooksWrapper menus={menus} sendOrderData={registerSockets.sendOrderData} submit={registerSockets.submit}>
                    <MenuList menus={menus} />
                </OrderHooksWrapper>
            </div>
        </>
    );
});
RegisterSocketsWrapper.displayName = "RegisterSocketsWrapper"
