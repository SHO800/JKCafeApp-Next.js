"use client"
import {useEffect, useState} from "react";
import Registers from './register.module.css'

import Script from 'next/script'
import {id} from "postcss-selector-parser";

const Register = () => {
    type Menus = {
        [id: number]: {
            "menu_name": string
            "short_name": string
            "text": string
            "value": number
            "discount": number
        }
    }
    type OrderedMenu = {
        [id: number]: {
            "quantity": number,
            "value": number,
            "discount": number | null,
            "sum": number,
        }
    }

    const [menus, setMenus] = useState<Menus | null>(null);

    // 初回ロード時のみ実行される
    useEffect(()=>{
        getMenu()
    }, [])

    const apiUrl = "http://localhost:5000/menus";

    // APIからメニューを引っ張ってくる
    async function getMenu(){
        try {
            const res = await fetch(apiUrl)
                .then(res => res.text())
                .then(menu => {
                    setMenus(JSON.parse(menu)
                })
        }catch(err){
            alert(err)
            // console.log(err)
        }
    }

    return (
        <>
             {/* 左側のメニュー一覧 */}
             <div className={Registers.container}>
                 <div className={`${Registers.grid_box} ${Registers.scroll}`}>
                     <table>
                         <tbody>
                         <tr>
                             <th>商品番号</th>
                             <th style={{textAlign: "left"}}>商品名</th>
                             <th>単価</th>
                             <th>個数</th>
                             <th style={{textAlign: "center"}}>確定</th>
                         </tr>

                         {menus && Object.entries(menus).map(([id, data]) => {
                            return(
                                <>
                                <tr key={id}>
                                    <form action={apiUrl} method="POST"></form>
                                        <td style={{textAlign: "center"}}><input type="text" name="id" value={`No. ${ id }`} style={{width: 50, color: "#6e6e6e"}}></input></td>
                                        <td>{ data.menu_name }</td>
                                        <td style={{textAlign: "center"}}>{ data.value }</td>
                                        <td style={{textAlign: "center"}}>
                                            <select name="quantity" className={Registers.input_border}>
                                                <option value="1">１</option>
                                                <option value="2">２</option>
                                                <option value="3">３</option>
                                                <option value="4">４</option>
                                            </select>
                                        </td>
                                    {/* onclickの先の処理を書く */}
                                        <td style={{textAlign: "center"}}><button value={id} type="button" onClick={(event) => alert(menus[parseInt(event.currentTarget.value)])} className={Registers.input_border}>+</button></td>
                                </tr>
                                </>
                            )
                         })}

                         </tbody>
                     </table>
                 </div>

                 {/*{#        右側のリスト#}*/}
                     <div className={`${Registers.grid_box} ${Registers.scroll} ${Registers.y_grid}`}>
                     <div className={`${Registers.grid_top} ${Registers.scroll}`}>
                         <table className={Registers.checkout_menue} id="session-menues">
                             <tbody>
                             <tr>
                                 <th style={{textAlign: "center"}}>商品番号</th>
                                 <th style={{textAlign: "left"}}>商品名</th>
                                 <th>単価</th>
                                 <th>個数</th>
                                 <th>金額</th>
                                 <th>削除</th>
                             </tr>
                             {/*{% for session_menue in session_menues %}*/}
                             {/*<form action="{{ url_for('delete_menue') }}" method="POST">*/}
                             {/*    <tr>*/}
                             {/*        <td style={{textAlign: "center"}}><input type="text" name="id" value="No . {{ session_menue.id }}" style={{width: "50px", color: "#6e6e6e"}}></input></td>*/}
                             {/*        /!*<td>{{ session_menue.menue_name }}</td>*!/*/}
                             {/*        /!*<td style="text-align: center;">{{ session_menue.value }}</td>*!/*/}
                             {/*        /!*<td style="text-align: center;">{{ session_menue.quantity }}個</td>*!/*/}
                             {/*        /!*<td style="text-align: center;">{{ session_menue.sum_value }}</td>*!/*/}
                             {/*        <td style={{textAlign: "center"}}><input type="submit" value="削除" className={Registers.input_border}></input></td>*/}
                             {/*    </tr>*/}
                             {/*</form>*/}
                             {/*{% endfor %}*/}
                             </tbody>
                         </table>
                     </div>

                     <div className={Registers.grid_bottom} style={{marginTop: "50px"}}>
                         <div className={Registers.checkout}>
                             <div style={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                                 <p>合計</p>
                                 <p style={{paddingRight: "50px", fontSize: "2rem"}} id="sum-value"> - </p>
                             </div>
                             <div style={{borderBottom: "solid 5px #bdbdbd"}}></div>
                             <form action="{{ url_for('checkout_submit') }}" method="POST">
                                 <button type="submit" name="" id="checkout-submit" value="支払い完了"></button>
                             </form>
                         </div>
                     </div>
                 </div>
             </div>

            {/*<Script*/}
            {/*    strategy="lazyOnload"*/}
            {/*    src="../components/./sumValues"*/}
            {/*/>*/}
        </>
    )
}

export default Register
