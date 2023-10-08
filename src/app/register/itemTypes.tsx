export type MenuType = {
    [id: number]: {
        "menu_name": string
        "short_name": string
        "text": string
        "value": number
        "discount": number
    }
}

export type OrderedMenu = {
    "id": number,
    "quantity": number,
    "value": number,
    "discount": number | null,
    "sum": number,
}