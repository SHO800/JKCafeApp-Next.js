import Registers from "@/app/register/css/register.module.css";

export default function OrderListIndex() {
    return (
        <div className={Registers.index}>
            <div style={{width: "15%"}}></div>
            <div style={{width: "10%"}}>商品名</div>
            <div style={{width: "65%"}}>クーポン / トッピング</div>
            <div style={{width: "10%"}}>小計</div>

        </div>
    )
}
