"use client"
import {OrdersHooksType} from "@/app/hooks/useOrders";
import OrderListCard from "@/app/register/orderList/orderListCard";
import OrderLists from "@/app/register/css/orderList.module.css";

export default function Orders({ordersHooks}: { ordersHooks: OrdersHooksType }) {
    if (!ordersHooks.currentOrders) return null;

    // 直近の注文を操作できるようにするため反転
    const rvOrder = [...ordersHooks.currentOrders].reverse();
    return (
        <div className={OrderLists.order_wrapper}>
            {rvOrder.map((order, index) => {
                return (
                    <OrderListCard key={order.id * 100 + index} order={order} ordersHooks={ordersHooks}
                        index={index}/>
                )
            })}
        </div>
    )
}