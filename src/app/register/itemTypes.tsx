export type MenuData = {
    [id: number]: {
        menu_name: string
        short_name: string
        text: string
        value: number
        topping: null | {
            [name: string]:{
                // プロパティ追加するかもなのでオブジェクトにしてる
                value: number
            }
        }
    }
}

// apiとかで少しでも非同期の付加を軽減するために使用 (これ要る?())
export type OrderData = {
    id: number
    quantity: number
    topping: null | {
        [name: string]: {
            quantity: number
            couponAmount: number
        }
    }
}

export type OrderDetail = {
    id: number
    menu_name: string
    short_name: string
    text: string
    value: number
    quantity: number
    topping: null | ToppingData
    sum: number
}

export type ToppingData = {
    [name: string]: {
        value: number
        quantity: number
        couponAmount: number
    }
}