import {Dispatch, SetStateAction} from "react";
import ConfirmPanels from "@/app/register/css/confirmPanel.module.css";
import {OrdersHooksType} from "@/app/hooks/useOrders";

export function ConfirmPanel({status, setStatus, sum, ordersHooks}: {
    status: boolean,
    setStatus: Dispatch<SetStateAction<boolean>>,
    sum: number,
    ordersHooks: OrdersHooksType
}) {
    if (status) return (
        <div onClick={() => closePanel(setStatus)} className={ConfirmPanels.background}>
            <Panel ordersHooks={ordersHooks} sum={sum} setStatus={setStatus}/>
        </div>
    )
}

function Panel({sum, ordersHooks, setStatus}: {
    sum: number,
    ordersHooks: OrdersHooksType,
    setStatus: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <div className={ConfirmPanels.panel}>
            <div className={ConfirmPanels.content}>
                <p>会計を確定しますか?</p>
                <p>※お支払いが完了してから押してください！</p>
            </div>
            <div className={ConfirmPanels.buttons}>
                <button onClick={() => closePanel(setStatus)} className={ConfirmPanels.cancel}>キャンセル</button>
                <button onClick={() => {
                    closePanel(setStatus);
                    ordersHooks.submitCheckout()
                }} className={ConfirmPanels.accept}>OK
                </button>
            </div>
        </div>
    )
}

function closePanel(setStatus: Dispatch<SetStateAction<boolean>>) {
    setStatus(false)
}