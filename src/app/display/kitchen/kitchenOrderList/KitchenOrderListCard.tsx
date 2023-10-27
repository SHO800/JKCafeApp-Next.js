import {KitchenOrder, KitchenOrderItemOption} from "@/app/Types/itemTypes";
import Cards from "@/app/display/kitchen/css/card.module.css";
import {convertToDateObject} from "@/app/functions/convertToDateObject";
import {OrderOverview} from "@/app/display/kitchen/kitchenOrderList/OrderOverview";
import React, {MouseEvent, useCallback, useState} from "react";
import Registers from "@/app/register/css/register.module.css";
import {ConfirmPanel} from "@/app/components/ConfirmPanel";

export function KitchenOrderListCard({order, index, handleSubmit}: { order: KitchenOrder, index: number, handleSubmit: (uuid: string) => void}) {
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
            <ProvidedButton orderedAt={order.orderedAt} cardIndex={index} callback={() => handleSubmit(order.uuid)}  />
        </div>
    )
}

function ProvidedButton({orderedAt, cardIndex, callback}: { orderedAt: string, cardIndex: number, callback: () => void}) {
    const [status, setStatus] = useState(false);
    return (
        <>
            <button className={Cards.orderCompleteButton} onClick={() => setStatus(true)}></button>
            <ConfirmPanel  status={status} setStatus={setStatus} callback={callback}>
                <p>次の注文を提供して完了しますか?</p>
                <br></br>
                <p>インデックス: {cardIndex}</p>
                <p>注文日時: {orderedAt}</p>
                <br></br>
                <p>※提供後は未提供状態に戻せません！</p>
            </ConfirmPanel>
        </>
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
