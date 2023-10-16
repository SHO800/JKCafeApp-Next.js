"use client"
import RegisterDisplays from "@/app/display/register/[clientId]/css/registerDisplay.module.css"
import Orders from "@/app/display/register/[clientId]/orderList/orders";
import OrderListIndex from "@/app/register/orderList/orderListIndex";
import {useEffect, useState} from "react";
import {OrderDetail} from "@/app/Types/itemTypes";
import {OrdersHooksType} from "@/app/hooks/useOrders";
import OrderLists from "@/app/register/css/orderList.module.css";
import Registers from "@/app/register/css/register.module.css";

export default function OrderList({currentOrders}: { currentOrders: OrderDetail[] }) {
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
                    <div style={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                        <p>合計</p>
                        <p style={{paddingRight: "50px", fontSize: "4rem"}} id="sum-value"> {sum}円 </p>
                    </div>
                    <div style={{borderBottom: "solid 5px #bdbdbd"}}></div>
                </div>
            </div>
        </>
    )
}
