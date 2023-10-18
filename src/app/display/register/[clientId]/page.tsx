import {ContentWrapper} from "@/app/display/register/[clientId]/ContentWrapper";
import {headers} from "next/headers";
import {getApiUrl} from "@/app/functions/getApiUrl";


export default async function RegisterDisplay({params}: { params: { clientId: number } }) {
    const apiUrl = getApiUrl(headers());

    return (
        <>
            <ContentWrapper apiUrl={apiUrl} clientId={params.clientId}/>
        </>
    )
}