"use client"
import {OrdersHooksType} from "@/app/hooks/useOrders";
import Registers from "@/app/register/css/register.module.css";
import OrderLists from "@/app/register/css/orderList.module.css";
import Orders from "@/app/register/orderList/orders";
import OrderListIndex from "@/app/register/orderList/orderListIndex";
import {useEffect, useState} from "react";
import OrderSum from "@/app/components/orderSum";


export default function OrderList({ordersHooks}: { ordersHooks: OrdersHooksType }) {
    // 全注文の合計値段を計算
    const [sum, setSum] = useState(0);
    useEffect(() => {
        setSum(prevState => {
            let sumTmp: number = 0;
            ordersHooks.currentOrders.map((order) => {
                sumTmp += order.sum;
            })
            return sumTmp;
        })
    }, [ordersHooks.currentOrders])

    return (
        <>
            <div className={`${Registers.grid_box} ${Registers.table}`}>
                <div className={OrderLists.spacer}>
                    <OrderListIndex/>
                    <div className={`${OrderLists.menuList} ${Registers.scroll}`}>
                        <Orders ordersHooks={ordersHooks}/>
                    </div>
                </div>
                <div className={OrderLists.checkout}>
                    <OrderSum sum={sum} fontSize={"2rem"}/>
                    <CheckoutButton/>
                </div>
            </div>
        </>
    )
}


function CheckoutButton() {
    return <button type="submit" name="" id={OrderLists.checkout_submit}>会計を確定</button>
}