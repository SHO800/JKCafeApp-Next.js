"use client"
import Registers from "@/app/register/register.module.css";
import {MenuType, OrderedMenu} from "@/app/register/itemTypes";
import {useCallback, useContext, MouseEvent} from "react";
import {OrdersContext} from "@/app/register/ordersContext";

export function MenuList({menus}: {menus:MenuType}) {
    return (
        <div className={`${Registers.grid_box} ${Registers.scroll}`}>
            <table>
                <tbody>
                <tr>
                    <th>商品番号</th>
                    <th style={{textAlign: "left"}}>商品名</th>
                    <th>単価</th>
                    <th>個数</th>
                    <th style={{textAlign: "center"}}>確定</th>
                </tr>

                <Menus menus={menus}/>

                </tbody>
            </table>
        </div>
    )
}

// MenuListButtonのかたまりを返すだけのコンポーネント
function Menus({menus}: {menus:MenuType}){
    if (!menus) return null;
    const menuItems = Object.entries(menus)
    return menuItems.map( ( [id, data] ) => {
            return (
                <MenuListButton key={id} id={parseInt(id)} menu_name={data.menu_name} value={data.value} />
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

    const handleClick = useCallback( (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)=>{
        if (setOrders == null) return;
        const id = parseInt(e.currentTarget.value);
        const addData:OrderedMenu = {
            [id]:{
                quantity:,
                value:,
                sum:,
                discount:,
            }
        }

        setOrders(prevState => {
            return prevState ? e.currentTarget.value + [...prevState] : [e.currentTarget.value];
        })
        alert(e.currentTarget.value)
    }, [])


    return(
        <>
            <tr>
                <td style={{textAlign: "center"}}><input type="text" name="id" defaultValue={`No. ${ id }`} style={{width: 50, color: "#6e6e6e"}}></input></td>
                <td>{ menu_name }</td>
                <td style={{textAlign: "center"}}>{ value }</td>
                <td style={{textAlign: "center"}}>
                    <select name="quantity" className={Registers.input_border}>
                        <option value="1">１</option>
                        <option value="2">２</option>
                        <option value="3">３</option>
                        <option value="4">４</option>
                    </select>
                </td>
                {/* onclickの先の処理を書く */}
                <td style={{textAlign: "center"}}><button value={id} onClick={(event) => handleClick(event)} type="button" className={Registers.input_border}>+</button></td>
            </tr>
        </>
    )
}
