import {createContext, Dispatch, FormEvent, SetStateAction} from "react";
import {OrderData} from "@/app/register/itemTypes";

export const OrdersContext = createContext<OrderData[]>([]);
export const HandleAddOrderContext = createContext<(e: FormEvent<HTMLFormElement>) => void>(() => {});