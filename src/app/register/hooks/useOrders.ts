import React, {FormEvent, useCallback, useState} from "react";
import {MenuData, OrderData, OrderDetail, ToppingData} from "@/app/register/itemTypes";

export const useOrders = (menus: MenuData) : OrdersHooksType => {
    // 必要なもの 注文の追加 追加されたものの数を変更
    const [currentOrders, setCurrentOrders] = useState<OrderDetail[]>([])
    const handleAddOrder = useCallback( (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        const elements = e.currentTarget.elements;
        const id = parseInt((elements.namedItem("id") as HTMLInputElement).value);
        // const value = parseInt((elements.namedItem("value") as HTMLInputElement).value)
        setCurrentOrders(prevState => {
            const defaultData: OrderData = {
                id: id,
                quantity: 1,
                topping: null
            }
            const addData: OrderDetail = convertToOrderDetail(menus, defaultData);
            return [addData, ...prevState]; // もし上へと追加にしたければこれを逆に
        })

    }, [menus])

    const handleChangeBaseQuantity = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number) => {
        // quantityに与えられた数を個数のところに足します。もし結果が0以下になったり、0が与えられると削除します。
        const button = e.currentTarget as HTMLButtonElement;

        setCurrentOrders((prevState) => {
            const rvIndex = parseInt(button.value);
            const index = prevState.length - rvIndex -1
            const newData: OrderDetail[] = arrayDeepCopy(prevState);
            const modifyData: OrderData = newData[index];
            console.log(rvIndex)

            modifyData.quantity += quantity;
            if(quantity == 0){
                newData.splice(index, 1);
            }else if(modifyData.quantity < 0){
              return prevState;
            } else{
                newData[index] = convertToOrderDetail(menus, modifyData);
            }

            return newData;
        })
    }, [menus])

    const handleChangeOptionQuantity = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number) => {
        const button = e.currentTarget as HTMLButtonElement;

        setCurrentOrders((prevState) => {
            const splitPosition = button.value.indexOf(":");
            const itemBaseRvIndex = parseInt(button.value.slice(0, splitPosition));
            const itemBaseIndex = prevState.length - itemBaseRvIndex -1;
            const itemOptionName = button.value.slice(splitPosition+1);

            const newData: OrderDetail[] = arrayDeepCopy(prevState);
            const modifyData: OrderData = newData[itemBaseIndex];
            const modifyToppingsData = modifyData.topping

            if (!(modifyToppingsData && modifyToppingsData[itemOptionName])) return prevState;
            modifyToppingsData[itemOptionName].quantity += quantity;
            if(modifyToppingsData[itemOptionName].quantity < 0){
                return prevState;
            }else{
                newData[itemBaseIndex] = convertToOrderDetail(menus, modifyData);
            }

            return newData;
        })
    }, [menus])

    return {
        currentOrders,
        handleAddOrder,
        handleChangeBaseQuantity,
        handleChangeOptionQuantity,
    }
}
export type OrdersHooksType = {
    currentOrders: OrderDetail[],
    handleAddOrder: (e: FormEvent<HTMLFormElement>) => void
    handleChangeBaseQuantity: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number) => void
    handleChangeOptionQuantity: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number) => void
}

function arrayDeepCopy<T>(array: T[]): T[]  {
    // ディープコピーするやつ
    return array.map(item => {
        return JSON.parse(JSON.stringify(item));
    });
}

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