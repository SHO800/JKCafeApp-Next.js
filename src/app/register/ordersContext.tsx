import {createContext, Dispatch, SetStateAction} from "react";
import {OrderedMenu} from "@/app/register/itemTypes";

export const OrdersContext = createContext<Dispatch<SetStateAction<OrderedMenu[] | null>> | null>(null);