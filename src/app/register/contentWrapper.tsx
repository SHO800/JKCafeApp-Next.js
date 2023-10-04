

import Registers from "@/app/register/register.module.css";
import {MenuList} from "@/app/register/menuList";
import OrderList from "@/app/register/orderList";
import {Dispatch, SetStateAction} from "react";
import {OrderedMenu} from "@/app/register/itemTypes";

export async function ContentWrapper({url}:{url:string}){
    const menus = await getMenus(url)

    return(
        <div className={Registers.container}>
            <MenuList menus={menus} />
            <OrderList />
        </div>
    )
}

async function getMenus(url: string){
    // APIからメニューを引っ張ってくる
    try {
        return await fetch(url)
            .then(res => res.json())
    }
    catch(err){
        console.log(err)
    }
}
