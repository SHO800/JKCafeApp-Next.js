import {Dispatch, ReactNode, SetStateAction} from "react";
import ConfirmPanels from "@/app/components/confirmPanel.module.css";

export function ConfirmPanel({status, setStatus, callback, children}: {
    status: boolean,
    setStatus: Dispatch<SetStateAction<boolean>>,
    callback: () => void,
    children: ReactNode,
}) {
    if (status) return (
        <div onClick={() => closePanel(setStatus)} className={ConfirmPanels.background} style={{zIndex: 100000}}>
            <Panel callback={callback} setStatus={setStatus}>
                {children}
            </Panel>
        </div>
    )
}

function Panel({setStatus, callback, children}: {
    setStatus: Dispatch<SetStateAction<boolean>>,
    callback: () => void,
    children: ReactNode,
}) {
    return (
        <div className={ConfirmPanels.panel}>
            <div className={ConfirmPanels.content}>
                {children}
            </div>
            <div className={ConfirmPanels.buttons}>
                <button onClick={() => closePanel(setStatus)} className={ConfirmPanels.cancel}>キャンセル</button>
                <button onClick={() => {
                    closePanel(setStatus);
                    callback();
                }} className={ConfirmPanels.accept}>OK
                </button>
            </div>
        </div>
    )
}

function closePanel(setStatus: Dispatch<SetStateAction<boolean>>) {
    setStatus(false)
}