"use client"
import Registers from "@/app/register/css/register.module.css";
import MenuLists from "@/app/register/css/menuList.module.css"
import {MenuData} from "@/app/Types/itemTypes";
import {memo, useContext} from "react";
import {HandleAddOrderContext} from "@/app/register/ordersContext";

function MenuListIndex() {
    return (
        <div className={Registers.index}>
            <div style={{width: "15%"}}>商品番号</div>
            <div style={{width: "70%"}}>商品名</div>
            <div style={{width: "15%"}}>単価</div>
        </div>
    )
}

export const MenuList = memo(function ({menus}: { menus: MenuData }) {
    return (
        <div className={`${Registers.grid_box} ${Registers.table}`}>
            <div className={MenuLists.spacer}>
                <MenuListIndex/>
                <div className={`${MenuLists.menuList} ${Registers.scroll}`}>
                    <Menus menus={menus}/>
                </div>
            </div>
        </div>
    )
})
MenuList.displayName = "MenuList"

// MenuListButtonのかたまりを返すだけのコンポーネント
function Menus({menus}: { menus: MenuData }) {
    if (!menus) return null;
    const menuItems = Object.entries(menus)
    return menuItems.map(([id, data]) => {
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
}) {
    const handleAddOrder = useContext(HandleAddOrderContext);

    return (
        <div className={MenuLists.item}>
            <form onSubmit={(event) => handleAddOrder(event)}>
                <div style={{width: "15%"}}>
                    <span style={{margin: "auto"}}>No.
                    <input name="id" defaultValue={id} type="number" readOnly></input></span>
                </div>
                <div style={{width: "70%"}}>
                    <button name="name" value={menu_name} disabled>{menu_name}</button>
                    {/*value属性が表示内容になるinput要素を使いたかったが改行ができないのでこれだけbutton*/}
                </div>
                <div style={{width: "15%"}}>
                    <input name="value" value={value} type="number" readOnly></input>
                </div>
                <button type="submit"></button>
            </form>
        </div>
    )
}
