"use client"
import OrderListCard from "@/app/display/register/[clientId]/orderList/orderListCard";
import RegisterDisplays from "@/app/display/register/[clientId]/css/registerDisplay.module.css"
import {OrderDetail} from "@/app/register/itemTypes";

export default function Orders({currentOrders}: { currentOrders: OrderDetail[] }) {
    if (!currentOrders) return null;

    // 直近の注文を操作できるようにするため反転
    const rvOrder = [...currentOrders].reverse();
    return (
        <div className={RegisterDisplays.order_wrapper}>
            {rvOrder.map((order, index) => {
                return (
                    <OrderListCard key={order.id * 100 + index} order={order} index={index}/>
                )
            })}
        </div>
    )
}