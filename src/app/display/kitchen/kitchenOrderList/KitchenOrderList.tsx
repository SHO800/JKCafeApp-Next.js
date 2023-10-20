import {KitchenOrder} from "@/app/Types/itemTypes";

export function KitchenOrderList({kitchenOrders}: { kitchenOrders: KitchenOrder[] }) {


    return (
        <>
            {kitchenOrders.map(order => {
                return (
                        <p key={order.uuid}>{order.uuid}</p>
                    )
            })}
        </>
    )
}