"use client"
import Registers from "@/app/register/register.module.css";
import {MenuType, OrderedMenu} from "@/app/register/itemTypes";

export default function OrderList({menus, orders}:{menus: MenuType, orders: OrderedMenu[]}) {
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
                    <Orders menus={menus} orders={orders}/>

                </div>
            </div>
        </div>

        <>
        {/*<div className={`${Registers.grid_box} ${Registers.scroll} ${Registers.y_grid}`}>*/}
        {/*    <div className={`${Registers.grid_top} ${Registers.scroll}`}>*/}
        {/*        <table className={Registers.checkout_menue} id="session-menues">*/}
        {/*            <tbody>*/}
        {/*            <tr>*/}
        {/*                <th style={{textAlign: "center"}}>商品番号</th>*/}
        {/*                <th style={{textAlign: "left"}}>商品名</th>*/}
        {/*                <th>単価</th>*/}
        {/*                <th>個数</th>*/}
        {/*                <th>金額</th>*/}
        {/*                <th>削除</th>*/}
        {/*            </tr>*/}
        {/*            /!*{% for session_menue in session_menues %}*!/*/}
        {/*            /!*<form action="{{ url_for('delete_menue') }}" method="POST">*!/*/}
        {/*            /!*    <tr>*!/*/}
        {/*            /!*        <td style={{textAlign: "center"}}><input type="text" name="id" value="No . {{ session_menue.id }}" style={{width: "50px", color: "#6e6e6e"}}></input></td>*!/*/}
        {/*            /!*        /!*<td>{{ session_menue.menue_name }}</td>*!/*!/*/}
        {/*            /!*        /!*<td style="text-align: center;">{{ session_menue.value }}</td>*!/*!/*/}
        {/*            /!*        /!*<td style="text-align: center;">{{ session_menue.quantity }}個</td>*!/*!/*/}
        {/*            /!*        /!*<td style="text-align: center;">{{ session_menue.sum_value }}</td>*!/*!/*/}
        {/*            /!*        <td style={{textAlign: "center"}}><input type="submit" value="削除" className={Registers.input_border}></input></td>*!/*/}
        {/*            /!*    </tr>*!/*/}
        {/*            /!*</form>*!/*/}
        {/*            /!*{% endfor %}*!/*/}
        {/*            </tbody>*/}
        {/*        </table>*/}
        {/*    </div>*/}

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
        {/*</div>*/}
            </>
        </>
    )
}

function Orders({menus, orders}:{menus: MenuType, orders: OrderedMenu[]}){
    if (!orders) return null;

    return orders.map( ( item ) => {
        return (
            <OrderListButton key={item.id} menu_name={menus && menus[item.id] ? menus[item.id].menu_name : "missing"} {...item} />
        )
    })
}

function OrderListButton({id, menu_name, value, quantity, discount, sum}: {
        id: number,
        menu_name: string,
        value: number
        quantity: number,
        discount: number | null,
        sum: number,
    }) {

    return (
        <div className={Registers.item}>
            <form>
                <div style={{width:"10%"}}>
                    <span style={{margin:"auto"}}>No.
                    <input name="id" defaultValue={id} type="number" readOnly></input></span>
                </div>
                <div style={{width:"50%"}}>
                    <button name="name" value={menu_name} disabled>{ menu_name }</button>
                    {/*valueが表示内容になるinput要素を使いたかったが改行ができないのでこれだけbutton*/}
                </div>
                <div style={{width:"10%"}}>
                    <input name="value" value={ value } type="number" readOnly></input>
                </div>
                <div style={{width:"10%"}}>
                    <input name="quantity" value={ quantity } type="number" readOnly></input>
                </div>
                <div style={{width:"10%"}}>
                    <input name="sum" value={ sum } type="number" readOnly></input>
                </div>
                <div style={{width:"10%"}}><button value={id}  type="submit" className={Registers.input_border}>-</button></div>
            </form>
        </div>
    )

}
