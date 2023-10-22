import Kitchens from "@/app/display/kitchen/css/kitchen.module.css";
import {KitchenOrder} from "@/app/Types/itemTypes";
import {KitchenOrderListCard} from "@/app/display/kitchen/kitchenOrderList/KitchenOrderListCard";
import {KitchenInfo} from "@/app/display/kitchen/kitchenOrderList/KitchenInfo";
import {MouseEvent} from "react";

export function KitchenOrderList({kitchenOrders, handleSubmit}: { kitchenOrders: KitchenOrder[], handleSubmit: (e: MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <>
            <KitchenInfo />
            <div className={Kitchens.orders}>
                {kitchenOrders.map((order, index) => {
                    return (
                            <KitchenOrderListCard key={order.uuid} order={order} index={index + 1} handleSubmit={handleSubmit}/>
                        )
                })}
            </div>
        </>
    )
}

