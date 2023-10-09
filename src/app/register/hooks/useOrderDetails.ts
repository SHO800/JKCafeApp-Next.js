import {FormEvent, useCallback, useState} from "react";
import {MenuData, OrderData, OrderDetail, ToppingData} from "@/app/register/itemTypes";


const useOrderDetails = (menus: MenuData) => {
    // 必要なもの 注文の追加 追加されたものの数を変更
    const [currentOrders, setCurrentOrders] = useState<OrderDetail[]>([])

    const handleAddOrder = useCallback( (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        const elements = e.currentTarget.elements;
        const id = parseInt((elements.namedItem("id") as HTMLInputElement).value);
        // const value = parseInt((elements.namedItem("value") as HTMLInputElement).value)
        setCurrentOrders(prevState => {
            const prevItemIndex = prevState.findIndex(item => item.id == id);
            if (prevItemIndex > -1){ // すでに同じ商品が追加されていたなら
                // ディープコピーする
                const newData: OrderDetail[] = prevState.map(item => {
                    return JSON.parse(JSON.stringify(item));
                });

                const modifyData: OrderData = newData[prevItemIndex];
                modifyData.quantity += 1;
                newData[prevItemIndex] = convertToOrderDetail(menus, modifyData);

                return newData;
            }else{
                const defaultData: OrderData = {
                    id: id,
                    quantity: 1,
                    topping: null
                }
                const addData: OrderDetail = convertToOrderDetail(menus, defaultData);
                return [...prevState, addData];
            }
        })




        // setCurrentOrders(prevState => {
        //     const prevItemIndex = prevState.findIndex(item => item.id == id);
        //     if (prevItemIndex > -1){
        //         // ディープコピーする
        //         const newState = prevState.map(item => {
        //             return JSON.parse(JSON.stringify(item));
        //         });
        //
        //         // newState[prevItemIndex].discount = discount
        //         newState[prevItemIndex].quantity += quantity;
        //         newState[prevItemIndex].sum = newState[prevItemIndex].quantity * value;
        //
        //         if (newState[prevItemIndex].discount) newState[prevItemIndex].sum -= newState[prevItemIndex].discount * 50;
        //         return newState;
        //     } else {
        //         return prevState ? [...prevState, addData] : [addData];
        //     }
        // });
    }, [setCurrentOrders])

    return {currentOrders, handleAddOrder}

    // return [currentOrderDetails, {
    //     addOrder,
    //
    // }]
}

export default useOrderDetails;

function convertToOrderDetail(menuData: MenuData, orderData: OrderData): OrderDetail {
    const orderDetail: OrderDetail = {
        id: orderData.id,
        menu_name: menuData[orderData.id].menu_name,
        short_name: menuData[orderData.id].short_name,
        text: menuData[orderData.id].text,
        value: menuData[orderData.id].value,
        quantity: orderData.quantity,
        topping: null,
        sum: -1,
    }

    // 商品本体だけの合計を計算
    orderDetail.sum =  orderDetail.value * orderDetail.quantity;

    // トッピングの移植
    const menuToppingData = menuData[orderData.id].topping
    if (menuToppingData){ // もしなにかtoppingをつけられる商品なら
        let topping: ToppingData = {}; // 一時的に移植するトッピングの内容を入れるやつを用意して
        Object.keys(menuToppingData).map((toppingName)=>{// つけられるトッピングのキー(名前)を取り出して
            const orderToppingData = orderData.topping// 商品情報の方からトッピングデータ(値段のやつ)取り出して
            // 追加していく
            const quantity = orderToppingData ? orderToppingData[toppingName].quantity : 0;
            const couponAmount = orderToppingData ? orderToppingData[toppingName].couponAmount : 0;
            const value = menuToppingData[toppingName]["value"];

            topping = {
                ...topping,
                [toppingName]: {
                    quantity: quantity,
                    couponAmount: couponAmount,
                    value: value,
                }
            }
            // トッピングの値段をsumに反映
            orderDetail.sum += (quantity - couponAmount) * value;
        })
        if (Object.keys(topping).length > 0) orderDetail["topping"] = topping
    }

    return orderDetail;
}