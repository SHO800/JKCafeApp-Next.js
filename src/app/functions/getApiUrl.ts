import {ReadonlyHeaders} from "next/dist/server/web/spec-extension/adapters/headers";

export const getApiUrl = (headers: ReadonlyHeaders) => {
    const hostAndPort = headers.get('Host');
    const host =  hostAndPort?.slice(0, hostAndPort?.indexOf(":"));
    return "http://" + (host == "localhost" ? "127.0.0.1" : host) + ":5000/"
}