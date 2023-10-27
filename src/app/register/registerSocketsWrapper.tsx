'use client'
import Registers from "@/app/register/css/register.module.css";
import {MenuList} from "@/app/register/MenuList";
import {MenuData} from "@/app/Types/itemTypes";
import {RegiHooksType, useRegiSockets} from "@/app/hooks/useRegiSockets";
import {OrderHooksWrapper} from "@/app/register/OrderLists/OrderHooksWrapper";
import React, {memo, useState} from 'react';
import {History} from "@/app/register/History";

// 1階層上でmenusは取得しておく
export const RegisterSocketsWrapper = memo(function ({ menus, apiUrl, clientId }: {
    menus: MenuData,
    apiUrl: string,
    clientId: number
}) {
    const registerSockets = useRegiSockets(apiUrl, clientId);

    return (
        <>
            <div className={Registers.container}>
                <p style={{ position: "fixed", top: 0, right: 0, fontSize: "0.8rem" }}>ID: {clientId}</p>
                <OrderHooksWrapper menus={menus} sendOrderData={registerSockets.sendOrderData} submit={registerSockets.submit}>
                    <MenuList menus={menus} />
                    <History history={registerSockets.history}/>
                </OrderHooksWrapper>

            </div>
        </>
    );
});
RegisterSocketsWrapper.displayName = "RegisterSocketsWrapper"


