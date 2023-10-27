"use client"
import React, {Dispatch, memo, MutableRefObject, SetStateAction, useEffect, useState} from "react";
import Registers from "@/app/register/css/register.module.css";
import {KitchenOrder, KitchenOrderItem} from "@/app/Types/itemTypes";
import {ConfirmPanel} from "@/app/components/ConfirmPanel";

export const History = memo(({setHistoryRef, cancelOrder}: {
    setHistoryRef: MutableRefObject<Dispatch<SetStateAction<KitchenOrder[]>> | null>,
    cancelOrder: (orderUuid: string) => void
}) => {
    const [status, setStatus] = useState(false);
    const [history, setHistory] = useState<KitchenOrder[]>([]);
    useEffect(() => {
        setHistoryRef.current = setHistory
    }, [setHistoryRef, setHistory]);

    return (
        <div className={Registers.historyContainer} style={
            status ? {right: 0} : {right: "-30vw"}
        }>
            <HistoryDrawerButton setStatus={setStatus}/>
            <HistoryCard history={history} cancelOrder={cancelOrder}/>
        </div>

    )
})
History.displayName = "History"

const HistoryDrawerButton = ({setStatus}: { setStatus: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className={Registers.historyButton}>
            <button onClick={() => setStatus(prevState => !prevState)}>履歴</button>
        </div>
    )
}

const HistoryCard = memo(({history, cancelOrder}: {
    history: KitchenOrder[],
    cancelOrder: (orderUuid: string) => void
}) => {

    return (
        <div className={Registers.historyCardWrapper}>
            {history.map((order, index) => {
                let statusText = "";
                let statusColor = "";
                switch (order.status) {
                    case 0:
                        statusText = "未提供";
                        statusColor = "red";
                        break;
                    case 1:
                        statusText = "提供済";
                        statusColor = "green";
                        break;
                    case 2:
                        statusText = "キャンセル済";
                        statusColor = "gray";
                        break;
                }
                return (
                    <div className={Registers.historyCard} key={index} style={{border: `${statusColor} solid 3px`}}>
                        <div className={Registers.historyCardTop}>
                            <div style={{width: "50%"}}> 注文日時: {order.orderedAt}</div>
                            <div style={{width: "10%"}}></div>
                            <div style={{width: "30%"}}> 合計金額: {order.sum}円</div>
                            <div style={{width: "10%"}}>
                                <CancelButton orderedAt={order.orderedAt} sum={order.sum} callback={() => cancelOrder(order.uuid)} />
                            </div>

                        </div>
                        <div className={Registers.historyCardBottom}>
                            <details>
                                <summary className={Registers.input_border} style={{width: "100%", display: "flex"}}>
                                    <p>詳細</p>
                                    <p style={{margin: "0 3rem 0 auto"}}>{statusText}</p>
                                </summary>
                                {order.items.map((item, index) => {
                                    return (
                                        <div className={Registers.historyCardItem} key={index}>
                                            <div className={Registers.historyCardItemBase}>
                                                <div style={{width: "80%"}}> {item.menu_name}</div>
                                                <div style={{width: "20%", textAlign: "right"}}> {item.value}円</div>
                                            </div>
                                            <HistoryCardItemOptions item={item} optionType={"option"}/>
                                            <HistoryCardItemOptions item={item} optionType={"coupon"}/>
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

function CancelButton({orderedAt, sum, callback}: { orderedAt: string, sum: number, callback: () => void}) {
    const [status, setStatus] = useState(false);
    return (
        <>
            <button className={Registers.input_border} onClick={() => setStatus(true)}>取消</button>
            <ConfirmPanel status={status} setStatus={setStatus} callback={callback}>
                <p style={{fontSize: "1.1rem"}}>次の注文を取り消しますか?</p>
                <p>注文日時: {orderedAt}</p>
                <p>合計金額: {sum}円</p>
                <p style={{fontSize: "0.9rem"}}>※取消後は元に戻せません！ また提供済であってもキャンセル状態になります！</p>
            </ConfirmPanel>
        </>
    )
}

function HistoryCardItemOptions({item, optionType}: { item: KitchenOrderItem, optionType: "coupon" | "option" }) {
    if (optionType == "coupon") return (
        item.coupon.length > 0 ?
            <div className={Registers.historyCardItemOptions}>
                {item.coupon.map(coupon => {
                    return (
                        coupon ?
                            <div key={item.uuid} className={Registers.historyCardItemOption}>
                                <div style={{width: "80%"}} key={coupon.coupon_name}>- {coupon.coupon_name}</div>
                                <div style={{width: "20%", textAlign: "right"}} key={coupon.value}>- {coupon.value}円
                                </div>
                            </div> : null
                    )
                })}
            </div> : null
    )
    return (
        item.option.length > 0 ?
            <div className={Registers.historyCardItemOptions}>
                {item.option.map(option => {
                    return (
                        <div key={item.uuid} className={Registers.historyCardItemOption}>
                            <div style={{width: "80%"}} key={option.option_name}>+ {option.option_name}</div>
                            <div style={{width: "20%", textAlign: "right"}} key={option.value}>+ {option.value}円</div>
                        </div>
                    )
                })}
            </div> : null
    )
}