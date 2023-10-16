import {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";
import {getApiUrl} from "@/app/functions/getApiUrl";


const createSocket = (apiUrl: string, nameSpace: string): Socket<DefaultEventsMap, DefaultEventsMap> => {
    return io(apiUrl + nameSpace, {withCredentials: true});
}

// 極力useMemoを使って呼び出すように?

export const useSocket = (apiUrl: string, nameSpace: string): WebHooksType => {
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(useMemo(() => {
        return createSocket(apiUrl, nameSpace)
    }, [nameSpace, apiUrl]));
    return {
        socket,
        setSocket,
    }
}

export type WebHooksType = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setSocket: Dispatch<SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap>>>,
}