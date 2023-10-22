import Kitchens from "@/app/display/kitchen/css/kitchen.module.css";
import {ContentWrapper} from "@/app/display/kitchen/ContentWrapper";
import {getApiUrl} from "@/app/functions/getApiUrl";
import {headers} from "next/headers";


const KitchenDisplay = () => {
    const apiUrl = getApiUrl(headers());

    return (
        <div className={Kitchens.contentWrapper}>
            <ContentWrapper apiUrl={apiUrl}/>
        </div>
    )
}

export default KitchenDisplay