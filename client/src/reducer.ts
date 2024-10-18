import { io } from 'socket.io-client';
import { AppContextState } from './context';

export type ContextActionMap = {
    getAuthToken: () => void;
    connectSocket: () => void;
}

export type ContextActions = {
    [Key in keyof ContextActionMap]: {
        type: Key;
        payload: ContextActionMap[Key];
    }
}[keyof ContextActionMap];

export const contextReducer = (state: AppContextState, action: ContextActions): AppContextState => {
    switch (action.type) {
        case 'getAuthToken':
            //let authToken = '';
            //fetch('http://localhost:5000/api/auth'}).then((res) => {
            //
            //})
            //return {
            //    ...state,
            //    authToken,
            //}
        case 'connectSocket':
            if (!state.authToken) throw new Error('Socket connection error: No user token.')
            return {
                ...state,
                socket: io('http://localhost:5000', {
                    autoConnect: false,
                    withCredentials: true,
                    extraHeaders: { ['Authorization']: `Bearer ${state.authToken}` },
                })
            }
    }
}
