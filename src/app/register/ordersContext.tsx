import {createContext, FormEvent} from "react";
import {RegiHooksType} from "@/app/hooks/useRegiSockets";

// export const RegiSocketsContext = createContext<RegiHooksType>();
export const HandleAddOrderContext = createContext<(e: FormEvent<HTMLFormElement>) => void>(() => {});