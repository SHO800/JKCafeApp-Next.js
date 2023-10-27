"use client"
import RegisterDisplays from "@/app/display/register/[clientId]/css/registerDisplay.module.css"
import {OrderItemDetail} from "@/app/Types/itemTypes";

export default function OrderListCard({order, index}: {
    order: OrderItemDetail,
    index: number
}) {

    return (
        <div className={RegisterDisplays.item}>
            <form className={RegisterDisplays.list}>
                <ItemBase order={order} index={index}/>
                <ItemOption order={order} index={index}/>
                <ItemSum order={order} index={index}/>
            </form>
        </div>
    )
}

function ItemBase({order, index}: {
    order: OrderItemDetail,
    index: number
}) {
    const sum = order.quantity * order.value
    return (
        <div className={RegisterDisplays.item_base}>
            <div style={{width: "55%"}}>
                <button name="name" value={order.menu_name} disabled>{order.menu_name}</button>
            </div>
            <div style={{width: "20%"}}></div>
            <div style={{width: "10%"}}>
                {/*<input name="quantity" value={order.quantity} type="number" readOnly></input>*/}
            </div>
            <div style={{width: "5%"}}></div>
            <div style={{width: "10%", display: "flex", alignItems: "center"}}>
                ¥<input name="sum" value={sum} type="number" readOnly></input>
            </div>
        </div>
    )
}

function ItemOption({order, index}: {
    order: OrderItemDetail,
    index: number
}) {
    if (!order.topping) return null
    return (
        <div className={RegisterDisplays.option}>
            {order.topping && Object.keys(order.topping).map((name, toppingIndex) => {
                const topping = order.topping;
                if (!topping) return;
                const value = topping[name].value;
                const quantity = topping[name].quantity;
                // const couponAmount = topping[name].couponAmount;
                const sum = value * quantity

                if (quantity === 0) return;

                return (
                    <div key={order.id * 100 + toppingIndex + name} className={RegisterDisplays.toppings}>
                        <div style={{width: "5%"}}></div>
                        <div style={{width: "80%"}}>
                            <button name="name" value={name} disabled>+ {name}</button>
                        </div>

                        <div style={{width: "5%"}}>
                        </div>
                        <div style={{width: "10%", display: "flex", alignItems: "center"}}>
                            ¥<input name="sum" value={sum} type="number" readOnly></input>
                        </div>

                        {/*<div style={{width:"10%"}}><button value={ order.id }  type="submit" className={Registers.input_border}>-</button></div>*/}
                    </div>
                )
            })}

            {order.coupon && Object.keys(order.coupon).map((name, couponIndex) => {
                const coupon = order.coupon;
                if (!coupon) return;
                const value = coupon[name].value;
                const quantity = coupon[name].quantity;
                // const couponAmount = coupon[name].couponAmount;
                const sum = value * quantity

                if (quantity === 0) return;

                return (
                    <div key={order.id * 100 + couponIndex + name} className={RegisterDisplays.toppings}>
                        <div style={{width: "5%"}}></div>
                        <div style={{width: "80%"}}>
                            <button name="name" value={name} disabled>+ {name}</button>
                        </div>

                        <div style={{width: "5%"}}>
                            ¥
                        </div>
                        <div style={{width: "10%", display: "flex", alignItems: "center", flexDirection: "row"}}>
                            -<input name="sum" value={sum} type="number" readOnly></input>
                        </div>

                        {/*<div style={{width:"10%"}}><button value={ order.id }  type="submit" className={Registers.input_border}>-</button></div>*/}
                    </div>
                )
            })}
        </div>
    )
}

function ItemSum({order, index}: {
    order: OrderItemDetail,
    index: number
}) {
    return (
        <p className={RegisterDisplays.sum}>
            商品小計: {order.sum}円
        </p>
    )
}