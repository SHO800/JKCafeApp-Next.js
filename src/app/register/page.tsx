import {MenuData} from "@/app/Types/itemTypes";
import getMenus from "@/app/components/getMenus";
import {ContentWrapper} from "@/app/register/contentWrapper";
import {headers} from "next/headers";
import {getApiUrl} from "@/app/functions/getApiUrl";


export default async function Register() {
    const apiUrl = getApiUrl(headers())
    const menus: MenuData = await getMenus(apiUrl + "menus")

    return (
        <>
            <ContentWrapper menus={menus} apiUrl={apiUrl}/>
        </>
    )
}