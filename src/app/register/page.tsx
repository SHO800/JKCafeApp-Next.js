import {ContentWrapper} from "@/app/register/contentWrapper";
import {MenuData} from "@/app/register/itemTypes";


const apiUrl:string = "http://127.0.0.1:5000/menus";

export default async function Register() {
    const menus: MenuData = await getMenus(apiUrl)
    return (
        <>
            <ContentWrapper menus={menus}/>

            {/*<Script*/}
            {/*    strategy="lazyOnload"*/}
            {/*    src="../components/./sumValues"*/}
            {/*/>*/}
        </>
    )
}

async function getMenus(url: string){
    // APIからメニューを引っ張ってくる
    try {
        return await fetch(url, {cache: "no-cache"})
            .then(res => res.json())
    }
    catch(err){
        console.log(err)
    }
}