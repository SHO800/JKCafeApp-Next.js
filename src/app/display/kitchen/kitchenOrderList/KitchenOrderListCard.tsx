import {KitchenOrder, KitchenOrderItemOption} from "@/app/Types/itemTypes";
import Cards from "@/app/display/kitchen/css/card.module.css";
import {convertToDateObject} from "@/app/functions/convertToDateObject";
import {OrderOverview} from "@/app/display/kitchen/kitchenOrderList/OrderOverview";
import {MouseEvent} from "react";

export function KitchenOrderListCard({order, index, handleSubmit}: { order: KitchenOrder, index: number, handleSubmit: (e: MouseEvent<HTMLButtonElement>) => void}) {
    const orderedDate = convertToDateObject(order.orderedAt);

    return (
        <div className={Cards.card}>
            <OrderOverview index={index} orderedDate={orderedDate} />
            <div className={Cards.itemList}>
                {order.items.map((item, index) => {
                    return (
                        <OrderItem key={item.uuid} name={item.menu_name} amount={item.quantity} toppings={item.option}/>
                    )
                })}
            </div>
            <button type={"button"} className={Cards.orderCompleteButton} value={order.uuid} onClick={(e) => handleSubmit(e)}></button>
        </div>
    )
}

export function OrderItem({name, amount, toppings}: { name: string, amount: number, toppings: KitchenOrderItemOption[] }) {
    let toppingsList = null;
    if (toppings) {
        toppingsList = (
            <div className={Cards.toppings}>
                {toppings.map((topping, index) => {
                    return (
                        <div key={index} className={Cards.topping}>
                            {/*<p className={Cards.amount}>{topping.quantity}</p>*/}
                            <p className={Cards.name}>{topping.option_name}</p>
                        </div>
                    )}
                )}
            </div>
        )
    }
    return (
        <div className={Cards.orderItem}>
            <div className={Cards.base}>
                {/*<p className={Cards.amount}>{amount}</p>*/}
                <p className={Cards.name}>{name}</p>
            </div>
            {toppingsList}
        </div>
    )
}
