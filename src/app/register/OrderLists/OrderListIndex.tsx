import Registers from "@/app/register/css/register.module.css";

export default function OrderListIndex() {
    return (
        <div className={Registers.index}>
            <div style={{width: "40%"}}>商品名</div>
            <div style={{width: "10%"}}>単価</div>
            <div style={{width: "40%"}}>個数</div>
            <div style={{width: "10%"}}>小計</div>
        </div>
    )
}
