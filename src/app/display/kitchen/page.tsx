import {ContentWrapper} from "@/app/display/kitchen/ContentWrapper";
import {getApiUrl} from "@/app/functions/getApiUrl";
import {headers} from "next/headers";


const KitchenDisplay = () => {
    const apiUrl = getApiUrl(headers());

    return (
        <>
            <ContentWrapper apiUrl={apiUrl}/>
        </>
    )
}

export default KitchenDisplay