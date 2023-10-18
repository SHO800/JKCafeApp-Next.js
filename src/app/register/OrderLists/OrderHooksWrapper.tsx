import {useOrders} from "@/app/hooks/useOrders";
import OrderList from "@/app/register/OrderLists/OrderList";
import {HandleAddOrderContext} from "@/app/register/ordersContext";
import {MenuData, OrderDetail} from "@/app/Types/itemTypes";
import {memo, ReactNode} from "react";

// currentOrdersの変更による再レンダリング対策
export const OrderHooksWrapper = memo(function ({children, menus, sendOrderData, submit}: {
    children: ReactNode,
    menus: MenuData,
    sendOrderData: (orderDetails: OrderDetail[]) => void,
    submit: (orderDetails: OrderDetail[]) => void
}) {
    const ordersHooks = useOrders(menus, sendOrderData, submit);
    const handleAddOrder = ordersHooks.handleAddOrder
    return (
        <HandleAddOrderContext.Provider value={handleAddOrder}>
            {children}
            <OrderList ordersHooks={ordersHooks}/>
        </HandleAddOrderContext.Provider>
    )
})
OrderHooksWrapper.displayName = "OrderHooksWrapper"