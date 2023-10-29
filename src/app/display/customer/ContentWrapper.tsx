"use client"
import {CustomerDisplaySockets} from "@/app/display/customer/CustomerDisplaySockets";
import {useState} from "react";
import BigTitle from "@/app/components/bigTItle/BigTitle";

export function ContentWrapper({apiUrl}: {apiUrl: string,}){
    const [currentOrderId, setCurrentOrderId] = useState<number[] | null>(null);

    // currentOrderIdの1番目の要素を除いた要素を,で繋いだ文字列にする
    const remainOrders = currentOrderId?.slice(1).join(", ");

    return (
        <>
            <br></br>
            <BigTitle />
            <div style={{
                height: "10vh",
                fontSize: "6rem",
                textAlign: "center",
                marginTop: "3rem",
            }}>
                次のオーダー
            </div>
            <div style={{
                height: "20vh",
                fontSize: "6rem",
                width: "80%",
                margin: "2rem auto 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 1px black",
                borderRadius: "1rem",
            }}>
                {(currentOrderId == null || currentOrderId.length < 1) ? "" : currentOrderId[0]}
            </div>

            <div style={{

            }}>
            <div style={{
                fontSize: "3rem",
                textAlign: "center",
                marginTop: "5rem",
            }}>
                調理中
            </div>

            <div style={{
                height: "20vh",
                fontSize: "3rem",
                width: "80%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 1px black",
                borderRadius: "1rem",
            }}>
                {currentOrderId && currentOrderId?.length > 0 ? remainOrders :  ""}
            </div>

            </div>
            <CustomerDisplaySockets apiUrl={apiUrl} setCurrentOrderId={setCurrentOrderId}/>
        </>
    )
}