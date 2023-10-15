import {ContentWrapper} from "@/app/register/contentWrapper";
import {MenuData} from "@/app/register/itemTypes";
import getMenus from "@/app/components/getMenus";
import {headers} from "next/headers";


const headersList = headers();
const hostAndPort = headersList.get('Host');
const host =  hostAndPort?.slice(0, hostAndPort?.indexOf(":"));
const apiUrl: string = "http://" + (host == "localhost" ? "127.0.0.1" : host) + ":5000/"

export default async function Register() {
    // サーバーから、レジとディスプレイに対応させるためのwebsocketのルーム番号を持って来るまで待つ。ディスプレイ側は、専用の画面を表示するかurlでそのidを入力してpythonで一緒のルームに入れ、変更が起こるたびにwebsocketで送信する。
    const menus: MenuData = await getMenus(apiUrl + "menus")
    return (
        <>
            <ContentWrapper menus={menus} apiUrl={apiUrl}/>
        </>
    )
}