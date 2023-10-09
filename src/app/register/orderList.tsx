"use client"
import Registers from "@/app/register/register.module.css";
import {MenuData, OrderData, OrderDetail} from "@/app/register/itemTypes";

export default function OrderList({currentOrders}: {currentOrders: OrderDetail[]}) {
    return (
        <>
        <div className={`${Registers.grid_box} ${Registers.table}`}>
            <div className={Registers.spacer}>
                <div className={Registers.index}>
                    <div style={{width:"10%"}}>商品番号</div>
                    <div style={{width:"60%"}}>商品名</div>
                    <div style={{width:"10%"}}>単価</div>
                    <div style={{width:"10%"}}>個数</div>
                    <div style={{width:"10%"}}>小計</div>
                    <div style={{width:"10%"}}>削除</div>
                </div>
                <div className={`${Registers.menuList} ${Registers.scroll}`}>
                    <Orders orders={currentOrders}/>

                </div>
            </div>
        </div>

        <div className={Registers.grid_bottom} style={{marginTop: "50px"}}>
            <div className={Registers.checkout}>
                <div style={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                    <p>合計</p>
                    <p style={{paddingRight: "50px", fontSize: "2rem"}} id="sum-value"> - </p>
                </div>
                <div style={{borderBottom: "solid 5px #bdbdbd"}}></div>
                <form action="{{ url_for('checkout_submit') }}" method="POST">
                    <button type="submit" name="" id="checkout-submit" value="支払い完了"></button>
                </form>
            </div>
        </div>
        </>
    )
}

function Orders({orders}: {orders: OrderDetail[]}){
    if (!orders) return null;

    return orders.map( ( order ) => {
        return (
            <OrderListButton key={order.id} order={order}/>
        )
    })
}

function OrderListButton({order}:{order: OrderDetail}) {

    return (
        <div className={Registers.item}>
            <form className={Registers.list}>
                <div className={Registers.upper}>
                    <div style={{width:"10%"}}>
                        <span style={{margin:"auto"}}>No.
                        <input name="id" defaultValue={ order.id } type="number" readOnly></input></span>
                    </div>
                    <div style={{width:"50%"}}>
                        <button name="name" value={ order.menu_name } disabled>{ order.menu_name }</button>
                        {/*valueが表示内容になるinput要素を使いたかったが改行ができないのでこれだけbutton*/}
                    </div>
                    <div style={{width:"10%"}}>
                        <input name="value" value={ order.value } type="number" readOnly></input>
                    </div>
                    <div style={{width:"10%"}}>
                        <input name="quantity" value={ order.quantity } type="number" readOnly></input>
                    </div>
                    <div style={{width:"10%"}}>
                        <input name="sum" value={ order.sum } type="number" readOnly></input>
                    </div>
                    <div style={{width:"10%"}}><button value={ order.id }  type="submit" className={Registers.input_border}>-</button></div>
                </div>
                <div className={Registers.lower}>
                    {order.topping && Object.entries(order.topping).map(item => {
                        return(
                            <div key={null} className={Registers.toppings}>
                                <div style={{width:"10%"}}>

                                </div>
                                <div style={{width:"50%"}}>
                                    <button name="name" value={ order.menu_name } disabled>{ order.menu_name }</button>
                                    {/*valueが表示内容になるinput要素を使いたかったが改行ができないのでこれだけbutton*/}
                                </div>
                                <div style={{width:"10%"}}>
                                    <input name="value" value={ order.value } type="number" readOnly></input>
                                </div>
                                <div style={{width:"10%"}}>
                                    <input name="quantity" value={ order.quantity } type="number" readOnly></input>
                                </div>
                                <div style={{width:"10%"}}>
                                    <input name="sum" value={ order.sum } type="number" readOnly></input>
                                </div>
                                <div style={{width:"10%"}}><button value={ order.id }  type="submit" className={Registers.input_border}>-</button></div>
                            </div>
                        )
                        })}

                </div>
            </form>
        </div>
    )

}
