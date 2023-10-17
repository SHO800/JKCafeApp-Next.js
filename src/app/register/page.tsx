import {MenuData} from "@/app/Types/itemTypes";
import getMenus from "@/app/components/getMenus";
import {RegisterSocketsWrapper} from "@/app/register/registerSocketsWrapper";
import {headers} from "next/headers";
import {getApiUrl} from "@/app/functions/getApiUrl";


export default async function Register() {
    // api叩いたりするのはここでやる
    const apiUrl = getApiUrl(headers())
    const menus: MenuData = await getMenus(apiUrl + "menus")
    console.log("regi")

    return (
        <>
            <RegisterSocketsWrapper menus={menus} apiUrl={apiUrl}/>
        </>
    )
}