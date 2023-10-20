"use client"
import RegisterDisplays from "@/app/display/register/[clientId]/css/registerDisplay.module.css"
import Orders from "@/app/display/register/[clientId]/orderList/Orders";
import OrderListIndex from "@/app/register/OrderLists/OrderListIndex";
import {useEffect, useState} from "react";
import {OrderItemDetail} from "@/app/Types/itemTypes";
import OrderLists from "@/app/register/css/orderList.module.css";
import OrderSum from "@/app/components/OrderSum";

export default function OrderList({currentOrders}: { currentOrders: OrderItemDetail[] }) {
    // 全注文の合計値段を計算
    const [sum, setSum] = useState(0);
    useEffect(() => {
        setSum(prevState => {
            let sumTmp: number = 0;
            currentOrders.map((order) => {
                sumTmp += order.sum;
            })
            return sumTmp;
        })
    }, [currentOrders])

    return (
        <>
            <div className={`${RegisterDisplays.grid_box}`}>
                <div className={RegisterDisplays.spacer}>
                    <OrderListIndex/>
                    <div className={`${RegisterDisplays.menuList} ${RegisterDisplays.scroll}`}>
                        <Orders currentOrders={currentOrders}/>
                    </div>
                </div>
                <div className={OrderLists.checkout}>
                    <OrderSum sum={sum} fontSize={"4rem"}/>
                </div>
            </div>
        </>
    )
}
