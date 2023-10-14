"use client"
import Registers from "@/app/register/css/register.module.css";
import OrderLists from "@/app/register/css/orderList.module.css"
import {MenuData, OrderData, OrderDetail} from "@/app/register/itemTypes";
import {OrdersHooksType} from "@/app/register/hooks/useOrders";

export default function OrderList({ordersHooks}: {ordersHooks: OrdersHooksType}) {

    const sum = ordersHooks.currentOrders.map((order) => {
        return order.sum
    })

    return (
        <>
        <div className={`${Registers.grid_box} ${Registers.table}`}>
            <div className={OrderLists.spacer}>
                <div className={Registers.index}>
                    <div style={{width:"40%"}}>商品名</div>
                    <div style={{width:"10%"}}>単価</div>
                    <div style={{width:"40%"}}>個数</div>
                    <div style={{width:"10%"}}>小計</div>
                </div>
                <div className={`${OrderLists.menuList} ${Registers.scroll}`}>
                    <div className={OrderLists.order_wrapper}>
                        <Orders ordersHooks={ordersHooks}/>
                    </div>
                </div>

            </div>
                    <div className={OrderLists.checkout}>
                        <div style={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                            <p>合計</p>
                            <p style={{paddingRight: "50px", fontSize: "2rem"}} id="sum-value"> {} </p>
                        </div>
                        <div style={{borderBottom: "solid 5px #bdbdbd"}}></div>
                        <form action="{{ url_for('checkout_submit') }}" method="POST">
                            <button type="submit" name="" id={OrderLists.checkout_submit}>会計を確定</button>
                        </form>
                    </div>
        </div>
        </>
    )
}

function Orders({ordersHooks}: {ordersHooks: OrdersHooksType}){
    if (!ordersHooks.currentOrders) return null;

    // 直近の注文を操作できるようにするため反転
    const rvOrder = ordersHooks.currentOrders.toReversed()
    return rvOrder.map( ( order, index ) => {
        return (
            <OrderListButton key={order.id * 100 + index} order={order} ordersHooks={ordersHooks} index={index}/>
        )
    })
}

function OrderListButton({order, ordersHooks, index}:{order: OrderDetail, ordersHooks: OrdersHooksType, index:number}) {

    return (
        <div className={OrderLists.item}>
            <form className={OrderLists.list}>
                <div className={OrderLists.base}>
                    <div style={{width:"40%"}}>
                        <button name="name" value={ order.menu_name } disabled>{ order.menu_name }</button>
                    </div>
                    <div style={{width:"10%"}}>
                        <input name="value" value={ order.value } type="number" readOnly></input>
                    </div>
                    <div style={{width: "2.5%"}}>

                    </div>
                    <div style={{width:"15%"}}>
                        <button value={ index }  type="button" onClick={ e => ordersHooks.handleChangeBaseQuantity(e, -1) } className={`${Registers.input_border} ${OrderLists.quantityButton} ${OrderLists.minus}`}>-</button>
                    </div>
                    <div style={{width:"5%"}}>
                        <input name="quantity" value={ order.quantity } type="number" readOnly></input>
                    </div>
                    <div style={{width:"15%"}}>
                        <button value={ index }  type="button" onClick={ e => ordersHooks.handleChangeBaseQuantity(e, 1) } className={`${Registers.input_border} ${OrderLists.quantityButton} ${OrderLists.plus}`}>+</button>
                    </div>
                    <div style={{width: "2.5%"}}>

                    </div>
                    <div style={{width:"10%"}}>
                        <input name="sum" value={ order.sum } type="number" readOnly></input>
                    </div>
                </div>
                <div className={OrderLists.option}>
                    {order.topping && Object.keys(order.topping).map((name, index) => {
                        const topping = order.topping;
                        if (!topping) return;

                        const value = topping[name].value;
                        const quantity = topping[name].quantity;
                        const couponAmount = topping[name].couponAmount;

                        return(
                            <div key={order.id * 100 + index + name } className={OrderLists.toppings}>
                                <div style={{width:"25%"}}>
                                    <button name="name" value={ name } disabled>{ name }</button>
                                    {/*valueが表示内容になるinput要素を使いたかったが改行ができないのでこれだけbutton*/}
                                </div>
                                <div style={{width:"5%"}}></div>
                                <div style={{width:"5%"}}>
                                    <input name="value" value={ value } type="number" readOnly></input>
                                </div>
                                <div style={{width:"5%"}}>
                                    <input name="quantity" value={ quantity } type="number" readOnly></input>
                                </div>
                                <div style={{width:"60%"}}>

                                </div>
                                {/*<div style={{width:"10%"}}><button value={ order.id }  type="submit" className={Registers.input_border}>-</button></div>*/}
                            </div>
                        )
                        })}

                </div>

                <div className={OrderLists.sum}>
                    <div style={{width:"10%"}}>
                        <button value={ index }  type="button" onClick={ e => ordersHooks.handleChangeBaseQuantity(e, 0)} className={Registers.input_border}>削除</button>
                    </div>
                    <div style={{width:"65%"}}></div>
                    <div style={{width:"15%"}}>
                        <p>商品小計: </p>
                    </div>
                    <div style={{width:"10%"}}>
                        <input name="sum" value={ order.sum } type="number" readOnly></input>
                    </div>
                </div>
            </form>
        </div>
    )

}
