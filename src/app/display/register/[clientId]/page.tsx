import {MenuData} from "@/app/register/itemTypes";
import getMenus from "@/app/components/getMenus";
import {ContentWrapper} from "@/app/display/register/[clientId]/contentWrapper";
import {headers} from "next/headers";


export default async function RegisterDisplay({params}: {params: {clientId: number}}) {
    const headersList = headers();
    const hostAndPort = headersList.get('Host');
    if (!hostAndPort) return null
    const host =  hostAndPort.slice(0, hostAndPort.indexOf(":"));
    const apiUrl: string = "http://" + (host == "localhost" ? "127.0.0.1" : host) + ":5000/";

    const menus: MenuData = await getMenus(apiUrl + "menus")

    return (
        <>
            <ContentWrapper menus={menus} apiUrl={apiUrl} clientId={params.clientId} />
        </>
    )
}