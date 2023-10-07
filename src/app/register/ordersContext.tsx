import {createContext, Dispatch, SetStateAction} from "react";
import {OrderedMenu} from "@/app/register/itemTypes";

export const OrdersContext = createContext<OrderedMenu[]>([]);
export const SetOrdersContext = createContext<Dispatch<SetStateAction<OrderedMenu[]>>>(() => []);