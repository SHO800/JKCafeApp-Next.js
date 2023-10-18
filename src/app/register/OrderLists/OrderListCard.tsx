"use client"
import Registers from "@/app/register/css/register.module.css";
import OrderLists from "@/app/register/css/orderList.module.css"
import {OrderDetail} from "@/app/Types/itemTypes";
import {OrdersHooksType} from "@/app/hooks/useOrders";

export default function OrderListCard({order, ordersHooks, index}: {
    order: OrderDetail,
    ordersHooks: OrdersHooksType,
    index: number
}) {

    return (
        <div className={OrderLists.item}>
            <form className={OrderLists.list}>
                <ItemBase order={order} ordersHooks={ordersHooks} index={index}/>
                <ItemOption order={order} ordersHooks={ordersHooks} index={index}/>
                <ItemSum order={order} ordersHooks={ordersHooks} index={index}/>
            </form>
        </div>
    )
}

function ItemBase({order, ordersHooks, index}: {
    order: OrderDetail,
    ordersHooks: OrdersHooksType,
    index: number
}) {
    const sum = order.quantity * order.value
    return (
        <div className={OrderLists.item_base}>
            <div style={{width: "40%"}}>
                <button name="name" value={order.menu_name} disabled>{order.menu_name}</button>
            </div>
            <div style={{width: "10%"}}>
                <input name="value" value={order.value} type="number" readOnly></input>
            </div>
            <div style={{width: "2.5%"}}>

            </div>
            <div style={{width: "15%"}}>
                <button value={index} type="button" onClick={e => ordersHooks.handleChangeBaseQuantity(e, -1)}
                    className={`${Registers.input_border} ${OrderLists.quantityButton} ${OrderLists.minus}`}>-
                </button>
            </div>
            <div style={{width: "5%"}}>
                <input name="quantity" value={order.quantity} type="number" readOnly></input>
            </div>
            <div style={{width: "15%"}}>
                <button value={index} type="button" onClick={e => ordersHooks.handleChangeBaseQuantity(e, 1)}
                    className={`${Registers.input_border} ${OrderLists.quantityButton} ${OrderLists.plus}`}>+
                </button>
            </div>
            <div style={{width: "2.5%"}}>

            </div>
            <div style={{width: "10%"}}>
                <input name="sum" value={sum} type="number" readOnly></input>
            </div>
        </div>
    )
}

function ItemOption({order, ordersHooks, index}: {
    order: OrderDetail,
    ordersHooks: OrdersHooksType,
    index: number
}) {
    return (
        <div className={OrderLists.option}>
            {order.topping && Object.keys(order.topping).map((name, toppingIndex) => {
                const topping = order.topping;
                if (!topping) return;
                const value = topping[name].value;
                const quantity = topping[name].quantity;
                // const couponAmount = topping[name].couponAmount;
                const sum = value * quantity

                return (
                    <div key={order.id * 100 + toppingIndex + name} className={OrderLists.toppings}>
                        <div style={{width: "5%"}}></div>
                        <div style={{width: "25%"}}>
                            <button name="name" value={name} disabled>{name}</button>
                            {/*valueが表示内容になるinput要素を使いたかったが改行ができないのでこれだけbutton*/}
                        </div>
                        <div style={{width: "10%"}}></div>
                        <div style={{width: "10%"}}>
                            <input name="value" value={value} type="number" readOnly></input>
                        </div>
                        <div style={{width: "2.5%"}}>

                        </div>
                        <div style={{width: "15%"}}>
                            <button value={`${index}:${name}`} type="button"
                                onClick={e => ordersHooks.handleChangeOptionQuantity(e, -1)}
                                className={`${Registers.input_border} ${OrderLists.quantityButton} ${OrderLists.minus}`}>-
                            </button>
                        </div>
                        <div style={{width: "5%"}}>
                            <input name="quantity" value={quantity} type="number" readOnly></input>
                        </div>
                        <div style={{width: "15%"}}>
                            <button value={`${index}:${name}`} type="button"
                                onClick={e => ordersHooks.handleChangeOptionQuantity(e, 1)}
                                className={`${Registers.input_border} ${OrderLists.quantityButton} ${OrderLists.plus}`}>+
                            </button>
                        </div>
                        <div style={{width: "2.5%"}}>

                        </div>
                        <div style={{width: "10%"}}>
                            <input name="sum" value={sum} type="number" readOnly></input>
                        </div>
                        {/*<div style={{width:"10%"}}><button value={ order.id }  type="submit" className={Registers.input_border}>-</button></div>*/}
                    </div>
                )
            })}
        </div>
    )
}

function ItemSum({order, ordersHooks, index}: {
    order: OrderDetail,
    ordersHooks: OrdersHooksType,
    index: number
}) {
    return (
        <div className={OrderLists.sum}>
            <div style={{width: "10%"}}>
                <button value={index} type="button" onClick={e => ordersHooks.handleChangeBaseQuantity(e, 0)}
                    className={Registers.input_border}>削除
                </button>
            </div>
            <div style={{width: "65%"}}></div>
            <div style={{width: "15%"}}>
                <p>商品小計: </p>
            </div>
            <div style={{width: "10%"}}>
                <input name="sum" value={order.sum} type="number" readOnly></input>
            </div>
        </div>
    )
}