import Customers from "@/app/display/customer/css/customer.module.css";
import {ContentWrapper} from "@/app/display/customer/ContentWrapper";
import {getApiUrl} from "@/app/functions/getApiUrl";
import {headers} from "next/headers";


const KitchenDisplay = () => {
    const apiUrl = getApiUrl(headers());

    return (
        <div className={Customers.contentWrapper}>
            <ContentWrapper apiUrl={apiUrl}/>
        </div>
    )
}

export default KitchenDisplay