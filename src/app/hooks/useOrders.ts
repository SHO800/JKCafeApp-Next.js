import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {MenuData, OrderData, OrderItemDetail, ToppingData} from "@/app/Types/itemTypes";
import {WebHooksType} from "@/app/hooks/useSocket";

export const useOrders = (menus: MenuData, sendOrderData: (orderDetails: OrderItemDetail[]) => void, submit: (orderDetails: OrderItemDetail[]) => void): OrdersHooksType => {
    const [currentOrders, setCurrentOrders] = useState<OrderItemDetail[]>([])

    useEffect(() => {
        sendOrderData(currentOrders)
    }, [sendOrderData, currentOrders])

    const handleAddOrder = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const elements = e.currentTarget.elements;
        const id = parseInt((elements.namedItem("id") as HTMLInputElement).value);
        // const value = parseInt((elements.namedItem("value") as HTMLInputElement).value)
        setCurrentOrders(prevState => {
            const defaultData: OrderData = {
                id: id,
                quantity: 1,
                coupon: null,
                topping: null
            }
            const addData: OrderItemDetail = convertToOrderDetail(menus, defaultData);
            return [addData, ...prevState]; // もし上へと追加にしたければこれを逆に
        })

    }, [menus])

    const handleChangeBaseQuantity = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number) => {
        // quantityに与えられた数を個数のところに足します。もし結果が0以下になったり、0が与えられると削除します。
        const button = e.currentTarget as HTMLButtonElement;

        setCurrentOrders((prevState) => {
            const rvIndex = parseInt(button.value);
            const index = prevState.length - rvIndex - 1
            const newData: OrderItemDetail[] = arrayDeepCopy(prevState);
            const modifyData: OrderData = newData[index];
            // console.log(rvIndex)

            modifyData.quantity += quantity;
            if (quantity == 0) {
                newData.splice(index, 1);
            } else if (modifyData.quantity < 1) { // ここも適切に調整
                newData.splice(index, 1); // 0以下になったら削除する
                // return prevState; // 0以下になっても削除しない
            } else {
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
            const itemBaseIndex = prevState.length - itemBaseRvIndex - 1;
            const itemOptionName = button.value.slice(splitPosition + 1);

            const newData: OrderItemDetail[] = arrayDeepCopy(prevState);
            const modifyData: OrderData = newData[itemBaseIndex];
            const modifyToppingsData = modifyData.topping

            if (!(modifyToppingsData && modifyToppingsData[itemOptionName])) return prevState;
            modifyToppingsData[itemOptionName].quantity += quantity;
            if (modifyToppingsData[itemOptionName].quantity < 0) {
                return prevState;
            } else {
                newData[itemBaseIndex] = convertToOrderDetail(menus, modifyData);
            }

            return newData;
        })
    }, [menus])

    const handleChangeCouponQuantity = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, couponAmount: number) => {
        const button = e.currentTarget as HTMLButtonElement;

        setCurrentOrders((prevState) => {
            const splitPosition = button.value.indexOf(":");
            const itemBaseRvIndex = parseInt(button.value.slice(0, splitPosition));
            const itemBaseIndex = prevState.length - itemBaseRvIndex - 1;
            const itemOptionName = button.value.slice(splitPosition + 1);

            const newData: OrderItemDetail[] = arrayDeepCopy(prevState);
            const modifyData = newData[itemBaseIndex];
            const modifyCouponData = modifyData.coupon;
            if (!modifyCouponData) return prevState;

            if (!(modifyCouponData && modifyCouponData[itemOptionName])) return prevState;
            modifyCouponData[itemOptionName].quantity += couponAmount;
            if (modifyCouponData[itemOptionName].quantity < 0) {
                return prevState;
            } else {
                newData[itemBaseIndex] = convertToOrderDetail(menus, modifyData);
            }

            return newData;
        })

    }, [menus])

    const submitCheckout = useCallback(() => {
        submit(currentOrders)
        setCurrentOrders([])
    }, [submit, currentOrders])

    return {
        currentOrders,
        handleAddOrder,
        handleChangeBaseQuantity,
        handleChangeOptionQuantity,
        handleChangeCouponQuantity,
        submitCheckout: submitCheckout,
    }
}
export type OrdersHooksType = {
    currentOrders: OrderItemDetail[],
    handleAddOrder: (e: FormEvent<HTMLFormElement>) => void
    handleChangeBaseQuantity: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number) => void
    handleChangeOptionQuantity: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number) => void
    handleChangeCouponQuantity: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, couponAmount: number) => void

    submitCheckout: () => void
}

function arrayDeepCopy<T>(array: T[]): T[] {
    // ディープコピーするやつ
    return array.map(item => {
        return JSON.parse(JSON.stringify(item));
    });
}

function convertToOrderDetail(menuData: MenuData, orderData: OrderData): OrderItemDetail {
    const orderDetail: OrderItemDetail = {
        id: orderData.id,
        menu_name: menuData[orderData.id].menu_name,
        short_name: menuData[orderData.id].short_name,
        text: menuData[orderData.id].text,
        value: menuData[orderData.id].value,
        quantity: orderData.quantity,
        coupon: null,
        topping: null,
        sum: -1,
    }

    // 商品本体だけの合計を計算
    orderDetail.sum = orderDetail.value * orderDetail.quantity;

    // トッピングの移植
    const menuToppingData = menuData[orderData.id].topping
    if (menuToppingData) { // もしなにかtoppingをつけられる商品なら
        let topping: ToppingData = {}; // 一時的に移植するトッピングの内容を入れるやつを用意して
        Object.keys(menuToppingData).map((toppingName) => {// つけられるトッピングのキー(名前)を取り出して
            const orderToppingData = orderData.topping// 商品情報の方からトッピングデータ(値段のやつ)取り出して
            // 追加していく
            const quantity = orderToppingData ? orderToppingData[toppingName].quantity : 0;
            // const couponAmount = orderToppingData ? orderToppingData[toppingName].couponAmount : 0;
            const value = menuToppingData[toppingName]["value"];

            topping = {
                ...topping,
                [toppingName]: {
                    quantity: quantity,
                    // couponAmount: couponAmount,
                    value: value,
                }
            }
            // トッピングの値段をsumに反映
            orderDetail.sum += (quantity) * value * orderDetail.quantity;
        })
        if (Object.keys(topping).length > 0) orderDetail["topping"] = topping

    }
    const menuCouponData = menuData[orderData.id].coupon
    if (menuCouponData) {
        let coupon: { [name: string]: { quantity: number, value: number} } = {};
        Object.keys(menuCouponData).map((couponName) => {
            const orderCouponData = orderData.coupon// 商品情報の方からクーポンデータ取り出して
            // 追加していく
            const quantity = orderCouponData ? orderCouponData[couponName].quantity : 0;
            const value = menuCouponData[couponName]["value"] ;


            coupon = {
                ...coupon,
                [couponName]: {
                    quantity: quantity,
                    value: value,
                }
            }
            // クーポンの値段をsumに反映
            orderDetail.sum -= quantity * value * orderDetail.quantity;
        })

        if (Object.keys(coupon).length > 0) orderDetail["coupon"] = coupon
    }

    return orderDetail;
}


function convertToOrderData(input: OrderItemDetail | OrderItemDetail[]): OrderData[] {
    function convertToppingData(topping: ToppingData | undefined | null): { [name: string]: { quantity: number} } | null {
        if (topping === null || topping === undefined) {
            return null;
        }

        const toppingData: { [name: string]: { quantity: number}} = {};
        Object.keys(topping).forEach((toppingName) => {
            const quantity = topping[toppingName].quantity;
            // const couponAmount = topping[toppingName].couponAmount;

            toppingData[toppingName] = {
                quantity,
                // couponAmount,
            };
        })

        return toppingData;
    }

    if (Array.isArray(input)) {
        // 配列が渡された場合
        return input.map((orderDetail) => ({
            id: orderDetail.id,
            quantity: orderDetail.quantity,
            coupon: orderDetail.coupon,
            topping: convertToppingData(orderDetail.topping),
        }));
    } else {
        // 単一のオブジェクトが渡された場合でも、配列として返す
        return [{
            id: input.id,
            quantity: input.quantity,
            coupon: input.coupon,
            topping: convertToppingData(input.topping),
        }];
    }
}








