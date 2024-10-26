import { Socket } from 'socket.io-client';
import { AppContextState, PlayerMode } from './context';


export type ContextActionMap = {
    setAuthToken: string;
    setSocket: Socket;
    setMode: PlayerMode;
    connectSocket: undefined;
}

export type ContextActions = {
    [Key in keyof ContextActionMap]: {
        type: Key;
        payload: ContextActionMap[Key];
    }
}[keyof ContextActionMap];

export const contextReducer = (state: AppContextState, action: ContextActions): AppContextState => {
    switch (action.type) {
        case 'setAuthToken':
            return {
                ...state,
                authToken: action.payload,
            };

        case 'setSocket':
            if (!state.authToken) throw new Error('Socket initialization error: No user token.');
            return {
                ...state,
                socket: action.payload,
            };

        case 'setMode':
            return {
                ...state,
                mode: action.payload,
            };

        case 'connectSocket':
            if (!state.socket) throw new Error('Socket connection error: Socket not initialized.');
            if (!state.socket.connected) state.socket.connect();
            return state;

        default:
            return state;
    }
}


