import {Dispatch, memo, MouseEvent, SetStateAction} from "react";
import {useKitchenDisplaySockets} from "@/app/hooks/useKitchenDisplaySockets";
import {useCustomerDisplaySockets} from "@/app/hooks/useCustomerDisplaySockets";

export const CustomerDisplaySockets = memo(({apiUrl, setCurrentOrderId}: {
    apiUrl: string,
    setCurrentOrderId: Dispatch<SetStateAction<number[] | null>>,
}) => {
    useCustomerDisplaySockets(apiUrl, setCurrentOrderId);
    return (<></>)
})
CustomerDisplaySockets.displayName = "CustomerDisplaySockets"
// Compare this snippet from frontend/src/app/display/kitchen/KitchenDisplay.tsx: