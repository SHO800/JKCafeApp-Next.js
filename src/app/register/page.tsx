import {MenuData} from "@/app/Types/itemTypes";
import getMenus from "@/app/functions/getMenus";
import {RegisterSocketsWrapper} from "@/app/register/registerSocketsWrapper";
import {headers} from "next/headers";
import {getApiUrl} from "@/app/functions/getApiUrl";
import getClientId from "@/app/functions/getClientId";


export default async function Register() {
    // api叩いたりするのはここでやる
    const apiUrl = getApiUrl(headers())
    const menus: MenuData = await getMenus(apiUrl + "menus")
    const clientId: number = await getClientId(apiUrl + "getClientId")
    console.log(clientId)
    console.log("regi")

    return (
        <>
            <RegisterSocketsWrapper menus={menus} apiUrl={apiUrl} clientId={clientId}/>
        </>
    )
}