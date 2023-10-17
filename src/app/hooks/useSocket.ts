import {Dispatch, SetStateAction, useMemo, useState} from "react";
import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";


const createSocket = (apiUrl: string, nameSpace: string, ): Socket<DefaultEventsMap, DefaultEventsMap> => {
    console.log("connect2")
    return io(apiUrl + nameSpace, {withCredentials: true});
}

// 極力useMemoを使って呼び出すように?

export const useSocket = (
    apiUrl: string,
    nameSpace: string,
    callbacks: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void
): WebHooksType => {

    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(useMemo(() => {
        console.log("connect1")
        const socket = createSocket(apiUrl, nameSpace);
        callbacks(socket);
        return socket;
    }, [apiUrl, nameSpace, callbacks]));

    return {
        socket,
        setSocket,
    }
}

export type WebHooksType = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    setSocket: Dispatch<SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap>>>,
}