import {Dispatch, SetStateAction, useMemo, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";


const createSocket = (apiUrl: string, nameSpace: string, ): Socket<DefaultEventsMap, DefaultEventsMap> => {
    return io(apiUrl + nameSpace, {withCredentials: true});
}

// 極力useMemoを使って呼び出すように?

export const useSocket = (
    apiUrl: string,
    nameSpace: string,
    callbacks: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void
): WebHooksType => {
    const socketRef = useRef(() => {
        const socket = createSocket(apiUrl, nameSpace);
        callbacks(socket);
        return socket;
    })
    // const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const socket = socketRef.current()

    return {
        socket,
    }
}

export type WebHooksType = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
}