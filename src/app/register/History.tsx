import {RegiHooksType} from "@/app/hooks/useRegiSockets";
import React, {useState} from "react";
import Registers from "@/app/register/css/register.module.css";
import {KitchenOrder} from "@/app/Types/itemTypes";

export function History ({history}: {history: KitchenOrder[]}) {
    const [status, setStatus] = useState(false);
    console.log(history)
    return (
        <div className={Registers.historyContainer} style={
            status ? {right: 0} : {right: "-30vw"}
        } >
            <div className={Registers.historyButton}>
                <button onClick={() => setStatus(prevState => !prevState)}>履歴</button>
            </div>
            <HistoryCard  history={history}/>

        </div>

    )
}

function HistoryCard ({history}: {history: KitchenOrder[]}) {
    return (
        <div className={Registers.historyCardWrapper}>
            {history.map((order, index) => {
                return (
                    <div className={Registers.historyCard} key={index}>
                        <div className ={Registers.historyCardTop}>
                            <div style={{width: "50%"}}> 注文日時: {order.orderedAt}</div>
                            <div style={{width: "25%"}}> c</div>
                            <div style={{width: "25%"}}> d</div>
                        </div>
                        <div className={Registers.historyCardBottom}>
                            <div style={{width: "25%"}}> e</div>
                            <div style={{width: "25%"}}> f</div>
                            <div style={{width: "25%"}}> g</div>
                            <div style={{width: "25%"}}> h</div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}