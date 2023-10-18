 export default function OrderSum({sum, fontSize}: { sum: number, fontSize: string}) {
    return (
        <>
            <div style={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                <p>合計</p>
                <p style={{paddingRight: "50px", fontSize: fontSize}} id="sum-value"> {sum}円 </p>
            </div>
            <div style={{borderBottom: "solid 5px #bdbdbd"}}></div>
        </>
    )
}