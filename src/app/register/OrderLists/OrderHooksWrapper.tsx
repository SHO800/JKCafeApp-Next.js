import {useOrders} from "@/app/hooks/useOrders";
import OrderList from "@/app/register/OrderLists/OrderList";
import {HandleAddOrderContext} from "@/app/register/ordersContext";
import {KitchenOrder, MenuData, OrderItemDetail} from "@/app/Types/itemTypes";
import {memo, ReactNode} from "react";

// currentOrdersの変更による再レンダリング対策
export const OrderHooksWrapper = memo(function ({children, menus, sendOrderData, submit}: {
    children: ReactNode,
    menus: MenuData,
    sendOrderData: (orderDetails: OrderItemDetail[]) => void,
    submit: (orderDetails: OrderItemDetail[]) => void,
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