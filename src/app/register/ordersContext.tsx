import {createContext, FormEvent} from "react";
import {OrderData} from "@/app/Types/itemTypes";

export const OrdersContext = createContext<OrderData[]>([]);
export const HandleAddOrderContext = createContext<(e: FormEvent<HTMLFormElement>) => void>(() => {
});