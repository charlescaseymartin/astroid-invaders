import { IncomingMessage, Server, ServerResponse } from "http";


export type ExpressServerType = Server<typeof IncomingMessage, typeof ServerResponse>;
