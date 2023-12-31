"use client"
import Registers from "@/app/register/css/register.module.css";
import OrderLists from "@/app/register/css/orderList.module.css"
import {OrderItemDetail} from "@/app/Types/itemTypes";
import {OrdersHooksType} from "@/app/hooks/useOrders";

export default function OrderListCard({order, ordersHooks, index}: {
    order: OrderItemDetail,
    ordersHooks: OrdersHooksType,
    index: number
}) {

    return (
        <div className={OrderLists.item}>
            <form className={OrderLists.list}>
                <ItemBase order={order} ordersHooks={ordersHooks} index={index}/>
                <ItemOption order={order} ordersHooks={ordersHooks} index={index}/>
                {/*<ItemSum order={order} ordersHooks={ordersHooks} index={index}/>*/}
            </form>
        </div>
    )
}

function ItemBase({order, ordersHooks, index}: {
    order: OrderItemDetail,
    ordersHooks: OrdersHooksType,
    index: number
}) {
    // const sum = order.quantity * order.value
    return (
        <div className={OrderLists.item_base}>
            <div style={{width: "25%"}}>
                <button name="name" value={order.menu_name} disabled>{order.menu_name}</button>
            </div>
            <div style={{width: "60%"}} className={OrderLists.couponList}>

                {order.coupon && Object.keys(order.coupon).map((name, couponIndex) => {
                    if (!order.coupon) return;
                    return (
                        order.coupon[name].quantity == 0 ?
                            <button value={`${index}:${name}`} type="button"
                                onClick={e => ordersHooks.handleChangeCouponQuantity(e, 1)}
                                style={{
                                    borderStyle: "dotted",
                                    borderColor: "gray",
                                }}
                                className={`${OrderLists.couponButton}`}
                            >{name}
                            </button>
                            :
                            <button value={`${index}:${name}`} type="button"
                                onClick={e => ordersHooks.handleChangeCouponQuantity(e, -1)}
                                style={{
                                    borderStyle: "solid",
                                    borderColor: "gray",
                                    color: "red",
                                }}
                                className={`${OrderLists.couponButton}`}
                            >{name}
                            </button>
                    )
                    })
                }
            </div>
            <div style={{width: "5%"}}></div>
            <div style={{width: "10%"}}>
                <input name="sum" value={order.sum} style={{fontSize: "1.7rem"}} type="number" readOnly></input>
            </div>
        </div>
    )
}

function ItemOption({order, ordersHooks, index}: {
    order: OrderItemDetail,
    ordersHooks: OrdersHooksType,
    index: number
}) {
    return (
        <div className={OrderLists.option}>
            <div style={{width: "10%", marginRight: "auto", alignItems: "center"}}>
                <button value={index} type="button" onClick={e => ordersHooks.handleChangeBaseQuantity(e, 0)}
                        className={Registers.input_border}
                        style={{height: "2.5rem"}}
                >削除
                </button>
            </div>
            <div style={{width: "75%", gap: "1rem", display: "flex", justifyContent: "right"}}>

                {order.topping && Object.keys(order.topping).map((name, toppingIndex) => {
                    const topping = order.topping;
                    if (!topping) return;
                    const value = topping[name].value;
                    const quantity = topping[name].quantity;
                    // const couponAmount = topping[name].couponAmount;
                    const sum = value * quantity

                    return (
                        <div key={order.id * 100 + toppingIndex + name} className={OrderLists.toppings}>
                            {quantity != 0 ?
                                <button value={`${index}:${name}`} type="button"
                                    onClick={e => ordersHooks.handleChangeOptionQuantity(e, -1)}
                                    style={{
                                        // borderStyle: "solid",
                                        // borderWidth: "4px",
                                        // borderColor: "orangered",
                                        borderStyle: "solid",
                                        borderColor: "gray",
                                        color: "red",
                                    }}
                                    className={`${OrderLists.optionButton}`}
                                >{name}
                                </button>
                                :
                                <button value={`${index}:${name}`} type="button"
                                    onClick={e => ordersHooks.handleChangeOptionQuantity(e, 1)}
                                    style={{
                                        borderStyle: "dotted",
                                        borderColor: "gray",
                                    }}
                                    className={`${OrderLists.optionButton}`}
                                >{name}
                                </button>
                            }

                    </div>
                )
            })}
            </div>
            <div style={{width: "15%"}}></div>
        </div>
    )
}

function ItemSum({order, ordersHooks, index}: {
    order: OrderItemDetail,
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