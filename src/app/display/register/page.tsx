import Registers from './register.module.css'

const RegisterDisplay = () => {
    return (
        <>
            <div className={`${Registers.scroll} ${Registers.y_grid}`}>
                <div className={`${Registers.grid_top} ${Registers.scroll}`}>
                    <table className={Registers.checkout_menue} id={Registers.session_menues}>
                        <tbody>
                        <tr>
                            <th style={{textAlign: "left"}}>商品名</th>
                            <th>単価</th>
                            <th>個数</th>
                            <th>金額</th>
                        </tr>
                        {/*{% for session_menue in session_menues %}*/}
                        {/*<form action="{{ url_for('delete_menue') }}" method="POST">*/}
                        {/*    <tr>*/}
                        {/*        <td style="text-align: center;"><input type="text" name="id" value="No . {{ session_menue.id }}" style="width: 50px; color:#6e6e6e;"></td>*/}
                        {/*        <td>{{session_menue.menue_name}}</td>*/}
                        {/*        <td style="text-align: center;">{{session_menue.value}}</td>*/}
                        {/*        <td style="text-align: center;">{{session_menue.quantity}}個</td>*/}
                        {/*        <td style="text-align: center;">{{session_menue.sum_value}}</td>*/}
                        {/*        <td style="text-align: center;"><input type="submit" value="削除" className={Registers.input_border}></td>*/}
                        {/*    </tr>*/}
                        {/*</form>*/}
                        {/*{% endfor %}*/}
                        </tbody>
                    </table>
                </div>

                <div className={Registers.grid_bottom} style={{position: "fixed", bottom: "5rem", width: "100%", left: 0}}>
                    <div className={Registers.checkout} style={{margin: "auto", width: "90%"}}>
                        <div style={{display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                            <p>合計</p>
                            <p style={{paddingRight: "50px", fontSize: "2rem"}} id="sum-value"> - </p>
                        </div>
                        <div style={{borderBottom: "solid 5px #bdbdbd"}}></div>
                    </div>
                </div>
            </div>

            {/*<div className="scroll y-grid">*/}
            {/*    <div className="grid-top scroll">*/}
            {/*        <table className="checkout-menue" id="session-menues">*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <th style="text-align: left;">商品名</th>*/}
            {/*                <th>単価</th>*/}
            {/*                <th>個数</th>*/}
            {/*                <th>金額</th>*/}
            {/*            </tr>*/}
            {/*            {% for session_menue in session_menues %}*/}
            {/*            <form action="{{ url_for('delete_menue') }}" method="POST">*/}
            {/*                <tr>*/}
            {/*                    {#                <td style="text-align: center;"><input type="text" name="id" value="No . {{ session_menue.id }}" style="width: 50px; color:#6e6e6e;"></td>#}*/}
            {/*                    <td>{{session_menue.menue_name}}</td>*/}
            {/*                    <td style="text-align: center;">{{session_menue.value}}</td>*/}
            {/*                    <td style="text-align: center;">{{session_menue.quantity}}個</td>*/}
            {/*                    <td style="text-align: center;">{{session_menue.sum_value}}</td>*/}
            {/*                    {#                <td style="text-align: center;"><input type="submit" value="削除" class="input-border"></td>#}*/}
            {/*                </tr>*/}
            {/*            </form>*/}
            {/*            {% endfor %}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}

            {/*    <div className="grid-bottom" style="position: fixed; bottom: 5rem; width: 100%; left: 0">*/}
            {/*        <div className="checkout" style="margin: auto;  width: 90%">*/}
            {/*            <div style="display: flex; align-items: end; justify-content: space-between">*/}
            {/*                <p>合計</p>*/}
            {/*                <p style="padding-right: 50px; font-size: 2rem;" id="sum-value"> - </p>*/}
            {/*            </div>*/}
            {/*            <div style="border-bottom: solid 5px #bdbdbd;"></div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default RegisterDisplay