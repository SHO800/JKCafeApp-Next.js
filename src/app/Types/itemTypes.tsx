export type MenuData = {
    [id: number]: {
        menu_name: string
        short_name: string
        text: string
        value: number
        coupon: null | {
            [name: string]: {
                quantity: number
                value: number
            }
        }
        topping: null | {
            [name: string]: {
                // プロパティ追加するかもなのでオブジェクトにしてる
                value: number
            }
        }
    }
}

// apiとかで少しでも非同期の付加を軽減するために使用 (これ要る?())
// 結局いらんかった
// 改修コスト馬鹿にならなそう きれそう
export type OrderData = {
    id: number
    quantity: number
    coupon: null | {
        [name: string]: {
            quantity: number
            value: number
        }
    }
    topping: null | {
        [name: string]: {
            quantity: number
            // couponAmount: number
        }
    }
}

export type OrderItemDetail = {
    id: number
    menu_name: string
    short_name: string
    text: string
    value: number
    quantity: number
    coupon: null | {
        [name: string]: {
            quantity: number
            value: number
        }
    }
    topping: null | ToppingData
    sum: number
}

export type ToppingData = {
    [name: string]: {
        value: number
        quantity: number
        // couponAmount: number
    }
}

export type KitchenOrder = {
    uuid: string
    orderedAt: string
    items: KitchenOrderItem[]
}

export type KitchenOrderItem = {
    uuid: string
    menu_id: number
    menu_name: string
    quantity: number
    option: KitchenOrderItemOption[]
}

export type KitchenOrderItemOption = {
    uuid: string
    option_name: string
    quantity: number
}