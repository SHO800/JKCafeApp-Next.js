"use client"
import Registers from "@/app/register/register.module.css";
import {MenuType, OrderedMenu} from "@/app/register/itemTypes";
import {useCallback, useContext, MouseEvent, FormEventHandler, FormEvent} from "react";
import {OrdersContext} from "@/app/register/ordersContext";

export function MenuList({menus}: {menus:MenuType}) {
    return (
        <div className={`${Registers.grid_box} ${Registers.table}`}>
            <div className={Registers.spacer}>
                <div className={Registers.index}>
                    <div style={{width:"10%"}}>商品番号</div>
                    <div style={{width:"60%"}}>商品名</div>
                    <div style={{width:"10%"}}>単価</div>
                    <div style={{width:"10%"}}>個数</div>
                    <div style={{width:"10%"}}>確定</div>
                </div>
                <div className={`${Registers.menuList} ${Registers.scroll}`}>
                    <Menus menus={menus}/>

                </div>
            </div>
        </div>
    )
}

// MenuListButtonのかたまりを返すだけのコンポーネント
function Menus({menus}: {menus:MenuType}){
    if (!menus) return null;
    const menuItems = Object.entries(menus)
    return menuItems.map( ( [id, data] ) => {
            return (
                <MenuListButton key={id} id={parseInt(id)} menu_name={data.menu_name} value={data.value}/>
            )
        })
}

// 左側のメニューのアイテム一つ一つの原型
function MenuListButton({id, menu_name, value}: {
        id: number,
        menu_name: string,
        value: number
    }){

    const setOrders = useContext(OrdersContext);
    // function handleClick(e){
    //     setOrders(prevState => [...prevState] + e.value)
    // }

    const handleSubmit = useCallback( (e: FormEvent<HTMLFormElement>)=>{
        if (setOrders == null) return;
        e.preventDefault()
        // const id = parseInt(e.);
        // const addData:OrderedMenu = {
        //     [id]:{
        //         quantity: e.currentTarget.elements.,
        //         value:,
        //         sum:,
        //         discount:,
        //     }
        // }

        // setOrders(prevState => {
        //     return prevState ? e.currentTarget.value + [...prevState] : [e.currentTarget.value];
        // })
        alert(e.currentTarget.elements["value"].value)
    }, [])


    return(
        <div className={Registers.item}>
            <form onSubmit={(event)=>handleSubmit(event)}>
                    <div style={{width:"10%"}}>
                        <span style={{margin:"auto"}}>No.
                        <input name="id" defaultValue={id} type="number" readOnly></input></span>
                    </div>
                    <div style={{width:"60%"}}>
                        <button name="name" value={menu_name} disabled>{ menu_name }</button>
                        {/*valueが表示内容になるinput要素を使いたかったが改行ができないのでこれだけbutton*/}
                    </div>
                    <div style={{width:"10%"}}>
                        <input name="value" value={ value } type="number" readOnly></input>
                    </div>
                    <div style={{width:"10%"}}>
                        <select name="quantity" className={Registers.input_border}>
                            <option value="1">１</option>
                            <option value="2">２</option>
                            <option value="3">３</option>
                            <option value="4">４</option>
                        </select>
                    </div>
                    <div style={{width:"10%"}}><button value={id}  type="submit" className={Registers.input_border}>+</button></div>
            </form>
        </div>
    )
}
