"use client"
import React, {Dispatch, memo, MutableRefObject, SetStateAction, useEffect, useState} from "react";
import Registers from "@/app/register/css/register.module.css";
import {KitchenOrder, KitchenOrderItem} from "@/app/Types/itemTypes";

export const History = memo(({setHistoryRef, cancelOrder}: {setHistoryRef: MutableRefObject<Dispatch<SetStateAction<KitchenOrder[]>> | null>, cancelOrder: (orderUuid: string) => void}) => {
    const [status, setStatus] = useState(false);
    const [history, setHistory] = useState<KitchenOrder[]>([]);
    useEffect(() => {
         setHistoryRef.current = setHistory
    }, [setHistoryRef, setHistory]);

    return (
        <div className={Registers.historyContainer} style={
            status ? {right: 0} : {right: "-30vw"}
        } >
            <HistoryDrawerButton setStatus={setStatus} />
            <HistoryCard  history={history} cancelOrder={cancelOrder}/>
        </div>

    )
})
History.displayName = "History"

const HistoryDrawerButton = ({setStatus}: {setStatus: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <div className={Registers.historyButton}>
            <button onClick={() => setStatus(prevState => !prevState)}>履歴</button>
        </div>
    )
}

const HistoryCard = memo(({history, cancelOrder}: {history: KitchenOrder[], cancelOrder: (orderUuid: string) => void}) => {
    return (
        <div className={Registers.historyCardWrapper}>
            {history.map((order, index) => {
                return (
                    <div className={Registers.historyCard} key={index}>
                        <div className ={Registers.historyCardTop}>
                            <div style={{width: "50%"}}> 注文日時: {order.orderedAt}</div>
                            <div style={{width: "10%"}}> </div>
                            <div style={{width: "30%"}}> 合計金額: {order.sum}円</div>
                            <div style={{width: "10%"}}>
                                <button onClick={() => cancelOrder(order.uuid)}>取消</button>
                            </div>

                        </div>
                        <div className={Registers.historyCardBottom}>
                            <details>
                                <summary>詳細</summary>
                                {order.items.map((item, index) => {
                                    return (
                                        <div className={Registers.historyCardItem} key={index}>
                                            <div className={Registers.historyCardItemBase}>
                                                <div style={{width: "80%"}}> {item.menu_name}</div>
                                                <div style={{width: "20%", textAlign: "right"}}> {item.value}円</div>
                                            </div>
                                            <HistoryCardItemOptions item={item}/>
                                        </div>
                                    )
                                })}
                            </details>
                        </div>
                    </div>
                )
            })}
        </div>
    )
})
HistoryCard.displayName = "HistoryCard"

function HistoryCardItemOptions({item, optionType}: {item: KitchenOrderItem, optionType: string}) {
    if (item[optionType] == null) return null
    return (
        <div className={Registers.historyCardItemOptions}>
            {item[optionType].map(option => {
                return (
                    <div key={item.uuid} className={Registers.historyCardItemOption}>
                        <div style={{width: "80%"}} key={option.option_name}>{option.option_name}</div>
                        <div style={{width: "20%", textAlign:"right"}} key={option.value}>{option.value}円</div>
                    </div>
                )
            })}
        </div>
    )
}