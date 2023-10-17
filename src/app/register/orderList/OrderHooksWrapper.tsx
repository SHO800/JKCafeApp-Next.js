import {useOrders} from "@/app/hooks/useOrders";
import {MenuList} from "@/app/register/menuList";
import OrderList from "@/app/register/orderList/orderList";
import {HandleAddOrderContext} from "@/app/register/ordersContext";
import {MenuData, OrderDetail} from "@/app/Types/itemTypes";
import {memo, ReactNode} from "react";

// currentOrdersの変更による再レンダリング対策
export const OrderHooksWrapper = memo(({children, menus, sendOrderData}:{children: ReactNode, menus: MenuData, sendOrderData:(orderDetails: OrderDetail[]) => void}) => {
    const ordersHooks = useOrders(menus, sendOrderData);
    const handleAddOrder = ordersHooks.handleAddOrder
    return (
        <HandleAddOrderContext.Provider value={handleAddOrder}>
            {children}
            <OrderList ordersHooks={ordersHooks}/>
        </HandleAddOrderContext.Provider>
    )
})
OrderHooksWrapper.displayName = "OrderHooksWrapper"