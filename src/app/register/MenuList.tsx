"use client"

import Registers from "@/app/register/register.module.css";
import { MenuType } from "@/app/register/ItemTypes";

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
                <MenuListButton key={id} id={parseInt(id)} menu_name={data.short_name} value={data.value} />
            )
        })
}

// 左側のメニューのアイテム一つ一つの原型
function MenuListButton({id, menu_name, value}: {
        id: number,
        menu_name: string,
        value: number
    }){
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
                {/*<td style={{textAlign: "center"}}><button value={props.id} type="button" onClick={(event) => alert(menus[parseInt(event.currentTarget.value)])} className={Registers.input_border}>+</button></td>*/}
            </tr>
        </>
    )
}
